<script setup lang="ts">
import { computed, ref } from 'vue'

import PrivateWorkspaceShell from '@/components/PrivateWorkspaceShell.vue'
import {
  getManagementGuides,
  managementCategoryLabels,
} from '@/management/managementRegistry'
import { useI18n } from '@/composables/useI18n'

const { locale, t } = useI18n()
const searchTerm = ref('')
const guides = computed(() => getManagementGuides(locale.value))

const filteredGuides = computed(() => {
  const query = searchTerm.value.trim().toLowerCase()

  if (!query) {
    return guides.value
  }

  return guides.value.filter((guide) => {
    return [guide.title, guide.description, managementCategoryLabels[locale.value][guide.category]]
      .join(' ')
      .toLowerCase()
      .includes(query)
  })
})
</script>

<template>
  <PrivateWorkspaceShell active-section="management">
    <section class="workspace-content">
      <header class="complaint-header">
        <p class="eyebrow">{{ t('management.eyebrow') }}</p>
        <h1>{{ t('management.title') }}</h1>
        <p>{{ t('management.description') }}</p>
      </header>

      <section class="marketplace-toolbar" aria-label="Management guide filters">
        <label class="builder-field">
          <span>{{ t('management.searchLabel') }}</span>
          <input
            v-model="searchTerm"
            class="text-input"
            type="search"
            :placeholder="t('management.searchPlaceholder')"
          />
        </label>
      </section>

      <section class="marketplace-grid" aria-label="Available management guides">
        <RouterLink
          v-for="guide in filteredGuides"
          :key="guide.id"
          class="marketplace-card calculator-card-link"
          :to="`/private/management/${guide.id}`"
        >
          <div class="marketplace-card-header">
            <div>
              <p class="eyebrow">{{ managementCategoryLabels[locale][guide.category] }}</p>
              <h2>{{ guide.title }}</h2>
            </div>
          </div>

          <p>{{ guide.description }}</p>
          <p class="section-description">
            {{ guide.sections.length }} {{ t('management.sections') }}
          </p>
        </RouterLink>

        <article v-if="filteredGuides.length === 0" class="marketplace-card">
          <p>{{ t('management.empty') }}</p>
        </article>
      </section>
    </section>
  </PrivateWorkspaceShell>
</template>
