import type { DraftWorkflow } from '@/workflow-builder/draft'

export type TemplateFieldToken = {
  key: string
  label: string
  token: string
}

// Selectors derive read-only UI data from the builder draft. Keeping them pure
// makes sidebar chips, conditional fields, and future tests share one meaning.
export const getAllFieldKeys = (draft: DraftWorkflow): string[] =>
  draft.sections.flatMap((section) => section.fields.map((field) => field.key).filter(Boolean))

export const getTemplateFieldTokens = (draft: DraftWorkflow): TemplateFieldToken[] =>
  draft.sections.flatMap((section) =>
    section.fields.map((field) => ({
      key: field.key,
      label: field.label || field.key,
      token:
        field.type === 'multiselect' ? `{{ ${field.key} | list: locale }}` : `{{ ${field.key} }}`,
    })),
  )
