<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import PrivateWorkspaceShell from '@/components/PrivateWorkspaceShell.vue'
import {
  getManagementGuideById,
  managementCategoryLabels,
} from '@/management/managementRegistry'
import { useI18n } from '@/composables/useI18n'

const { locale, t } = useI18n()
const route = useRoute()
const guide = computed(() => getManagementGuideById(route.params.guideId, locale.value))
</script>

<template>
  <PrivateWorkspaceShell active-section="management" :selected-management-guide-id="guide?.id">
    <section class="workspace-content management-detail-content">
      <section v-if="!guide" class="form-card workspace-state-card">
        <p class="eyebrow">{{ t('management.eyebrow') }}</p>
        <h1>{{ t('management.notFoundTitle') }}</h1>
        <p>{{ t('management.notFoundDescription') }}</p>
        <RouterLink class="primary-action compact-action" to="/private/management">
          {{ t('management.backToList') }}
        </RouterLink>
      </section>

      <template v-else>
        <header class="complaint-header">
          <p class="eyebrow">{{ managementCategoryLabels[locale][guide.category] }}</p>
          <h1>{{ guide.title }}</h1>
          <p>{{ guide.description }}</p>
        </header>

        <section class="management-guide-layout">
          <article
            v-for="section in guide.sections"
            :key="section.title"
            class="form-card management-guide-card"
          >
            <div class="section-heading">
              <h2>{{ section.title }}</h2>
              <p v-if="section.description" class="section-description">
                {{ section.description }}
              </p>
            </div>

            <ol class="management-step-list">
              <li
                v-for="item in section.items"
                :key="item.label"
                class="management-step"
                :class="item.severity"
              >
                <div>
                  <strong>{{ item.label }}</strong>
                  <p v-if="item.detail">{{ item.detail }}</p>
                </div>
                <span v-if="item.severity" class="field-type-chip">
                  {{ t(`management.severity.${item.severity}`) }}
                </span>
              </li>
            </ol>
          </article>

          <article class="form-card management-guide-card">
            <div class="section-heading">
              <p class="eyebrow">{{ t('management.safetyEyebrow') }}</p>
              <h2>{{ t('management.pitfallsTitle') }}</h2>
            </div>
            <ul class="source-list">
              <li v-for="pitfall in guide.pitfalls" :key="pitfall">
                {{ pitfall }}
              </li>
            </ul>
          </article>

          <article class="form-card management-guide-card">
            <div class="section-heading">
              <p class="eyebrow">{{ t('calculators.transparency') }}</p>
              <h2>{{ t('management.sourcesTitle') }}</h2>
              <p class="section-description">{{ t('management.sourcesDescription') }}</p>
            </div>

            <ul class="source-list">
              <li v-for="source in guide.sources" :key="source.title">
                <a v-if="source.url" :href="source.url" target="_blank" rel="noreferrer">
                  {{ source.title }}
                </a>
                <strong v-else>{{ source.title }}</strong>
                <p v-if="source.note">{{ source.note }}</p>
              </li>
            </ul>
          </article>
        </section>
      </template>
    </section>
  </PrivateWorkspaceShell>
</template>
