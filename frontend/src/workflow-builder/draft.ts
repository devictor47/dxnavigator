import type { ModuleField } from '@/data/workflow'

export type BuilderFieldType = ModuleField['type']
export type DisplayEqualsKind = 'string' | 'boolean' | 'stringArray'
export type BuilderMode = 'edit' | 'preview' | 'json'

export type DraftClinicalItem = {
  uid: string
  title: string
  description: string
}

export type DraftGuide = {
  uid: string
  title: string
  description: string
  criteriaText: string
  actionsText: string
}

export type DraftSourceFigure = {
  uid: string
  title: string
  source: string
  sourceUrl: string
  citation: string
  notes: string
  imageUrl: string
  altText: string
}

export type DraftPreset = {
  uid: string
  id: string
  title: string
  description: string
  answersJson: string
}

export type DraftDisplayIf = {
  enabled: boolean
  fieldKey: string
  equalsKind: DisplayEqualsKind
  equalsString: string
  equalsBoolean: boolean
  equalsArrayText: string
}

export type DraftOption = {
  uid: string
  value: string
  label: string
  narrative: string
  valueWasEdited: boolean
}

export type DraftNarrative = {
  prefix: string
  suffix: string
  whenTrue: string
  whenFalse: string
}

export type DraftField = {
  uid: string
  key: string
  label: string
  type: BuilderFieldType
  required: boolean
  helperText: string
  placeholder: string
  defaultBoolean: boolean
  defaultText: string
  defaultMultiselect: string[]
  displayIf: DraftDisplayIf
  narrative: DraftNarrative
  options: DraftOption[]
  keyWasEdited: boolean
}

export type DraftSection = {
  uid: string
  id: string
  title: string
  description: string
  idWasEdited: boolean
  fields: DraftField[]
}

export type DraftWorkflow = {
  id: string
  title: string
  slug: string
  description: string
  overview: string
  hpiTemplate: string
  idWasEdited: boolean
  sections: DraftSection[]
  redFlags: DraftClinicalItem[]
  differentials: DraftClinicalItem[]
  workup: DraftClinicalItem[]
  quickGuides: DraftGuide[]
  sourceFigures: DraftSourceFigure[]
  presets: DraftPreset[]
}

export const fieldTypes: BuilderFieldType[] = ['text', 'boolean', 'select', 'multiselect']

let nextDraftUid = 1

export const createDraftUid = (): string => {
  const uid = `draft-${nextDraftUid}`
  nextDraftUid += 1

  return uid
}

export const stripAccents = (value: string): string => {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export const slugify = (value: string): string => {
  return stripAccents(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export const camelize = (value: string): string => {
  const slug = slugify(value)

  return slug.replace(/-([a-z0-9])/g, (_, character: string) => character.toUpperCase())
}

export const createDraftOption = (label = ''): DraftOption => ({
  uid: createDraftUid(),
  value: slugify(label),
  label,
  narrative: label.toLowerCase(),
  valueWasEdited: false,
})

export const createDraftDisplayIf = (): DraftDisplayIf => ({
  enabled: false,
  fieldKey: '',
  equalsKind: 'boolean',
  equalsString: '',
  equalsBoolean: true,
  equalsArrayText: '',
})

export const createDraftField = (
  label = '',
  type: BuilderFieldType = 'text',
  key = camelize(label),
): DraftField => ({
  uid: createDraftUid(),
  key,
  label,
  type,
  required: false,
  helperText: '',
  placeholder: '',
  defaultBoolean: false,
  defaultText: '',
  defaultMultiselect: [],
  displayIf: createDraftDisplayIf(),
  narrative: {
    prefix: '',
    suffix: '',
    whenTrue: '',
    whenFalse: '',
  },
  options: [],
  keyWasEdited: false,
})

export const createDraftClinicalItem = (title = '', description = ''): DraftClinicalItem => ({
  uid: createDraftUid(),
  title,
  description,
})

export const createDraftGuide = (): DraftGuide => ({
  uid: createDraftUid(),
  title: '',
  description: '',
  criteriaText: '',
  actionsText: '',
})

export const createDraftSourceFigure = (): DraftSourceFigure => ({
  uid: createDraftUid(),
  title: '',
  source: '',
  sourceUrl: '',
  citation: '',
  notes: '',
  imageUrl: '',
  altText: '',
})

export const createDraftPreset = (): DraftPreset => ({
  uid: createDraftUid(),
  id: '',
  title: '',
  description: '',
  answersJson: '{}',
})

export const createEmptyDraftWorkflow = (): DraftWorkflow => ({
  id: '',
  title: '',
  slug: '',
  description: '',
  overview: '',
  hpiTemplate: '',
  idWasEdited: false,
  sections: [],
  redFlags: [],
  differentials: [],
  workup: [],
  quickGuides: [],
  sourceFigures: [],
  presets: [],
})
