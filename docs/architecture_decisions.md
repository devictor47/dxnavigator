# Architecture Decisions

This file records project-level architectural decisions that should remain visible as DxNavigator evolves.

## ADR 001: Locale Registry and Workflow Localization

### Status

Accepted.

### Context

DxNavigator has two categories of translatable content:

- Application UI chrome, such as buttons, page labels, and workspace controls.
- Workflow content, such as field labels, option narratives, HPI templates, red flags, differentials, and workup guidance.

The app already uses a small key-based i18n system with English and Brazilian Portuguese. The `Locale` type was at risk of being duplicated across app code and workflow code, which would make adding future languages error-prone.

### Decision

Locale identity is defined in one registry:

```ts
export const locales = {
  en: {
    label: 'English',
  },
  'pt-BR': {
    label: 'Portugues BR',
  },
} as const

export type Locale = keyof typeof locales
```

Workflow content uses localized metadata directly:

```ts
export type LocalizedText = Record<Locale, string>
export type TranslatableText = string | LocalizedText
```

Application chrome continues to use key-based translations:

```ts
t('common.help')
t('workspace.formTitle')
```

Workflow content does not call the app-level `t()` function. Instead, it carries its own localized strings and resolves them with:

```ts
resolveText(field.label, locale)
resolveText(workflow.hpiTemplate, locale)
```

### Rules

- Workflow `key` values stay language-independent and must not be translated.
- User-facing workflow labels, option labels, narratives, templates, and clinical guidance may use `TranslatableText`.
- New locales are added to the locale registry first.
- App message completeness is enforced with `Record<Locale, Record<string, string>>`.
- Localized workflow objects use `Record<Locale, string>` when completeness is required.

### Rationale

Workflow content is domain content, not UI chrome. Keeping localized workflow text inside workflow metadata makes future import/export, database storage, module authoring, and i18n easier to reason about.

Stable field keys also protect future persistence, APIs, templates, analytics, and workflow submissions from breaking when user-facing language changes.

### Consequences

Adding a locale requires:

1. Add the locale to the registry.
2. Add app UI messages for the new locale.
3. Add workflow translations where localized workflow content is expected.

The workflow renderer now receives the active locale when generating narrative text, resolves field narratives for that locale, and resolves localized HPI templates before rendering.

## ADR 002: Workflow Presets Replace Form State

### Status

Accepted.

### Context

Clinical workflows can become long. Even when fields are well grouped, physicians may need to move quickly through common consultation patterns without manually clicking every repeated negative or positive finding.

For example, an influenza-like illness workflow may commonly need different starting states for:

- Uncomplicated viral URI.
- Influenza-like illness.
- Rhinosinusitis concern.

Earlier options considered presets as navigation aids that only highlighted relevant fields. That helps orientation, but it still requires substantial clicking and scrolling.

### Decision

Workflows may define presets as named, localized sets of answers:

```ts
export type WorkflowPreset = {
  id: string
  title: TranslatableText
  description?: TranslatableText
  answers: ModuleAnswers
}
```

Presets are part of the workflow definition:

```ts
export type ClinicalWorkflow = {
  // ...
  presets?: WorkflowPreset[]
}
```

Applying a preset replaces the current workflow session state. It does not merge with the current answers.

The UI must show a confirmation before replacing form state. The confirmation explains that current answers will be replaced and offers a "remember decision" option. If the user remembers the decision, future preset clicks may skip the confirmation locally.

After a preset is applied, fields included in the preset answer set are visually highlighted so the physician can see which parts of the form were loaded by the preset.

### Rules

- Preset IDs are stable, language-independent identifiers.
- Preset titles and descriptions are localized workflow content.
- Preset answer keys must match workflow field keys.
- Applying a preset creates a fresh workflow session and then applies the preset answers.
- Presets replace form state instead of merging with existing answers.
- Presets may include both positive and negative answers when that distinction is clinically useful.
- Preset confirmation preference is a local UI preference, not workflow data.
- Presets are workflow accelerators, not diagnostic conclusions.

### Rationale

Replacement is easier to understand than merge behavior. It avoids hidden state where an old answer survives because a preset did not mention that field.

