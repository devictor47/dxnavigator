<script setup lang="ts">
import ClinicalSection from '@/components/ClinicalSection.vue'
import { useI18n } from '@/composables/useI18n'
import type { ClinicalItem } from '@/data/workflow'

defineProps<{
  differentials: ClinicalItem[]
}>()

const { t } = useI18n()
</script>

<template>
  <ClinicalSection
    :eyebrow="t('guidance.differentialsEyebrow')"
    :title="t('guidance.differentialsTitle')"
    :items="differentials"
    tone="teal"
  />
</template>
