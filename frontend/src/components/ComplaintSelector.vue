<script setup lang="ts">
import { Activity, Brain, Droplets, HeartPulse, Stethoscope, Thermometer } from '@lucide/vue'
import type { Component } from 'vue'

import { useI18n } from '@/composables/useI18n'
import { resolveText, type TranslatableText } from '@/i18n/locales'

type ComplaintOption = {
  id: string
  name: TranslatableText
  to: string
  icon?: string
}

defineProps<{
  complaints: ComplaintOption[]
  selectedComplaintId: string
  compact?: boolean
}>()

const { locale, t } = useI18n()

const workflowIcons: Record<string, Component> = {
  'chest-pain': HeartPulse,
  uti: Droplets,
  gastroenterocolitis: Activity,
  migraine: Brain,
  'sindrome-gripal': Thermometer,
}

const getWorkflowIcon = (complaint: ComplaintOption): Component => {
  return workflowIcons[complaint.icon ?? complaint.id] ?? Stethoscope
}
</script>

<template>
  <section class="complaint-selector" :class="{ compact }" aria-labelledby="complaint-selector-title">
    <div class="sidebar-section-heading">
      <p class="eyebrow">{{ t('selector.eyebrow') }}</p>
      <h2 id="complaint-selector-title">{{ t('selector.title') }}</h2>
    </div>

    <div class="complaint-options" role="list">
      <RouterLink
        v-for="complaint in complaints"
        :key="complaint.id"
        class="complaint-option"
        :class="{ selected: complaint.id === selectedComplaintId }"
        :to="complaint.to"
        :title="resolveText(complaint.name, locale)"
      >
        <component :is="getWorkflowIcon(complaint)" class="nav-icon" :size="18" aria-hidden="true" />
        <span class="nav-label">{{ resolveText(complaint.name, locale) }}</span>
      </RouterLink>
    </div>
  </section>
</template>
