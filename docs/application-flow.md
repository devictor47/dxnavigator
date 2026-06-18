# DxNavigator Application Flow

This document describes the current frontend application flow and the main files involved in rendering clinical workflows.

DxNavigator is currently a Vue 3 application built around separate clinical evaluation workflows. Each workflow defines its own structured fields, red flags, differential diagnoses, suggested workup, and temporary HPI generation logic.

The current implementation is intentionally simple. Workflow definitions are TypeScript objects, not a database schema or external JSON schema. This keeps the product flexible while the clinical model is still evolving.

## High-Level Flow

```text
URL route
  -> workflow id
  -> workflow registry lookup
  -> selected ClinicalWorkflow
  -> initial reactive answers
  -> dynamic form rendering
  -> generated HPI preview
  -> guidance cards
```

The main route is:

```text
/private/complaints/:moduleId
```

Examples:

- `/private/complaints/chest-pain`
- `/private/complaints/uti`
- `/private/complaints/gastroenterocolitis`
- `/private/complaints/migraine`

## Entry Points

### Vue App Bootstrap

File: [frontend/src/main.ts](../frontend/src/main.ts)

This file creates the Vue app, installs Pinia and the router, imports global CSS, and mounts the app.

### App Shell

File: [frontend/src/App.vue](../frontend/src/App.vue)

This is intentionally minimal. It renders the active route through `RouterView`.

### Router

File: [frontend/src/router/index.ts](../frontend/src/router/index.ts)

The router defines:

- `/` for the public landing page
- `/private` redirecting to Chest Pain
- `/private/complaints/:moduleId` for dynamic workflow rendering

The `moduleId` route parameter is used to select the active clinical workflow.

## Public Flow

### Landing Page

File: [frontend/src/views/public/LandingView.vue](../frontend/src/views/public/LandingView.vue)

The landing page is public-facing. It introduces DxNavigator, shows a preview of the product concept, and links into the clinical workspace.

It also includes:

- theme toggle
- language toggle
- navigation to the private workflow area

## Private Workflow Flow

### Main Workspace

File: [frontend/src/views/private/ComplaintView.vue](../frontend/src/views/private/ComplaintView.vue)

This is the central screen of the current application.

Responsibilities:

- reads the active `moduleId` from the route
- looks up the matching workflow
- creates initial reactive answers for that workflow
- resets answers when the selected workflow changes
- renders the workflow selector
- renders the generated HPI preview
- renders the dynamic clinical form
- renders red flags, differential diagnoses, and workup cards

Important current behavior:

- invalid workflow IDs fall back to the default workflow
- the default workflow is Chest Pain
- workflow switching happens through the sidebar selector

## Workflow Registry

### Registered Workflows

File: [frontend/src/data/modules.ts](../frontend/src/data/modules.ts)

This file imports all available clinical workflows and exposes them as `clinicalModules`.

Current workflows:

- [Chest Pain](../frontend/src/data/chestPain.ts)
- [UTI](../frontend/src/data/uti.ts)
- [Gastroenterocolitis (GECA)](../frontend/src/data/gastroenterocolitis.ts)
- [Migraine (Enxaqueca)](../frontend/src/data/migraine.ts)

It also exposes:

- `defaultClinicalWorkflow`
- `getClinicalModuleById`

`getClinicalModuleById` always returns a workflow. If the route contains an unknown ID, it returns `defaultClinicalWorkflow`.

## Workflow Scaffold

### Core Workflow Types

File: [frontend/src/data/workflow.ts](../frontend/src/data/workflow.ts)

This is the shared scaffold for all clinical workflows.

The main exported type is `ClinicalWorkflow`.

A workflow currently has:

- `id`
- `title`
- `overview`
- `sections`
- `redFlags`
- `differentials`
- `workup`
- `generateHpi`

### Sections

A workflow contains `sections`.

Each section has:

- `id`
- `title`
- optional `description`
- `fields`

Sections are rendered by the dynamic form renderer.

### Fields

Supported field types:

- `text`
- `boolean`
- `select`
- `multiselect`

Shared field properties include:

- `key`
- `label`
- optional `helperText`
- optional `required`
- optional `displayIf`

### Conditional Display

Fields can define:

```ts
displayIf?: {
  fieldKey: string
  equals: string | boolean | string[]
}
```

This is evaluated by `isFieldVisible`.

File: [frontend/src/data/workflow.ts](../frontend/src/data/workflow.ts)

The form renderer uses this helper to show or hide fields based on current answers.

### Initial Answers

File: [frontend/src/data/workflow.ts](../frontend/src/data/workflow.ts)

The helper `createInitialAnswers` creates the default answer object for a workflow.

Defaults:

- `multiselect` fields become `[]`
- `boolean` fields become `false`
- `text` and `select` fields become `''`

### Narrative Helpers

File: [frontend/src/data/workflow.ts](../frontend/src/data/workflow.ts)

Current helpers:

- `getTextAnswer`
- `getBooleanAnswer`
- `getSelectedNarratives`
- `joinNarrativeList`

These exist to reduce repeated low-level answer parsing inside workflow-specific HPI generation.

## Workflow Definitions

### Chest Pain

File: [frontend/src/data/chestPain.ts](../frontend/src/data/chestPain.ts)

Defines:

- pain characteristics
- triggers and relief
- associated symptoms
- red flags
- differentials
- workup
- grouped HPI generation

Chest Pain currently has the most refined HPI output. It groups the narrative into multiple sentences instead of one long comma-heavy sentence.

Example structure:

