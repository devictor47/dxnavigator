<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'
import type { ClinicalItem } from '@/data/workflow'
import { resolveText } from '@/i18n/locales'

defineProps<{
  title: string
  eyebrow: string
  items: ClinicalItem[]
  tone?: 'default' | 'danger' | 'teal'
}>()

const { locale } = useI18n()
</script>

<template>
  <section class="clinical-section" :class="tone ?? 'default'">
    <div class="section-heading">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h2>{{ title }}</h2>
    </div>

    <ul class="clinical-list">
      <li v-for="item in items" :key="resolveText(item.title, locale)" class="clinical-item">
        <h3>{{ resolveText(item.title, locale) }}</h3>
        <p v-if="item.description">{{ resolveText(item.description, locale) }}</p>
      </li>
    </ul>
  </section>
</template>
