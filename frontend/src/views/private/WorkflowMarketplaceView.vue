<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import PrivateWorkspaceShell from '@/components/PrivateWorkspaceShell.vue'
import {
  fetchMarketplaceWorkflows,
  installMarketplaceWorkflow,
  type PublishedWorkflow,
} from '@/api/userWorkflows'
import { useI18n } from '@/composables/useI18n'
import { useNotifications } from '@/composables/useNotifications'

const { t } = useI18n()
const { notify } = useNotifications()
const router = useRouter()

const marketplaceWorkflows = ref<PublishedWorkflow[]>([])
const isLoadingMarketplace = ref(true)
const marketplaceError = ref('')
const installingWorkflowPublicId = ref<string | null>(null)

const loadMarketplaceWorkflows = async (): Promise<void> => {
  isLoadingMarketplace.value = true
  marketplaceError.value = ''

  try {
    marketplaceWorkflows.value = await fetchMarketplaceWorkflows()
  } catch {
    marketplaceError.value = t('marketplace.loadFailed')
  } finally {
    isLoadingMarketplace.value = false
  }
}

onMounted(() => {
  void loadMarketplaceWorkflows()
})

const installWorkflow = async (workflow: PublishedWorkflow): Promise<void> => {
  installingWorkflowPublicId.value = workflow.publicId

  try {
    const installedWorkflow = await installMarketplaceWorkflow(workflow.publicId)

    notify({
      type: 'message',
      title: t('marketplace.installSuccessTitle'),
      message: t('marketplace.installSuccessMessage'),
    })
    await router.push(`/private/complaints/${installedWorkflow.id}`)
  } catch {
    notify({
      type: 'error',
      title: t('marketplace.installFailedTitle'),
      message: t('marketplace.installFailedMessage'),
    })
  } finally {
    installingWorkflowPublicId.value = null
  }
}
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

      <section v-if="isLoadingMarketplace" class="form-card workspace-state-card">
        <p>{{ t('marketplace.loading') }}</p>
      </section>

      <section v-else-if="marketplaceError" class="form-card workspace-state-card">
        <p>{{ marketplaceError }}</p>
      </section>

      <section v-else class="marketplace-grid" aria-label="Available workflows">
        <article
          v-for="workflow in marketplaceWorkflows"
          :key="workflow.publicId"
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
          <p class="section-description">
            {{
              workflow.authorName
                ? `${t('marketplace.author')}: ${workflow.authorName}`
                : t('marketplace.anonymousAuthor')
            }}
          </p>

          <div class="marketplace-metrics">
            <span>
              <strong>{{ workflow.publicId.slice(0, 8) }}</strong>
              {{ t('marketplace.publicId') }}
            </span>
            <span>
              <strong>{{ workflow.installCount }}</strong>
              {{ t('marketplace.installs') }}
            </span>
          </div>

          <div class="builder-row-actions">
            <span class="field-type-chip">{{ t('marketplace.publishedBadge') }}</span>
            <button
              class="primary-action compact-action"
              type="button"
              :disabled="installingWorkflowPublicId === workflow.publicId"
              @click="installWorkflow(workflow)"
            >
              {{
                installingWorkflowPublicId === workflow.publicId
                  ? t('marketplace.installing')
                  : t('marketplace.installWorkflow')
              }}
            </button>
          </div>
        </article>

        <article v-if="marketplaceWorkflows.length === 0" class="marketplace-card">
          <p>{{ t('marketplace.empty') }}</p>
        </article>
      </section>
    </section>
  </PrivateWorkspaceShell>
</template>
