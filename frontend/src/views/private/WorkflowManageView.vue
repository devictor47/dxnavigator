<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import PrivateWorkspaceShell from '@/components/PrivateWorkspaceShell.vue'
import {
  deleteUserWorkflow,
  fetchManagedUserWorkflows,
  type ManagedUserWorkflow,
  unpublishUserWorkflow,
} from '@/api/userWorkflows'
import { useI18n } from '@/composables/useI18n'
import { useNotifications } from '@/composables/useNotifications'

const { t } = useI18n()
const { notify } = useNotifications()
const router = useRouter()

const workflows = ref<ManagedUserWorkflow[]>([])
const isLoading = ref(true)
const loadError = ref('')
const workflowPendingRemoval = ref<ManagedUserWorkflow | null>(null)
const workflowPendingUnpublish = ref<ManagedUserWorkflow | null>(null)
const removingWorkflowId = ref<number | null>(null)
const unpublishingWorkflowId = ref<number | null>(null)

const loadWorkflows = async (): Promise<void> => {
  isLoading.value = true
  loadError.value = ''

  try {
    workflows.value = await fetchManagedUserWorkflows()
  } catch {
    loadError.value = t('manage.loadFailed')
  } finally {
    isLoading.value = false
  }
}

const openWorkflow = async (workflow: ManagedUserWorkflow): Promise<void> => {
  await router.push(`/private/complaints/${workflow.id}`)
}

const requestRemoveWorkflow = (workflow: ManagedUserWorkflow): void => {
  workflowPendingRemoval.value = workflow
}

const cancelRemoveWorkflow = (): void => {
  workflowPendingRemoval.value = null
}

const confirmRemoveWorkflow = async (): Promise<void> => {
  if (!workflowPendingRemoval.value) {
    return
  }

  const workflowId = workflowPendingRemoval.value.id
  removingWorkflowId.value = workflowId

  try {
    await deleteUserWorkflow(workflowId)
    workflowPendingRemoval.value = null
    workflows.value = workflows.value.filter((workflow) => workflow.id !== workflowId)
    notify({
      type: 'message',
      title: t('workspace.removeSuccessTitle'),
      message: t('workspace.removeSuccessMessage'),
    })
  } catch {
    notify({
      type: 'error',
      title: t('workspace.removeFailedTitle'),
      message: t('workspace.removeFailedMessage'),
    })
  } finally {
    removingWorkflowId.value = null
  }
}

const requestUnpublishWorkflow = (workflow: ManagedUserWorkflow): void => {
  if (!workflow.publishedWorkflow) {
    return
  }

  workflowPendingUnpublish.value = workflow
}

const cancelUnpublishWorkflow = (): void => {
  workflowPendingUnpublish.value = null
}

const confirmUnpublishWorkflow = async (): Promise<void> => {
  if (!workflowPendingUnpublish.value) {
    return
  }

  const workflowId = workflowPendingUnpublish.value.id
  unpublishingWorkflowId.value = workflowId

  try {
    await unpublishUserWorkflow(workflowId)
    workflowPendingUnpublish.value = null
    await loadWorkflows()
    notify({
      type: 'message',
      title: t('manage.unpublishSuccessTitle'),
      message: t('manage.unpublishSuccessMessage'),
    })
  } catch {
    notify({
      type: 'error',
      title: t('manage.unpublishFailedTitle'),
      message: t('manage.unpublishFailedMessage'),
    })
  } finally {
    unpublishingWorkflowId.value = null
  }
}

onMounted(() => {
  void loadWorkflows()
})
</script>

