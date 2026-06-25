<script setup lang="ts">
import { CircleHelp } from '@lucide/vue'

defineProps<{
  message: string
}>()
</script>

<template>
  <span class="field-hint" tabindex="0" :aria-label="message">
    <CircleHelp :size="16" aria-hidden="true" />
    <span class="field-hint-popover" role="tooltip">{{ message }}</span>
  </span>
</template>
