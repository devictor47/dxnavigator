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

Source figure entries may include metadata, an optional `imageUrl`, and a `sourceUrl` linking to the original source. The public app does not automatically bundle local clinical-data images.

### Rules

- Quick guides are authored as workflow metadata.
- Source figures should cite their source.
- When building workflows from `clinical-data`, check for an `img-links.txt` file in the workflow folder and map image names to their original source URLs.
- Source figure cards should link to the original source when a URL is available.
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

The committed `.env.example` recommends:

```env
FRONTEND_BIND_ADDRESS=127.0.0.1
```

Vite allows hosts broadly for development compatibility, while exposure is controlled by Docker port binding and the host reverse proxy.

### Rules

- Local Docker Compose should continue to work for a new clone.
- Public exposure should be controlled outside Vite, primarily through Docker binding and reverse proxy configuration.
- Deployment-specific domains should not be hardcoded into the public repo.

### Consequences

Localhost development remains simple, and VPN/reverse-proxy deployment can keep Vite bound to loopback. Production deployment uses a separate production Compose overlay.

## ADR 010: Authentication, Authorization, and Persistence Foundation

### Status

Accepted.

### Context

DxNavigator is moving from a frontend-only prototype toward a persisted application with private clinical workspaces.

The desired authentication experience should stay simple:

- Local registration with name, email, and password.
- Local login with email and password.
- Passwords require only a minimum length of 6 characters.
- No uppercase, lowercase, digit, or symbol requirements.
- No phone number.
- No required email verification before login.
- Email must be unique.
- Google sign-in should be supported as the first external provider.

The backend should still use established security primitives instead of custom password hashing or handwritten authentication infrastructure.

### Decision

The backend will use ASP.NET Core Identity with a custom application user:

```csharp
public class ApplicationUser : IdentityUser<int>
{
    public string Name { get; set; } = string.Empty;
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? DeletedAt { get; set; }
}
```

Identity will be configured with a deliberately simple local password policy:

```csharp
options.Password.RequiredLength = 6;
options.Password.RequireDigit = false;
options.Password.RequireLowercase = false;
options.Password.RequireUppercase = false;
options.Password.RequireNonAlphanumeric = false;
options.Password.RequiredUniqueChars = 1;
```

Sign-in will not require confirmed email or phone:

```csharp
options.SignIn.RequireConfirmedEmail = false;
options.SignIn.RequireConfirmedPhoneNumber = false;
options.User.RequireUniqueEmail = true;
```

PostgreSQL will be the application database. EF Core will manage Identity tables and future application tables.

Authorization will use secure cookie-based authentication. The app should lean toward secure defaults:

- HTTP-only authentication cookies.
- Secure cookies in deployed environments.
- In development, cookies may follow the current request scheme so LAN device testing over HTTP works.
- SameSite configured deliberately for the frontend/backend deployment shape.
- HTTPS for all public traffic.
- Direct HTTP requests should redirect to HTTPS instead of being served.
- Forwarded headers support when running behind Caddy or another reverse proxy, so internal proxy-to-app HTTP can be treated as HTTPS only when the original request used HTTPS.

Google will be the first external login provider. External login secrets must not be committed to the repository. They should come from local user secrets or environment variables.

Google's OAuth redirect URI should live under the backend API path:

```text
https://<public-domain>/api/auth/google/signin
```

This keeps the callback compatible with the production frontend container, where nginx serves the Vue app and proxies `/api` requests to the backend.

### Rules

- Do not implement custom password hashing.
- Do not store authentication tokens in browser local storage.
- Do not relax secure cookie behavior outside development.
- Do not require email confirmation for login in the initial version.
- Do require unique email addresses.
- Use email as the username for local accounts.
- Local accounts may have a password.
- External accounts may exist without a local password.
- A Google login with an email matching an existing user should link to that user when safe.
- A Google login with no matching user should create a user from the provider email and display name when available.
- Google-provided email may be treated as provider-verified, but this does not introduce a required app-level email verification flow.
- Google OAuth callback paths should remain under `/api` so production nginx forwards them to the backend.
- Instagram login is not part of the initial scope.
- Keep auth endpoints minimal: register, login, logout, current user, Google challenge, and Google callback.

### Rationale

