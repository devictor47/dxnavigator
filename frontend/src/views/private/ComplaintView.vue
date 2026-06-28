<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ClinicalGuidanceLibrary from '@/components/ClinicalGuidanceLibrary.vue'
import DifferentialList from '@/components/DifferentialList.vue'
import DynamicClinicalForm from '@/components/DynamicClinicalForm.vue'
import HpiPreview from '@/components/HpiPreview.vue'
import PrivateWorkspaceShell from '@/components/PrivateWorkspaceShell.vue'
import RedFlagList from '@/components/RedFlagList.vue'
import WorkflowPresetSelector from '@/components/WorkflowPresetSelector.vue'
import WorkupList from '@/components/WorkupList.vue'
import {
  deleteUserWorkflow,
  fetchUserWorkflow,
  fetchUserWorkflows,
  type PublishedWorkflow,
  publishUserWorkflow,
  updatePublishedWorkflow,
} from '@/api/userWorkflows'
import { useI18n } from '@/composables/useI18n'
import { useNotifications } from '@/composables/useNotifications'
import {
  createWorkflowSession,
  type ClinicalWorkflow,
  type ModuleAnswers,
  type ModuleAnswerValue,
  type WorkflowSession,
  type WorkflowPreset,
} from '@/data/workflow'
import { bundledWorkflowEntries, getClinicalModuleById } from '@/data/modules'

const { locale, t } = useI18n()
const { notify } = useNotifications()
const route = useRoute()
const router = useRouter()
const presetConfirmationStorageKey = 'dxnavigator-skip-preset-confirmation'

type PersistedPresetState = {
  presets: WorkflowPreset[]
  deletedPresetIds: string[]
}

type PresetFormState = {
  mode: 'create' | 'edit'
  presetId?: string
  title: string
  description: string
}

const selectedWorkflowId = computed(() => {
  const moduleId = route.params.moduleId

  return Array.isArray(moduleId) ? (moduleId[0] ?? '') : (moduleId ?? '')
})

const selectedModule = ref<ClinicalWorkflow | null>(null)
const selectedPublishedWorkflow = ref<PublishedWorkflow | null>(null)
const isPreviewSticky = ref(false)
const session = ref<WorkflowSession | null>(null)
const isLoadingWorkflow = ref(true)
const workflowLoadError = ref('')
const pendingPreset = ref<WorkflowPreset | null>(null)
const pendingPresetDelete = ref<WorkflowPreset | null>(null)
const pendingSaveDecisionPreset = ref<WorkflowPreset | null>(null)
const isPublishConfirmationOpen = ref(false)
const isPublishingWorkflow = ref(false)
const publishWithAuthorName = ref(false)
const isRemoveWorkflowConfirmationOpen = ref(false)
const isRemovingWorkflow = ref(false)
const presetForm = ref<PresetFormState | null>(null)
const activePresetId = ref<string>()
const activePresetBaselineAnswers = ref<ModuleAnswers | null>(null)
const highlightedPresetAnswers = ref<ModuleAnswers>({})
const rememberPresetConfirmation = ref(false)
const isSummaryOpen = ref(false)
const summaryElement = ref<HTMLElement | null>(null)
const generatedHpi = ref('')
const localPresetState = ref<PersistedPresetState>({
  presets: [],
  deletedPresetIds: [],
})
let hpiDebounceId: number | undefined
let hasGeneratedInitialHpi = false

const presetStorageKey = computed(() => {
  const workflowId = selectedWorkflowId.value || 'none'

  return `dxnavigator-presets:user-workflow:${workflowId}:${locale.value}`
})

const cloneAnswers = (answers: ModuleAnswers): ModuleAnswers =>
  Object.fromEntries(
    Object.entries(answers).map(([key, value]) => [key, Array.isArray(value) ? [...value] : value]),
  )

const normalizeAnswers = (answers: ModuleAnswers): [string, ModuleAnswerValue][] =>
  Object.entries(answers)
    .map(
      ([key, value]): [string, ModuleAnswerValue] => [
        key,
        Array.isArray(value) ? [...value].sort() : value,
      ],
    )
    .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))