Highlighting preset-loaded fields preserves transparency: the user can quickly audit what the preset changed, correct anything that does not fit the patient, and continue with the normal workflow.

Keeping presets inside workflow metadata also makes them compatible with future workflow import/export and database storage.

### Consequences

Workflow authors should be deliberate about which answers a preset includes. Omitted fields will return to their workflow default values when the preset creates a fresh session.

Future builder work should expose preset authoring, including selecting fields, assigning answer values, and validating that preset keys still exist in the workflow.

## ADR 003: TypeScript Workflow Model Before Formal Schema

### Status

Accepted.

### Context

The project started with a simple static Chest Pain MVP, then shifted toward dynamic workflow rendering, structured data collection, and generated clinical notes.

A comprehensive JSON Schema or form-builder schema was considered too early. The clinical model is still emerging through concrete workflows, and locking a generic schema now would likely create abstraction churn.

### Decision

Clinical workflows are authored as TypeScript objects using the shared scaffold in `frontend/src/data/workflow.ts`.

The model currently supports:

- Workflow metadata.
- Sections.
- Text, boolean, select, and multiselect fields.
- Field narratives.
- Conditional display.
- HPI templates.
- Guidance content.
- Presets.

The schema should evolve from real workflows before being formalized for persistence or external authoring.

### Rules

- Do not introduce a comprehensive JSON Schema until several real workflows prove the shape.
- Keep field keys stable and language-independent.
- Prefer small additions to the workflow scaffold over generic form-builder abstractions.
- Workflow import/export may use JSON, but the source model remains the typed workflow object for now.

### Consequences

The TypeScript model is easier to change during product discovery, but external workflow authoring remains limited until the schema stabilizes.

## ADR 004: Workflow Session Owns Runtime Answers

### Status

Accepted.

### Context

The renderer originally treated workflows as static data and passed an `answers` object around separately. That made HPI generation feel disconnected from the workflow interaction model.

At the same time, making the workflow definition itself mutable would blur the boundary between clinical metadata and runtime user input.

### Decision

Runtime answers are owned by a `WorkflowSession` created from a workflow definition:

```ts
const session = createWorkflowSession(workflow)
session.setAnswer('onset', '2 hours ago')
session.generateHpi(locale)
```

The workflow remains static metadata. The session owns:

- initial answer creation
- setting answers
- reading answers
- HPI generation
- submission serialization

### Rules

- Workflow definitions are not mutated by user input.
- UI components interact with a session rather than a loose answer object.
- Switching workflows creates a fresh session.
- Applying a preset creates a fresh session before applying preset answers.

### Consequences

This keeps the model simple while giving the runtime form a natural object boundary. It also maps well to future server submission, where the session can serialize `{ workflowId, answers }`.

## ADR 005: Liquid Templates With Field-Owned Narrative Values

### Status

Accepted.

### Context

Hand-coded `generateHpi` functions do not scale. They make each workflow responsible for low-level prose assembly and can easily become long piles of custom string logic.

The preferred direction is for fields and options to define how they read in narrative form, while templates define sentence structure.

### Decision

Workflow HPI generation uses localized Liquid templates when `hpiTemplate` is present.

The renderer builds a narrative context from workflow fields:

- Text fields resolve to their entered text with optional prefix/suffix.
- Boolean fields resolve to `whenTrue`, `whenFalse`, or an empty string.
- Select fields resolve to the selected option narrative.
- Multiselect fields resolve to an array of selected option narratives.

Templates consume narrative values, not raw booleans:

```liquid
{{ exertional }}
```

instead of:

```liquid
{% if exertional %}triggered by exertion{% endif %}
```

For repeated modifiers, templates can collect values and render them with a localized list filter:

```liquid
{% assign modifiers = exertional | compact_append: relievedByRest | compact_append: pleuritic %}
Pain is {{ modifiers | list: locale }}.
```

### Rules

- Templates should not expose raw boolean logic when a field narrative can represent the text.
- Multiselect narrative values remain arrays until the template decides how to join them.
- Use `{{ value | list: locale }}` when list joining needs localized connectors.
- Keep module-specific `generateHpi` only as a fallback while older workflows are migrated.