ASP.NET Core Identity gives the project durable auth infrastructure without turning authentication into the main product. It provides password hashing, user persistence, security stamps, external login support, and cookie integration while still allowing the product to keep a humane password policy.

Cookie auth matches the intended web app shape and avoids storing bearer tokens manually in browser storage. It also works well when the frontend and backend are served behind the same HTTPS origin through Caddy or a later production host.

PostgreSQL is a good fit because it supports Identity persistence, normal relational application tables, and future `jsonb` storage for workflow definitions and workflow submissions.

Google sign-in reduces friction for users while local email/password remains available for users who do not want external login.

### Consequences

The next backend implementation should create:

- An ASP.NET Core backend project.
- PostgreSQL Docker Compose service.
- EF Core DbContext using Identity.
- `ApplicationUser`.
- Initial Identity migration.
- Minimal auth endpoints.
- Google external auth configuration.
- Frontend login/register routes.
- Private route protection.

Production deployment will need explicit HTTPS, cookie, CORS, and reverse proxy configuration. Local development may require a Vite proxy or a same-origin reverse proxy setup so cookie behavior matches production closely.

## ADR 011: Docker Development and Production Overlays

### Status

Accepted.

### Context

The project needs two different Docker behaviors:

- Local development should optimize for speed, hot reload, and simple cloning.
- Deployment should avoid development servers, source bind mounts, and watcher-based runtimes.

The frontend is a Vite application. Vite provides a production build step, but the build output is static files in `dist/`; Vite does not remove the need for a production static file server.

### Decision

Docker Compose is split into:

- `docker-compose.yml` for shared services and common configuration.
- `docker-compose.override.yml` for local development.
- `docker-compose.prod.yml` for production-like deployment.

Development remains the default:

```bash
docker compose up -d --build
```

Production-like deployment is explicit:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

The development overlay uses source bind mounts, Vite, `dotnet watch`, npm cache, and NuGet cache.

The production overlay builds immutable containers:

- ASP.NET Core is published and run from the .NET runtime image.
- Vue is built into static files.
- nginx serves the built Vue files from `dist/`.
- nginx handles SPA fallback routing by serving `index.html` for unknown frontend paths.
- nginx proxies `/api` to the backend through the Docker network.

Machine-specific values live in `.env`, which is ignored by Git. Safe defaults live in `.env.example`.

The production request path is:

```text
Browser
  -> HTTPS reverse proxy, currently host Caddy
  -> frontend container, nginx
  -> /api requests proxied to backend container
  -> PostgreSQL
```

The backend container is not exposed on a host port in production-like mode by default.

### Rationale

Environment variables are good for values such as ports, bind addresses, credentials, and OAuth secrets. They are not a good fit for switching container behavior between hot reload development and production serving.

nginx is intentionally used only in the production frontend image. It is not part of the development frontend image.

The project considered these alternatives:

- Keep using Vite for deployment. This is simple, but it keeps a development-oriented server in the public serving path.
- Use `vite preview`. This previews production builds locally, but it is not intended to be the main public production server.
- Use Node with a static serving package. This keeps the runtime in the Node ecosystem, but still introduces an extra package and gives less built-in reverse proxy/static serving behavior than nginx.
- Let ASP.NET Core serve the frontend build. This reduces container count, but it couples frontend hosting to the API container and requires the backend image to own the frontend build artifacts.
- Let host Caddy serve static files directly. This is clean for one server, but moves more deployment responsibility outside Docker Compose and makes clone-and-run deployment less self-contained.

nginx was accepted because it is small, common, boring infrastructure for static files and reverse proxying. It gives the production frontend container one clear job: serve the compiled Vue app and forward API requests internally.

Compose overlays keep those concerns separate:

- Developers can clone and run the app without learning deployment flags.
- The VPN can keep local port choices without creating Git noise.
- Production-like containers avoid source mounts and development servers.
- Caddy can keep using one public frontend entrypoint while nginx forwards API calls internally.

### Rules

- Do not use Vite dev server as the production frontend server.
- Do not expose the backend on a host port in production-like mode unless there is a deliberate debugging need.
- Keep Caddy responsible for public HTTPS termination on the VPS.
- Keep nginx responsible only for serving frontend static files and proxying `/api` inside Docker.
- Keep machine-specific ports, bind addresses, and secrets in `.env`, not in tracked Compose files.
- Do not put OAuth secrets, database passwords, or production domain values in tracked Compose files.