const areAnswersEqual = (left: ModuleAnswers, right: ModuleAnswers): boolean =>
  JSON.stringify(normalizeAnswers(left)) === JSON.stringify(normalizeAnswers(right))

const createPresetId = (title: string): string => {
  const baseId =
    title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'preset'

  return `${baseId}-${Date.now()}`
}

const isPresetState = (value: unknown): value is PersistedPresetState => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false
  }

  const candidate = value as Partial<PersistedPresetState>

  return Array.isArray(candidate.presets) && Array.isArray(candidate.deletedPresetIds)
}

const loadLocalPresetState = (): void => {
  if (typeof window === 'undefined') {
    return
  }

  const storedValue = window.localStorage.getItem(presetStorageKey.value)

  if (!storedValue) {
    localPresetState.value = {
      presets: [],
      deletedPresetIds: [],
    }
    return
  }

  try {
    const parsedValue = JSON.parse(storedValue)

    localPresetState.value = isPresetState(parsedValue)
      ? {
          presets: parsedValue.presets,
          deletedPresetIds: parsedValue.deletedPresetIds,
        }
      : {
          presets: [],
          deletedPresetIds: [],
        }
  } catch {
    localPresetState.value = {
      presets: [],
      deletedPresetIds: [],
    }
  }
}

const saveLocalPresetState = (): void => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(presetStorageKey.value, JSON.stringify(localPresetState.value))
}

const bundledPresetIds = computed(
  () => new Set((selectedModule.value?.presets ?? []).map((preset) => preset.id)),
)

const mergedPresets = computed<WorkflowPreset[]>(() => {
  const deletedPresetIds = new Set(localPresetState.value.deletedPresetIds)
  const localPresetById = new Map(localPresetState.value.presets.map((preset) => [preset.id, preset]))
  const bundledPresets = selectedModule.value?.presets ?? []
  const visibleBundledPresets = bundledPresets
    .filter((preset) => !deletedPresetIds.has(preset.id))
    .map((preset) => localPresetById.get(preset.id) ?? preset)
  const userOnlyPresets = localPresetState.value.presets.filter(
    (preset) => !bundledPresetIds.value.has(preset.id) && !deletedPresetIds.has(preset.id),
  )

  return [...visibleBundledPresets, ...userOnlyPresets]
})

const activePreset = computed(() =>
  mergedPresets.value.find((preset) => preset.id === activePresetId.value),
)

const hasUnsavedPresetChanges = computed(() => {
  return Boolean(
    activePresetId.value &&
      activePresetBaselineAnswers.value &&
      session.value &&
      !areAnswersEqual(session.value.answers, activePresetBaselineAnswers.value),
  )
})

const shouldSkipPresetConfirmation = (): boolean => {
  if (typeof window === 'undefined') {
    return false
  }

  return window.localStorage.getItem(presetConfirmationStorageKey) === 'true'
}

const refreshGeneratedHpi = (): void => {
  generatedHpi.value = session.value?.generateHpi(locale.value) ?? ''
  hasGeneratedInitialHpi = true
}

const scheduleGeneratedHpiRefresh = (): void => {
  if (!hasGeneratedInitialHpi) {
    refreshGeneratedHpi()
    return
  }

  if (hpiDebounceId) {
    window.clearTimeout(hpiDebounceId)
  }

  hpiDebounceId = window.setTimeout(() => {
    refreshGeneratedHpi()
    hpiDebounceId = undefined
  }, 120)
}

const resetWorkflowState = (): void => {
  pendingPreset.value = null
  pendingPresetDelete.value = null
  pendingSaveDecisionPreset.value = null
  presetForm.value = null
  activePresetId.value = undefined
  activePresetBaselineAnswers.value = null
  highlightedPresetAnswers.value = {}
  localPresetState.value = {
    presets: [],
    deletedPresetIds: [],
  }
  hasGeneratedInitialHpi = false
}

const getRouteWorkflowId = (): number | null => {
  const workflowId = Number(selectedWorkflowId.value)

  return Number.isInteger(workflowId) && workflowId > 0 ? workflowId : null
}

const isPersistedWorkflow = computed(() => getRouteWorkflowId() !== null)

