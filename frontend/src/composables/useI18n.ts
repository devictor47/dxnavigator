import { computed, ref } from 'vue'

import { defaultLocale, isLocale, locales, type Locale } from '@/i18n/locales'

const localeStorageKey = 'dxnavigator-locale'

export { defaultLocale, locales, type Locale }

const messages = {
  en: {
    'common.help': 'Help',
    'common.language': 'Language',
    'common.theme': 'Theme',
    'common.light': 'Light',
    'common.dark': 'Dark',
    'common.pin': 'Pin',
    'common.pinned': 'Pinned',
    'common.copy': 'Copy',
    'common.copied': 'Copied',
    'common.selectOption': 'Select an option',
    'landing.nav.openWorkspace': 'Open workspace',
    'landing.eyebrow': 'Clinical reasoning workspace',
    'landing.description':
      'A structured decision-support platform for complaint-driven diagnostic evaluation. Built to collect clinical history, generate documentation, and keep reasoning visible.',
    'landing.action': 'View Chest Pain workflow',
    'landing.preview.title': 'Chest Pain',
    'landing.preview.subtitle': 'Initial evaluation',
    'landing.preview.dynamicForm': 'Dynamic form',
    'landing.preview.metadataDriven': 'Metadata driven',
    'landing.preview.hpiPreview': 'HPI preview',
    'landing.preview.realTime': 'Real time',
    'landing.preview.reasoning': 'Clinical reasoning',
    'landing.preview.reasoningValue': 'Red flags and differential',
    'landing.preview.workup': 'Workup',
    'landing.preview.nextSteps': '5 next steps',
    'workspace.eyebrow': 'Interactive clinical module',
    'workspace.formEyebrow': 'Structured input',
    'workspace.formTitle': 'History collection',
    'workspace.helpTitle': 'Quick guidance',
    'workspace.helpBody': 'Check red flags, differential diagnoses, and workup before moving on.',
    'selector.eyebrow': 'Chief complaint',
    'selector.title': 'Select a workflow',
    'form.eyebrow': 'Structured history',
    'preview.eyebrow': 'Generated note',
    'preview.title': 'HPI preview',
    'preview.helper': 'Drag the lower edge to give the note more vertical room.',
    'guidance.redFlagsEyebrow': 'Safety',
    'guidance.redFlagsTitle': 'Red flags',
    'guidance.differentialsEyebrow': 'Reasoning',
    'guidance.differentialsTitle': 'Differential diagnoses',
    'guidance.workupEyebrow': 'Next steps',
    'guidance.workupTitle': 'Suggested workup',
  },
  'pt-BR': {
    'common.help': 'Ajuda',
    'common.language': 'Idioma',
    'common.theme': 'Tema',
    'common.light': 'Claro',
    'common.dark': 'Escuro',
    'common.pin': 'Fixar',
    'common.pinned': 'Fixado',
    'common.copy': 'Copiar',
    'common.copied': 'Copiado',
    'common.selectOption': 'Selecione uma opção',
    'landing.nav.openWorkspace': 'Abrir workspace',
    'landing.eyebrow': 'Workspace de raciocínio clínico',
    'landing.description':
      'Uma plataforma estruturada de apoio à decisão para avaliação diagnóstica guiada por queixa. Criada para coletar história clínica, gerar documentação e manter o raciocínio visível.',
    'landing.action': 'Ver fluxo de Dor Torácica',
    'landing.preview.title': 'Dor Torácica',
    'landing.preview.subtitle': 'Avaliação inicial',
    'landing.preview.dynamicForm': 'Formulário dinâmico',
    'landing.preview.metadataDriven': 'Guiado por metadados',
    'landing.preview.hpiPreview': 'Prévia da HMA',
    'landing.preview.realTime': 'Em tempo real',
    'landing.preview.reasoning': 'Raciocínio clínico',
    'landing.preview.reasoningValue': 'Sinais de alerta e diferencial',
    'landing.preview.workup': 'Investigação',
    'landing.preview.nextSteps': '5 próximos passos',
    'workspace.eyebrow': 'Módulo clínico interativo',
    'workspace.formEyebrow': 'Entrada estruturada',
    'workspace.formTitle': 'Coleta da história',
    'workspace.helpTitle': 'Guia rápido',
    'workspace.helpBody':
      'Revise sinais de alerta, diagnósticos diferenciais e investigação antes de avançar.',
    'selector.eyebrow': 'Queixa principal',
    'selector.title': 'Selecione um fluxo',
    'form.eyebrow': 'História estruturada',
    'preview.eyebrow': 'Nota gerada',
    'preview.title': 'Prévia da HMA',
    'preview.helper': 'Arraste a borda inferior para dar mais espaço vertical à nota.',
    'guidance.redFlagsEyebrow': 'Segurança',
    'guidance.redFlagsTitle': 'Sinais de alerta',
    'guidance.differentialsEyebrow': 'Raciocínio',
    'guidance.differentialsTitle': 'Diagnósticos diferenciais',
    'guidance.workupEyebrow': 'Próximos passos',
    'guidance.workupTitle': 'Investigação sugerida',
  },
} satisfies Record<Locale, Record<string, string>>

const getInitialLocale = (): Locale => {
  if (typeof window === 'undefined') {
    return defaultLocale
  }

  const storedLocale = window.localStorage.getItem(localeStorageKey)

  return isLocale(storedLocale) ? storedLocale : defaultLocale
}

const locale = ref<Locale>(getInitialLocale())

if (typeof document !== 'undefined') {
  document.documentElement.lang = locale.value
}

export const useI18n = () => {
  const setLocale = (nextLocale: Locale) => {
    locale.value = nextLocale

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(localeStorageKey, nextLocale)
      document.documentElement.lang = nextLocale
    }
  }

  const t = (key: keyof (typeof messages)['en']) => messages[locale.value][key] ?? messages.en[key]

  return {
    locale,
    localeLabel: computed(() => locales[locale.value].label),
    setLocale,
    t,
  }
}
