<script setup lang="ts">
import { X } from '@lucide/vue'

import { useI18n } from '@/composables/useI18n'
import { useNotifications } from '@/composables/useNotifications'

const { t } = useI18n()
const { notifications, dismiss } = useNotifications()
</script>

<template>
  <section class="notification-region" aria-live="polite" aria-label="Notifications">
    <TransitionGroup name="notification-list" tag="div" class="notification-stack">
      <article
        v-for="notification in notifications"
        :key="notification.id"
        class="app-notification"
        :class="`notification-${notification.type}`"
      >
        <div>
          <strong>{{ notification.title }}</strong>
          <p>{{ notification.message }}</p>
        </div>

        <button
          class="notification-close"
          type="button"
          :aria-label="t('notifications.close')"
          @click="dismiss(notification.id)"
        >
          <X :size="18" aria-hidden="true" />
        </button>
      </article>
    </TransitionGroup>
  </section>
</template>
