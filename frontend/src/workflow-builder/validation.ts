import type { DraftWorkflow } from '@/workflow-builder/draft'
import { parsePresetAnswers } from '@/workflow-builder/preview'

export type WorkflowBuilderValidationLabels = {
  duplicateSectionIds: string
  duplicateFieldKeys: string
  missingDisplayIfField: string
  duplicateOptionValues: string
  duplicatePresetIds: string
  invalidPresetJson: string
}

// Validation is kept separate from the Vue view so save/export safeguards can
// evolve without turning the builder component into a rules engine.
const findDuplicates = (values: string[]): string[] => {
  const seen = new Set<string>()
  const duplicates = new Set<string>()

  for (const value of values.map((item) => item.trim()).filter(Boolean)) {
    if (seen.has(value)) {
      duplicates.add(value)
    }

    seen.add(value)
  }

  return [...duplicates]
}

export const validateWorkflowDraft = (
  draft: DraftWorkflow,
  labels: WorkflowBuilderValidationLabels,
): string[] => {
  const messages: string[] = []
  const allFieldKeys = draft.sections.flatMap((section) =>
    section.fields.map((field) => field.key).filter(Boolean),
  )
  const duplicateSectionIds = findDuplicates(draft.sections.map((section) => section.id))
  const duplicateFieldKeys = findDuplicates(
    draft.sections.flatMap((section) => section.fields.map((field) => field.key)),
  )

  if (duplicateSectionIds.length > 0) {
    messages.push(`${labels.duplicateSectionIds}: ${duplicateSectionIds.join(', ')}`)
  }

  if (duplicateFieldKeys.length > 0) {
    messages.push(`${labels.duplicateFieldKeys}: ${duplicateFieldKeys.join(', ')}`)
  }

  for (const section of draft.sections) {
    for (const field of section.fields) {
      if (field.displayIf.enabled && !allFieldKeys.includes(field.displayIf.fieldKey)) {
        messages.push(`${labels.missingDisplayIfField} (${field.label || field.key})`)
      }

      if (field.type !== 'select' && field.type !== 'multiselect') {
        continue
      }

      const duplicateOptionValues = findDuplicates(field.options.map((option) => option.value))

      if (duplicateOptionValues.length > 0) {
        messages.push(
          `${labels.duplicateOptionValues} (${field.label || field.key}): ${duplicateOptionValues.join(', ')}`,
        )
      }
    }
  }

  const duplicatePresetIds = findDuplicates(draft.presets.map((preset) => preset.id))

  if (duplicatePresetIds.length > 0) {
    messages.push(`${labels.duplicatePresetIds}: ${duplicatePresetIds.join(', ')}`)
  }

  for (const preset of draft.presets) {
    try {
      parsePresetAnswers(preset)
    } catch {
      messages.push(`${labels.invalidPresetJson} (${preset.title || preset.id})`)
    }
  }

  return messages
}
