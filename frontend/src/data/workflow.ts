import { Liquid } from 'liquidjs'

import { defaultLocale, resolveText, type Locale, type TranslatableText } from '@/i18n/locales'

export type ClinicalItem = {
  title: TranslatableText
  description?: TranslatableText
}

export type ClinicalGuide = {
  title: TranslatableText
  description?: TranslatableText
  criteria?: TranslatableText[]
  actions?: TranslatableText[]
}

export type SourceFigure = {
  title: TranslatableText
  source: TranslatableText
  citation?: TranslatableText
  notes?: TranslatableText
  imageUrl?: string
  altText?: TranslatableText
}

export type WorkflowPreset = {
  id: string
  title: TranslatableText
  description?: TranslatableText
  answers: ModuleAnswers
}

export type FieldOption = {
  label: TranslatableText
  value: string
  narrative?: TranslatableText
}

export type TextNarrative = {
  prefix?: TranslatableText
  suffix?: TranslatableText
}

export type BooleanNarrative = {
  whenTrue?: TranslatableText
  whenFalse?: TranslatableText
}

export type DisplayCondition = {
  fieldKey: string
  equals: string | boolean | string[]
}

type BaseField = {
  key: string
  label: TranslatableText
  helperText?: TranslatableText
  required?: boolean
  displayIf?: DisplayCondition
}

export type TextField = BaseField & {
  type: 'text'
  placeholder?: TranslatableText
  defaultValue?: string
  narrative?: TextNarrative
}

export type BooleanField = BaseField & {
  type: 'boolean'
  defaultValue?: boolean
  narrative?: BooleanNarrative
}

export type SelectField = BaseField & {
  type: 'select'
  options: FieldOption[]
  defaultValue?: string
}

export type MultiselectField = BaseField & {
  type: 'multiselect'
  options: FieldOption[]
  defaultValue?: string[]
}

export type ModuleField = TextField | BooleanField | SelectField | MultiselectField

export type ModuleSection = {
  id: string
  title: TranslatableText
  description?: TranslatableText
  fields: ModuleField[]
}

export type ModuleAnswers = Record<string, string | boolean | string[]>
export type ModuleAnswerValue = ModuleAnswers[string]

export type ClinicalWorkflow = {
  id: string
  title: TranslatableText
  overview: TranslatableText
  sections: ModuleSection[]
  redFlags: ClinicalItem[]
  differentials: ClinicalItem[]
  workup: ClinicalItem[]
  quickGuides?: ClinicalGuide[]
  sourceFigures?: SourceFigure[]
  presets?: WorkflowPreset[]
  hpiTemplate?: TranslatableText
  // Temporary: module-specific HPI generator.
  // Later this should be replaced by template-based narrative generation.
  generateHpi?: (answers: ModuleAnswers) => string
}

export type WorkflowSubmission = {
  workflowId: string
  answers: ModuleAnswers
}

export type WorkflowSession = {
  workflow: ClinicalWorkflow
  answers: ModuleAnswers
  setAnswer: (fieldKey: string, value: ModuleAnswerValue) => void
  getAnswer: (fieldKey: string) => ModuleAnswerValue | undefined
  generateHpi: (locale?: Locale) => string
  toJson: () => WorkflowSubmission
}

export const getTextAnswer = (answers: ModuleAnswers, key: string): string => {
  const value = answers[key]

  return typeof value === 'string' ? value.trim() : ''
}

export const getBooleanAnswer = (answers: ModuleAnswers, key: string): boolean => answers[key] === true

export const getTextNarrative = (
  field: TextField,
  answers: ModuleAnswers,
  locale: Locale = defaultLocale,
): string => {
  const value = getTextAnswer(answers, field.key)

  if (!value) {
    return ''
  }

  return [
    field.narrative?.prefix ? resolveText(field.narrative.prefix, locale) : undefined,
    value,
    field.narrative?.suffix ? resolveText(field.narrative.suffix, locale) : undefined,
  ]
    .filter(Boolean)
    .join(' ')
}

export const getBooleanNarrative = (
  field: BooleanField,
  answers: ModuleAnswers,
  locale: Locale = defaultLocale,
): string => {
  const value = answers[field.key]

  if (value === true) {
    return field.narrative?.whenTrue
      ? resolveText(field.narrative.whenTrue, locale)
      : resolveText(field.label, locale).toLowerCase()
  }

  if (value === false) {
    return field.narrative?.whenFalse ? resolveText(field.narrative.whenFalse, locale) : ''
  }

  return ''
}

export const getSelectNarrative = (
  field: SelectField,
  answers: ModuleAnswers,
  locale: Locale = defaultLocale,
): string => {
  const value = answers[field.key]

  if (typeof value !== 'string') {
    return ''
  }

  const selectedOption = field.options.find((option) => option.value === value)

  if (!selectedOption) {
    return ''
  }

  return selectedOption.narrative
    ? resolveText(selectedOption.narrative, locale)
    : resolveText(selectedOption.label, locale).toLowerCase()
}

