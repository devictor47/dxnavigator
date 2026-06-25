export const locales = {
  en: {
    label: 'English',
  },
  'pt-BR': {
    label: 'Portugues BR',
  },
} as const

export type Locale = keyof typeof locales

export const defaultLocale: Locale = 'en'

export const isLocale = (value: string | null): value is Locale => {
  return value !== null && value in locales
}
