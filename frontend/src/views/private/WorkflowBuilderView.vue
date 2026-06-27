<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import ClinicalGuidanceLibrary from '@/components/ClinicalGuidanceLibrary.vue'
import DifferentialList from '@/components/DifferentialList.vue'
import DynamicClinicalForm from '@/components/DynamicClinicalForm.vue'
import FieldHint from '@/components/FieldHint.vue'
import HpiPreview from '@/components/HpiPreview.vue'
import PrivateWorkspaceShell from '@/components/PrivateWorkspaceShell.vue'
import RedFlagList from '@/components/RedFlagList.vue'
import WorkupList from '@/components/WorkupList.vue'
import { fetchUserWorkflow, saveUserWorkflow } from '@/api/userWorkflows'
import { useI18n } from '@/composables/useI18n'
import { useNotifications } from '@/composables/useNotifications'
import {
  createWorkflowSession,
  type ClinicalWorkflow,
  type ModuleAnswers,
  type ModuleField,
  type WorkflowPreset,
  type WorkflowSession,
} from '@/data/workflow'
import { locales, type Locale } from '@/i18n/locales'

type BuilderFieldType = ModuleField['type']
type DisplayEqualsKind = 'string' | 'boolean' | 'stringArray'
type BuilderMode = 'edit' | 'preview' | 'json'

type DraftClinicalItem = {
  uid: string
  title: string
  description: string
}

type DraftGuide = {
  uid: string
  title: string
  description: string
  criteriaText: string
  actionsText: string
}

type DraftSourceFigure = {
  uid: string
  title: string
  source: string
  sourceUrl: string
  citation: string
  notes: string
  imageUrl: string
  altText: string
}

type DraftPreset = {
  uid: string
  id: string
  title: string
  description: string
  answersJson: string
}

type DraftDisplayIf = {
  enabled: boolean
  fieldKey: string
  equalsKind: DisplayEqualsKind
  equalsString: string
  equalsBoolean: boolean
  equalsArrayText: string
}

type DraftOption = {
  uid: string
  value: string
  label: string
  narrative: string
  valueWasEdited: boolean
}

type DraftNarrative = {
  prefix: string
  suffix: string
  whenTrue: string
  whenFalse: string
}

