<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue'

import AppPreferences from '@/components/AppPreferences.vue'
import { useI18n } from '@/composables/useI18n'
import type { ModuleField } from '@/data/workflow'
import { locales, type Locale, type LocalizedText } from '@/i18n/locales'

type BuilderFieldType = ModuleField['type']

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
  narrative: DraftNarrative
  options: DraftOption[]
  keyWasEdited: boolean
}

type DraftSection = {
  uid: string
  id: string
  title: string
  idWasEdited: boolean
  fields: DraftField[]
}

type DraftWorkflow = {
  id: string
  title: string
  overview: string
  hpiTemplate: string
  idWasEdited: boolean
  sections: DraftSection[]
}

const { locale: appLocale, t } = useI18n()
const authoringLocale = ref<Locale>(appLocale.value)
const availableLocales = Object.keys(locales) as Locale[]
const firstAvailableLocale: Locale = availableLocales[0] ?? 'en'

const draft = reactive<DraftWorkflow>({
  id: 'new-workflow',
  title: 'New clinical workflow',
  overview: 'Describe the clinical context and what this workflow helps collect.',
  hpiTemplate: '',
  idWasEdited: false,
  sections: [],
})

const newSectionTitle = reactive({
  value: '',
})

const newFieldBySection = reactive<Record<string, DraftField>>({})
const expandedFieldUid = ref<string | null>(null)
const importFileInput = ref<HTMLInputElement | null>(null)
const hpiTemplateInput = ref<HTMLTextAreaElement | null>(null)
const importError = ref('')

const fieldTypes: BuilderFieldType[] = ['text', 'boolean', 'select', 'multiselect']
let nextDraftUid = 1

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
  narrative: {
    prefix: '',
    suffix: '',
    whenTrue: '',
    whenFalse: '',
  },
  options: [],
  keyWasEdited: false,
})

const getNewField = (sectionId: string): DraftField => {
  newFieldBySection[sectionId] ??= createDraftField()

  return newFieldBySection[sectionId]
}

const updateWorkflowTitle = (event: Event): void => {
  const title = (event.target as HTMLInputElement).value
  draft.title = title

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
    return
  }

  draft.sections.push({
    uid: createDraftUid(),
    id: slugify(title) || `section-${draft.sections.length + 1}`,
    title,
    idWasEdited: false,
    fields: [],
  })

  newSectionTitle.value = ''
}