const loadWorkflowFromRoute = async (): Promise<void> => {
  isLoadingWorkflow.value = true
  workflowLoadError.value = ''

  try {
    let workflowId = getRouteWorkflowId()

    if (!workflowId) {
      if (selectedWorkflowId.value) {
        const bundledWorkflow = getClinicalModuleById(selectedWorkflowId.value, locale.value)

        selectedModule.value = bundledWorkflow
        selectedPublishedWorkflow.value = null
        session.value = createWorkflowSession(bundledWorkflow)
        resetWorkflowState()
        loadLocalPresetState()
        refreshGeneratedHpi()
        return
      }

      const workflows = await fetchUserWorkflows()
      const firstWorkflow = workflows[0]

      if (!firstWorkflow) {
        const firstBundledWorkflow = bundledWorkflowEntries[0]

        if (!firstBundledWorkflow) {
          selectedModule.value = null
          selectedPublishedWorkflow.value = null
          session.value = null
          generatedHpi.value = ''
          resetWorkflowState()
          return
        }

        await router.replace(`/private/complaints/${firstBundledWorkflow.localKey}`)
        return
      }

      await router.replace(`/private/complaints/${firstWorkflow.id}`)
      workflowId = firstWorkflow.id
    }

    const savedWorkflow = await fetchUserWorkflow(workflowId)

    selectedModule.value = savedWorkflow.definition
    selectedPublishedWorkflow.value = savedWorkflow.publishedWorkflow ?? null
    session.value = createWorkflowSession(savedWorkflow.definition)
    resetWorkflowState()
    loadLocalPresetState()
    refreshGeneratedHpi()
  } catch {
    selectedModule.value = null
    selectedPublishedWorkflow.value = null
    session.value = null
    generatedHpi.value = ''
    resetWorkflowState()
    workflowLoadError.value = t('workspace.loadFailed')
  } finally {
    isLoadingWorkflow.value = false
  }
}

watch(
  () => route.params.moduleId,
  () => {
    void loadWorkflowFromRoute()
  },
  { immediate: true },
)

watch(() => [session.value?.answers, locale.value], scheduleGeneratedHpiRefresh, {
  deep: true,
  immediate: true,
})

const copyAnswerValue = (value: ModuleAnswerValue): ModuleAnswerValue => {
  return Array.isArray(value) ? [...value] : value
}

const shouldHighlightPresetValue = (value: ModuleAnswerValue): boolean => {
  if (Array.isArray(value)) {
    return value.length > 0
  }

  if (typeof value === 'string') {
    return value.trim().length > 0
  }

  return value
}

const applyPreset = (preset: WorkflowPreset): void => {
  if (!selectedModule.value) {
    return
  }

  const nextSession = createWorkflowSession(selectedModule.value)

  for (const [fieldKey, value] of Object.entries(preset.answers)) {
    nextSession.setAnswer(fieldKey, copyAnswerValue(value))
  }

  session.value = nextSession
  activePresetId.value = preset.id
  activePresetBaselineAnswers.value = cloneAnswers(preset.answers)
  highlightedPresetAnswers.value = Object.fromEntries(
    Object.entries(preset.answers).filter(([, value]) => shouldHighlightPresetValue(value)),
  )
}

const requestPreset = (preset: WorkflowPreset): void => {
  if (shouldSkipPresetConfirmation()) {
    applyPreset(preset)
    return
  }

  rememberPresetConfirmation.value = false
  pendingPreset.value = preset
}

const confirmPreset = (): void => {
  if (!pendingPreset.value) {
    return
  }

  if (rememberPresetConfirmation.value && typeof window !== 'undefined') {
    window.localStorage.setItem(presetConfirmationStorageKey, 'true')
  }

  applyPreset(pendingPreset.value)
  pendingPreset.value = null
}

const cancelPreset = (): void => {
  pendingPreset.value = null
  rememberPresetConfirmation.value = false
}