### Consequences

The backend is no longer exposed on a host port in production-like mode by default. API traffic should flow through the frontend entrypoint and nginx `/api` proxy.

The production-like deployment has one additional runtime component: nginx in the frontend container. This is an accepted dependency, not an accidental one.

If the frontend later moves to Cloudflare Pages or another static host, this decision should be revisited. In that architecture, cookie auth and same-origin assumptions must be rechecked carefully.

Because API requests are same-origin through nginx, future auth cookies should be configured with this request path in mind.

`DATABASE_MIGRATE=true` applies EF Core migrations on backend startup so a fresh PostgreSQL volume can boot with the expected schema.

## ADR 012: Workflow Content, Language, Marketplace Identity, and Public Routing

### Status

Accepted.

### Context

Workflow files are becoming large clinical artifacts. The current implementation allows workflow text to be localized inline through objects such as:

```ts
label: {
  en: 'Pain quality',
  'pt-BR': 'Caracteristica da dor',
}
```

This is type-safe, but it makes workflow files noisy and harder to review. Clinical workflows contain labels, helper text, option text, narratives, red flags, differentials, workup, quick guides, source notes, presets, and HPI templates. Keeping multiple languages inside one workflow definition makes each file dense and difficult for humans to maintain.

The product is also expected to evolve toward a workflow marketplace where users can browse, preview, add, create, and share workflows. In that model, there may be many workflows about the same clinical topic. For example:

- Migraine for emergency care.
- Migraine for primary care.
- Migraine with red-flag emphasis.
- Enxaqueca for Brazilian outpatient practice.
- Pediatric headache.
- Chronic migraine follow-up.

Trying to enforce a single canonical multilingual workflow with structurally identical language variants would be too rigid once users can create and share their own workflows.

### Decision

Workflow content should be treated as a standalone clinical artifact authored in one language.

The application UI chrome remains key-based i18n:

```ts
t('auth.login')
t('sidebar.expand')
t('builder.addField')
```

Workflow content should not use app-level translation keys and should not embed multiple locale objects inside every text field. A workflow definition should carry simple strings in the language it was authored in:

```ts
title: 'Migraine and Acute Headache - ED Red Flags'
language: 'en'
```

or:

```ts
title: 'Enxaqueca - Atendimento Ambulatorial'
language: 'pt-BR'
```

There can be many workflows for the same topic. The user decides which workflow is clinically useful for their environment.

Marketplace discovery should rely on metadata and filtering rather than canonical workflow identity. Expected filters include:

- Language.
- Tags.
- Specialty.
- Care setting.
- Author or organization.
- Source quality or citation metadata.
- Later: ratings, installs, or version history.

Workflow definitions should not own durable database identity. The backend owns identity when a workflow is inserted.

The workflow definition may include:

```ts
type ClinicalWorkflow = {
  title: string
  language: string
  description?: string
  sections: ModuleSection[]
  redFlags: ClinicalItem[]
  differentials: ClinicalItem[]
  workup: ClinicalItem[]
  quickGuides?: ClinicalGuide[]
  sourceFigures?: SourceFigure[]
  presets?: WorkflowPreset[]
  hpiTemplate?: string
}
```

The persisted backend record owns system identity and sharing identity:

```ts
type WorkflowRecord = {
  id: number
  ownerUserId: number
  publicId?: string
  slug?: string
  title: string
  language: string
  description?: string
  definition: ClinicalWorkflow
  createdAt: string
  updatedAt: string
  deletedAt?: string
}
```

The internal `id` is the database primary key. It is not authored by the workflow creator.

When a workflow is shared publicly, the backend should provide a stable public identifier such as a UUID or opaque public token:

```text
publicId = wfkw929
```

A slug is useful for readability, SEO, exported filenames, and debugging, but it is not authoritative identity. It does not need to be globally unique.

Public URLs can combine stable identity and readable slug:

```text
/workflows/wfkw929/migraine
/workflows/ormr93/migraine
```

Both URLs can exist because the backend resolves by `publicId`, not by `migraine`.

### Rationale

Medical language is not just string substitution. Different languages may need different clinical idioms, sentence order, section grouping, narrative style, or documentation phrasing. This is especially true for generated HPI templates.

