<script setup lang="ts">
import AppPreferences from '@/components/AppPreferences.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>

<template>
  <main class="landing-page">
    <nav class="top-nav" aria-label="Primary navigation">
      <a class="brand" href="/">DxNavigator</a>
      <div class="nav-actions">
        <AppPreferences />
        <RouterLink class="nav-link" to="/auth/login">
          {{ t('auth.login') }}
        </RouterLink>
        <RouterLink class="primary-action compact-action" to="/auth/register">
          {{ t('auth.register') }}
        </RouterLink>
      </div>
    </nav>

    <section class="landing-hero">
      <div class="hero-copy">
        <p class="eyebrow">{{ t('landing.eyebrow') }}</p>
        <h1>DxNavigator</h1>
        <p>{{ t('landing.description') }}</p>
        <RouterLink class="primary-action" to="/private/complaints/chest-pain">
          {{ t('landing.action') }}
        </RouterLink>
      </div>

      <div class="hero-preview" aria-label="Chest Pain workflow preview">
        <div class="preview-header">
          <span>{{ t('landing.preview.title') }}</span>
          <strong>{{ t('landing.preview.subtitle') }}</strong>
        </div>
        <div class="preview-row">
          <span>{{ t('landing.preview.dynamicForm') }}</span>
          <strong>{{ t('landing.preview.metadataDriven') }}</strong>
        </div>
        <div class="preview-row danger">
          <span>{{ t('landing.preview.hpiPreview') }}</span>
          <strong>{{ t('landing.preview.realTime') }}</strong>
        </div>
        <div class="preview-row teal">
          <span>{{ t('landing.preview.reasoning') }}</span>
          <strong>{{ t('landing.preview.reasoningValue') }}</strong>
        </div>
        <div class="preview-row">
          <span>{{ t('landing.preview.workup') }}</span>
          <strong>{{ t('landing.preview.nextSteps') }}</strong>
        </div>
      </div>
    </section>
  </main>
</template>
