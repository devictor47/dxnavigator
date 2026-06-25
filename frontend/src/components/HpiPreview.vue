<script setup lang="ts">
import { Check, ChevronDown, ChevronUp, Copy, Pin } from '@lucide/vue'
import { ref } from 'vue'

import { useI18n } from '@/composables/useI18n'

defineProps<{
  narrative: string
  sticky: boolean
}>()

defineEmits<{
  toggleSticky: []
}>()

const { t } = useI18n()
const copied = ref(false)
const isExpanded = ref(false)

const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text)
  copied.value = true

  window.setTimeout(() => {
    copied.value = false
  }, 1600)
}
</script>

<template>
  <aside
    class="hpi-preview"
    :class="{ sticky, expanded: isExpanded }"
    aria-labelledby="hpi-preview-title"
  >
    <div class="preview-header-row">
      <div class="section-heading">
        <p class="eyebrow">{{ t('preview.eyebrow') }}</p>
        <h2 id="hpi-preview-title">{{ t('preview.title') }}</h2>
        <p class="section-description">{{ t('preview.helper') }}</p>
      </div>

      <div class="preview-actions">
        <button
          class="preview-action-button icon-only"
          type="button"
          :aria-label="copied ? t('common.copied') : t('common.copy')"
          :title="copied ? t('common.copied') : t('common.copy')"
          @click="copyToClipboard(narrative)"
        >
          <Check v-if="copied" :size="18" aria-hidden="true" />
          <Copy v-else :size="18" aria-hidden="true" />
        </button>

        <button
          class="preview-action-button"
          :class="{ 'icon-only': true }"
          type="button"
          :aria-pressed="sticky"
          :aria-label="sticky ? t('common.pinned') : t('common.pin')"
          :title="sticky ? t('common.pinned') : t('common.pin')"
          @click="$emit('toggleSticky')"
        >
          <Pin :size="18" aria-hidden="true" />
        </button>

        <button
          class="preview-action-button icon-only mobile-preview-expand"
          type="button"
          :aria-expanded="isExpanded"
          :aria-label="isExpanded ? t('preview.collapse') : t('preview.expand')"
          :title="isExpanded ? t('preview.collapse') : t('preview.expand')"
          @click="isExpanded = !isExpanded"
        >
          <ChevronUp v-if="isExpanded" :size="18" aria-hidden="true" />
          <ChevronDown v-else :size="18" aria-hidden="true" />
        </button>
      </div>
    </div>

    <p class="generated-note">{{ narrative }}</p>
  </aside>
</template>