const upsertLocalPreset = (preset: WorkflowPreset): void => {
  const nextPresets = localPresetState.value.presets.filter(
    (currentPreset) => currentPreset.id !== preset.id,
  )

  localPresetState.value = {
    presets: [...nextPresets, preset],
    deletedPresetIds: localPresetState.value.deletedPresetIds.filter(
      (presetId) => presetId !== preset.id,
    ),
  }

  saveLocalPresetState()
}

const createPresetFromCurrentAnswers = (title: string, description: string): WorkflowPreset => ({
  id: createPresetId(title),
  title,
  ...(description.trim() ? { description: description.trim() } : {}),
  answers: cloneAnswers(session.value?.answers ?? {}),
})

const openCreatePresetForm = (): void => {
  presetForm.value = {
    mode: 'create',
    title: '',
    description: '',
  }
}

const openEditPresetForm = (preset: WorkflowPreset): void => {
  presetForm.value = {
    mode: 'edit',
    presetId: preset.id,
    title: preset.title,
    description: preset.description ?? '',
  }
}

const closePresetForm = (): void => {
  presetForm.value = null
}

const savePresetForm = (): void => {
  if (!presetForm.value || !presetForm.value.title.trim()) {
    return
  }

  const title = presetForm.value.title.trim()
  const description = presetForm.value.description.trim()

  if (presetForm.value.mode === 'edit' && presetForm.value.presetId) {
    const existingPreset = mergedPresets.value.find(
      (preset) => preset.id === presetForm.value?.presetId,
    )

    if (!existingPreset) {
      closePresetForm()
      return
    }

    upsertLocalPreset({
      ...existingPreset,
      title,
      ...(description ? { description } : { description: undefined }),
    })

    closePresetForm()
    return
  }

  const newPreset = createPresetFromCurrentAnswers(title, description)
  upsertLocalPreset(newPreset)
  activePresetId.value = newPreset.id
  activePresetBaselineAnswers.value = cloneAnswers(newPreset.answers)
  highlightedPresetAnswers.value = Object.fromEntries(
    Object.entries(newPreset.answers).filter(([, value]) => shouldHighlightPresetValue(value)),
  )
  closePresetForm()
}

const requestSavePreset = (): void => {
  if (activePreset.value && hasUnsavedPresetChanges.value) {
    pendingSaveDecisionPreset.value = activePreset.value
    return
  }

  if (activePreset.value) {
    openEditPresetForm(activePreset.value)
    return
  }

  openCreatePresetForm()
}

const replaceActivePreset = (): void => {
  if (!pendingSaveDecisionPreset.value) {
    return
  }

  const nextPreset: WorkflowPreset = {
    ...pendingSaveDecisionPreset.value,
    answers: cloneAnswers(session.value?.answers ?? {}),
  }

  upsertLocalPreset(nextPreset)
  activePresetId.value = nextPreset.id
  activePresetBaselineAnswers.value = cloneAnswers(nextPreset.answers)
  highlightedPresetAnswers.value = Object.fromEntries(
    Object.entries(nextPreset.answers).filter(([, value]) => shouldHighlightPresetValue(value)),
  )
  pendingSaveDecisionPreset.value = null
}

const saveActivePresetAsNew = (): void => {
  pendingSaveDecisionPreset.value = null
  openCreatePresetForm()
}

const cancelSaveDecision = (): void => {
  pendingSaveDecisionPreset.value = null
}

const requestDeletePreset = (preset: WorkflowPreset): void => {
  pendingPresetDelete.value = preset
}

const cancelDeletePreset = (): void => {
  pendingPresetDelete.value = null
}

const confirmDeletePreset = (): void => {
  if (!pendingPresetDelete.value) {
    return
  }

  const presetId = pendingPresetDelete.value.id
  const deletedPresetIds = bundledPresetIds.value.has(presetId)
    ? Array.from(new Set([...localPresetState.value.deletedPresetIds, presetId]))
    : localPresetState.value.deletedPresetIds

  localPresetState.value = {
    presets: localPresetState.value.presets.filter((preset) => preset.id !== presetId),
    deletedPresetIds,
  }

  if (activePresetId.value === presetId) {
    activePresetId.value = undefined
    activePresetBaselineAnswers.value = null
    highlightedPresetAnswers.value = {}
  }

  saveLocalPresetState()
  pendingPresetDelete.value = null
}

