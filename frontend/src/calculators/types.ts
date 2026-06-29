import type { Component } from 'vue'
import type { Locale } from '@/i18n/locales'

export type CalculatorCategory = 'scores' | 'renal' | 'drugs'

export type CalculatorSource = {
  title: string
  url?: string
  note?: string
}

export type ClinicalCalculator = {
  id: string
  language: Locale
  title: string
  description: string
  category: CalculatorCategory
  component: Component
  sources: CalculatorSource[]
  content?: unknown
}