<template>
  <PrivateWorkspaceShell active-section="manage">
    <section class="workspace-content">
      <header class="complaint-header">
        <p class="eyebrow">{{ t('manage.eyebrow') }}</p>
        <h1>{{ t('manage.title') }}</h1>
        <p>{{ t('manage.description') }}</p>
      </header>

      <section v-if="isLoading" class="form-card workspace-state-card">
        <p>{{ t('manage.loading') }}</p>
      </section>

      <section v-else-if="loadError" class="form-card workspace-state-card">
        <p>{{ loadError }}</p>
      </section>

      <section v-else class="marketplace-grid" aria-label="Managed workflows">
        <article v-for="workflow in workflows" :key="workflow.id" class="marketplace-card">
          <div class="marketplace-card-header">
            <div>
              <p class="eyebrow">{{ workflow.language }}</p>
              <h2>{{ workflow.title }}</h2>
            </div>
            <span v-if="workflow.publishedWorkflow" class="field-type-chip">
              {{ t('manage.statusPublished') }}
            </span>
            <span v-else class="field-type-chip">{{ t('manage.statusPrivate') }}</span>
          </div>

          <p>{{ workflow.description || t('manage.noDescription') }}</p>

          <div class="marketplace-metrics">
            <span v-if="workflow.isInstalledFromMarketplace">
              <strong>{{ t('manage.statusInstalled') }}</strong>
              {{ t('manage.origin') }}
            </span>
            <span v-if="workflow.publishedWorkflow">
              <strong>{{ workflow.publishedWorkflow.installCount }}</strong>
              {{ t('marketplace.installs') }}
            </span>
          </div>

          <div class="builder-row-actions">
            <button class="primary-action compact-action" type="button" @click="openWorkflow(workflow)">
              {{ t('manage.openWorkflow') }}
            </button>
            <button
              v-if="workflow.publishedWorkflow"
              class="secondary-action compact-action"
              type="button"
              :disabled="unpublishingWorkflowId === workflow.id"
              @click="requestUnpublishWorkflow(workflow)"
            >
              {{
                unpublishingWorkflowId === workflow.id
                  ? t('manage.unpublishing')
                  : t('manage.unpublish')
              }}
            </button>
            <button
              class="danger-action compact-action"
              type="button"
              :disabled="removingWorkflowId === workflow.id"
              @click="requestRemoveWorkflow(workflow)"
            >
              {{ removingWorkflowId === workflow.id ? t('workspace.removing') : t('common.remove') }}
            </button>
          </div>
        </article>

        <article v-if="workflows.length === 0" class="marketplace-card">
          <p>{{ t('manage.empty') }}</p>
        </article>
      </section>

      <div
        v-if="workflowPendingRemoval"
        class="modal-backdrop"
        role="presentation"
        @click="cancelRemoveWorkflow"
      >
        <section
          class="confirmation-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="manage-remove-title"
          @click.stop
        >
          <div class="section-heading">
            <p class="eyebrow">{{ t('workspace.removeEyebrow') }}</p>
            <h2 id="manage-remove-title">{{ t('workspace.removeTitle') }}</h2>
            <p class="section-description">{{ t('workspace.removeDescription') }}</p>
          </div>

          <div class="preset-confirmation-target">
            <strong>{{ workflowPendingRemoval.title }}</strong>
            <span>{{ t('workspace.removeWarning') }}</span>
          </div>

          <div class="dialog-actions">
            <button class="secondary-action compact-action" type="button" @click="cancelRemoveWorkflow">
              {{ t('common.cancel') }}
            </button>
            <button class="danger-action compact-action" type="button" @click="confirmRemoveWorkflow">
              {{ t('common.remove') }}
            </button>
          </div>
        </section>
      </div>

      <div
        v-if="workflowPendingUnpublish"
        class="modal-backdrop"
        role="presentation"
        @click="cancelUnpublishWorkflow"
      >
        <section
          class="confirmation-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="manage-unpublish-title"
          @click.stop
        >
          <div class="section-heading">
            <p class="eyebrow">{{ t('manage.unpublishEyebrow') }}</p>
            <h2 id="manage-unpublish-title">{{ t('manage.unpublishTitle') }}</h2>
            <p class="section-description">
              {{
                workflowPendingUnpublish.publishedWorkflow?.installCount
                  ? t('manage.unpublishSoftDescription')
                  : t('manage.unpublishHardDescription')
              }}
            </p>
          </div>

          <div class="preset-confirmation-target">
            <strong>{{ workflowPendingUnpublish.title }}</strong>
            <span>{{ t('manage.unpublishWarning') }}</span>
          </div>

          <div class="dialog-actions">
            <button class="secondary-action compact-action" type="button" @click="cancelUnpublishWorkflow">
              {{ t('common.cancel') }}
            </button>
            <button class="danger-action compact-action" type="button" @click="confirmUnpublishWorkflow">
              {{ t('manage.unpublish') }}
            </button>
          </div>
        </section>
      </div>
    </section>
  </PrivateWorkspaceShell>
</template>
