<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import PrivateWorkspaceShell from '@/components/PrivateWorkspaceShell.vue'
import {
  calculatorCategoryLabels,
  getClinicalCalculatorById,
} from '@/calculators/calculatorRegistry'
import { useI18n } from '@/composables/useI18n'

const { locale, t } = useI18n()
const route = useRoute()
const calculator = computed(() => getClinicalCalculatorById(route.params.calculatorId, locale.value))
</script>

<template>
  <PrivateWorkspaceShell active-section="calculators" :selected-calculator-id="calculator?.id">
    <section class="workspace-content">
      <section v-if="!calculator" class="form-card workspace-state-card">
        <p class="eyebrow">{{ t('calculators.eyebrow') }}</p>
        <h1>{{ t('calculators.notFoundTitle') }}</h1>
        <p>{{ t('calculators.notFoundDescription') }}</p>
        <RouterLink class="primary-action compact-action" to="/private/calculators">
          {{ t('calculators.backToList') }}
        </RouterLink>
      </section>

      <template v-else>
        <header class="complaint-header">
          <p class="eyebrow">{{ calculatorCategoryLabels[locale][calculator.category] }}</p>
          <h1>{{ calculator.title }}</h1>
          <p>{{ calculator.description }}</p>
        </header>

        <component :is="calculator.component" :calculator="calculator" />

        <section class="form-card calculator-sources" aria-labelledby="calculator-sources-title">
          <div class="section-heading">
            <p class="eyebrow">{{ t('calculators.transparency') }}</p>
            <h2 id="calculator-sources-title">{{ t('calculators.sourcesTitle') }}</h2>
            <p class="section-description">{{ t('calculators.sourcesDescription') }}</p>
          </div>

          <ul class="source-list">
            <li v-for="source in calculator.sources" :key="source.title">
              <a v-if="source.url" :href="source.url" target="_blank" rel="noreferrer">
                {{ source.title }}
              </a>
              <strong v-else>{{ source.title }}</strong>
              <p v-if="source.note">{{ source.note }}</p>
            </li>
          </ul>
        </section>
      </template>
    </section>
  </PrivateWorkspaceShell>
</template>
