<script setup lang="ts">
import ClinicalSection from '@/components/ClinicalSection.vue'
import type { ClinicalItem } from '@/data/workflow'

defineProps<{
  questions: ClinicalItem[]
}>()
</script>

<template>
  <ClinicalSection eyebrow="History" title="Key questions" :items="questions" />
</template>
