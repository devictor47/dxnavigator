import type { Locale } from '@/i18n/locales'
import {
  createDraftClinicalItem,
  createDraftDisplayIf,
  createDraftField,
  createDraftUid,
  fieldTypes,
  type BuilderFieldType,
  type DraftClinicalItem,
  type DraftDisplayIf,
  type DraftField,
  type DraftGuide,
  type DraftPreset,
  type DraftSection,
  type DraftSourceFigure,
  type DraftWorkflow,
} from '@/workflow-builder/draft'
import { isRecord } from '@/workflow-builder/preview'

// Import keeps JSON parsing permissive enough for workflow authoring while
// still normalizing unknown values into the builder's editable draft shape.
export type ImportedWorkflowDraft = {
  draft: DraftWorkflow
  locale: Locale
}

const readWorkflowText = (value: unknown): string => (typeof value === 'string' ? value : '')

const readFieldType = (value: unknown): BuilderFieldType => {
  return fieldTypes.includes(value as BuilderFieldType) ? (value as BuilderFieldType) : 'text'
}

const readStringArray = (value: unknown): string[] => {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : []
}

const joinLines = (value: unknown): string => readStringArray(value).join('\n')

const readJsonObjectText = (value: unknown): string => {
  return isRecord(value) ? JSON.stringify(value, null, 2) : '{}'
}

const readClinicalItems = (value: unknown): DraftClinicalItem[] => {
  return (Array.isArray(value) ? value : [])
    .filter(isRecord)
    .map((item) =>
      createDraftClinicalItem(readWorkflowText(item.title), readWorkflowText(item.description)),
    )
}

const readGuides = (value: unknown): DraftGuide[] => {
  return (Array.isArray(value) ? value : []).filter(isRecord).map((item) => ({
    uid: createDraftUid(),
    title: readWorkflowText(item.title),
    description: readWorkflowText(item.description),
    criteriaText: joinLines(item.criteria),
    actionsText: joinLines(item.actions),
  }))
}

const readSourceFigures = (value: unknown): DraftSourceFigure[] => {
  return (Array.isArray(value) ? value : []).filter(isRecord).map((item) => ({
    uid: createDraftUid(),
    title: readWorkflowText(item.title),
    source: readWorkflowText(item.source),
    sourceUrl: readWorkflowText(item.sourceUrl),
    citation: readWorkflowText(item.citation),
    notes: readWorkflowText(item.notes),
    imageUrl: readWorkflowText(item.imageUrl),
    altText: readWorkflowText(item.altText),
  }))
}

const readPresets = (value: unknown): DraftPreset[] => {
  return (Array.isArray(value) ? value : []).filter(isRecord).map((item) => ({
    uid: createDraftUid(),
    id: readWorkflowText(item.id),
    title: readWorkflowText(item.title),
    description: readWorkflowText(item.description),
    answersJson: readJsonObjectText(item.answers),
  }))
}

const readDisplayIf = (value: unknown): DraftDisplayIf => {
  const displayIf = createDraftDisplayIf()

  if (!isRecord(value)) {
    return displayIf
  }

  displayIf.enabled = true
  displayIf.fieldKey = readWorkflowText(value.fieldKey)

  if (Array.isArray(value.equals)) {
    displayIf.equalsKind = 'stringArray'
    displayIf.equalsArrayText = readStringArray(value.equals).join(', ')
  } else if (typeof value.equals === 'boolean') {
    displayIf.equalsKind = 'boolean'
    displayIf.equalsBoolean = value.equals
  } else if (typeof value.equals === 'string') {
    displayIf.equalsKind = 'string'
    displayIf.equalsString = value.equals
  }

  return displayIf
}

const readField = (fieldValue: Record<string, unknown>): DraftField => {
  const field = createDraftField(
    readWorkflowText(fieldValue.label),
    readFieldType(fieldValue.type),
    typeof fieldValue.key === 'string' ? fieldValue.key : '',
  )
  field.keyWasEdited = true
  field.required = fieldValue.required === true
  field.helperText = readWorkflowText(fieldValue.helperText)
  field.displayIf = readDisplayIf(fieldValue.displayIf)

  if (field.type === 'text') {
    field.placeholder = readWorkflowText(fieldValue.placeholder)
    field.defaultText = typeof fieldValue.defaultValue === 'string' ? fieldValue.defaultValue : ''

    if (isRecord(fieldValue.narrative)) {
      field.narrative.prefix = readWorkflowText(fieldValue.narrative.prefix)
      field.narrative.suffix = readWorkflowText(fieldValue.narrative.suffix)
    }
  }

  if (field.type === 'boolean') {
    field.defaultBoolean = fieldValue.defaultValue === true

    if (isRecord(fieldValue.narrative)) {
      field.narrative.whenTrue = readWorkflowText(fieldValue.narrative.whenTrue)
      field.narrative.whenFalse = readWorkflowText(fieldValue.narrative.whenFalse)
    }
  }

  if (field.type === 'select' || field.type === 'multiselect') {
    field.options = (Array.isArray(fieldValue.options) ? fieldValue.options : [])
      .filter(isRecord)
      .map((optionValue) => ({
        uid: createDraftUid(),
        value: typeof optionValue.value === 'string' ? optionValue.value : '',
        label: readWorkflowText(optionValue.label),
        narrative: readWorkflowText(optionValue.narrative),
        valueWasEdited: true,
      }))

    if (field.type === 'select') {
      field.defaultText = typeof fieldValue.defaultValue === 'string' ? fieldValue.defaultValue : ''
    } else {
      field.defaultMultiselect = readStringArray(fieldValue.defaultValue)
    }
  }

  return field
}

const readSections = (value: unknown): DraftSection[] => {
  return (Array.isArray(value) ? value : []).filter(isRecord).map((sectionValue) => ({
    uid: createDraftUid(),
    id: typeof sectionValue.id === 'string' ? sectionValue.id : '',
    title: readWorkflowText(sectionValue.title),
    description: readWorkflowText(sectionValue.description),
    idWasEdited: true,
    fields: (Array.isArray(sectionValue.fields) ? sectionValue.fields : [])
      .filter(isRecord)
      .map(readField),
  }))
}

export const importWorkflowDraft = (
  workflow: unknown,
  availableLocales: readonly Locale[],
): ImportedWorkflowDraft => {
  if (!isRecord(workflow)) {
    throw new Error('Invalid workflow JSON.')
  }

  if (!availableLocales.includes(workflow.language as Locale)) {
    throw new Error('Invalid workflow language.')
  }

  const locale = workflow.language as Locale

  return {
    locale,
    draft: {
      id: typeof workflow.id === 'string' ? workflow.id : 'imported-workflow',
      title: readWorkflowText(workflow.title),
      slug: readWorkflowText(workflow.slug),
      description: readWorkflowText(workflow.description),
      overview: readWorkflowText(workflow.overview),
      hpiTemplate: readWorkflowText(workflow.hpiTemplate),
      idWasEdited: true,
      sections: readSections(workflow.sections),
      redFlags: readClinicalItems(workflow.redFlags),
      differentials: readClinicalItems(workflow.differentials),
      workup: readClinicalItems(workflow.workup),
      quickGuides: readGuides(workflow.quickGuides),
      sourceFigures: readSourceFigures(workflow.sourceFigures),
      presets: readPresets(workflow.presets),
    },
  }
}