Treating every workflow as its own authored artifact is more compatible with a marketplace. It avoids assuming that all migraine workflows are variants of one master object. It also avoids brittle validation requirements across user-created workflows.

Removing inline localization from workflow content should make workflow files easier to read, review, generate, import, and maintain.

Separating public identity from slug gives friendly URLs without making human-readable text responsible for identity. Titles and slugs can change. Public IDs should remain stable.

### Rules

- App UI chrome uses app i18n.
- Workflow content is authored directly in one language.
- Workflow definitions should not call app-level `t()`.
- Workflow definitions should not use translation-key placeholders for clinical text.
- Workflow definitions should not contain system-owned database IDs.
- Backend records own internal database identity.
- Public sharing should use a backend-generated public ID.
- Slugs are readable labels, not authoritative identifiers.
- Slugs do not need to be globally unique when a public ID is present.
- Tags and metadata support marketplace discovery, not workflow uniqueness.

### Consequences

Existing frontend workflow types will need to be simplified later by removing `TranslatableText` from workflow content.

Bundled frontend workflows will still need local registry keys while they are hardcoded. These keys are a frontend registry concern, not workflow schema identity.

Persisted workflows should be routed by backend identity or public identity, not by workflow-authored IDs.

The workflow builder should eventually create workflow definitions with simple strings in the selected authoring language.

Marketplace upload should request or infer metadata such as language, tags, specialty, care setting, and description.

If public workflow pages become searchable, slugs can improve readability and SEO while public IDs preserve stable routing.

## ADR 013: Preset CRUD Belongs in the Workflow View

### Status

Accepted.

### Context

Workflow presets started as predefined shortcuts bundled with a clinical workflow. They let a physician load a common form state quickly, then adjust the answers for the patient in front of them.

As workflows grow, presets become part of day-to-day clinical use rather than only workflow-authoring metadata. A physician is most likely to discover a useful preset while interacting with the actual workflow form.

The project does not yet have backend workflow persistence, so early preset CRUD needs to be useful without overcommitting to the final database model.

### Decision

Preset create, update, and delete controls should live inside the workflow view, near the preset selector.

The workflow builder may still expose preset metadata later, but the primary preset editing experience belongs where the user is filling out the form.

The workflow view should support:

- Loading a preset into the current workflow session.
- Saving the current form state as a preset.
- Editing preset title and description.
- Removing a preset.

Saving follows the active preset state:

- If no preset is active, saving creates a new preset from the current form answers.
- If a preset is active and the form has changed, saving opens a dialog asking whether to replace the active preset or save the current answers as a new preset.
- If a preset is active and unchanged, saving may be disabled or show that there are no changes to save.

The save flow should not include a separate "replace answers with current form state" option. The current form state is always the thing being saved.

Until backend persistence exists, user-created and edited presets may be stored in localStorage, keyed by workflow identity. Bundled presets and user presets are merged for display.

### Rules

- Presets remain workflow-specific.
- Preset titles and descriptions are user-facing text.
- Preset answer keys must match workflow field keys.
- Loading a preset replaces the current workflow session state.
- Saving a preset captures the current workflow session answers.
- Editing a preset changes metadata, not the current form answers.
- Removing a preset should require confirmation.
- Bundled presets should not be permanently mutated in source code by normal app usage.
- Local preset persistence is temporary and should be replaced by backend persistence later.

### Rationale

Preset CRUD in the workflow view matches the physician's mental model: interact with the form, tune it into a useful state, then save that state as a shortcut.

Keeping the save action tied to the current form state avoids a separate and confusing "replace answers" mode. The distinction that matters is whether the current state replaces the loaded preset or becomes a new preset.

LocalStorage provides enough behavior to test the interaction model before committing to database tables and ownership rules.

### Consequences

The workflow view needs to track:

- The active preset ID.
- A baseline copy of the active preset answers.
- Whether the current answers differ from the active preset baseline.
- Locally persisted user preset overrides and deletions.

Future backend persistence should map these actions to create, update, and delete preset operations. The frontend interaction model should remain mostly unchanged when storage moves from localStorage to the backend.

## ADR 014: Workflow Persistence Uses Relational Metadata With JSONB Definitions

### Status

Accepted.

### Context