```text
Patient presents with retrosternal pressure beginning 2 hours ago.
Pain radiates to the left arm, is triggered by exertion, and is relieved by rest.
Associated symptoms include dyspnea.
```

### UTI

File: [frontend/src/data/uti.ts](../frontend/src/data/uti.ts)

Defines:

- urinary symptoms
- upper tract and systemic symptoms
- risk context
- red flags
- differentials
- workup
- HPI generation

### Gastroenterocolitis (GECA)

File: [frontend/src/data/gastroenterocolitis.ts](../frontend/src/data/gastroenterocolitis.ts)

Defines:

- GI symptoms
- stool features
- hydration and severity markers
- exposure context
- red flags
- differentials
- workup
- HPI generation

### Migraine (Enxaqueca)

File: [frontend/src/data/migraine.ts](../frontend/src/data/migraine.ts)

Defines:

- headache pattern
- headache features
- associated symptoms
- red flag screen
- triggers
- red flags
- differentials
- workup
- HPI generation

## Dynamic Rendering

### Dynamic Clinical Form

File: [frontend/src/components/DynamicClinicalForm.vue](../frontend/src/components/DynamicClinicalForm.vue)

This component renders form controls from workflow metadata.

It supports:

- text input
- checkbox for boolean fields
- checkbox groups for multiselect fields
- select dropdowns
- conditional field display through `displayIf`

It receives:

- `module: ClinicalWorkflow`
- `answers: ModuleAnswers`

The `answers` object is reactive and owned by `ComplaintView.vue`.

### HPI Preview

File: [frontend/src/components/HpiPreview.vue](../frontend/src/components/HpiPreview.vue)

This component displays the generated HPI.

It includes:

- generated narrative text
- copy-to-clipboard button
- sticky/pinned toggle
- vertically resizable preview card

The actual HPI text is generated by the active workflow's `generateHpi` function.

### Workflow Selector

File: [frontend/src/components/ComplaintSelector.vue](../frontend/src/components/ComplaintSelector.vue)

This component renders links to all registered workflows.

Despite the component name, it now selects workflows, not only complaints. Renaming it later to something like `WorkflowSelector.vue` would improve consistency.

### Guidance Cards

Shared card renderer:

- [frontend/src/components/ClinicalSection.vue](../frontend/src/components/ClinicalSection.vue)

Thin wrappers:

- [frontend/src/components/RedFlagList.vue](../frontend/src/components/RedFlagList.vue)
- [frontend/src/components/DifferentialList.vue](../frontend/src/components/DifferentialList.vue)
- [frontend/src/components/WorkupList.vue](../frontend/src/components/WorkupList.vue)

These render the static consultation guidance below the dynamic form:

- red flags
- differential diagnoses
- suggested workup

### Legacy Component

File: [frontend/src/components/QuestionList.vue](../frontend/src/components/QuestionList.vue)

This is a leftover from the earlier static-card MVP. It is currently unused and can likely be removed during cleanup.

## Preferences

### Theme

File: [frontend/src/composables/useTheme.ts](../frontend/src/composables/useTheme.ts)

Supports:

- light theme
- dark theme
- localStorage persistence
- system dark-mode default

Theme colors are implemented as CSS variables.

### Internationalization

File: [frontend/src/composables/useI18n.ts](../frontend/src/composables/useI18n.ts)

Supports:

- English
- Brazilian Portuguese
- localStorage persistence
- `<html lang>` updates

Current limitation:

- UI chrome is translated
- clinical workflow content is still authored directly in English

### Preferences UI

File: [frontend/src/components/AppPreferences.vue](../frontend/src/components/AppPreferences.vue)

Renders:

- language toggle
- theme toggle

Used in:

- public landing page
- private workspace sidebar

## Styling

File: [frontend/src/assets/main.css](../frontend/src/assets/main.css)

Contains:

- global CSS reset basics
- light/dark theme tokens
- landing page layout
- workspace layout
- form styling
- HPI preview styling
- guidance card styling
- responsive behavior

## Important Design Risks

### HPI Generation

Current workflow definitions each implement `generateHpi`.

This is acceptable for the current prototype, but it is the main architectural risk.

If every workflow grows a large hand-coded HPI function, the system will become hard to maintain.

Preferred future direction:

```text
Workflow fields
  -> narrative fragments
  -> template rules
  -> generated HPI
```

The current comment in `ClinicalWorkflow` reflects this:

```ts
// Temporary: module-specific HPI generator.
// Later this should be replaced by template-based narrative generation.
generateHpi: (answers: ModuleAnswers) => string
```

### Workflow Schema

The project should not jump to a comprehensive JSON Schema yet.

The current TypeScript workflow model should keep evolving through real examples:

- Chest Pain
- UTI
- GECA
- Migraine
- future Dyspnea, Syncope, Abdominal Pain, etc.

Only after multiple workflows feel stable should the app formalize a durable schema or database representation.

### Component Naming

`ComplaintSelector.vue` still works, but the product has shifted from static complaints to reusable clinical workflows.

Possible future rename:

```text
ComplaintSelector.vue -> WorkflowSelector.vue
```

## When To Use a Documentation Platform

For now, Markdown inside the repo is the right choice.

Reasons:

- documentation stays versioned with code
- links can point directly to source files
- easy to update during rapid iteration
- no extra tooling or hosting

A documentation platform such as Docusaurus, VitePress, or MkDocs may become useful later when:

- there are multiple audiences
- docs need navigation/search
- screenshots and diagrams become important
- the backend/API is introduced
- deployment or contributor docs become larger

For the current stage, repo Markdown is enough.
