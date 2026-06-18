<script setup lang="ts">
import ClinicalSection from '@/components/ClinicalSection.vue'
import { useI18n } from '@/composables/useI18n'
import type { ClinicalItem } from '@/data/workflow'

defineProps<{
  redFlags: ClinicalItem[]
}>()

const { t } = useI18n()
</script>

<template>
  <ClinicalSection
    :eyebrow="t('guidance.redFlagsEyebrow')"
    :title="t('guidance.redFlagsTitle')"
    :items="redFlags"
    tone="danger"
  />
</template>