DxNavigator workflows are flexible clinical artifacts. Their full structure includes sections, fields, HPI templates, guidance, source figures, and presets. This structure is still evolving and should not be prematurely normalized into many relational tables.

At the same time, marketplace and routing behavior need stable, queryable metadata such as title, description, slug, language, visibility, creator, and public identity.

### Decision

Workflow persistence uses a hybrid relational plus JSONB model.

Marketplace/source workflows are stored in `Workflows`:

```text
id int primary key
public_id uuid unique
creator_user_id int
locale_id int
title text
description text nullable
slug text
visibility text
definition jsonb
created_at timestamptz
updated_at timestamptz
deleted_at timestamptz nullable
```

Installed/user workspace workflows are stored separately in `UserWorkflows`:

```text
id int primary key
user_id int
source_workflow_id int nullable
locale_id int
title text
description text nullable
slug text
definition jsonb
created_at timestamptz
updated_at timestamptz
deleted_at timestamptz nullable
```

Supported languages are stored in `Locales`:

```text
id int primary key
code text unique
label text
is_active boolean
```

The initial seed locales are:

- `en`
- `pt-BR`

Internal IDs are database-generated integers. Public workflow IDs use UUIDs.

Dates are stored as UTC-aware PostgreSQL `timestamp with time zone` values and represented in .NET as `DateTimeOffset`.

### Rules

- Full workflow definitions live in `jsonb`.
- Marketplace-critical metadata is promoted to columns.
- `creator_user_id` represents authorship/source, not ownership of installed copies.
- User workspace workflows are copies, not live references to marketplace workflows.
- A creator updating or deleting a public workflow must not silently change another user's installed workflow.
- Public routing should use `public_id` plus a readable slug.
- Soft delete uses `deleted_at`.
- Normal application queries should ignore soft-deleted workflows.
- Advanced JSONB querying may be added later, but common listing/search metadata should remain relational.

### Indexes

Initial indexes should support the first common query shapes:

- unique lookup by public workflow ID
- public marketplace listing by locale and updated date
- creator workflow listing by creator and updated date
- user workspace listing by user and updated date
- source workflow lookup for installed copies

Partial indexes are preferred for active-row queries:

```sql
where deleted_at is null
```

and for marketplace listing:

```sql
where visibility = 'public' and deleted_at is null
```

### Consequences

The schema can list and route workflows efficiently without freezing the full workflow definition into a rigid relational model.

Future marketplace filters such as tags, specialty, care setting, source quality, ratings, or install counts can be promoted into additional columns or related tables when those query patterns become real.

Existing databases created with EF `EnsureCreated` may need to be reset or baselined before switching fully to migrations, because the first migration includes Identity tables as well as workflow tables.

## ADR 015: Published Workflows Are Independent Snapshots

### Status

Accepted.

### Context

DxNavigator stores private workspace workflows separately from marketplace workflows:

- `UserWorkflows` are private editable copies in a user's library.
- `Workflows` are marketplace/public workflow records.

When a user publishes a workflow, the marketplace version must remain stable even if the user later edits or removes their private copy. At the same time, preserving a source link while the private copy exists enables future product behavior such as "publish update" or "your draft is newer than the marketplace version."

The project considered linking from `UserWorkflows` to `Workflows` with `SourceWorkflowId`, but that makes the private copy aware of publication state and complicates deletion semantics.

### Decision

Publishing copies a `UserWorkflow` into `Workflows` as an independent JSONB snapshot.

`Workflows` may keep an optional source pointer:

```text
Workflows.SourceUserWorkflowId -> UserWorkflows.Id nullable
```

This source pointer is an update lineage hint, not a dependency required for marketplace rendering.

When a user removes a workflow from their private library, the app hard deletes the `UserWorkflow`. Any published `Workflow` rows pointing to that private record have their `SourceUserWorkflowId` set to `null`.

The marketplace workflow remains available because it owns its own metadata and `definition` snapshot.

### Rules

- `UserWorkflow` is a private editable working copy.
- `Workflow` is a public or marketplace snapshot.
- Publishing copies all required marketplace data into `Workflow`.
- Marketplace rendering must not require the source `UserWorkflow`.
- `Workflow.SourceUserWorkflowId` is nullable and uses `ON DELETE SET NULL`.
- Removing from a user's library hard deletes the `UserWorkflow`.
- Deleting a private copy must not delete or mutate the published snapshot except for unlinking `SourceUserWorkflowId`.
- Author display is controlled by `Workflow.IsAuthorPublic`; creator identity may remain internal for audit/moderation.

