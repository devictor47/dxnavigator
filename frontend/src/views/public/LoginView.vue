<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import AppPreferences from '@/components/AppPreferences.vue'
import { useI18n } from '@/composables/useI18n'

type AuthErrorResponse = {
  message?: string
  errors?: string[]
}

const { locale, t } = useI18n()
const router = useRouter()
const route = useRoute()
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

const getRedirectPath = (): string => {
  const redirect = route.query.redirect

  return typeof redirect === 'string' && redirect.startsWith('/') ? redirect : '/private'
}

const login = async (): Promise<void> => {
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        preferredLocale: locale.value,
      }),
    })

    if (!response.ok) {
      const error = (await response.json().catch(() => ({}))) as AuthErrorResponse
      errorMessage.value = error.errors?.[0] ?? error.message ?? t('auth.loginFailed')
      return
    }

    await router.push(getRedirectPath())
  } finally {
    isSubmitting.value = false
  }
}

const loginWithGoogle = (): void => {
  window.location.href = `/api/auth/google/login?returnUrl=${encodeURIComponent(getRedirectPath())}`
}
</script>

<template>
  <main class="auth-page">
    <nav class="top-nav" aria-label="Primary navigation">
      <RouterLink class="brand" to="/">DxNavigator</RouterLink>
      <div class="nav-actions">
        <AppPreferences />
        <RouterLink class="nav-link" to="/auth/register">
          {{ t('auth.register') }}
        </RouterLink>
      </div>
    </nav>

    <section class="auth-card" aria-labelledby="login-title">
      <div class="section-heading">
        <p class="eyebrow">{{ t('auth.loginEyebrow') }}</p>
        <h1 id="login-title">{{ t('auth.loginTitle') }}</h1>
        <p class="section-description">{{ t('auth.loginDescription') }}</p>
      </div>

      <form class="auth-form" @submit.prevent="login">
        <label class="builder-field">
          <span>{{ t('auth.email') }}</span>
          <input v-model="email" class="text-input" type="email" autocomplete="email" required />
        </label>

        <label class="builder-field">
          <span>{{ t('auth.password') }}</span>
          <input
            v-model="password"
            class="text-input"
            type="password"
            autocomplete="current-password"
            minlength="6"
            required
          />
        </label>

        <p v-if="errorMessage" class="builder-error">{{ errorMessage }}</p>

        <button class="primary-action auth-action" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? t('auth.submitting') : t('auth.login') }}
        </button>
      </form>

      <div class="auth-divider">{{ t('auth.or') }}</div>

      <button class="secondary-action auth-action" type="button" @click="loginWithGoogle">
        {{ t('auth.continueWithGoogle') }}
      </button>
    </section>
  </main>
</template>