const requestPublishWorkflow = (): void => {
  if (!getRouteWorkflowId()) {
    notify({
      type: 'warn',
      title: t('builder.publishNeedsSaveTitle'),
      message: t('builder.publishNeedsSaveMessage'),
    })
    return
  }

  publishWithAuthorName.value = false
  isPublishConfirmationOpen.value = true
}

const cancelPublishWorkflow = (): void => {
  isPublishConfirmationOpen.value = false
  publishWithAuthorName.value = false
}

const confirmPublishWorkflow = async (): Promise<void> => {
  const workflowId = getRouteWorkflowId()

  if (!workflowId) {
    return
  }

  isPublishingWorkflow.value = true

  try {
    await publishUserWorkflow(workflowId, publishWithAuthorName.value)
    const savedWorkflow = await fetchUserWorkflow(workflowId)
    selectedPublishedWorkflow.value = savedWorkflow.publishedWorkflow ?? null
    isPublishConfirmationOpen.value = false
    publishWithAuthorName.value = false
    notify({
      type: 'message',
      title: t('builder.publishSuccessTitle'),
      message: t('builder.publishSuccessMessage'),
    })
  } catch {
    notify({
      type: 'error',
      title: t('builder.publishFailedTitle'),
      message: t('builder.publishFailedMessage'),
    })
  } finally {
    isPublishingWorkflow.value = false
  }
}

const updatePublishedFromCurrentWorkflow = async (): Promise<void> => {
  const workflowId = getRouteWorkflowId()

  if (!workflowId) {
    return
  }

  isPublishingWorkflow.value = true

  try {
    selectedPublishedWorkflow.value = await updatePublishedWorkflow(workflowId)
    notify({
      type: 'message',
      title: t('builder.publishUpdateSuccessTitle'),
      message: t('builder.publishUpdateSuccessMessage'),
    })
  } catch {
    notify({
      type: 'error',
      title: t('builder.publishUpdateFailedTitle'),
      message: t('builder.publishUpdateFailedMessage'),
    })
  } finally {
    isPublishingWorkflow.value = false
  }
}

const requestRemoveWorkflow = (): void => {
  if (!getRouteWorkflowId()) {
    return
  }

  isRemoveWorkflowConfirmationOpen.value = true
}

const cancelRemoveWorkflow = (): void => {
  isRemoveWorkflowConfirmationOpen.value = false
}

const confirmRemoveWorkflow = async (): Promise<void> => {
  const workflowId = getRouteWorkflowId()

  if (!workflowId) {
    return
  }

  isRemovingWorkflow.value = true

  try {
    await deleteUserWorkflow(workflowId)
    isRemoveWorkflowConfirmationOpen.value = false
    notify({
      type: 'message',
      title: t('workspace.removeSuccessTitle'),
      message: t('workspace.removeSuccessMessage'),
    })
    await router.push('/private/complaints')
  } catch {
    notify({
      type: 'error',
      title: t('workspace.removeFailedTitle'),
      message: t('workspace.removeFailedMessage'),
    })
  } finally {
    isRemovingWorkflow.value = false
  }
}

const closeSummary = (): void => {
  isSummaryOpen.value = false
}

const toggleSummary = (): void => {
  isSummaryOpen.value = !isSummaryOpen.value
}

const handleDocumentClick = (event: MouseEvent): void => {
  const eventTarget = event.target as Node

  if (!summaryElement.value?.contains(eventTarget)) {
    closeSummary()
  }
}

const handleDocumentKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    closeSummary()
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('keydown', handleDocumentKeydown)
})

onBeforeUnmount(() => {
  if (hpiDebounceId) {
    window.clearTimeout(hpiDebounceId)
  }

  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('keydown', handleDocumentKeydown)
})
</script>

