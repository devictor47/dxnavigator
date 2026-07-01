import type { ClinicalWorkflow, ModuleAnswers, ModuleField, WorkflowPreset } from '@/data/workflow'
import type { Locale } from '@/i18n/locales'
import type {
  DraftClinicalItem,
  DraftDisplayIf,
  DraftField,
  DraftGuide,
  DraftPreset,
  DraftSourceFigure,
  DraftWorkflow,
} from '@/workflow-builder/draft'

// Preview conversion is the single bridge from builder draft state to the
// persisted ClinicalWorkflow schema used by rendering, export, and API saves.
export const splitLines = (value: string): string[] =>
  value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)

export const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const isModuleAnswerValue = (value: unknown): value is ModuleAnswers[string] => {
  return (
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    (Array.isArray(value) && value.every((item) => typeof item === 'string'))
  )
}

export const readModuleAnswers = (value: Record<string, unknown>): ModuleAnswers => {
  return Object.fromEntries(
    Object.entries(value).filter((entry): entry is [string, ModuleAnswers[string]] =>
      isModuleAnswerValue(entry[1]),
    ),
  )
}

const createDisplayIfPreview = (displayIf: DraftDisplayIf) => {
  if (!displayIf.enabled || !displayIf.fieldKey.trim()) {
    return undefined
  }

  if (displayIf.equalsKind === 'boolean') {
    return {
      fieldKey: displayIf.fieldKey,
      equals: displayIf.equalsBoolean,
    }
  }

  if (displayIf.equalsKind === 'stringArray') {
    return {
      fieldKey: displayIf.fieldKey,
      equals: splitLines(displayIf.equalsArrayText.replaceAll(',', '\n')),
    }
  }

  return {
    fieldKey: displayIf.fieldKey,
    equals: displayIf.equalsString,
  }
}

const createFieldPreview = (field: DraftField) => ({
  key: field.key,
  label: field.label,
  type: field.type,
  ...(field.required ? { required: true } : {}),
  ...(field.helperText ? { helperText: field.helperText } : {}),
  ...(createDisplayIfPreview(field.displayIf)
    ? { displayIf: createDisplayIfPreview(field.displayIf) }
    : {}),
  ...(field.type === 'text' && field.placeholder ? { placeholder: field.placeholder } : {}),
  ...(field.type === 'text' && field.defaultText ? { defaultValue: field.defaultText } : {}),
  ...(field.type === 'text' && (field.narrative.prefix || field.narrative.suffix)
    ? {
        narrative: {
          ...(field.narrative.prefix ? { prefix: field.narrative.prefix } : {}),
          ...(field.narrative.suffix ? { suffix: field.narrative.suffix } : {}),
        },
      }
    : {}),
  ...(field.type === 'boolean'
    ? {
        defaultValue: field.defaultBoolean,
        ...(field.narrative.whenTrue || field.narrative.whenFalse
          ? {
              narrative: {
                ...(field.narrative.whenTrue ? { whenTrue: field.narrative.whenTrue } : {}),
                ...(field.narrative.whenFalse ? { whenFalse: field.narrative.whenFalse } : {}),
              },
            }
          : {}),
      }
    : {}),
  ...(field.type === 'select'
    ? {
        options: field.options.map((option) => ({
          label: option.label,
          value: option.value,
          ...(option.narrative ? { narrative: option.narrative } : {}),
        })),
        ...(field.defaultText ? { defaultValue: field.defaultText } : {}),
      }
    : {}),
  ...(field.type === 'multiselect'
    ? {
        options: field.options.map((option) => ({
          label: option.label,
          value: option.value,
          ...(option.narrative ? { narrative: option.narrative } : {}),
        })),
        defaultValue: field.defaultMultiselect,
      }
    : {}),
})

const createClinicalItemPreview = (item: DraftClinicalItem) => ({
  title: item.title,
  ...(item.description ? { description: item.description } : {}),
})

const createGuidePreview = (guide: DraftGuide) => ({
  title: guide.title,
  ...(guide.description ? { description: guide.description } : {}),
  ...(splitLines(guide.criteriaText).length > 0
    ? { criteria: splitLines(guide.criteriaText) }
    : {}),
  ...(splitLines(guide.actionsText).length > 0 ? { actions: splitLines(guide.actionsText) } : {}),
})

const createSourceFigurePreview = (figure: DraftSourceFigure) => ({
  title: figure.title,
  source: figure.source,
  ...(figure.sourceUrl ? { sourceUrl: figure.sourceUrl } : {}),
  ...(figure.citation ? { citation: figure.citation } : {}),
  ...(figure.notes ? { notes: figure.notes } : {}),
  ...(figure.imageUrl ? { imageUrl: figure.imageUrl } : {}),
  ...(figure.altText ? { altText: figure.altText } : {}),
})

export const parsePresetAnswers = (preset: DraftPreset): ModuleAnswers => {
  const parsedValue = JSON.parse(preset.answersJson || '{}')

  if (!isRecord(parsedValue)) {
    throw new Error('Preset answers must be a JSON object.')
  }

  return readModuleAnswers(parsedValue)
}

const parsePresetAnswersSafely = (preset: DraftPreset): ModuleAnswers => {
  try {
    return parsePresetAnswers(preset)
  } catch {
    return {}
  }
}

const createPresetPreview = (preset: DraftPreset) => ({
  id: preset.id,
  title: preset.title,
  ...(preset.description ? { description: preset.description } : {}),
  answers: parsePresetAnswersSafely(preset),
}) satisfies WorkflowPreset

export const createWorkflowPreview = (
  draft: DraftWorkflow,
  authoringLocale: Locale,
): ClinicalWorkflow => ({
  id: draft.id,
  language: authoringLocale,
  ...(draft.slug ? { slug: draft.slug } : {}),
  title: draft.title,
  ...(draft.description ? { description: draft.description } : {}),
  overview: draft.overview,
  sections: draft.sections.map((section) => ({
    id: section.id,
    title: section.title,
    ...(section.description ? { description: section.description } : {}),
    fields: section.fields.map(createFieldPreview) as ModuleField[],
  })),
  redFlags: draft.redFlags.map(createClinicalItemPreview),
  differentials: draft.differentials.map(createClinicalItemPreview),
  workup: draft.workup.map(createClinicalItemPreview),
  ...(draft.quickGuides.length > 0
    ? { quickGuides: draft.quickGuides.map(createGuidePreview) }
    : {}),
  ...(draft.sourceFigures.length > 0
    ? { sourceFigures: draft.sourceFigures.map(createSourceFigurePreview) }
    : {}),
  ...(draft.presets.length > 0 ? { presets: draft.presets.map(createPresetPreview) } : {}),
  hpiTemplate: draft.hpiTemplate,
})