type DraftField = {
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

type DraftSection = {
  uid: string
  id: string
  title: string
  description: string
  idWasEdited: boolean
  fields: DraftField[]
}

type DraftWorkflow = {
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

const { locale: appLocale, t } = useI18n()
const { notify } = useNotifications()
const route = useRoute()
const authoringLocale = ref<Locale>(appLocale.value)
const availableLocales = Object.keys(locales) as Locale[]

const draft = reactive<DraftWorkflow>({
  id: 'new-workflow',
  title: 'New clinical workflow',
  slug: 'new-clinical-workflow',
  description: '',
  overview: 'Describe the clinical context and what this workflow helps collect.',
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

const newSectionTitle = reactive({
  value: '',
})

const newFieldBySection = reactive<Record<string, DraftField>>({})
const expandedFieldUid = ref<string | null>(null)
const importFileInput = ref<HTMLInputElement | null>(null)
const hpiTemplateInput = ref<HTMLTextAreaElement | null>(null)
const importError = ref('')
const activeBuilderMode = ref<BuilderMode>('edit')
const isSavingWorkflow = ref(false)
const savedWorkflowId = ref<number | null>(null)

const fieldTypes: BuilderFieldType[] = ['text', 'boolean', 'select', 'multiselect']
let nextDraftUid = 1

const fieldTypeLabel = (fieldType: BuilderFieldType): string => {
  const labels: Record<BuilderFieldType, string> = {
    text: t('builder.fieldTypeText'),
    boolean: t('builder.fieldTypeBoolean'),
    select: t('builder.fieldTypeSelect'),
    multiselect: t('builder.fieldTypeMultiselect'),
  }

  return labels[fieldType]
}

const createDraftUid = (): string => {
  const uid = `draft-${nextDraftUid}`
  nextDraftUid += 1

  return uid
}

const stripAccents = (value: string): string => {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

const slugify = (value: string): string => {
  return stripAccents(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const camelize = (value: string): string => {
  const slug = slugify(value)

  return slug.replace(/-([a-z0-9])/g, (_, character: string) => character.toUpperCase())
}

const createDraftOption = (label = ''): DraftOption => ({
  uid: createDraftUid(),
  value: slugify(label),
  label,
  narrative: label.toLowerCase(),
  valueWasEdited: false,
})

const createDraftDisplayIf = (): DraftDisplayIf => ({
  enabled: false,
  fieldKey: '',
  equalsKind: 'boolean',
  equalsString: '',
  equalsBoolean: true,
  equalsArrayText: '',
})

const createDraftField = (
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

const createDraftClinicalItem = (title = '', description = ''): DraftClinicalItem => ({
  uid: createDraftUid(),
  title,
  description,
})

const createDraftGuide = (): DraftGuide => ({
  uid: createDraftUid(),
  title: '',
  description: '',
  criteriaText: '',
  actionsText: '',
})

const createDraftSourceFigure = (): DraftSourceFigure => ({
  uid: createDraftUid(),
  title: '',
  source: '',
  sourceUrl: '',
  citation: '',
  notes: '',
  imageUrl: '',
  altText: '',
})

const createDraftPreset = (): DraftPreset => ({
  uid: createDraftUid(),
  id: '',
  title: '',
  description: '',
  answersJson: '{}',
})

const getNewField = (sectionId: string): DraftField => {
  newFieldBySection[sectionId] ??= createDraftField()

  return newFieldBySection[sectionId]
}

const updateWorkflowTitle = (event: Event): void => {
  const title = (event.target as HTMLInputElement).value
  draft.title = title
  draft.slug = slugify(title)

  if (!draft.idWasEdited) {
    draft.id = slugify(title)
  }
}

const updateWorkflowId = (event: Event): void => {
  draft.id = (event.target as HTMLInputElement).value
  draft.idWasEdited = true
}

const updateSectionTitle = (section: DraftSection, event: Event): void => {
  const title = (event.target as HTMLInputElement).value
  section.title = title

  if (!section.idWasEdited) {
    section.id = slugify(title)
  }
}

const updateSectionId = (section: DraftSection, event: Event): void => {
  section.id = (event.target as HTMLInputElement).value
  section.idWasEdited = true
}

const updateFieldLabel = (field: DraftField, event: Event): void => {
  const label = (event.target as HTMLInputElement).value
  field.label = label

  if (!field.keyWasEdited) {
    field.key = camelize(label)
  }
}

const updateFieldKey = (field: DraftField, event: Event): void => {
  field.key = (event.target as HTMLInputElement).value
  field.keyWasEdited = true
}

const updateOptionLabel = (option: DraftOption, event: Event): void => {
  const label = (event.target as HTMLInputElement).value
  option.label = label

  if (!option.valueWasEdited) {
    option.value = slugify(label)
  }
}

const updateOptionValue = (option: DraftOption, event: Event): void => {
  option.value = (event.target as HTMLInputElement).value
  option.valueWasEdited = true
}

const addSection = (): void => {
  const title = newSectionTitle.value.trim()

  if (!title) {
    notify({
      type: 'warn',
      title: t('notifications.missingSectionTitleTitle'),
      message: t('notifications.missingSectionTitleMessage'),
    })
    return
  }

  draft.sections.push({
    uid: createDraftUid(),
    id: slugify(title) || `section-${draft.sections.length + 1}`,
    title,
    description: '',
    idWasEdited: false,
    fields: [],
  })

  newSectionTitle.value = ''
}

const addField = (section: DraftSection): void => {
  const newField = getNewField(section.uid)
  const label = newField.label.trim()

  if (!label) {
    notify({
      type: 'warn',
      title: t('notifications.missingFieldLabelTitle'),
      message: t('notifications.missingFieldLabelMessage'),
    })
    return
  }

  const field = createDraftField(label, newField.type, newField.key.trim() || camelize(label))
  field.keyWasEdited = newField.keyWasEdited
  section.fields.push(field)
  expandedFieldUid.value = field.uid

  newField.key = ''
  newField.label = ''
  newField.type = 'text'
  newField.keyWasEdited = false
}

const removeSection = (section: DraftSection): void => {
  draft.sections = draft.sections.filter((currentSection) => currentSection.uid !== section.uid)
  delete newFieldBySection[section.uid]
}

const removeField = (section: DraftSection, field: DraftField): void => {
  section.fields = section.fields.filter((currentField) => currentField.uid !== field.uid)

  if (expandedFieldUid.value === field.uid) {
    expandedFieldUid.value = null
  }
}

const toggleFieldConfiguration = (field: DraftField): void => {
  expandedFieldUid.value = expandedFieldUid.value === field.uid ? null : field.uid
}

const addOption = (field: DraftField): void => {
  field.options.push(createDraftOption())
}

const removeOption = (field: DraftField, option: DraftOption): void => {
  field.options = field.options.filter((currentOption) => currentOption.uid !== option.uid)
  field.defaultMultiselect = field.defaultMultiselect.filter((value) => value !== option.value)

  if (field.defaultText === option.value) {
    field.defaultText = ''
  }
}

const addClinicalItem = (items: DraftClinicalItem[]): void => {
  items.push(createDraftClinicalItem())
}

const removeClinicalItem = (items: DraftClinicalItem[], item: DraftClinicalItem): void => {
  const index = items.findIndex((currentItem) => currentItem.uid === item.uid)

  if (index >= 0) {
    items.splice(index, 1)
  }
}

const addGuide = (): void => {
  draft.quickGuides.push(createDraftGuide())
}

const removeGuide = (guide: DraftGuide): void => {
  draft.quickGuides = draft.quickGuides.filter((currentGuide) => currentGuide.uid !== guide.uid)
}

const addSourceFigure = (): void => {
  draft.sourceFigures.push(createDraftSourceFigure())
}

const removeSourceFigure = (figure: DraftSourceFigure): void => {
  draft.sourceFigures = draft.sourceFigures.filter(
    (currentFigure) => currentFigure.uid !== figure.uid,
  )
}

const addPreset = (): void => {
  draft.presets.push(createDraftPreset())
}

const removePreset = (preset: DraftPreset): void => {
  draft.presets = draft.presets.filter((currentPreset) => currentPreset.uid !== preset.uid)
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
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

const isModuleAnswerValue = (value: unknown): value is ModuleAnswers[string] => {
  return (
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    (Array.isArray(value) && value.every((item) => typeof item === 'string'))
  )
}

const readModuleAnswers = (value: Record<string, unknown>): ModuleAnswers => {
  return Object.fromEntries(
    Object.entries(value).filter((entry): entry is [string, ModuleAnswers[string]] =>
      isModuleAnswerValue(entry[1]),
    ),
  )
}

const splitLines = (value: string): string[] =>
  value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)

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

const importWorkflow = (workflow: unknown): void => {
  if (!isRecord(workflow)) {
    throw new Error(t('builder.importInvalid'))
  }

  if (!availableLocales.includes(workflow.language as Locale)) {
    throw new Error(t('builder.importInvalid'))
  }

  const detectedLocale = workflow.language as Locale
  authoringLocale.value = detectedLocale
  draft.id = typeof workflow.id === 'string' ? workflow.id : 'imported-workflow'
  draft.slug = readWorkflowText(workflow.slug)
  draft.title = readWorkflowText(workflow.title)
  draft.description = readWorkflowText(workflow.description)
  draft.overview = readWorkflowText(workflow.overview)
  draft.hpiTemplate = readWorkflowText(workflow.hpiTemplate)
  draft.idWasEdited = true
  draft.sections = []
  draft.redFlags = readClinicalItems(workflow.redFlags)
  draft.differentials = readClinicalItems(workflow.differentials)
  draft.workup = readClinicalItems(workflow.workup)
  draft.quickGuides = readGuides(workflow.quickGuides)
  draft.sourceFigures = readSourceFigures(workflow.sourceFigures)
  draft.presets = readPresets(workflow.presets)
  expandedFieldUid.value = null

  for (const sectionValue of Array.isArray(workflow.sections) ? workflow.sections : []) {
    if (!isRecord(sectionValue)) {
      continue
    }

    const section: DraftSection = {
      uid: createDraftUid(),
      id: typeof sectionValue.id === 'string' ? sectionValue.id : '',
      title: readWorkflowText(sectionValue.title),
      description: readWorkflowText(sectionValue.description),
      idWasEdited: true,
      fields: [],
    }

    for (const fieldValue of Array.isArray(sectionValue.fields) ? sectionValue.fields : []) {
      if (!isRecord(fieldValue)) {
        continue
      }

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
        field.defaultText =
          typeof fieldValue.defaultValue === 'string' ? fieldValue.defaultValue : ''

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
          field.defaultText =
            typeof fieldValue.defaultValue === 'string' ? fieldValue.defaultValue : ''
        } else {
          field.defaultMultiselect = readStringArray(fieldValue.defaultValue)
        }
      }

      section.fields.push(field)
    }

    draft.sections.push(section)
  }

  for (const sectionId of Object.keys(newFieldBySection)) {
    delete newFieldBySection[sectionId]
  }
}

const editWorkflowId = computed(() => {
  const moduleId = route.params.moduleId

  return Array.isArray(moduleId) ? moduleId[0] : moduleId
})

watch(
  editWorkflowId,
  async (moduleId) => {
    if (!moduleId) {
      savedWorkflowId.value = null
      return
    }

    const workflowId = Number(moduleId)

    if (!Number.isInteger(workflowId) || workflowId <= 0) {
      savedWorkflowId.value = null
      return
    }

    try {
      const savedWorkflow = await fetchUserWorkflow(workflowId)

      savedWorkflowId.value = savedWorkflow.id
      importWorkflow(savedWorkflow.definition)
      draft.slug = draft.slug || slugify(draft.title)
    } catch {
      savedWorkflowId.value = null
      notify({
        type: 'error',
        title: t('builder.loadFailedTitle'),
        message: t('builder.loadFailedMessage'),
      })
    }
  },
  { immediate: true },
)

const downloadWorkflowJson = (): void => {
  const json = JSON.stringify(workflowPreview.value, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = `${draft.id || 'workflow'}.json`
  link.click()
  URL.revokeObjectURL(url)
}

const saveWorkflow = async (): Promise<void> => {
  if (validationMessages.value.length > 0) {
    notify({
      type: 'warn',
      title: t('builder.saveBlockedTitle'),
      message: t('builder.saveBlockedMessage'),
    })
    return
  }

  isSavingWorkflow.value = true

  try {
    const workflow = workflowPreview.value
    const savedWorkflow = await saveUserWorkflow(
      {
        title: workflow.title,
        description: workflow.description ?? workflow.overview,
        slug: workflow.slug || slugify(workflow.title),
        language: workflow.language,
        definition: workflow,
      },
      savedWorkflowId.value,
    )

    savedWorkflowId.value = savedWorkflow.id

    notify({
      type: 'message',
      title: t('builder.saveSuccessTitle'),
      message: t('builder.saveSuccessMessage'),
    })
  } catch {
    notify({
      type: 'error',
      title: t('builder.saveFailedTitle'),
      message: t('builder.saveFailedMessage'),
    })
  } finally {
    isSavingWorkflow.value = false
  }
}

const triggerImport = (): void => {
  importFileInput.value?.click()
}

const importWorkflowJson = async (event: Event): Promise<void> => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) {
    return
  }

  try {
    importError.value = ''
    importWorkflow(JSON.parse(await file.text()))
  } catch {
    importError.value = t('builder.importInvalid')
  } finally {
    input.value = ''
  }
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

const parsePresetAnswers = (preset: DraftPreset): ModuleAnswers => {
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

const workflowPreview = computed<ClinicalWorkflow>(() => ({
  id: draft.id,
  language: authoringLocale.value,
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
}))

const formattedPreview = computed(() => JSON.stringify(workflowPreview.value, null, 2))
const previewSession = ref<WorkflowSession>(createWorkflowSession(workflowPreview.value))
const generatedPreviewHpi = computed(() => previewSession.value.generateHpi(authoringLocale.value))

watch(workflowPreview, (workflow) => {
  previewSession.value = createWorkflowSession(workflow)
})

const allFieldKeys = computed(() =>
  draft.sections.flatMap((section) => section.fields.map((field) => field.key).filter(Boolean)),
)

const availableTemplateFields = computed(() =>
  draft.sections.flatMap((section) =>
    section.fields.map((field) => ({
      key: field.key,
      label: field.label || field.key,
      token:
        field.type === 'multiselect' ? `{{ ${field.key} | list: locale }}` : `{{ ${field.key} }}`,
    })),
  ),
)

const insertTemplateToken = async (token: string): Promise<void> => {
  const textarea = hpiTemplateInput.value

  if (!textarea) {
    draft.hpiTemplate = `${draft.hpiTemplate}${token}`
    return
  }

  const selectionStart = textarea.selectionStart
  const selectionEnd = textarea.selectionEnd
  const beforeSelection = draft.hpiTemplate.slice(0, selectionStart)
  const afterSelection = draft.hpiTemplate.slice(selectionEnd)

  draft.hpiTemplate = `${beforeSelection}${token}${afterSelection}`
  await nextTick()
  textarea.focus()
  textarea.setSelectionRange(selectionStart + token.length, selectionStart + token.length)
}

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

const validationMessages = computed(() => {
  const messages: string[] = []
  const duplicateSectionIds = findDuplicates(draft.sections.map((section) => section.id))
  const duplicateFieldKeys = findDuplicates(
    draft.sections.flatMap((section) => section.fields.map((field) => field.key)),
  )

  if (duplicateSectionIds.length > 0) {
    messages.push(
      `${t('builder.validationDuplicateSectionIds')}: ${duplicateSectionIds.join(', ')}`,
    )
  }

  if (duplicateFieldKeys.length > 0) {
    messages.push(`${t('builder.validationDuplicateFieldKeys')}: ${duplicateFieldKeys.join(', ')}`)
  }

  for (const section of draft.sections) {
    for (const field of section.fields) {
      if (field.displayIf.enabled && !allFieldKeys.value.includes(field.displayIf.fieldKey)) {
        messages.push(
          `${t('builder.validationMissingDisplayIfField')} (${field.label || field.key})`,
        )
      }

      if (field.type !== 'select' && field.type !== 'multiselect') {
        continue
      }

      const duplicateOptionValues = findDuplicates(field.options.map((option) => option.value))

      if (duplicateOptionValues.length > 0) {
        messages.push(
          `${t('builder.validationDuplicateOptionValues')} (${field.label || field.key}): ${duplicateOptionValues.join(', ')}`,
        )
      }
    }
  }

  const duplicatePresetIds = findDuplicates(draft.presets.map((preset) => preset.id))

  if (duplicatePresetIds.length > 0) {
    messages.push(`${t('builder.validationDuplicatePresetIds')}: ${duplicatePresetIds.join(', ')}`)
  }

  for (const preset of draft.presets) {
    try {
      parsePresetAnswers(preset)
    } catch {
      messages.push(`${t('builder.validationInvalidPresetJson')} (${preset.title || preset.id})`)
    }
  }

  return messages
})
</script>

<template>
  <PrivateWorkspaceShell active-section="builder">
    <section class="workspace-content">
      <header class="complaint-header">
        <p class="eyebrow">{{ t('builder.eyebrow') }}</p>
        <h1>{{ t('builder.title') }}</h1>
        <p>{{ t('builder.description') }}</p>
        <button
          class="primary-action compact-action"
          type="button"
          :disabled="isSavingWorkflow"
          @click="saveWorkflow"
        >
          {{ isSavingWorkflow ? t('builder.saving') : t('builder.saveWorkflow') }}
        </button>
      </header>

      <div class="builder-mode-tabs" role="tablist" aria-label="Builder mode">
        <button
          class="builder-mode-tab"
          :class="{ selected: activeBuilderMode === 'edit' }"
          type="button"
          role="tab"
          :aria-selected="activeBuilderMode === 'edit'"
          @click="activeBuilderMode = 'edit'"
        >
          {{ t('builder.modeEdit') }}
        </button>
        <button
          class="builder-mode-tab"
          :class="{ selected: activeBuilderMode === 'preview' }"
          type="button"
          role="tab"
          :aria-selected="activeBuilderMode === 'preview'"
          @click="activeBuilderMode = 'preview'"
        >
          {{ t('builder.modePreview') }}
        </button>
        <button
          class="builder-mode-tab"
          :class="{ selected: activeBuilderMode === 'json' }"
          type="button"
          role="tab"
          :aria-selected="activeBuilderMode === 'json'"
          @click="activeBuilderMode = 'json'"
        >
          {{ t('builder.modeJson') }}
        </button>
      </div>

      <div v-if="activeBuilderMode === 'edit'" class="builder-layout">
        <section class="builder-main" aria-label="Workflow builder form">
          <section class="builder-card">
            <div class="section-heading">
              <h2>{{ t('builder.detailsTitle') }}</h2>
              <p class="section-description">{{ t('builder.detailsDescription') }}</p>
            </div>

            <div class="builder-form-grid">
              <label class="builder-field">
                <span>{{ t('builder.workflowTitle') }}</span>
                <input
                  class="text-input"
                  type="text"
                  :value="draft.title"
                  @input="updateWorkflowTitle"
                />
              </label>

              <label class="builder-field">
                <span class="field-label-row">
                  <span>{{ t('builder.workflowId') }}</span>
                  <FieldHint :message="t('builder.workflowIdHint')" />
                </span>
                <input class="text-input" type="text" :value="draft.id" @input="updateWorkflowId" />
              </label>

              <label class="builder-field">
                <span class="field-label-row">
                  <span>{{ t('builder.workflowSlug') }}</span>
                  <FieldHint :message="t('builder.workflowSlugHint')" />
                </span>
                <input v-model="draft.slug" class="text-input" type="text" />
              </label>

              <label class="builder-field">
                <span>{{ t('builder.contentLocale') }}</span>
                <select v-model="authoringLocale" class="text-input">
                  <option v-for="locale in availableLocales" :key="locale" :value="locale">
                    {{ locales[locale].label }}
                  </option>
                </select>
              </label>

              <label class="builder-field full-span">
                <span>{{ t('builder.workflowDescription') }}</span>
                <textarea v-model="draft.description" class="text-input builder-textarea" />
              </label>

              <label class="builder-field full-span">
                <span>{{ t('builder.workflowOverview') }}</span>
                <textarea v-model="draft.overview" class="text-input builder-textarea" />
              </label>
            </div>
          </section>

          <section class="builder-card">
            <div class="builder-card-header">
              <div class="section-heading">
                <h2>{{ t('builder.sectionsTitle') }}</h2>
                <p class="section-description">{{ t('builder.sectionsDescription') }}</p>
              </div>

              <div class="builder-inline-add">
                <input
                  v-model="newSectionTitle.value"
                  class="text-input"
                  type="text"
                  :placeholder="t('builder.sectionPlaceholder')"
                  @keyup.enter="addSection"
                />
                <button class="secondary-action" type="button" @click="addSection">
                  {{ t('builder.addSection') }}
                </button>
              </div>
            </div>

            <div class="builder-section-list">
              <p v-if="draft.sections.length === 0" class="builder-empty">
                {{ t('builder.emptySections') }}
              </p>

              <article v-for="section in draft.sections" :key="section.uid" class="builder-section">
                <div class="builder-section-header">
                  <div class="builder-section-edit">
                    <label class="builder-field">
                      <span>{{ t('builder.sectionTitle') }}</span>
                      <input
                        class="text-input"
                        type="text"
                        :value="section.title"
                        @input="updateSectionTitle(section, $event)"
                      />
                    </label>
                    <label class="builder-field">
                      <span class="field-label-row">
                        <span>{{ t('builder.sectionId') }}</span>
                        <FieldHint :message="t('builder.sectionIdHint')" />
                      </span>
                      <input
                        class="text-input"
                        type="text"
                        :value="section.id"
                        @input="updateSectionId(section, $event)"
                      />
                    </label>
                    <label class="builder-field full-span">
                      <span>{{ t('builder.sectionDescription') }}</span>
                      <input v-model="section.description" class="text-input" type="text" />
                    </label>
                  </div>
                  <div class="builder-row-actions">
                    <span class="field-count">
                      {{ section.fields.length }} {{ t('builder.fieldsCount') }}
                    </span>
                    <button class="danger-action" type="button" @click="removeSection(section)">
                      {{ t('builder.removeSection') }}
                    </button>
                  </div>
                </div>

                <div class="builder-field-list">
                  <p v-if="section.fields.length === 0" class="builder-empty compact">
                    {{ t('builder.emptyFields') }}
                  </p>

                  <div v-for="field in section.fields" :key="field.uid" class="builder-field-row">
                    <select v-model="field.type" class="text-input">
                      <option v-for="fieldType in fieldTypes" :key="fieldType" :value="fieldType">
                        {{ fieldTypeLabel(fieldType) }}
                      </option>
                    </select>
                    <input
                      class="text-input"
                      type="text"
                      :value="field.label"
                      @input="updateFieldLabel(field, $event)"
                    />
                    <input
                      class="text-input"
                      type="text"
                      :value="field.key"
                      :title="t('builder.fieldKeyHint')"
                      @input="updateFieldKey(field, $event)"
                    />
                    <button
                      class="secondary-action compact-action"
                      type="button"
                      @click="toggleFieldConfiguration(field)"
                    >
                      {{
                        expandedFieldUid === field.uid
                          ? t('builder.collapseField')
                          : t('builder.configureField')
                      }}
                    </button>
                    <button
                      class="danger-action"
                      type="button"
                      @click="removeField(section, field)"
                    >
                      {{ t('builder.removeField') }}
                    </button>

                    <div v-if="expandedFieldUid === field.uid" class="field-configuration">
                      <div class="section-heading">
                        <h3>{{ t('builder.fieldDetailsTitle') }}</h3>
                        <p class="section-description">
                          {{ t('builder.fieldDetailsDescription') }}
                        </p>
                      </div>

                      <div class="builder-form-grid">
                        <label class="check-option single-check">
                          <input v-model="field.required" type="checkbox" />
                          <span>{{ t('builder.requiredField') }}</span>
                        </label>

                        <label class="builder-field full-span">
                          <span class="field-label-row">
                            <span>{{ t('builder.helperText') }}</span>
                            <FieldHint :message="t('builder.helperTextHint')" />
                          </span>
                          <input v-model="field.helperText" class="text-input" type="text" />
                        </label>

                        <fieldset class="builder-field full-span display-condition">
                          <legend class="field-label-row">
                            <span>{{ t('builder.displayIf') }}</span>
                            <FieldHint :message="t('builder.displayIfHint')" />
                          </legend>
                          <label class="check-option single-check">
                            <input v-model="field.displayIf.enabled" type="checkbox" />
                            <span>{{ t('builder.enableDisplayIf') }}</span>
                          </label>

                          <div v-if="field.displayIf.enabled" class="builder-form-grid">
                            <label class="builder-field">
                              <span class="field-label-row">
                                <span>{{ t('builder.displayIfField') }}</span>
                                <FieldHint :message="t('builder.displayIfFieldHint')" />
                              </span>
                              <select v-model="field.displayIf.fieldKey" class="text-input">
                                <option value="">{{ t('builder.noDefault') }}</option>
                                <option
                                  v-for="fieldKey in allFieldKeys"
                                  :key="fieldKey"
                                  :value="fieldKey"
                                >
                                  {{ fieldKey }}
                                </option>
                              </select>
                            </label>

                            <label class="builder-field">
                              <span>{{ t('builder.displayIfType') }}</span>
                              <select v-model="field.displayIf.equalsKind" class="text-input">
                                <option value="boolean">{{ t('builder.displayIfBoolean') }}</option>
                                <option value="string">{{ t('builder.displayIfString') }}</option>
                                <option value="stringArray">
                                  {{ t('builder.displayIfStringArray') }}
                                </option>
                              </select>
                            </label>

                            <label
                              v-if="field.displayIf.equalsKind === 'boolean'"
                              class="builder-field"
                            >
                              <span>{{ t('builder.displayIfEquals') }}</span>
                              <select v-model="field.displayIf.equalsBoolean" class="text-input">
                                <option :value="true">{{ t('builder.booleanTrue') }}</option>
                                <option :value="false">{{ t('builder.booleanFalse') }}</option>
                              </select>
                            </label>

                            <label
                              v-else-if="field.displayIf.equalsKind === 'string'"
                              class="builder-field"
                            >
                              <span>{{ t('builder.displayIfEquals') }}</span>
                              <input
                                v-model="field.displayIf.equalsString"
                                class="text-input"
                                type="text"
                              />
                            </label>

                            <label v-else class="builder-field full-span">
                              <span>{{ t('builder.displayIfEquals') }}</span>
                              <input
                                v-model="field.displayIf.equalsArrayText"
                                class="text-input"
                                type="text"
                                :placeholder="t('builder.displayIfArrayPlaceholder')"
                              />
                            </label>
                          </div>
                        </fieldset>
                      </div>

                      <div v-if="field.type === 'text'" class="field-settings-group">
                        <h4>{{ t('builder.textSettings') }}</h4>
                        <div class="builder-form-grid">
                          <label class="builder-field">
                            <span>{{ t('builder.defaultText') }}</span>
                            <input v-model="field.defaultText" class="text-input" type="text" />
                          </label>
                          <label class="builder-field full-span">
                            <span>{{ t('builder.placeholder') }}</span>
                            <input v-model="field.placeholder" class="text-input" type="text" />
                          </label>
                          <label class="builder-field">
                            <span>{{ t('builder.narrativePrefix') }}</span>
                            <input
                              v-model="field.narrative.prefix"
                              class="text-input"
                              type="text"
                            />
                          </label>
                          <label class="builder-field">
                            <span>{{ t('builder.narrativeSuffix') }}</span>
                            <input
                              v-model="field.narrative.suffix"
                              class="text-input"
                              type="text"
                            />
                          </label>
                        </div>
                      </div>

                      <div v-else-if="field.type === 'boolean'" class="field-settings-group">
                        <h4>{{ t('builder.booleanSettings') }}</h4>
                        <div class="builder-form-grid">
                          <label class="builder-field">
                            <span>{{ t('builder.defaultBoolean') }}</span>
                            <select v-model="field.defaultBoolean" class="text-input">
                              <option :value="false">{{ t('builder.defaultUnchecked') }}</option>
                              <option :value="true">{{ t('builder.defaultChecked') }}</option>
                            </select>
                          </label>
                          <label class="builder-field">
                            <span>{{ t('builder.narrativeWhenTrue') }}</span>
                            <input
                              v-model="field.narrative.whenTrue"
                              class="text-input"
                              type="text"
                            />
                          </label>
                          <label class="builder-field">
                            <span>{{ t('builder.narrativeWhenFalse') }}</span>
                            <input
                              v-model="field.narrative.whenFalse"
                              class="text-input"
                              type="text"
                            />
                          </label>
                        </div>
                      </div>

                      <div
                        v-else-if="field.type === 'select' || field.type === 'multiselect'"
                        class="field-settings-group"
                      >
                        <div class="builder-card-header compact-header">
                          <h4>{{ t('builder.optionSettings') }}</h4>
                          <button
                            class="secondary-action compact-action"
                            type="button"
                            @click="addOption(field)"
                          >
                            {{ t('builder.addOption') }}
                          </button>
                        </div>

                        <label v-if="field.type === 'select'" class="builder-field">
                          <span>{{ t('builder.defaultOption') }}</span>
                          <select v-model="field.defaultText" class="text-input">
                            <option value="">{{ t('builder.noDefault') }}</option>
                            <option
                              v-for="option in field.options"
                              :key="option.uid"
                              :value="option.value"
                            >
                              {{ option.label || option.value }}
                            </option>
                          </select>
                        </label>

                        <fieldset v-else class="builder-field">
                          <legend>{{ t('builder.defaultOptions') }}</legend>
                          <div class="option-grid">
                            <label
                              v-for="option in field.options"
                              :key="option.uid"
                              class="check-option"
                            >
                              <input
                                v-model="field.defaultMultiselect"
                                type="checkbox"
                                :value="option.value"
                              />
                              <span>{{ option.label || option.value }}</span>
                            </label>
                          </div>
                        </fieldset>

                        <p v-if="field.options.length === 0" class="builder-empty compact">
                          {{ t('builder.emptyOptions') }}
                        </p>

                        <div
                          v-for="option in field.options"
                          :key="option.uid"
                          class="builder-option-row"
                        >
                          <input
                            class="text-input"
                            type="text"
                            :value="option.label"
                            :placeholder="t('builder.optionLabelPlaceholder')"
                            @input="updateOptionLabel(option, $event)"
                          />
                          <input
                            class="text-input"
                            type="text"
                            :value="option.value"
                            :placeholder="t('builder.optionValuePlaceholder')"
                            @input="updateOptionValue(option, $event)"
                          />
                          <input
                            v-model="option.narrative"
                            class="text-input"
                            type="text"
                            :placeholder="t('builder.optionNarrativePlaceholder')"
                          />
                          <button
                            class="danger-action"
                            type="button"
                            @click="removeOption(field, option)"
                          >
                            {{ t('builder.removeField') }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="field-add-row">
                  <input
                    class="text-input"
                    type="text"
                    :value="getNewField(section.uid).label"
                    :placeholder="t('builder.fieldLabelPlaceholder')"
                    @input="updateFieldLabel(getNewField(section.uid), $event)"
                  />
                  <input
                    class="text-input"
                    type="text"
                    :value="getNewField(section.uid).key"
                    :placeholder="t('builder.fieldKeyPlaceholder')"
                    :title="t('builder.fieldKeyHint')"
                    @input="updateFieldKey(getNewField(section.uid), $event)"
                  />
                  <select v-model="getNewField(section.uid).type" class="text-input">
                    <option v-for="fieldType in fieldTypes" :key="fieldType" :value="fieldType">
                      {{ fieldTypeLabel(fieldType) }}
                    </option>
                  </select>
                  <button class="secondary-action" type="button" @click="addField(section)">
                    {{ t('builder.addField') }}
                  </button>
                </div>
              </article>
            </div>
          </section>

          <section class="builder-card">
            <div class="section-heading">
              <h2>{{ t('builder.clinicalGuidanceTitle') }}</h2>
              <p class="section-description">{{ t('builder.clinicalGuidanceDescription') }}</p>
            </div>

            <div class="clinical-item-editor">
              <div class="builder-card-header compact-header">
                <h3>{{ t('guidance.redFlagsTitle') }}</h3>
                <button
                  class="secondary-action compact-action"
                  type="button"
                  @click="addClinicalItem(draft.redFlags)"
                >
                  {{ t('builder.addItem') }}
                </button>
              </div>
              <p v-if="draft.redFlags.length === 0" class="builder-empty compact">
                {{ t('builder.emptyClinicalItems') }}
              </p>
              <div v-for="item in draft.redFlags" :key="item.uid" class="builder-option-row">
                <input
                  v-model="item.title"
                  class="text-input"
                  type="text"
                  :placeholder="t('builder.itemTitle')"
                />
                <input
                  v-model="item.description"
                  class="text-input"
                  type="text"
                  :placeholder="t('builder.itemDescription')"
                />
                <button
                  class="danger-action"
                  type="button"
                  @click="removeClinicalItem(draft.redFlags, item)"
                >
                  {{ t('builder.removeField') }}
                </button>
              </div>
            </div>

            <div class="clinical-item-editor">
              <div class="builder-card-header compact-header">
                <h3>{{ t('guidance.differentialsTitle') }}</h3>
                <button
                  class="secondary-action compact-action"
                  type="button"
                  @click="addClinicalItem(draft.differentials)"
                >
                  {{ t('builder.addItem') }}
                </button>
              </div>
              <p v-if="draft.differentials.length === 0" class="builder-empty compact">
                {{ t('builder.emptyClinicalItems') }}
              </p>
              <div v-for="item in draft.differentials" :key="item.uid" class="builder-option-row">
                <input
                  v-model="item.title"
                  class="text-input"
                  type="text"
                  :placeholder="t('builder.itemTitle')"
                />
                <input
                  v-model="item.description"
                  class="text-input"
                  type="text"
                  :placeholder="t('builder.itemDescription')"
                />
                <button
                  class="danger-action"
                  type="button"
                  @click="removeClinicalItem(draft.differentials, item)"
                >
                  {{ t('builder.removeField') }}
                </button>
              </div>
            </div>

            <div class="clinical-item-editor">
              <div class="builder-card-header compact-header">
                <h3>{{ t('guidance.workupTitle') }}</h3>
                <button
                  class="secondary-action compact-action"
                  type="button"
                  @click="addClinicalItem(draft.workup)"
                >
                  {{ t('builder.addItem') }}
                </button>
              </div>
              <p v-if="draft.workup.length === 0" class="builder-empty compact">
                {{ t('builder.emptyClinicalItems') }}
              </p>
              <div v-for="item in draft.workup" :key="item.uid" class="builder-option-row">
                <input
                  v-model="item.title"
                  class="text-input"
                  type="text"
                  :placeholder="t('builder.itemTitle')"
                />
                <input
                  v-model="item.description"
                  class="text-input"
                  type="text"
                  :placeholder="t('builder.itemDescription')"
                />
                <button
                  class="danger-action"
                  type="button"
                  @click="removeClinicalItem(draft.workup, item)"
                >
                  {{ t('builder.removeField') }}
                </button>
              </div>
            </div>
          </section>

          <section class="builder-card">
            <div class="builder-card-header">
              <div class="section-heading">
                <h2>{{ t('builder.guidanceLibraryTitle') }}</h2>
                <p class="section-description">{{ t('builder.guidanceLibraryDescription') }}</p>
              </div>
            </div>

            <div class="clinical-item-editor">
              <div class="builder-card-header compact-header">
                <h3>{{ t('guidance.quickGuideTitle') }}</h3>
                <button class="secondary-action compact-action" type="button" @click="addGuide">
                  {{ t('builder.addGuide') }}
                </button>
              </div>
              <p v-if="draft.quickGuides.length === 0" class="builder-empty compact">
                {{ t('builder.emptyGuides') }}
              </p>
              <article v-for="guide in draft.quickGuides" :key="guide.uid" class="builder-section">
                <div class="builder-form-grid">
                  <label class="builder-field">
                    <span>{{ t('builder.itemTitle') }}</span>
                    <input v-model="guide.title" class="text-input" type="text" />
                  </label>
                  <label class="builder-field">
                    <span>{{ t('builder.itemDescription') }}</span>
                    <input v-model="guide.description" class="text-input" type="text" />
                  </label>
                  <label class="builder-field">
                    <span>{{ t('guidance.criteria') }}</span>
                    <textarea v-model="guide.criteriaText" class="text-input builder-textarea" />
                  </label>
                  <label class="builder-field">
                    <span>{{ t('guidance.actions') }}</span>
                    <textarea v-model="guide.actionsText" class="text-input builder-textarea" />
                  </label>
                </div>
                <div class="builder-row-actions">
                  <button class="danger-action" type="button" @click="removeGuide(guide)">
                    {{ t('builder.removeField') }}
                  </button>
                </div>
              </article>
            </div>

            <div class="clinical-item-editor">
              <div class="builder-card-header compact-header">
                <h3>{{ t('guidance.sourceFiguresTitle') }}</h3>
                <button
                  class="secondary-action compact-action"
                  type="button"
                  @click="addSourceFigure"
                >
                  {{ t('builder.addSourceFigure') }}
                </button>
              </div>
              <p v-if="draft.sourceFigures.length === 0" class="builder-empty compact">
                {{ t('builder.emptySourceFigures') }}
              </p>
              <article
                v-for="figure in draft.sourceFigures"
                :key="figure.uid"
                class="builder-section"
              >
                <div class="builder-form-grid">
                  <label class="builder-field">
                    <span>{{ t('builder.itemTitle') }}</span>
                    <input v-model="figure.title" class="text-input" type="text" />
                  </label>
                  <label class="builder-field">
                    <span>{{ t('builder.sourceName') }}</span>
                    <input v-model="figure.source" class="text-input" type="text" />
                  </label>
                  <label class="builder-field full-span">
                    <span class="field-label-row">
                      <span>{{ t('builder.sourceUrl') }}</span>
                      <FieldHint :message="t('builder.sourceUrlHint')" />
                    </span>
                    <input v-model="figure.sourceUrl" class="text-input" type="url" />
                  </label>
                  <label class="builder-field">
                    <span class="field-label-row">
                      <span>{{ t('builder.imageUrl') }}</span>
                      <FieldHint :message="t('builder.imageUrlHint')" />
                    </span>
                    <input v-model="figure.imageUrl" class="text-input" type="text" />
                  </label>
                  <label class="builder-field">
                    <span>{{ t('builder.altText') }}</span>
                    <input v-model="figure.altText" class="text-input" type="text" />
                  </label>
                  <label class="builder-field">
                    <span>{{ t('builder.citation') }}</span>
                    <input v-model="figure.citation" class="text-input" type="text" />
                  </label>
                  <label class="builder-field">
                    <span>{{ t('builder.notes') }}</span>
                    <input v-model="figure.notes" class="text-input" type="text" />
                  </label>
                </div>
                <div class="builder-row-actions">
                  <button class="danger-action" type="button" @click="removeSourceFigure(figure)">
                    {{ t('builder.removeField') }}
                  </button>
                </div>
              </article>
            </div>
          </section>

          <section class="builder-card">
            <div class="builder-card-header">
              <div class="section-heading">
                <h2>{{ t('builder.presetsTitle') }}</h2>
                <p class="section-description">{{ t('builder.presetsDescription') }}</p>
              </div>
              <button class="secondary-action compact-action" type="button" @click="addPreset">
                {{ t('builder.addPreset') }}
              </button>
            </div>

            <p v-if="draft.presets.length === 0" class="builder-empty compact">
              {{ t('builder.emptyPresets') }}
            </p>

            <article v-for="preset in draft.presets" :key="preset.uid" class="builder-section">
              <div class="builder-form-grid">
                <label class="builder-field">
                  <span>{{ t('builder.presetId') }}</span>
                  <input v-model="preset.id" class="text-input" type="text" />
                </label>
                <label class="builder-field">
                  <span>{{ t('builder.itemTitle') }}</span>
                  <input v-model="preset.title" class="text-input" type="text" />
                </label>
                <label class="builder-field full-span">
                  <span>{{ t('builder.itemDescription') }}</span>
                  <input v-model="preset.description" class="text-input" type="text" />
                </label>
                <label class="builder-field full-span">
                  <span class="field-label-row">
                    <span>{{ t('builder.presetAnswersJson') }}</span>
                    <FieldHint :message="t('builder.presetAnswersJsonHint')" />
                  </span>
                  <textarea
                    v-model="preset.answersJson"
                    class="text-input builder-template-textarea"
                  />
                </label>
              </div>
              <div class="builder-row-actions">
                <button class="danger-action" type="button" @click="removePreset(preset)">
                  {{ t('builder.removeField') }}
                </button>
              </div>
            </article>
          </section>

          <section class="builder-card">
            <div class="section-heading">
              <h2>{{ t('builder.generatedNoteTitle') }}</h2>
              <p class="section-description">{{ t('builder.generatedNoteDescription') }}</p>
            </div>

            <label class="builder-field">
              <span class="field-label-row">
                <span>{{ t('builder.generatedNote') }}</span>
                <FieldHint :message="t('builder.generatedNoteHint')" />
              </span>
              <textarea
                ref="hpiTemplateInput"
                v-model="draft.hpiTemplate"
                class="text-input builder-template-textarea"
                :placeholder="t('builder.hpiTemplatePlaceholder')"
              />
            </label>

            <div class="template-chip-panel">
              <div class="section-heading">
                <h3>{{ t('builder.availableAnswers') }}</h3>
                <p class="section-description">{{ t('builder.availableAnswersDescription') }}</p>
              </div>

              <p v-if="availableTemplateFields.length === 0" class="builder-empty compact">
                {{ t('builder.emptyTemplateFields') }}
              </p>

              <div v-else class="template-chip-list">
                <button
                  v-for="field in availableTemplateFields"
                  :key="field.key"
                  class="template-chip"
                  type="button"
                  @click="insertTemplateToken(field.token)"
                >
                  {{ field.label }}
                  <code>{{ field.key }}</code>
                </button>
              </div>
            </div>

            <details class="advanced-template-help">
              <summary>{{ t('builder.advancedTemplateSyntax') }}</summary>
              <div class="schema-preview">
                <p>{{ t('builder.advancedTemplateDescription') }}</p>
                <code v-pre>{% if fever %}Patient reports {{ fever }}.{% endif %}</code>
                <code v-pre>{{ radiation | list: locale }}</code>
              </div>
            </details>
          </section>
        </section>

        <aside class="builder-preview" aria-labelledby="builder-preview-title">
          <div class="builder-card-header compact-header">
            <div class="section-heading">
              <p class="eyebrow">{{ t('builder.previewEyebrow') }}</p>
              <h2 id="builder-preview-title">{{ t('builder.previewTitle') }}</h2>
              <p class="section-description">{{ t('builder.previewDescription') }}</p>
            </div>

            <div class="builder-row-actions">
              <button
                class="secondary-action compact-action"
                type="button"
                @click="downloadWorkflowJson"
              >
                {{ t('builder.exportJson') }}
              </button>
              <button class="secondary-action compact-action" type="button" @click="triggerImport">
                {{ t('builder.importJson') }}
              </button>
              <input
                ref="importFileInput"
                class="visually-hidden"
                type="file"
                accept="application/json,.json"
                @change="importWorkflowJson"
              />
            </div>
          </div>

          <p v-if="importError" class="builder-error">{{ importError }}</p>

          <section class="builder-validation" aria-live="polite">
            <div class="section-heading">
              <h3>{{ t('builder.validationTitle') }}</h3>
              <p class="section-description">{{ t('builder.validationDescription') }}</p>
            </div>

            <p v-if="validationMessages.length === 0" class="builder-valid">
              {{ t('builder.validationNoIssues') }}
            </p>

            <ul v-else class="builder-validation-list">
              <li v-for="message in validationMessages" :key="message">{{ message }}</li>
            </ul>
          </section>

          <div class="builder-summary">
            <div>
              <span>{{ t('builder.summarySections') }}</span>
              <strong>{{ draft.sections.length }}</strong>
            </div>
            <div>
              <span>{{ t('builder.summaryFields') }}</span>
              <strong>
                {{ draft.sections.reduce((count, section) => count + section.fields.length, 0) }}
              </strong>
            </div>
          </div>
        </aside>
      </div>

      <section
        v-else-if="activeBuilderMode === 'preview'"
        class="builder-rendered-preview"
        aria-labelledby="builder-rendered-preview-title"
      >
        <header class="complaint-header compact-preview-header">
          <p class="eyebrow">{{ t('builder.modePreview') }}</p>
          <h1 id="builder-rendered-preview-title">{{ workflowPreview.title }}</h1>
          <p>{{ workflowPreview.overview }}</p>
        </header>

        <div class="clinical-workbench">
          <HpiPreview :narrative="generatedPreviewHpi" :sticky="false" />

          <section class="form-card" aria-labelledby="builder-preview-form-title">
            <div class="form-card-header">
              <div>
                <p class="eyebrow">{{ t('workspace.formEyebrow') }}</p>
                <h2 id="builder-preview-form-title">{{ t('workspace.formTitle') }}</h2>
              </div>
            </div>

            <div class="form-card-scroll">
              <DynamicClinicalForm :session="previewSession" />

              <div class="workflow-grid guidance-grid">
                <RedFlagList :red-flags="workflowPreview.redFlags" />
                <DifferentialList :differentials="workflowPreview.differentials" />
                <WorkupList :workup="workflowPreview.workup" />
              </div>

              <ClinicalGuidanceLibrary
                :quick-guides="workflowPreview.quickGuides"
                :source-figures="workflowPreview.sourceFigures"
              />
            </div>
          </section>
        </div>
      </section>

      <section v-else class="builder-json-view" aria-labelledby="builder-json-title">
        <div class="builder-card-header">
          <div class="section-heading">
            <p class="eyebrow">{{ t('builder.previewEyebrow') }}</p>
            <h2 id="builder-json-title">{{ t('builder.previewTitle') }}</h2>
            <p class="section-description">{{ t('builder.previewDescription') }}</p>
          </div>

          <div class="builder-row-actions">
            <button
              class="secondary-action compact-action"
              type="button"
              @click="downloadWorkflowJson"
            >
              {{ t('builder.exportJson') }}
            </button>
            <button class="secondary-action compact-action" type="button" @click="triggerImport">
              {{ t('builder.importJson') }}
            </button>
            <input
              ref="importFileInput"
              class="visually-hidden"
              type="file"
              accept="application/json,.json"
              @change="importWorkflowJson"
            />
          </div>
        </div>

        <p v-if="importError" class="builder-error">{{ importError }}</p>

        <section class="builder-validation" aria-live="polite">
          <div class="section-heading">
            <h3>{{ t('builder.validationTitle') }}</h3>
            <p class="section-description">{{ t('builder.validationDescription') }}</p>
          </div>

          <p v-if="validationMessages.length === 0" class="builder-valid">
            {{ t('builder.validationNoIssues') }}
          </p>

          <ul v-else class="builder-validation-list">
            <li v-for="message in validationMessages" :key="message">{{ message }}</li>
          </ul>
        </section>

        <pre class="schema-preview">{{ formattedPreview }}</pre>
      </section>
    </section>

  </PrivateWorkspaceShell>
</template>
