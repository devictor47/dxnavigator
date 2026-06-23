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
- SameSite configured deliberately for the frontend/backend deployment shape.
- HTTPS for all public traffic.
- Direct HTTP requests should redirect to HTTPS instead of being served.
- Forwarded headers support when running behind Caddy or another reverse proxy, so internal proxy-to-app HTTP can be treated as HTTPS only when the original request used HTTPS.

Google will be the first external login provider. External login secrets must not be committed to the repository. They should come from local user secrets or environment variables.

### Rules

- Do not implement custom password hashing.
- Do not store authentication tokens in browser local storage.
- Do not require email confirmation for login in the initial version.
- Do require unique email addresses.
- Use email as the username for local accounts.
- Local accounts may have a password.
- External accounts may exist without a local password.
- A Google login with an email matching an existing user should link to that user when safe.
- A Google login with no matching user should create a user from the provider email and display name when available.
- Google-provided email may be treated as provider-verified, but this does not introduce a required app-level email verification flow.
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

`DATABASE_ENSURE_CREATED=true` remains available during the early stage so a fresh PostgreSQL volume can boot without migrations. This should be replaced by EF Core migrations before treating the deployment as real production.
