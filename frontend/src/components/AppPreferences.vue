<script setup lang="ts">
import { useI18n, type Locale } from '@/composables/useI18n'
import { useTheme } from '@/composables/useTheme'

const { locale, setLocale, t } = useI18n()
const { isDark, toggleTheme } = useTheme()

const toggleLocale = () => {
  const nextLocale: Locale = locale.value === 'en' ? 'pt-BR' : 'en'

  setLocale(nextLocale)
}
</script>

<template>
  <div class="app-preferences" aria-label="Application preferences">
    <button class="preference-button" type="button" @click="toggleLocale">
      <span>{{ t('common.language') }}</span>
      <strong>{{ locale === 'en' ? 'EN' : 'PT' }}</strong>
    </button>

    <button class="preference-button" type="button" @click="toggleTheme">
      <span>{{ t('common.theme') }}</span>
      <strong>{{ isDark ? t('common.dark') : t('common.light') }}</strong>
    </button>
  </div>
</template>
