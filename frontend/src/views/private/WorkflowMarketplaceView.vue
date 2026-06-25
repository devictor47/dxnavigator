<script setup lang="ts">
import { computed } from 'vue'

import PrivateWorkspaceShell from '@/components/PrivateWorkspaceShell.vue'
import { useI18n } from '@/composables/useI18n'
import { bundledWorkflowEntries } from '@/data/modules'

const { locale, t } = useI18n()

const marketplaceWorkflows = computed(() =>
  bundledWorkflowEntries.map((entry) => {
    const workflow = entry.workflows[locale.value]

    return {
      id: entry.localKey,
      title: workflow.title,
      description: workflow.description || workflow.overview,
      language: workflow.language,
      sections: workflow.sections.length,
      fields: workflow.sections.reduce((count, section) => count + section.fields.length, 0),
      redFlags: workflow.redFlags.length,
    }
  }),
)
</script>

<template>
  <PrivateWorkspaceShell active-section="marketplace">
    <section class="workspace-content">
      <header class="complaint-header">
        <p class="eyebrow">{{ t('marketplace.eyebrow') }}</p>
        <h1>{{ t('marketplace.title') }}</h1>
        <p>{{ t('marketplace.description') }}</p>
      </header>

      <section class="marketplace-toolbar" aria-label="Marketplace filters">
        <label class="builder-field">
          <span>{{ t('marketplace.searchLabel') }}</span>
          <input
            class="text-input"
            type="search"
            :placeholder="t('marketplace.searchPlaceholder')"
          />
        </label>

        <label class="builder-field">
          <span>{{ t('marketplace.languageLabel') }}</span>
          <select class="text-input">
            <option>{{ t('marketplace.currentLanguage') }}</option>
          </select>
        </label>

        <label class="builder-field">
          <span>{{ t('marketplace.settingLabel') }}</span>
          <select class="text-input">
            <option>{{ t('marketplace.allSettings') }}</option>
          </select>
        </label>
      </section>

      <section class="marketplace-grid" aria-label="Available workflows">
        <article
          v-for="workflow in marketplaceWorkflows"
          :key="workflow.id"
          class="marketplace-card"
        >
          <div class="marketplace-card-header">
            <div>
              <p class="eyebrow">{{ workflow.language }}</p>
              <h2>{{ workflow.title }}</h2>
            </div>
            <span class="field-type-chip">{{ t('marketplace.bundledBadge') }}</span>
          </div>

          <p>{{ workflow.description }}</p>

          <div class="marketplace-metrics">
            <span>
              <strong>{{ workflow.sections }}</strong>
              {{ t('marketplace.sections') }}
            </span>
            <span>
              <strong>{{ workflow.fields }}</strong>
              {{ t('marketplace.fields') }}
            </span>
            <span>
              <strong>{{ workflow.redFlags }}</strong>
              {{ t('marketplace.redFlags') }}
            </span>
          </div>

          <div class="builder-row-actions">
            <RouterLink
              class="secondary-action compact-action"
              :to="`/private/builder/${workflow.id}`"
            >
              {{ t('builder.editWorkflow') }}
            </RouterLink>
            <RouterLink
              class="primary-action compact-action"
              :to="`/private/complaints/${workflow.id}`"
            >
              {{ t('marketplace.openWorkflow') }}
            </RouterLink>
          </div>
        </article>
      </section>
    </section>
  </PrivateWorkspaceShell>
</template>
