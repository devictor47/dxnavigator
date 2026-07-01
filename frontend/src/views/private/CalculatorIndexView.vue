<script setup lang="ts">
import { computed, ref } from 'vue'

import PrivateWorkspaceShell from '@/components/PrivateWorkspaceShell.vue'
import {
  calculatorCategoryLabels,
  getClinicalCalculators,
} from '@/calculators/calculatorRegistry'
import { useI18n } from '@/composables/useI18n'

const { locale, t } = useI18n()
const searchTerm = ref('')
const calculators = computed(() => getClinicalCalculators(locale.value))

const filteredCalculators = computed(() => {
  const query = searchTerm.value.trim().toLowerCase()

  if (!query) {
    return calculators.value
  }

  return calculators.value.filter((calculator) => {
    return [calculator.title, calculator.description, calculatorCategoryLabels[locale.value][calculator.category]]
      .join(' ')
      .toLowerCase()
      .includes(query)
  })
})
</script>

<template>
  <PrivateWorkspaceShell active-section="calculators">
    <section class="workspace-content">
      <header class="complaint-header">
        <p class="eyebrow">{{ t('calculators.eyebrow') }}</p>
        <h1>{{ t('calculators.title') }}</h1>
        <p>{{ t('calculators.description') }}</p>
      </header>

      <section class="marketplace-toolbar" aria-label="Calculator filters">
        <label class="builder-field">
          <span>{{ t('calculators.searchLabel') }}</span>
          <input
            v-model="searchTerm"
            class="text-input"
            type="search"
            :placeholder="t('calculators.searchPlaceholder')"
          />
        </label>
      </section>

      <section class="marketplace-grid" aria-label="Available calculators">
        <RouterLink
          v-for="calculator in filteredCalculators"
          :key="calculator.id"
          class="marketplace-card calculator-card-link"
          :to="`/private/calculators/${calculator.id}`"
        >
          <div class="marketplace-card-header">
            <div>
              <p class="eyebrow">{{ calculatorCategoryLabels[locale][calculator.category] }}</p>
              <h2>{{ calculator.title }}</h2>
            </div>
          </div>

          <p>{{ calculator.description }}</p>
          <p class="section-description">
            {{ calculator.sources.length }} {{ t('calculators.sources') }}
          </p>
        </RouterLink>

        <article v-if="filteredCalculators.length === 0" class="marketplace-card">
          <p>{{ t('calculators.empty') }}</p>
        </article>
      </section>
    </section>
  </PrivateWorkspaceShell>
</template>
