<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import AppPreferences from '@/components/AppPreferences.vue'
import ComplaintSelector from '@/components/ComplaintSelector.vue'
import DifferentialList from '@/components/DifferentialList.vue'
import DynamicClinicalForm from '@/components/DynamicClinicalForm.vue'
import HpiPreview from '@/components/HpiPreview.vue'
import RedFlagList from '@/components/RedFlagList.vue'
import WorkupList from '@/components/WorkupList.vue'
import { useI18n } from '@/composables/useI18n'
import { clinicalModules, getClinicalModuleById } from '@/data/modules'
import { createInitialAnswers, type ClinicalWorkflow, type ModuleAnswers } from '@/data/workflow'

const { t } = useI18n()
const route = useRoute()
const workflowLinks = clinicalModules.map((module) => ({
  id: module.id,
  name: module.title,
  to: `/private/complaints/${module.id}`,
}))

const answers = reactive<ModuleAnswers>({})
const selectedModule = computed(() => getClinicalModuleById(route.params.moduleId))
const isPreviewSticky = ref(true)

const resetAnswers = (module: ClinicalWorkflow) => {
  for (const key of Object.keys(answers)) {
    delete answers[key]
  }

  for (const [key, value] of Object.entries(createInitialAnswers(module))) {
    answers[key] = value
  }
}

watch(selectedModule, resetAnswers, { immediate: true })

const generatedHpi = computed(() => selectedModule.value.generateHpi(answers))
</script>

<template>
  <main class="workspace-page">
    <aside class="workspace-sidebar">
      <RouterLink class="brand" to="/">DxNavigator</RouterLink>
      <AppPreferences />
      <ComplaintSelector :complaints="workflowLinks" :selected-complaint-id="selectedModule.id" />
    </aside>

    <section class="workspace-content">
      <header class="complaint-header">
        <p class="eyebrow">{{ t('workspace.eyebrow') }}</p>
        <h1>{{ selectedModule.title }}</h1>
        <p>{{ selectedModule.overview }}</p>
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
            <DynamicClinicalForm :module="selectedModule" :answers="answers" />

            <div id="clinical-guidance" class="workflow-grid guidance-grid">
              <RedFlagList :red-flags="selectedModule.redFlags" />
              <DifferentialList :differentials="selectedModule.differentials" />
              <WorkupList :workup="selectedModule.workup" />
            </div>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>
