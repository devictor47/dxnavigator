export type ClinicalItem = {
  title: string
  description?: string
}

export type FieldOption = {
  label: string
  value: string
  narrative?: string
}

export type DisplayCondition = {
  fieldKey: string
  equals: string | boolean | string[]
}

type BaseField = {
  key: string
  label: string
  helperText?: string
  required?: boolean
  displayIf?: DisplayCondition
}

export type TextField = BaseField & {
  type: 'text'
  placeholder?: string
  defaultValue?: string
}

export type BooleanField = BaseField & {
  type: 'boolean'
  defaultValue?: boolean
  trueNarrative?: string
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
  title: string
  description?: string
  fields: ModuleField[]
}

export type ModuleAnswers = Record<string, string | boolean | string[]>

export type ClinicalWorkflow = {
  id: string
  title: string
  overview: string
  sections: ModuleSection[]
  redFlags: ClinicalItem[]
  differentials: ClinicalItem[]
  workup: ClinicalItem[]
  // Temporary: module-specific HPI generator.
  // Later this should be replaced by template-based narrative generation.
  generateHpi: (answers: ModuleAnswers) => string
}

export const getTextAnswer = (answers: ModuleAnswers, key: string): string => {
  const value = answers[key]

  return typeof value === 'string' ? value.trim() : ''
}

export const getBooleanAnswer = (answers: ModuleAnswers, key: string): boolean => answers[key] === true

export const getSelectedNarratives = (field: MultiselectField, answers: ModuleAnswers): string[] => {
  const value = answers[field.key]

  if (!Array.isArray(value)) {
    return []
  }

  return field.options
    .filter((option) => value.includes(option.value))
    .map((option) => option.narrative ?? option.label.toLowerCase())
}

export const joinNarrativeList = (items: string[]): string => {
  if (items.length === 0) {
    return ''
  }

  if (items.length === 1) {
    return items[0]!
  }

  const lastItem = items[items.length - 1]!

  return `${items.slice(0, -1).join(', ')}, and ${lastItem}`
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
