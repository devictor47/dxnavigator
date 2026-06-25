<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'
import type { WorkflowPreset } from '@/data/workflow'

defineProps<{
  presets?: WorkflowPreset[]
  activePresetId?: string
}>()

defineEmits<{
  apply: [preset: WorkflowPreset]
}>()

const { t } = useI18n()
</script>

<template>
  <section v-if="presets?.length" class="workflow-presets" aria-labelledby="workflow-presets-title">
    <div class="section-heading">
      <p class="eyebrow">{{ t('presets.eyebrow') }}</p>
      <h3 id="workflow-presets-title">{{ t('presets.title') }}</h3>
      <p class="section-description">{{ t('presets.description') }}</p>
    </div>

    <div class="preset-list">
      <button
        v-for="preset in presets"
        :key="preset.id"
        class="preset-button"
        :class="{ selected: preset.id === activePresetId }"
        type="button"
        @click="$emit('apply', preset)"
      >
        <strong>{{ preset.title }}</strong>
        <span v-if="preset.description">{{ preset.description }}</span>
      </button>
    </div>
  </section>
</template>
