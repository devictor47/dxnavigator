import type { Locale } from '@/i18n/locales'

export type ManagementGuideCategory = 'metabolic' | 'neurologic' | 'cardiovascular' | 'respiratory'

export type ManagementGuideSource = {
  title: string
  url?: string
  note?: string
}

export type ManagementGuideItemSeverity = 'routine' | 'warning' | 'critical'

export type ManagementGuideItem = {
  label: string
  detail?: string
  severity?: ManagementGuideItemSeverity
}

export type ManagementGuideSection = {
  title: string
  description?: string
  items: ManagementGuideItem[]
}

export type ManagementGuide = {
  id: string
  language: Locale
  title: string
  description: string
  category: ManagementGuideCategory
  sections: ManagementGuideSection[]
  pitfalls: string[]
  sources: ManagementGuideSource[]
}
