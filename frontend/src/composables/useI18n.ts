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
    'common.cancel': 'Cancel',
    'common.selectOption': 'Select an option',
    'auth.login': 'Log in',
    'auth.logout': 'Log out',
    'auth.register': 'Create account',
    'auth.account': 'Account',
    'auth.createAccount': 'Create account',
    'auth.loginEyebrow': 'Welcome back',
    'auth.loginTitle': 'Log in to DxNavigator',
    'auth.loginDescription': 'Continue building structured clinical workflows and generated notes.',
    'auth.registerEyebrow': 'Get started',
    'auth.registerTitle': 'Create your DxNavigator account',
    'auth.registerDescription': 'Use a simple local account or continue with Google.',
    'auth.name': 'Name',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.passwordHint': 'Use at least 6 characters. No symbol gymnastics required.',
    'auth.submitting': 'Working...',
    'auth.or': 'or',
    'auth.continueWithGoogle': 'Continue with Google',
    'auth.loginFailed': 'Could not log in with those credentials.',
    'auth.registerFailed': 'Could not create this account.',
    'landing.nav.openWorkspace': 'Open workspace',
    'landing.eyebrow': 'Structured clinical workflows',
    'landing.description':
      'DxNavigator turns complaint-driven evaluations into interactive workflows that collect history, generate HPI text, and keep clinical guidance close while the visit unfolds.',
    'landing.action': 'Open demo workspace',
    'landing.preview.title': 'Chest Pain',
    'landing.preview.subtitle': 'Workflow preview',
    'landing.preview.dynamicForm': 'Structured history',
    'landing.preview.metadataDriven': 'Metadata-driven form',
    'landing.preview.hpiPreview': 'Generated HPI',
    'landing.preview.realTime': 'Updates in real time',
    'landing.preview.reasoning': 'Clinical guidance',
    'landing.preview.reasoningValue': 'Red flags, workup, sources',
    'landing.preview.workup': 'Workflow builder',
    'landing.preview.nextSteps': 'Import and export fluxos',
    'workspace.eyebrow': 'Interactive clinical module',
    'workspace.formEyebrow': 'Structured input',
    'workspace.formTitle': 'History collection',
    'workspace.helpTitle': 'Quick guidance',
    'workspace.helpBody': 'Check red flags, differential diagnoses, and workup before moving on.',
    'summary.title': 'Summary',
    'summary.clinicalGuidance': 'Clinical guidance',
    'summary.guidanceLibrary': 'Guidance library',
    'sidebar.collapse': 'Collapse sidebar',
    'sidebar.expand': 'Expand sidebar',
    'presets.eyebrow': 'Presets',
    'presets.title': 'Load a common state',
    'presets.description': 'Replace the form with a prepared set of answers for a common consultation pattern.',
    'presets.confirmEyebrow': 'Replace form state',
    'presets.confirmTitle': 'Load this preset?',
    'presets.confirmDescription':
      'This will replace the current answers in the form. Fields set by the preset will be highlighted afterward.',
    'presets.rememberDecision': 'Remember this decision and skip this confirmation next time.',
    'presets.replaceForm': 'Replace form',
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
    'guidance.libraryEyebrow': 'Consultation',
    'guidance.libraryTitle': 'Clinical guidance library',
    'guidance.quickGuideTitle': 'Quick Dx Guide',
    'guidance.quickGuideDescription': 'Structured takeaways for quick consultation during care.',
    'guidance.sourceFiguresTitle': 'Source figures',
    'guidance.sourceFiguresDescription': 'Original algorithms or figures from guideline and evidence sources.',
    'guidance.noQuickGuides': 'No quick guides configured for this workflow yet.',
    'guidance.noSourceFigures': 'No source figures configured for this workflow yet.',
    'guidance.criteria': 'Consider when',
    'guidance.actions': 'Suggested actions',
    'guidance.openSource': 'Open original source',
    'builder.nav.workspace': 'Clinical workspace',
    'builder.nav.builder': 'Workflow builder',
    'builder.eyebrow': 'Workflow authoring',
    'builder.title': 'Workflow builder',
    'builder.description':
      'Create the structure of a clinical workflow from metadata before it becomes a rendered clinical form.',
    'builder.detailsTitle': 'Workflow details',
    'builder.detailsDescription': 'Start with stable identifiers and English source text.',
    'builder.workflowId': 'Workflow ID',
    'builder.workflowTitle': 'Title',
    'builder.contentLocale': 'Content locale',
    'builder.workflowOverview': 'Overview',
    'builder.hpiTemplateTitle': 'HPI template',
    'builder.hpiTemplateDescription':
      'Use Liquid placeholders such as {{ onset }} and filters such as {{ radiation | list: locale }}.',
    'builder.generatedNoteTitle': 'Generated note',
    'builder.generatedNoteDescription':
      'Write the note as you want it to appear. Click an answer chip to insert it into the text.',
    'builder.hpiTemplate': 'Template',
    'builder.generatedNote': 'Note text',
    'builder.hpiTemplatePlaceholder':
      'Patient presents with {{ location }}{% if onset %} beginning {{ onset }}{% endif %}.',
    'builder.availableAnswers': 'Available answers',
    'builder.availableAnswersDescription': 'Click a field to insert the patient answer into the note.',
    'builder.emptyTemplateFields': 'Add fields to the workflow before inserting answers.',
    'builder.advancedTemplateSyntax': 'Advanced template syntax',
    'builder.advancedTemplateDescription':
      'Use these patterns when a sentence should appear only sometimes, or when a field contains multiple answers.',
    'builder.sectionsTitle': 'Sections and fields',
    'builder.sectionsDescription': 'Group related clinical questions and add fields to each section.',
    'builder.sectionPlaceholder': 'Section title',
    'builder.sectionTitle': 'Section title',
    'builder.sectionId': 'Section ID',
    'builder.addSection': 'Add section',
    'builder.removeSection': 'Remove section',
    'builder.emptySections': 'No sections yet. Enter a section title above to start building.',
    'builder.fieldsCount': 'fields',
    'builder.fieldLabelPlaceholder': 'Field label',
    'builder.fieldKeyPlaceholder': 'fieldKey',
    'builder.addField': 'Add field',
    'builder.configureField': 'Configure',
    'builder.collapseField': 'Collapse',
    'builder.removeField': 'Remove',
    'builder.emptyFields': 'No fields yet. Add the first field below.',
    'builder.fieldDetailsTitle': 'Field details',
    'builder.fieldDetailsDescription': 'Configure shared metadata and type-specific behavior.',
    'builder.requiredField': 'Required',
    'builder.helperText': 'Helper text',
    'builder.textSettings': 'Text settings',
    'builder.placeholder': 'Placeholder',
    'builder.narrativePrefix': 'Narrative prefix',
    'builder.narrativeSuffix': 'Narrative suffix',
    'builder.booleanSettings': 'Boolean settings',
    'builder.defaultBoolean': 'Default value',
    'builder.defaultUnchecked': 'Unchecked',
    'builder.defaultChecked': 'Checked',
    'builder.narrativeWhenTrue': 'Narrative when checked',
    'builder.narrativeWhenFalse': 'Narrative when unchecked',
    'builder.optionSettings': 'Options',
    'builder.addOption': 'Add option',
    'builder.defaultOption': 'Default option',
    'builder.defaultOptions': 'Default selected options',
    'builder.noDefault': 'No default',
    'builder.emptyOptions': 'No options yet. Add options for users to choose from.',
    'builder.optionLabelPlaceholder': 'Option label',
    'builder.optionValuePlaceholder': 'option-value',
    'builder.optionNarrativePlaceholder': 'Narrative',
    'builder.previewEyebrow': 'Schema preview',
    'builder.previewTitle': 'Generated workflow object',
    'builder.previewDescription': 'This preview follows the workflow shape used by the renderer.',
    'builder.exportJson': 'Export JSON',
    'builder.importJson': 'Import JSON',
    'builder.importInvalid': 'Could not import this JSON file.',
    'builder.validationTitle': 'Validation',
    'builder.validationDescription': 'Check for duplicate identifiers before exporting.',
    'builder.validationNoIssues': 'No duplicate identifiers detected.',
    'builder.validationDuplicateSectionIds': 'Duplicate section IDs',
    'builder.validationDuplicateFieldKeys': 'Duplicate field keys',
    'builder.validationDuplicateOptionValues': 'Duplicate option values',
    'builder.summarySections': 'Sections',
    'builder.summaryFields': 'Fields',
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
    'common.cancel': 'Cancelar',
    'common.selectOption': 'Selecione uma opção',

    'auth.login': 'Entrar',
    'auth.logout': 'Sair',
    'auth.register': 'Criar conta',
    'auth.account': 'Conta',
    'auth.createAccount': 'Criar conta',
    'auth.loginEyebrow': 'Bem-vindo de volta',
    'auth.loginTitle': 'Entrar no DxNavigator',
    'auth.loginDescription': 'Continue criando fluxos clínicos estruturados e notas geradas.',
    'auth.registerEyebrow': 'Comece agora',
    'auth.registerTitle': 'Crie sua conta DxNavigator',
    'auth.registerDescription': 'Use uma conta local simples ou continue com o Google.',
    'auth.name': 'Nome',
    'auth.email': 'E-mail',
    'auth.password': 'Senha',
    'auth.passwordHint': 'Use pelo menos 6 caracteres.',
    'auth.submitting': 'Processando...',
    'auth.or': 'ou',
    'auth.continueWithGoogle': 'Continuar com o Google',
    'auth.loginFailed': 'Não foi possível entrar com essas credenciais.',
    'auth.registerFailed': 'Não foi possível criar esta conta.',

    'landing.nav.openWorkspace': 'Abrir workspace',
    'landing.eyebrow': 'Fluxos clínicos estruturados',
    'landing.description':
      'DxNavigator transforma avaliações guiadas por queixa em fluxos interativos que coletam história, geram texto de HMA e mantêm a orientação clínica por perto durante o atendimento.',
    'landing.action': 'Abrir demonstração do workspace',
    'landing.preview.title': 'Dor Torácica',
    'landing.preview.subtitle': 'Prévia do fluxo',
    'landing.preview.dynamicForm': 'História estruturada',
    'landing.preview.metadataDriven': 'Formulário por metadados',
    'landing.preview.hpiPreview': 'HMA gerada',
    'landing.preview.realTime': 'Atualiza em tempo real',
    'landing.preview.reasoning': 'Orientação clínica',
    'landing.preview.reasoningValue': 'Alertas, conduta e fontes',
    'landing.preview.workup': 'Construtor de fluxos',
    'landing.preview.nextSteps': 'Importar e exportar fluxos',

    'workspace.eyebrow': 'Módulo clínico interativo',
    'workspace.formEyebrow': 'Entrada estruturada',
    'workspace.formTitle': 'Coleta da história',
    'workspace.helpTitle': 'Guia rápido',
    'workspace.helpBody':
      'Revise sinais de alerta, diagnósticos diferenciais e investigação antes de avançar.',

    'summary.title': 'Resumo',
    'summary.clinicalGuidance': 'Orientação clínica',
    'summary.guidanceLibrary': 'Biblioteca de orientação',

    'sidebar.collapse': 'Recolher barra lateral',
    'sidebar.expand': 'Expandir barra lateral',

    'presets.eyebrow': 'Predefinições',
    'presets.title': 'Carregar estado comum',
    'presets.description':
      'Substitua o formulário por um conjunto de respostas preparado para um padrão comum de consulta.',
    'presets.confirmEyebrow': 'Substituir formulário',
    'presets.confirmTitle': 'Carregar esta predefinição?',
    'presets.confirmDescription':
      'Isso substituirá as respostas atuais do formulário. Os campos definidos pela predefinição ficarão destacados depois.',
    'presets.rememberDecision':
      'Lembrar esta decisão e pular esta confirmação da próxima vez.',
    'presets.replaceForm': 'Substituir formulário',

    'selector.eyebrow': 'Queixa principal',
    'selector.title': 'Selecione um fluxo',

    'form.eyebrow': 'História estruturada',

    'preview.eyebrow': 'Nota gerada',
    'preview.title': 'Prévia da HMA',
    'preview.helper':
      'Arraste a borda inferior para dar mais espaço vertical à nota.',

    'guidance.redFlagsEyebrow': 'Segurança',
    'guidance.redFlagsTitle': 'Sinais de alerta',
    'guidance.differentialsEyebrow': 'Raciocínio',
    'guidance.differentialsTitle': 'Diagnósticos diferenciais',
    'guidance.workupEyebrow': 'Próximos passos',
    'guidance.workupTitle': 'Investigação sugerida',
    'guidance.libraryEyebrow': 'Consulta',
    'guidance.libraryTitle': 'Biblioteca de orientação clínica',
    'guidance.quickGuideTitle': 'Guia diagnóstico rápido',
    'guidance.quickGuideDescription':
      'Resumo estruturado para consulta rápida durante o atendimento.',
    'guidance.sourceFiguresTitle': 'Figuras da fonte',
    'guidance.sourceFiguresDescription':
      'Algoritmos ou figuras originais de diretrizes e fontes de evidência.',
    'guidance.noQuickGuides':
      'Nenhum guia rápido configurado para este fluxo ainda.',
    'guidance.noSourceFigures':
      'Nenhuma figura de fonte configurada para este fluxo ainda.',
    'guidance.criteria': 'Considere quando',
    'guidance.actions': 'Ações sugeridas',
    'guidance.openSource': 'Abrir fonte original',

    'builder.nav.workspace': 'Workspace clínico',
    'builder.nav.builder': 'Construtor de fluxos',

    'builder.eyebrow': 'Autoria de fluxos',
    'builder.title': 'Construtor de fluxos',
    'builder.description':
      'Crie a estrutura de um fluxo clínico a partir de metadados antes que ele se torne um formulário renderizado.',

    'builder.detailsTitle': 'Detalhes do fluxo',
    'builder.detailsDescription':
      'Comece com identificadores estáveis e texto-fonte em inglês.',

    'builder.workflowId': 'ID do fluxo',
    'builder.workflowTitle': 'Título',
    'builder.contentLocale': 'Idioma do conteúdo',
    'builder.workflowOverview': 'Resumo',

    'builder.hpiTemplateTitle': 'Template da HMA',
    'builder.hpiTemplateDescription':
      'Use placeholders Liquid como {{ onset }} e filtros como {{ radiation | list: locale }}.',

    'builder.generatedNoteTitle': 'Nota gerada',
    'builder.generatedNoteDescription':
      'Escreva a nota como ela deve aparecer. Clique em uma resposta para inseri-la no texto.',

    'builder.hpiTemplate': 'Template',
    'builder.generatedNote': 'Texto da nota',

    'builder.hpiTemplatePlaceholder':
      'Paciente refere {{ location }}{% if onset %} com início {{ onset }}{% endif %}.',

    'builder.availableAnswers': 'Respostas disponíveis',
    'builder.availableAnswersDescription':
      'Clique em um campo para inserir a resposta do paciente na nota.',

    'builder.emptyTemplateFields':
      'Adicione campos ao fluxo antes de inserir respostas.',

    'builder.advancedTemplateSyntax': 'Sintaxe avançada do template',
    'builder.advancedTemplateDescription':
      'Use estes padrões quando uma frase deve aparecer apenas às vezes ou quando um campo tem várias respostas.',

    'builder.sectionsTitle': 'Seções e campos',
    'builder.sectionsDescription':
      'Agrupe perguntas clínicas relacionadas e adicione campos a cada seção.',

    'builder.sectionPlaceholder': 'Título da seção',
    'builder.sectionTitle': 'Título da seção',
    'builder.sectionId': 'ID da seção',

    'builder.addSection': 'Adicionar seção',
    'builder.removeSection': 'Remover seção',

    'builder.emptySections':
      'Nenhuma seção ainda. Informe um título acima para começar.',

    'builder.fieldsCount': 'campos',

    'builder.fieldLabelPlaceholder': 'Rótulo do campo',
    'builder.fieldKeyPlaceholder': 'fieldKey',

    'builder.addField': 'Adicionar campo',
    'builder.configureField': 'Configurar',
    'builder.collapseField': 'Recolher',
    'builder.removeField': 'Remover',

    'builder.emptyFields':
      'Nenhum campo ainda. Adicione o primeiro campo abaixo.',

    'builder.fieldDetailsTitle': 'Detalhes do campo',
    'builder.fieldDetailsDescription':
      'Configure metadados comuns e comportamento específico do tipo.',

    'builder.requiredField': 'Obrigatório',
    'builder.helperText': 'Texto auxiliar',

    'builder.textSettings': 'Configurações de texto',
    'builder.placeholder': 'Placeholder',
    'builder.narrativePrefix': 'Prefixo narrativo',
    'builder.narrativeSuffix': 'Sufixo narrativo',

    'builder.booleanSettings': 'Configurações booleanas',
    'builder.defaultBoolean': 'Valor padrão',
    'builder.defaultUnchecked': 'Desmarcado',
    'builder.defaultChecked': 'Marcado',
    'builder.narrativeWhenTrue': 'Narrativa quando marcado',
    'builder.narrativeWhenFalse': 'Narrativa quando desmarcado',

    'builder.optionSettings': 'Opções',
    'builder.addOption': 'Adicionar opção',
    'builder.defaultOption': 'Opção padrão',
    'builder.defaultOptions': 'Opções selecionadas por padrão',
    'builder.noDefault': 'Sem padrão',

    'builder.emptyOptions':
      'Nenhuma opção ainda. Adicione opções para o usuário escolher.',

    'builder.optionLabelPlaceholder': 'Rótulo da opção',
    'builder.optionValuePlaceholder': 'valor-da-opção',
    'builder.optionNarrativePlaceholder': 'Narrativa',

    'builder.previewEyebrow': 'Prévia do schema',
    'builder.previewTitle': 'Objeto de fluxo gerado',
    'builder.previewDescription':
      'Esta prévia segue o formato de fluxo usado pelo renderer.',

    'builder.exportJson': 'Exportar JSON',
    'builder.importJson': 'Importar JSON',
    'builder.importInvalid':
      'Não foi possível importar este arquivo JSON.',

    'builder.validationTitle': 'Validação',
    'builder.validationDescription':
      'Verifique identificadores duplicados antes de exportar.',

    'builder.validationNoIssues':
      'Nenhum identificador duplicado detectado.',

    'builder.validationDuplicateSectionIds':
      'IDs de seção duplicados',

    'builder.validationDuplicateFieldKeys':
      'Chaves de campo duplicadas',

    'builder.validationDuplicateOptionValues':
      'Valores de opção duplicados',

    'builder.summarySections': 'Seções',
    'builder.summaryFields': 'Campos',
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
