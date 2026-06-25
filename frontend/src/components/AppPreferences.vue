<script setup lang="ts">
import { Languages, Moon, Sun } from '@lucide/vue'

import { useI18n, type Locale } from '@/composables/useI18n'
import { useTheme } from '@/composables/useTheme'

defineProps<{
  compact?: boolean
}>()

const { locale, setLocale, t } = useI18n()
const { isDark, toggleTheme } = useTheme()

const toggleLocale = () => {
  const nextLocale: Locale = locale.value === 'en' ? 'pt-BR' : 'en'

  setLocale(nextLocale)
}
</script>

<template>
  <div class="app-preferences" :class="{ compact }" aria-label="Application preferences">
    <button
      class="preference-button"
      type="button"
      :title="t('common.language')"
      @click="toggleLocale"
    >
      <Languages :size="18" aria-hidden="true" />
      <span class="preference-label">{{ t('common.language') }}</span>
      <strong>{{ locale === 'en' ? 'EN' : 'PT' }}</strong>
    </button>

    <button class="preference-button" type="button" :title="t('common.theme')" @click="toggleTheme">
      <Moon v-if="isDark" :size="18" aria-hidden="true" />
      <Sun v-else :size="18" aria-hidden="true" />
      <span class="preference-label">{{ t('common.theme') }}</span>
      <strong class="preference-value">{{ isDark ? t('common.dark') : t('common.light') }}</strong>
    </button>
  </div>
</template>
