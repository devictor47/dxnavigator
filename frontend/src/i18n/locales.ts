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

export type LocalizedText = Record<Locale, string>
export type TranslatableText = string | LocalizedText

export const isLocale = (value: string | null): value is Locale => {
  return value !== null && value in locales
}

export const resolveText = (text: TranslatableText, locale: Locale): string => {
  if (typeof text === 'string') {
    return text
  }

  return text[locale] ?? text[defaultLocale]
}