<template>
  <PrivateWorkspaceShell active-section="workspace" :selected-workflow-id="selectedWorkflowId">
    <section class="workspace-content">
      <section v-if="isLoadingWorkflow" class="form-card workspace-state-card">
        <p class="eyebrow">{{ t('workspace.eyebrow') }}</p>
        <h1>{{ t('workspace.loading') }}</h1>
      </section>

      <section v-else-if="workflowLoadError" class="form-card workspace-state-card">
        <p class="eyebrow">{{ t('workspace.eyebrow') }}</p>
        <h1>{{ t('workspace.loadFailed') }}</h1>
        <p>{{ workflowLoadError }}</p>
      </section>

      <section v-else-if="!selectedModule || !session" class="form-card workspace-state-card">
        <p class="eyebrow">{{ t('workspace.eyebrow') }}</p>
        <h1>{{ t('workspace.emptyTitle') }}</h1>
        <p>{{ t('workspace.emptyDescription') }}</p>
        <RouterLink class="primary-action compact-action" to="/private/builder">
          {{ t('builder.nav.builder') }}
        </RouterLink>
      </section>

      <template v-else>
        <header class="complaint-header">
          <p class="eyebrow">{{ t('workspace.eyebrow') }}</p>
          <h1>{{ selectedModule.title }}</h1>
          <p>{{ selectedModule.overview }}</p>
          <div class="builder-row-actions">
            <RouterLink
              class="secondary-action compact-action"
              :to="`/private/builder/${selectedWorkflowId}`"
            >
              {{ t('builder.editWorkflow') }}
            </RouterLink>
            <template v-if="isPersistedWorkflow">
              <button
                v-if="selectedPublishedWorkflow"
                class="secondary-action compact-action"
                type="button"
                :disabled="isPublishingWorkflow"
                @click="updatePublishedFromCurrentWorkflow"
              >
                {{
                  isPublishingWorkflow
                    ? t('builder.publishing')
                    : t('builder.updatePublishedWorkflow')
                }}
              </button>
              <button
                v-else
                class="secondary-action compact-action"
                type="button"
                :disabled="isPublishingWorkflow"
                @click="requestPublishWorkflow"
              >
                {{ isPublishingWorkflow ? t('builder.publishing') : t('builder.publishWorkflow') }}
              </button>
              <button
                class="danger-action compact-action"
                type="button"
                :disabled="isRemovingWorkflow"
                @click="requestRemoveWorkflow"
              >
                {{ t('marketplace.removeWorkflow') }}
              </button>
            </template>
          </div>
        </header>

        <div class="clinical-workbench">
          <HpiPreview
            :narrative="generatedHpi"
            :sticky="isPreviewSticky"
            @toggle-sticky="isPreviewSticky = !isPreviewSticky"
          />

          <section class="form-card" aria-labelledby="form-card-title">
            <div class="form-card-header">
              <div>
                <p class="eyebrow">{{ t('workspace.formEyebrow') }}</p>
                <h2 id="form-card-title">{{ t('workspace.formTitle') }}</h2>
              </div>
            </div>

            <div class="form-card-scroll">
              <WorkflowPresetSelector
                :presets="mergedPresets"
                :active-preset-id="activePresetId"
                :has-unsaved-preset-changes="hasUnsavedPresetChanges"
                @apply="requestPreset"
                @save="requestSavePreset"
                @edit="openEditPresetForm"
                @remove="requestDeletePreset"
              />

              <DynamicClinicalForm
                :session="session"
                :highlighted-answers="highlightedPresetAnswers"
              />

              <div id="clinical-guidance" class="workflow-grid guidance-grid">
                <RedFlagList :red-flags="selectedModule.redFlags" />
                <DifferentialList :differentials="selectedModule.differentials" />
                <WorkupList :workup="selectedModule.workup" />
              </div>

              <ClinicalGuidanceLibrary
                id="guidance-library"
                :quick-guides="selectedModule.quickGuides"
                :source-figures="selectedModule.sourceFigures"
              />
            </div>
          </section>
        </div>
      </template>
    </section>

    <nav
      v-if="selectedModule"
      ref="summaryElement"
      class="page-summary"
      :class="{ open: isSummaryOpen }"
      aria-label="Page summary"
    >
      <button
        class="page-summary-label"
        type="button"
        :aria-expanded="isSummaryOpen"
        @click="toggleSummary"
      >
        {{ t('summary.title') }}
      </button>
      <div class="page-summary-panel">
        <a
          v-for="section in selectedModule.sections"
          :key="section.id"
          :href="`#workflow-section-${section.id}`"
          @click="closeSummary"
        >
          {{ section.title }}
        </a>
        <a href="#clinical-guidance" @click="closeSummary">{{ t('summary.clinicalGuidance') }}</a>
        <a href="#guidance-library" @click="closeSummary">{{ t('summary.guidanceLibrary') }}</a>
      </div>
    </nav>

    <div v-if="pendingPreset" class="modal-backdrop" role="presentation" @click="cancelPreset">
      <section
        class="confirmation-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preset-confirmation-title"
        @click.stop
      >
        <div class="section-heading">
          <p class="eyebrow">{{ t('presets.confirmEyebrow') }}</p>
          <h2 id="preset-confirmation-title">{{ t('presets.confirmTitle') }}</h2>
          <p class="section-description">
            {{ t('presets.confirmDescription') }}
          </p>
        </div>

        <div class="preset-confirmation-target">
          <strong>{{ pendingPreset.title }}</strong>
          <span v-if="pendingPreset.description">{{ pendingPreset.description }}</span>
        </div>

        <label class="check-option single-check">
          <input v-model="rememberPresetConfirmation" type="checkbox" />
          <span>{{ t('presets.rememberDecision') }}</span>
        </label>

        <div class="dialog-actions">
          <button class="secondary-action compact-action" type="button" @click="cancelPreset">
            {{ t('common.cancel') }}
          </button>
          <button class="primary-action compact-action" type="button" @click="confirmPreset">
            {{ t('presets.replaceForm') }}
          </button>
        </div>
      </section>
    </div>

    <div
      v-if="pendingSaveDecisionPreset"
      class="modal-backdrop"
      role="presentation"
      @click="cancelSaveDecision"
    >
      <section
        class="confirmation-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preset-save-decision-title"
        @click.stop
      >
        <div class="section-heading">
          <p class="eyebrow">{{ t('presets.saveEyebrow') }}</p>
          <h2 id="preset-save-decision-title">{{ t('presets.saveDecisionTitle') }}</h2>
          <p class="section-description">
            {{ t('presets.saveDecisionDescription') }}
          </p>
        </div>

        <div class="preset-confirmation-target">
          <strong>{{ pendingSaveDecisionPreset.title }}</strong>
          <span v-if="pendingSaveDecisionPreset.description">
            {{ pendingSaveDecisionPreset.description }}
          </span>
        </div>

        <div class="dialog-actions">
          <button class="secondary-action compact-action" type="button" @click="cancelSaveDecision">
            {{ t('common.cancel') }}
          </button>
          <button class="secondary-action compact-action" type="button" @click="saveActivePresetAsNew">
            {{ t('presets.saveAsNew') }}
          </button>
          <button class="primary-action compact-action" type="button" @click="replaceActivePreset">
            {{ t('presets.replacePreset') }}
          </button>
        </div>
      </section>
    </div>

    <div v-if="presetForm" class="modal-backdrop" role="presentation" @click="closePresetForm">
      <section
        class="confirmation-dialog preset-form-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preset-form-title"
        @click.stop
      >
        <div class="section-heading">
          <p class="eyebrow">{{ t('presets.eyebrow') }}</p>
          <h2 id="preset-form-title">
            {{ presetForm.mode === 'edit' ? t('presets.editTitle') : t('presets.newTitle') }}
          </h2>
          <p class="section-description">
            {{
              presetForm.mode === 'edit'
                ? t('presets.editDescription')
                : t('presets.newDescription')
            }}
          </p>
        </div>

        <label class="builder-field">
          <span>{{ t('presets.name') }}</span>
          <input v-model="presetForm.title" class="text-input" type="text" />
        </label>

        <label class="builder-field">
          <span>{{ t('presets.details') }}</span>
          <textarea v-model="presetForm.description" class="text-input builder-textarea" rows="3" />
        </label>

        <div class="dialog-actions">
          <button class="secondary-action compact-action" type="button" @click="closePresetForm">
            {{ t('common.cancel') }}
          </button>
          <button
            class="primary-action compact-action"
            type="button"
            :disabled="!presetForm.title.trim()"
            @click="savePresetForm"
          >
            {{ t('common.save') }}
          </button>
        </div>
      </section>
    </div>

    <div
      v-if="pendingPresetDelete"
      class="modal-backdrop"
      role="presentation"
      @click="cancelDeletePreset"
    >
      <section
        class="confirmation-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preset-delete-title"
        @click.stop
      >
        <div class="section-heading">
          <p class="eyebrow">{{ t('presets.deleteEyebrow') }}</p>
          <h2 id="preset-delete-title">{{ t('presets.deleteTitle') }}</h2>
          <p class="section-description">{{ t('presets.deleteDescription') }}</p>
        </div>

        <div class="preset-confirmation-target">
          <strong>{{ pendingPresetDelete.title }}</strong>
          <span v-if="pendingPresetDelete.description">{{ pendingPresetDelete.description }}</span>
        </div>

        <div class="dialog-actions">
          <button class="secondary-action compact-action" type="button" @click="cancelDeletePreset">
            {{ t('common.cancel') }}
          </button>
          <button class="danger-action compact-action" type="button" @click="confirmDeletePreset">
            {{ t('common.remove') }}
          </button>
        </div>
      </section>
    </div>

    <div
      v-if="isPublishConfirmationOpen && selectedModule"
      class="modal-backdrop"
      role="presentation"
      @click="cancelPublishWorkflow"
    >
      <section
        class="confirmation-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="publish-workflow-title"
        @click.stop
      >
        <div class="section-heading">
          <p class="eyebrow">{{ t('builder.publishEyebrow') }}</p>
          <h2 id="publish-workflow-title">{{ t('builder.publishTitle') }}</h2>
          <p class="section-description">{{ t('builder.publishDescription') }}</p>
        </div>

        <div class="preset-confirmation-target">
          <strong>{{ selectedModule.title }}</strong>
          <span>{{ t('builder.publishWarning') }}</span>
        </div>

        <label class="check-option single-check">
          <input v-model="publishWithAuthorName" type="checkbox" />
          <span>{{ t('builder.publishWithAuthorName') }}</span>
        </label>

        <p class="section-description">{{ t('builder.publishAnonymousDefault') }}</p>

        <div class="dialog-actions">
          <button
            class="secondary-action compact-action"
            type="button"
            :disabled="isPublishingWorkflow"
            @click="cancelPublishWorkflow"
          >
            {{ t('common.cancel') }}
          </button>
          <button
            class="primary-action compact-action"
            type="button"
            :disabled="isPublishingWorkflow"
            @click="confirmPublishWorkflow"
          >
            {{ isPublishingWorkflow ? t('builder.publishing') : t('builder.confirmPublish') }}
          </button>
        </div>
      </section>
    </div>

    <div
      v-if="isRemoveWorkflowConfirmationOpen && selectedModule"
      class="modal-backdrop"
      role="presentation"
      @click="cancelRemoveWorkflow"
    >
      <section
        class="confirmation-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="remove-workflow-title"
        @click.stop
      >
        <div class="section-heading">
          <p class="eyebrow">{{ t('workspace.removeEyebrow') }}</p>
          <h2 id="remove-workflow-title">{{ t('workspace.removeTitle') }}</h2>
          <p class="section-description">{{ t('workspace.removeDescription') }}</p>
        </div>

        <div class="preset-confirmation-target">
          <strong>{{ selectedModule.title }}</strong>
          <span>{{ t('workspace.removeWarning') }}</span>
        </div>

        <div class="dialog-actions">
          <button
            class="secondary-action compact-action"
            type="button"
            :disabled="isRemovingWorkflow"
            @click="cancelRemoveWorkflow"
          >
            {{ t('common.cancel') }}
          </button>
          <button
            class="danger-action compact-action"
            type="button"
            :disabled="isRemovingWorkflow"
            @click="confirmRemoveWorkflow"
          >
            {{ isRemovingWorkflow ? t('workspace.removing') : t('common.remove') }}
          </button>
        </div>
      </section>
    </div>
  </PrivateWorkspaceShell>
</template>
