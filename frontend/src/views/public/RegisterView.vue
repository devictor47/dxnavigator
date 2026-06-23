<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import AppPreferences from '@/components/AppPreferences.vue'
import { useI18n } from '@/composables/useI18n'

type AuthErrorResponse = {
  message?: string
  errors?: string[]
}

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const name = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

const getRedirectPath = (): string => {
  const redirect = route.query.redirect

  return typeof redirect === 'string' && redirect.startsWith('/') ? redirect : '/private'
}

const register = async (): Promise<void> => {
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
      }),
    })

    if (!response.ok) {
      const error = (await response.json().catch(() => ({}))) as AuthErrorResponse
      errorMessage.value = error.errors?.[0] ?? error.message ?? t('auth.registerFailed')
      return
    }

    await router.push(getRedirectPath())
  } finally {
    isSubmitting.value = false
  }
}

const registerWithGoogle = (): void => {
  window.location.href = `/api/auth/google/login?returnUrl=${encodeURIComponent(getRedirectPath())}`
}
</script>

<template>
  <main class="auth-page">
    <nav class="top-nav" aria-label="Primary navigation">
      <RouterLink class="brand" to="/">DxNavigator</RouterLink>
      <div class="nav-actions">
        <AppPreferences />
        <RouterLink class="nav-link" to="/auth/login">
          {{ t('auth.login') }}
        </RouterLink>
      </div>
    </nav>

    <section class="auth-card" aria-labelledby="register-title">
      <div class="section-heading">
        <p class="eyebrow">{{ t('auth.registerEyebrow') }}</p>
        <h1 id="register-title">{{ t('auth.registerTitle') }}</h1>
        <p class="section-description">{{ t('auth.registerDescription') }}</p>
      </div>

      <form class="auth-form" @submit.prevent="register">
        <label class="builder-field">
          <span>{{ t('auth.name') }}</span>
          <input v-model="name" class="text-input" type="text" autocomplete="name" required />
        </label>

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
            autocomplete="new-password"
            minlength="6"
            required
          />
          <small class="field-helper">{{ t('auth.passwordHint') }}</small>
        </label>

        <p v-if="errorMessage" class="builder-error">{{ errorMessage }}</p>

        <button class="primary-action auth-action" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? t('auth.submitting') : t('auth.createAccount') }}
        </button>
      </form>

      <div class="auth-divider">{{ t('auth.or') }}</div>

      <button class="secondary-action auth-action" type="button" @click="registerWithGoogle">
        {{ t('auth.continueWithGoogle') }}
      </button>
    </section>
  </main>
</template>
