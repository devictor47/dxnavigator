<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import ClinicalGuidanceLibrary from '@/components/ClinicalGuidanceLibrary.vue'
import DifferentialList from '@/components/DifferentialList.vue'
import DynamicClinicalForm from '@/components/DynamicClinicalForm.vue'
import HpiPreview from '@/components/HpiPreview.vue'
import PrivateWorkspaceShell from '@/components/PrivateWorkspaceShell.vue'
import RedFlagList from '@/components/RedFlagList.vue'
import WorkflowPresetSelector from '@/components/WorkflowPresetSelector.vue'
import WorkupList from '@/components/WorkupList.vue'
import { useI18n } from '@/composables/useI18n'
import { getClinicalModuleById } from '@/data/modules'
import {
  createWorkflowSession,
  type ClinicalWorkflow,
  type ModuleAnswers,
  type ModuleAnswerValue,
  type WorkflowPreset,
} from '@/data/workflow'
import { resolveText, type TranslatableText } from '@/i18n/locales'

const { locale, t } = useI18n()
const route = useRoute()
const presetConfirmationStorageKey = 'dxnavigator-skip-preset-confirmation'

const selectedModule = computed(() => getClinicalModuleById(route.params.moduleId))
const isPreviewSticky = ref(false)
const session = ref(createWorkflowSession(selectedModule.value))
const pendingPreset = ref<WorkflowPreset | null>(null)
const activePresetId = ref<string>()
const highlightedPresetAnswers = ref<ModuleAnswers>({})
const rememberPresetConfirmation = ref(false)
const isSummaryOpen = ref(false)
const summaryElement = ref<HTMLElement | null>(null)

const shouldSkipPresetConfirmation = (): boolean => {
  if (typeof window === 'undefined') {
    return false
  }

  return window.localStorage.getItem(presetConfirmationStorageKey) === 'true'
}

watch(selectedModule, (workflow: ClinicalWorkflow) => {
  session.value = createWorkflowSession(workflow)
  pendingPreset.value = null
  activePresetId.value = undefined
  highlightedPresetAnswers.value = {}
})

const text = (value: TranslatableText): string => resolveText(value, locale.value)

const generatedHpi = computed(() => session.value.generateHpi(locale.value))

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
  const nextSession = createWorkflowSession(selectedModule.value)

  for (const [fieldKey, value] of Object.entries(preset.answers)) {
    nextSession.setAnswer(fieldKey, copyAnswerValue(value))
  }

  session.value = nextSession
  activePresetId.value = preset.id
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
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('keydown', handleDocumentKeydown)
})
</script>

<template>
  <PrivateWorkspaceShell active-section="workspace" :selected-workflow-id="selectedModule.id">
    <section class="workspace-content">
      <header class="complaint-header">
        <p class="eyebrow">{{ t('workspace.eyebrow') }}</p>
        <h1>{{ text(selectedModule.title) }}</h1>
        <p>{{ text(selectedModule.overview) }}</p>
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

            <div class="help-control">
              <a class="help-link" href="#clinical-guidance" aria-describedby="guidance-popover">
                {{ t('common.help') }}
              </a>
              <div id="guidance-popover" class="help-popover" role="tooltip">
                <strong>{{ t('workspace.helpTitle') }}</strong>
                <span>{{ t('workspace.helpBody') }}</span>
              </div>
            </div>
          </div>

          <div class="form-card-scroll">
            <WorkflowPresetSelector
              :presets="selectedModule.presets"
              :active-preset-id="activePresetId"
              @apply="requestPreset"
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
    </section>

    <nav
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
          {{ text(section.title) }}
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
          <strong>{{ text(pendingPreset.title) }}</strong>
          <span v-if="pendingPreset.description">{{ text(pendingPreset.description) }}</span>
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
  </PrivateWorkspaceShell>
</template>