### Rationale

Storage is cheaper than lifecycle complexity. Keeping a full snapshot avoids rebuilding public workflows from private records and prevents public content from disappearing when an author cleans their library.

The nullable source pointer keeps future update workflows possible while avoiding a hard dependency on private data.

### Consequences

The earlier `UserWorkflows.SourceWorkflowId` relationship should be removed or ignored.

Future publish-update behavior can locate a marketplace workflow through `Workflow.SourceUserWorkflowId` while the source still exists. If the source was deleted, the marketplace workflow becomes an independent published snapshot and cannot be automatically updated from that private copy.

Marketplace installs may use a separate source pointer in the other direction:

```text
UserWorkflows.SourceWorkflowId -> Workflows.Id nullable
```

This means "this private copy was installed from that marketplace snapshot." It is not used to keep marketplace workflows alive and it is not the publication lifecycle link.

## ADR 016: Example Workflows Are Seeded Backend Data

### Status

Accepted.

### Context

The frontend originally kept hardcoded bundled workflows as both source examples and runtime fallback data. Once workflow persistence exists, keeping two runtime paths creates unnecessary branching:

- hardcoded frontend workflow lookup
- database workflow lookup

This makes routing, editing, publishing, deleting, ordering, and testing harder because the app must keep asking whether a workflow came from source code or from the backend.

### Decision

Example workflows are stored in a backend `ExampleWorkflows` table and seeded from a JSON file generated from the current TypeScript workflow definitions.

When a user account is created, DxNavigator copies example workflows for the user's preferred locale into `UserWorkflows` if that user has no workflows yet.

If an existing user logs in or calls `/api/auth/me` with an empty workflow library, examples are also copied. This gives older empty accounts the same starting point without requiring a manual migration per user.

The frontend no longer loads hardcoded workflows at runtime. Workflow source files may remain in the repository temporarily as authoring/source material for regenerating seed data, but the application workspace should render persisted backend workflows only.

### Rules

- The clinical workspace lists workflows from `UserWorkflows`.
- New users receive copied examples, not references to shared examples.
- Copied examples become normal private user workflows.
- Editing, publishing, deleting, and reordering examples uses the same code path as user-created workflows.
- The frontend should not maintain a separate bundled-workflow fallback path.
- The seed JSON is generated from source workflow definitions until the builder/database workflow authoring model fully replaces hardcoded source files.

### Consequences

The workspace has one runtime source of truth for workflows: the backend.

The example workflow seed process must be kept in sync when source workflow files change. Later, once example workflows can be authored and managed fully through the app, the TypeScript workflow source files can be removed.

## ADR 017: User Workflow Order Is Explicit User Data

### Status

Accepted.

### Context

The sidebar workflow list started as a simple list sorted by timestamps. That is useful initially, but physicians may want their most-used workflows in a custom order.

Sorting by `updatedAt` or `createdAt` is not enough once workflows become part of a user's working environment.

### Decision

`UserWorkflows` owns an explicit `DisplayOrder` integer.

Workflow listing queries order by:

```text
DisplayOrder ascending, then CreatedAt descending
```

New workflows and marketplace installs are inserted at the top by shifting existing user workflows down and assigning the new record `DisplayOrder = 0`.

The sidebar allows manual drag reordering. The frontend sends the full ordered workflow id list to the backend, and the backend persists sequential display order values.

### Rules

- Ordering is per user.
- The reorder endpoint requires the submitted ids to match the user's active workflow library exactly.
- Reordering does not edit workflow definitions.
- Newly created or installed workflows appear at the top.
- Manual order should be preserved across refreshes and devices.

### Consequences

The sidebar now reflects intentional user organization instead of incidental timestamps.

Adding a new workflow shifts existing display order values. This is acceptable for the expected workflow-library size and keeps the UI behavior simple.

## ADR 018: Workflow Presets Are First-Class Child Records

### Status

Accepted.

### Context

Presets started as workflow metadata and local UI state. That was enough to test the interaction model, but it becomes awkward once workflows are persisted, published, installed, and edited across devices.