export const getSelectedNarratives = (
  field: MultiselectField,
  answers: ModuleAnswers,
  locale: Locale = defaultLocale,
): string[] => {
  const value = answers[field.key]

  if (!Array.isArray(value)) {
    return []
  }

  return field.options
    .filter((option) => value.includes(option.value))
    .map((option) =>
      option.narrative
        ? resolveText(option.narrative, locale)
        : resolveText(option.label, locale).toLowerCase(),
    )
}

export const getFieldNarrative = (
  field: ModuleField,
  answers: ModuleAnswers,
  locale: Locale = defaultLocale,
): string | string[] => {
  if (field.type === 'text') {
    return getTextNarrative(field, answers, locale)
  }

  if (field.type === 'boolean') {
    return getBooleanNarrative(field, answers, locale)
  }

  if (field.type === 'select') {
    return getSelectNarrative(field, answers, locale)
  }

  return getSelectedNarratives(field, answers, locale)
}

export type NarrativeContext = Record<string, string | string[] | null>

const liquid = new Liquid()

liquid.registerFilter('list', (value: unknown, locale: Locale = defaultLocale) => {
  if (!Array.isArray(value)) {
    return typeof value === 'string' ? value : ''
  }

  return joinNarrativeList(
    value.filter((item): item is string => typeof item === 'string'),
    locale,
  )
})

liquid.registerFilter('compact_append', (value: unknown, nextValue: unknown) => {
  const values = Array.isArray(value) ? value : [value]

  const compactValues = [...values, nextValue].filter((item): item is string => {
    return typeof item === 'string' && item.trim().length > 0
  })

  return compactValues.length > 0 ? compactValues : null
})

const cleanRenderedText = (text: string): string =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join(' ')

export const createNarrativeContext = (
  workflow: ClinicalWorkflow,
  answers: ModuleAnswers,
  locale: Locale,
): NarrativeContext => {
  const context: NarrativeContext = {}

  for (const section of workflow.sections) {
    for (const field of section.fields) {
      const narrativeValue = getFieldNarrative(field, answers, locale)

      if (Array.isArray(narrativeValue)) {
        context[field.key] = narrativeValue.length > 0 ? narrativeValue : null
      } else {
        context[field.key] = narrativeValue || null
      }
    }
  }

  context.locale = locale

  return context
}

export const renderWorkflowHpi = (
  workflow: ClinicalWorkflow,
  answers: ModuleAnswers,
  locale: Locale = defaultLocale,
): string => {
  if (workflow.hpiTemplate) {
    return cleanRenderedText(
      liquid.parseAndRenderSync(
        resolveText(workflow.hpiTemplate, locale),
        createNarrativeContext(workflow, answers, locale),
      ),
    )
  }

  return workflow.generateHpi?.(answers) ?? ''
}

export const joinNarrativeList = (items: string[], locale: Locale = defaultLocale): string => {
  if (items.length === 0) {
    return ''
  }

  if (items.length === 1) {
    return items[0]!
  }

  const lastItem = items[items.length - 1]!
  const connector = locale === 'pt-BR' ? 'e' : 'and'

  if (items.length === 2) {
    return `${items[0]} ${connector} ${lastItem}`
  }

  return `${items.slice(0, -1).join(', ')}, ${connector} ${lastItem}`
}

export const isFieldVisible = (field: ModuleField, answers: ModuleAnswers): boolean => {
  if (!field.displayIf) {
    return true
  }

  const actualValue = answers[field.displayIf.fieldKey]
  const expectedValue = field.displayIf.equals

  if (Array.isArray(expectedValue)) {
    return (
      Array.isArray(actualValue) &&
      expectedValue.every((expectedItem) => actualValue.includes(expectedItem))
    )
  }

  if (Array.isArray(actualValue)) {
    return actualValue.includes(String(expectedValue))
  }

  return actualValue === expectedValue
}

export const createInitialAnswers = (module: ClinicalWorkflow): ModuleAnswers => {
  const answers: ModuleAnswers = {}

  for (const section of module.sections) {
    for (const field of section.fields) {
      if (field.type === 'multiselect') {
        answers[field.key] = field.defaultValue ?? []
      } else if (field.type === 'boolean') {
        answers[field.key] = field.defaultValue ?? false
      } else {
        answers[field.key] = field.defaultValue ?? ''
      }
    }
  }

  return answers
}

export const createWorkflowSession = (workflow: ClinicalWorkflow): WorkflowSession => ({
  workflow,
  answers: createInitialAnswers(workflow),

  setAnswer(fieldKey, value) {
    this.answers[fieldKey] = value
  },

  getAnswer(fieldKey) {
    return this.answers[fieldKey]
  },

  generateHpi(locale = defaultLocale) {
    return renderWorkflowHpi(this.workflow, this.answers, locale)
  },

  toJson() {
    return {
      workflowId: this.workflow.id,
      answers: this.answers,
    }
  },
})
