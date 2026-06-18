<script setup lang="ts">
import type { ClinicalItem } from '@/data/workflow'

defineProps<{
  title: string
  eyebrow: string
  items: ClinicalItem[]
  tone?: 'default' | 'danger' | 'teal'
}>()
</script>

<template>
  <section class="clinical-section" :class="tone ?? 'default'">
    <div class="section-heading">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h2>{{ title }}</h2>
    </div>

    <ul class="clinical-list">
      <li v-for="item in items" :key="item.title" class="clinical-item">
        <h3>{{ item.title }}</h3>
        <p v-if="item.description">{{ item.description }}</p>
      </li>
    </ul>
  </section>
</template>
