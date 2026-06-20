<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'
import { resolveText, type TranslatableText } from '@/i18n/locales'

type ComplaintOption = {
  id: string
  name: TranslatableText
  to: string
}

defineProps<{
  complaints: ComplaintOption[]
  selectedComplaintId: string
}>()

const { locale, t } = useI18n()
</script>

<template>
  <section class="complaint-selector" aria-labelledby="complaint-selector-title">
    <div>
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
      >
        {{ resolveText(complaint.name, locale) }}
      </RouterLink>
    </div>
  </section>
</template>