Keeping presets inside workflow JSONB would make the workflow definition heavier and would blur separate concerns:

- workflow structure
- reusable form answer states
- marketplace snapshots
- installed private copies

### Decision

Presets live in their own tables:

```text
UserWorkflowPresets -> UserWorkflows
WorkflowPresets     -> Workflows
ExampleWorkflowPresets -> ExampleWorkflows
```

Preset answers remain JSONB because they mirror dynamic workflow answers:

```text
answers jsonb
```

Workflow JSON definitions should not contain `presets`. If imported or older workflow JSON includes a `presets` property, the backend extracts those entries into preset rows and stores the workflow definition without that property.

### Rules

- Private presets belong to a private `UserWorkflow`.
- Published presets belong to a published marketplace `Workflow` snapshot.
- Example presets belong to seeded `ExampleWorkflow` records and are copied into new user libraries.
- Publishing a workflow copies the private workflow and its private presets into marketplace snapshot tables.
- Updating a published workflow replaces both the marketplace workflow snapshot and its preset snapshot set.
- Installing a marketplace workflow copies both the workflow and its presets into the user's private library.
- Installed presets are normal private copies and can be edited or removed by the installing user.
- Private preset changes never automatically propagate to the marketplace.
- Presets are hard-deleted when their parent workflow copy/snapshot is deleted.

### Consequences

Preset CRUD can be handled through normal API endpoints without rewriting the full workflow JSONB definition.

Publishing remains explicit: a user must click update published workflow before private preset edits replace the marketplace snapshot.

The migration extracts existing `definition.presets` arrays into preset tables and removes the `presets` key from stored JSONB definitions.

## ADR 019: Clinical Calculators Are Curated Frontend Tools

### Status

Accepted.

### Context

DxNavigator's workflow system now covers structured clinical history, HPI generation, presets, guidance, publishing, installing, and marketplace behavior. A smaller high-value clinical layer is calculators: CKD-EPI, HEART, TIMI, GRACE, drug dosing, and similar tools.

Calculators have a different risk profile from workflows. A user-authored workflow can guide a clinical conversation, but a calculator formula must be exact, unit-aware, and source-reviewed.

### Decision

Clinical calculators are a separate private app section:

```text
/private/calculators
/private/calculators/:calculatorId
```

They are frontend-only and hardcoded as curated code, not backend records and not user-generated content.

The calculator registry uses simple metadata:

```ts
type ClinicalCalculator = {
  id: string
  language: Locale
  title: string
  description: string
  category: 'scores' | 'renal' | 'drugs'
  component: Component
  sources: CalculatorSource[]
  content?: unknown
}
```

Calculator content follows the same direction as workflow content: user-facing calculator records are authored per language instead of embedding localized text objects in every field.

For example, the HEART Score can have an English calculator definition and a Portuguese calculator definition. Both point to the same calculator component and formula, but their labels, options, interpretations, limitations, and source notes are ordinary strings in that language.

Each calculator owns its own Vue component. The app should not build a generic calculator schema or calculator builder at this stage.

Sources are an array so a calculator can cite original derivation papers, validation studies, guidelines, and formula documentation.

### Rules

- Calculators are curated source code.
- Calculator formulas should be verified before implementation.
- Dose/rate converters should clearly state that they convert units and concentrations rather than recommend a dose.
- Every calculator should render citations/source notes.
- Calculator outputs should include interpretation limits and should not replace clinical judgment.
- Do not persist calculator results until there is a concrete encounter/session model.
- Do not make calculators user-authored until there is a validation and review process.
- Calculator labels, option text, result descriptions, limitations, and source notes are calculator content and should be localized inside the calculator registry, not through app chrome translation keys.
- Calculator navigation lives beside workspace, builder, marketplace, and workflow management.

### Consequences

Calculators can add clinical value quickly without introducing new backend storage or marketplace complexity.

The first implementations use HEART Score, Wells Criteria for DVT and PE, PERC, CURB-65, CRB-65, Alvarado Score, Pediatric Appendicitis Score, qSOFA, Glasgow Coma Scale, NIH Stroke Scale, Canadian CT Head Rule, Tokyo Criteria for Acute Cholecystitis, and an infusion dose converter as test calculators because they are compact, clinically familiar, and have auditable scoring, diagnostic, or conversion models.
