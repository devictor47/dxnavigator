<script setup lang="ts">
import { Pencil, Save, Trash2 } from '@lucide/vue'

import { useI18n } from '@/composables/useI18n'
import type { WorkflowPreset } from '@/data/workflow'

defineProps<{
  presets?: WorkflowPreset[]
  activePresetId?: string
  hasUnsavedPresetChanges?: boolean
}>()

defineEmits<{
  apply: [preset: WorkflowPreset]
  save: []
  edit: [preset: WorkflowPreset]
  remove: [preset: WorkflowPreset]
}>()

const { t } = useI18n()
</script>

<template>
  <section class="workflow-presets" aria-labelledby="workflow-presets-title">
    <div class="preset-header">
      <div class="section-heading">
        <p class="eyebrow">{{ t('presets.eyebrow') }}</p>
        <h3 id="workflow-presets-title">{{ t('presets.title') }}</h3>
        <p class="section-description">{{ t('presets.description') }}</p>
      </div>

      <button class="secondary-action compact-action" type="button" @click="$emit('save')">
        <Save :size="16" aria-hidden="true" />
        <span>{{ t('presets.save') }}</span>
      </button>
    </div>

    <p v-if="activePresetId && hasUnsavedPresetChanges" class="preset-dirty-note">
      {{ t('presets.unsavedChanges') }}
    </p>

    <div v-if="presets?.length" class="preset-list">
      <article
        v-for="preset in presets"
        :key="preset.id"
        class="preset-card"
        :class="{ selected: preset.id === activePresetId }"
      >
        <button class="preset-button" type="button" @click="$emit('apply', preset)">
          <strong>{{ preset.title }}</strong>
          <span v-if="preset.description">{{ preset.description }}</span>
        </button>
        <span class="preset-card-actions" aria-label="Preset actions">
          <button
            class="preset-icon-button"
            type="button"
            :aria-label="t('common.edit')"
            :title="t('common.edit')"
            @click.stop="$emit('edit', preset)"
          >
            <Pencil :size="15" aria-hidden="true" />
          </button>
          <button
            class="preset-icon-button danger"
            type="button"
            :aria-label="t('common.remove')"
            :title="t('common.remove')"
            @click.stop="$emit('remove', preset)"
          >
            <Trash2 :size="15" aria-hidden="true" />
          </button>
        </span>
      </article>
    </div>

    <p v-else class="section-description">{{ t('presets.empty') }}</p>
  </section>
</template>
