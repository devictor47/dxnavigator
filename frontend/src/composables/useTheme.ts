import { computed, ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

const themeStorageKey = 'dxnavigator-theme'

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const storedTheme = window.localStorage.getItem(themeStorageKey)

  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const theme = ref<Theme>(getInitialTheme())

watch(
  theme,
  (nextTheme) => {
    if (typeof window === 'undefined') {
      return
    }

    document.documentElement.dataset.theme = nextTheme
    window.localStorage.setItem(themeStorageKey, nextTheme)
  },
  { immediate: true },
)

export const useTheme = () => {
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return {
    isDark: computed(() => theme.value === 'dark'),
    theme,
    toggleTheme,
  }
}