### Consequences

Workflow authors control clinical wording at the field and template level. This makes i18n and future workflow import/export easier, but requires careful template examples in the builder UI.

## ADR 006: Conditional Field Display Uses Minimal `displayIf`

### Status

Accepted.

### Context

Some clinical fields only make sense after a prior answer. For example, a temperature field should appear only when fever is checked.

A general rules engine would be premature.

### Decision

Fields may declare a simple display condition:

```ts
displayIf?: {
  fieldKey: string
  equals: string | boolean | string[]
}
```

The dynamic form renderer evaluates this through `isFieldVisible`.

### Rules

- `displayIf` is field-level metadata.
- Conditions compare against another field's current answer.
- This is not a general expression language.
- Add complexity only after real workflows require it.

### Consequences

The current design covers straightforward dependent fields without introducing a rule engine. More complex branching may require a future decision.

## ADR 007: Workflow Builder Is Metadata Authoring, Not a Full CMS

### Status

Accepted.

### Context

The app needs a way to author workflows without directly editing code. The first builder version should help shape the workflow model without becoming a full visual CMS or schema editor.

### Decision

The workflow builder creates and previews workflow metadata in the same shape used by the renderer.

Current builder principles:

- Users explicitly add sections and fields.
- No default section or default field is created automatically.
- IDs and field keys are derived from labels but remain editable.
- Accented characters are normalized when deriving IDs and keys.
- Field details are configured inline through expandable controls.
- A form-level content locale controls which localized text is being authored.
- Import/export is JSON-based for now.

### Rules

- Builder output should remain close to `ClinicalWorkflow`.
- Builder import is best-effort: it should recover usable workflow data where possible, not enforce a complete production validator yet.
- Export should be useful for review, sharing, and future persistence.
- Do not add database persistence until the workflow model is more stable.

### Consequences

The builder is useful for prototyping and testing workflow authoring, but it is not yet a strict validation system. Future builder work should add preset authoring, conditional display authoring, guidance authoring, and stronger validation.

## ADR 008: Clinical Guidance Has Quick Guides and Source Figures

### Status

Accepted.

### Context

Static red flags, differentials, and workup cards are useful but do not fully cover consultation needs. Clinicians may need both a quick synthesized guide and a way to inspect source material from guidelines or official papers.

### Decision

Workflow guidance supports two additional content types:

- `quickGuides`: curated, structured summaries for quick consultation.
- `sourceFigures`: references to source algorithms, flowcharts, or figures.

Source figure entries may include metadata and an optional `imageUrl`. The public app does not automatically bundle local clinical-data images.

### Rules

- Quick guides are authored as workflow metadata.
- Source figures should cite their source.
- Local research material can live outside the public repo when needed.
- Source figures should support "see it from the source" without replacing clinical judgment.

### Consequences

This gives workflows both synthesized bedside help and traceable source references. Image asset handling remains a future decision, especially for copyright and public repository concerns.

## ADR 009: Local Docker Development Defaults to Safe Host Binding

### Status

Accepted.

### Context

The project runs in Docker. For normal local development, cloning the repo and running Docker Compose should work without extra configuration.

The user's VPN deployment runs Caddy on the host and should not accidentally expose Vite directly to the public network.

### Decision

Docker Compose uses an environment-configurable bind address:

```yaml
ports:
  - "${FRONTEND_BIND_ADDRESS:-0.0.0.0}:5173:5173"
```

The committed `.env` sets:

```env
FRONTEND_BIND_ADDRESS=127.0.0.1
```

Vite allows hosts broadly for development compatibility, while exposure is controlled by Docker port binding and the host reverse proxy.

### Rules

- Local Docker Compose should continue to work for a new clone.
- Public exposure should be controlled outside Vite, primarily through Docker binding and reverse proxy configuration.
- Deployment-specific domains should not be hardcoded into the public repo.

### Consequences

Localhost development remains simple, and VPN/reverse-proxy deployment can keep Vite bound to loopback. Production deployment will need a separate hosting decision later.
