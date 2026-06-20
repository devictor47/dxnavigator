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