const addField = (section: DraftSection): void => {
  const newField = getNewField(section.uid)
  const label = newField.label.trim()

  if (!label) {
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

const localizedDraftText = (value: string): LocalizedText => {
  return availableLocales.reduce((localizedText, locale) => {
    localizedText[locale] = locale === authoringLocale.value ? value : ''
    return localizedText
  }, {} as LocalizedText)
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const detectLocale = (value: unknown): Locale | null => {
  if (!isRecord(value)) {
    return null
  }

  return (
    availableLocales.find((locale) => {
      const localizedValue = value[locale]
      return typeof localizedValue === 'string' && localizedValue.trim().length > 0
    }) ?? null
  )
}

const readLocalizedText = (value: unknown, locale: Locale): string => {
  if (typeof value === 'string') {
    return value
  }

  if (!isRecord(value)) {
    return ''
  }

  const requestedText = value[locale]

  if (typeof requestedText === 'string' && requestedText.trim()) {
    return requestedText
  }

  for (const availableLocale of availableLocales) {
    const fallbackText = value[availableLocale]

    if (typeof fallbackText === 'string' && fallbackText.trim()) {
      return fallbackText
    }
  }

  return ''
}

const readFieldType = (value: unknown): BuilderFieldType => {
  return fieldTypes.includes(value as BuilderFieldType) ? (value as BuilderFieldType) : 'text'
}

const readStringArray = (value: unknown): string[] => {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

const importWorkflow = (workflow: unknown): void => {
  if (!isRecord(workflow)) {
    throw new Error(t('builder.importInvalid'))
  }

  const detectedLocale =
    detectLocale(workflow.title) ??
    detectLocale(workflow.overview) ??
    availableLocales.find((locale) => locale === authoringLocale.value) ??
    firstAvailableLocale

  authoringLocale.value = detectedLocale
  draft.id = typeof workflow.id === 'string' ? workflow.id : 'imported-workflow'
  draft.title = readLocalizedText(workflow.title, detectedLocale)
  draft.overview = readLocalizedText(workflow.overview, detectedLocale)
  draft.hpiTemplate = readLocalizedText(workflow.hpiTemplate, detectedLocale)
  draft.idWasEdited = true
  draft.sections = []
  expandedFieldUid.value = null

  for (const sectionValue of Array.isArray(workflow.sections) ? workflow.sections : []) {
    if (!isRecord(sectionValue)) {
      continue
    }

    const section: DraftSection = {
      uid: createDraftUid(),
      id: typeof sectionValue.id === 'string' ? sectionValue.id : '',
      title: readLocalizedText(sectionValue.title, detectedLocale),
      idWasEdited: true,
      fields: [],
    }

    for (const fieldValue of Array.isArray(sectionValue.fields) ? sectionValue.fields : []) {
      if (!isRecord(fieldValue)) {
        continue
      }

      const field = createDraftField(
        readLocalizedText(fieldValue.label, detectedLocale),
        readFieldType(fieldValue.type),
        typeof fieldValue.key === 'string' ? fieldValue.key : '',
      )
      field.keyWasEdited = true
      field.required = fieldValue.required === true
      field.helperText = readLocalizedText(fieldValue.helperText, detectedLocale)

      if (field.type === 'text') {
        field.placeholder = readLocalizedText(fieldValue.placeholder, detectedLocale)

        if (isRecord(fieldValue.narrative)) {
          field.narrative.prefix = readLocalizedText(fieldValue.narrative.prefix, detectedLocale)
          field.narrative.suffix = readLocalizedText(fieldValue.narrative.suffix, detectedLocale)
        }
      }

      if (field.type === 'boolean') {
        field.defaultBoolean = fieldValue.defaultValue === true

        if (isRecord(fieldValue.narrative)) {
          field.narrative.whenTrue = readLocalizedText(fieldValue.narrative.whenTrue, detectedLocale)
          field.narrative.whenFalse = readLocalizedText(fieldValue.narrative.whenFalse, detectedLocale)
        }
      }

      if (field.type === 'select' || field.type === 'multiselect') {
        field.options = (Array.isArray(fieldValue.options) ? fieldValue.options : [])
          .filter(isRecord)
          .map((optionValue) => ({
            uid: createDraftUid(),
            value: typeof optionValue.value === 'string' ? optionValue.value : '',
            label: readLocalizedText(optionValue.label, detectedLocale),
            narrative: readLocalizedText(optionValue.narrative, detectedLocale),
            valueWasEdited: true,
          }))

        if (field.type === 'select') {
          field.defaultText = typeof fieldValue.defaultValue === 'string' ? fieldValue.defaultValue : ''
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

const createFieldPreview = (field: DraftField) => ({
  key: field.key,
  label: localizedDraftText(field.label),
  type: field.type,
  ...(field.required ? { required: true } : {}),
  ...(field.helperText ? { helperText: localizedDraftText(field.helperText) } : {}),
  ...(field.type === 'text' && field.placeholder
    ? { placeholder: localizedDraftText(field.placeholder) }
    : {}),
  ...(field.type === 'text' && (field.narrative.prefix || field.narrative.suffix)
    ? {
        narrative: {
          ...(field.narrative.prefix
            ? { prefix: localizedDraftText(field.narrative.prefix) }
            : {}),
          ...(field.narrative.suffix
            ? { suffix: localizedDraftText(field.narrative.suffix) }
            : {}),
        },
      }
    : {}),
  ...(field.type === 'boolean'
    ? {
        defaultValue: field.defaultBoolean,
        ...(field.narrative.whenTrue || field.narrative.whenFalse
          ? {
              narrative: {
                ...(field.narrative.whenTrue
                  ? { whenTrue: localizedDraftText(field.narrative.whenTrue) }
                  : {}),
                ...(field.narrative.whenFalse
                  ? { whenFalse: localizedDraftText(field.narrative.whenFalse) }
                  : {}),
              },
            }
          : {}),
      }
    : {}),
  ...(field.type === 'select'
    ? {
        options: field.options.map((option) => ({
          label: localizedDraftText(option.label),
          value: option.value,
          ...(option.narrative ? { narrative: localizedDraftText(option.narrative) } : {}),
        })),
        ...(field.defaultText ? { defaultValue: field.defaultText } : {}),
      }
    : {}),
  ...(field.type === 'multiselect'
    ? {
        options: field.options.map((option) => ({
          label: localizedDraftText(option.label),
          value: option.value,
          ...(option.narrative ? { narrative: localizedDraftText(option.narrative) } : {}),
        })),
        defaultValue: field.defaultMultiselect,
      }
    : {}),
})

const workflowPreview = computed(() => ({
  id: draft.id,
  title: localizedDraftText(draft.title),
  overview: localizedDraftText(draft.overview),
  sections: draft.sections.map((section) => ({
    id: section.id,
    title: localizedDraftText(section.title),
    fields: section.fields.map(createFieldPreview),
  })),
  redFlags: [],
  differentials: [],
  workup: [],
  hpiTemplate: localizedDraftText(draft.hpiTemplate),
}))

const formattedPreview = computed(() => JSON.stringify(workflowPreview.value, null, 2))

const availableTemplateFields = computed(() =>
  draft.sections.flatMap((section) =>
    section.fields.map((field) => ({
      key: field.key,
      label: field.label || field.key,
      token: field.type === 'multiselect' ? `{{ ${field.key} | list }}` : `{{ ${field.key} }}`,
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
    messages.push(`${t('builder.validationDuplicateSectionIds')}: ${duplicateSectionIds.join(', ')}`)
  }

  if (duplicateFieldKeys.length > 0) {
    messages.push(`${t('builder.validationDuplicateFieldKeys')}: ${duplicateFieldKeys.join(', ')}`)
  }

  for (const section of draft.sections) {
    for (const field of section.fields) {
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

  return messages
})
</script>

<template>
  <main class="workspace-page builder-page">
    <aside class="workspace-sidebar">
      <RouterLink class="brand" to="/">DxNavigator</RouterLink>
      <AppPreferences />

      <nav class="app-section-nav" aria-label="Application sections">
        <RouterLink class="complaint-option" to="/private/complaints/chest-pain">
          {{ t('builder.nav.workspace') }}
        </RouterLink>
        <RouterLink class="complaint-option selected" to="/private/builder">
          {{ t('builder.nav.builder') }}
        </RouterLink>
      </nav>
    </aside>

    <section class="workspace-content">
      <header class="complaint-header">
        <p class="eyebrow">{{ t('builder.eyebrow') }}</p>
        <h1>{{ t('builder.title') }}</h1>
        <p>{{ t('builder.description') }}</p>
      </header>

      <div class="builder-layout">
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
                <span>{{ t('builder.workflowId') }}</span>
                <input
                  class="text-input"
                  type="text"
                  :value="draft.id"
                  @input="updateWorkflowId"
                />
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
                      <span>{{ t('builder.sectionId') }}</span>
                      <input
                        class="text-input"
                        type="text"
                        :value="section.id"
                        @input="updateSectionId(section, $event)"
                      />
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
                        {{ fieldType }}
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
                    <button class="danger-action" type="button" @click="removeField(section, field)">
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
                          <span>{{ t('builder.helperText') }}</span>
                          <input v-model="field.helperText" class="text-input" type="text" />
                        </label>
                      </div>

                      <div v-if="field.type === 'text'" class="field-settings-group">
                        <h4>{{ t('builder.textSettings') }}</h4>
                        <div class="builder-form-grid">
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
                          <button class="secondary-action compact-action" type="button" @click="addOption(field)">
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
                          <button class="danger-action" type="button" @click="removeOption(field, option)">
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
                    @input="updateFieldKey(getNewField(section.uid), $event)"
                  />
                  <select v-model="getNewField(section.uid).type" class="text-input">
                    <option v-for="fieldType in fieldTypes" :key="fieldType" :value="fieldType">
                      {{ fieldType }}
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
              <h2>{{ t('builder.generatedNoteTitle') }}</h2>
              <p class="section-description">{{ t('builder.generatedNoteDescription') }}</p>
            </div>

            <label class="builder-field">
              <span>{{ t('builder.generatedNote') }}</span>
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
                <code v-pre>{{ radiation | list }}</code>
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
              <button class="secondary-action compact-action" type="button" @click="downloadWorkflowJson">
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

          <pre class="schema-preview">{{ formattedPreview }}</pre>
        </aside>
      </div>
    </section>
  </main>
</template>
