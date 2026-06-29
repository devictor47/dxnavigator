import HeartScoreCalculator from '@/calculators/components/HeartScoreCalculator.vue'
import type { CalculatorCategory, ClinicalCalculator } from '@/calculators/types'
import { defaultLocale, type Locale } from '@/i18n/locales'

type HeartScoreContent = {
  resultLabel: string
  limitation: string
  components: Array<{
    key: 'history' | 'ecg' | 'age' | 'riskFactors' | 'troponin'
    label: string
    options: Array<{
      value: number
      label: string
      description: string
    }>
  }>
  riskGroups: {
    low: {
      label: string
      description: string
    }
    moderate: {
      label: string
      description: string
    }
    high: {
      label: string
      description: string
    }
  }
}

export type HeartScoreCalculatorDefinition = ClinicalCalculator & {
  content: HeartScoreContent
}

export const calculatorCategoryLabels: Record<Locale, Record<CalculatorCategory, string>> = {
  en: {
    scores: 'Scores',
    renal: 'Renal',
    drugs: 'Drugs',
  },
  'pt-BR': {
    scores: 'Escores',
    renal: 'Renal',
    drugs: 'Medicamentos',
  },
}

const heartScoreEn: HeartScoreCalculatorDefinition = {
  id: 'heart-score',
  language: 'en',
  title: 'HEART Score',
  description:
    'Risk stratification tool for adult emergency department patients with chest pain and possible ACS.',
  category: 'scores',
  component: HeartScoreCalculator,
  content: {
    resultLabel: 'Result',
    limitation:
      'Use only for adult patients with chest pain where ACS is being considered. Calculator output does not replace ECG interpretation, serial troponins, local protocols, or clinical judgment.',
    components: [
      {
        key: 'history',
        label: 'History',
        options: [
          { value: 0, label: 'Slightly suspicious', description: 'History is not typical for ACS.' },
          { value: 1, label: 'Moderately suspicious', description: 'Mixed or partially concerning story.' },
          { value: 2, label: 'Highly suspicious', description: 'Typical ACS features are present.' },
        ],
      },
      {
        key: 'ecg',
        label: 'ECG',
        options: [
          { value: 0, label: 'Normal', description: 'No ischemic changes.' },
          { value: 1, label: 'Nonspecific repolarization disturbance', description: 'No significant ST depression.' },
          { value: 2, label: 'Significant ST depression', description: 'Concerning ischemic ECG finding.' },
        ],
      },
      {
        key: 'age',
        label: 'Age',
        options: [
          { value: 0, label: '< 45 years', description: 'Age contributes 0 points.' },
          { value: 1, label: '45-64 years', description: 'Age contributes 1 point.' },
          { value: 2, label: '>= 65 years', description: 'Age contributes 2 points.' },
        ],
      },
      {
        key: 'riskFactors',
        label: 'Risk factors',
        options: [
          { value: 0, label: 'No known risk factors', description: 'No traditional risk factors.' },
          { value: 1, label: '1-2 risk factors', description: 'Examples: diabetes, smoking, hypertension, hyperlipidemia, obesity, family history.' },
          { value: 2, label: '>= 3 risk factors or known atherosclerotic disease', description: 'Known CAD/PAD/CVA or multiple risk factors.' },
        ],
      },
      {
        key: 'troponin',
        label: 'Troponin',
        options: [
          { value: 0, label: '<= normal limit', description: 'Troponin is not elevated.' },
          { value: 1, label: '1-3x normal limit', description: 'Mild elevation.' },
          { value: 2, label: '> 3x normal limit', description: 'Marked elevation.' },
        ],
      },
    ],
    riskGroups: {
      low: {
        label: 'Low risk',
        description: 'Commonly associated with a low short-term MACE risk in HEART Score studies.',
      },
      moderate: {
        label: 'Moderate risk',
        description: 'Needs clinical correlation, serial testing, and local chest pain pathway context.',
      },
      high: {
        label: 'High risk',
        description: 'High concern group; evaluate urgently in context of ACS protocols.',
      },
    },
  },
  sources: [
    {
      title: 'MDCalc: HEART Score for Major Cardiac Events',
      url: 'https://www.mdcalc.com/calc/1752/heart-score-major-cardiac-events',
      note: 'Used for component definitions, score bands, and bedside interpretation framing.',
    },
    {
      title: 'Six AJ, Backus BE, Kelder JC. Chest pain in the emergency room: value of the HEART score. Neth Heart J. 2008.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/19623256/',
      note: 'Original HEART Score publication.',
    },
    {
      title: 'Backus BE et al. A prospective validation of the HEART score for chest pain patients at the emergency department. Int J Cardiol. 2013.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/23465250/',
      note: 'Prospective validation study.',
    },
  ],
}

const heartScorePt: HeartScoreCalculatorDefinition = {
  ...heartScoreEn,
  language: 'pt-BR',
  title: 'Escore HEART',
  description:
    'Estratificação de risco para adultos no pronto atendimento com dor torácica e possível síndrome coronariana aguda.',
  content: {
    resultLabel: 'Resultado',
    limitation:
      'Use apenas em adultos com dor torácica quando SCA está sendo considerada. O resultado não substitui interpretação do ECG, troponinas seriadas, protocolos locais ou julgamento clínico.',
    components: [
      {
        key: 'history',
        label: 'História',
        options: [
          { value: 0, label: 'Pouco suspeita', description: 'História não típica para SCA.' },
          { value: 1, label: 'Moderadamente suspeita', description: 'História mista ou parcialmente preocupante.' },
          { value: 2, label: 'Muito suspeita', description: 'Características típicas de SCA estão presentes.' },
        ],
      },
      {
        key: 'ecg',
        label: 'ECG',
        options: [
          { value: 0, label: 'Normal', description: 'Sem alterações isquêmicas.' },
          { value: 1, label: 'Alteração inespecífica de repolarização', description: 'Sem infradesnivelamento significativo do ST.' },
          { value: 2, label: 'Infradesnivelamento significativo do ST', description: 'Achado eletrocardiográfico preocupante para isquemia.' },
        ],
      },
      {
        key: 'age',
        label: 'Idade',
        options: [
          { value: 0, label: '< 45 anos', description: 'Idade contribui 0 ponto.' },
          { value: 1, label: '45-64 anos', description: 'Idade contribui 1 ponto.' },
          { value: 2, label: '>= 65 anos', description: 'Idade contribui 2 pontos.' },
        ],
      },
      {
        key: 'riskFactors',
        label: 'Fatores de risco',
        options: [
          { value: 0, label: 'Nenhum fator de risco conhecido', description: 'Sem fatores tradicionais conhecidos.' },
          { value: 1, label: '1-2 fatores de risco', description: 'Exemplos: diabetes, tabagismo, hipertensão, dislipidemia, obesidade, história familiar.' },
          { value: 2, label: '>= 3 fatores de risco ou doença aterosclerótica conhecida', description: 'DAC/DAP/AVC conhecidos ou múltiplos fatores de risco.' },
        ],
      },
      {
        key: 'troponin',
        label: 'Troponina',
        options: [
          { value: 0, label: '<= limite normal', description: 'Troponina não elevada.' },
          { value: 1, label: '1-3x o limite normal', description: 'Elevação leve.' },
          { value: 2, label: '> 3x o limite normal', description: 'Elevação importante.' },
        ],
      },
    ],
    riskGroups: {
      low: {
        label: 'Baixo risco',
        description: 'Comumente associado a baixo risco de MACE em curto prazo nos estudos do HEART.',
      },
      moderate: {
        label: 'Risco moderado',
        description: 'Requer correlação clínica, exames seriados e contexto do protocolo local de dor torácica.',
      },
      high: {
        label: 'Alto risco',
        description: 'Grupo de maior preocupação; avaliar urgentemente no contexto dos protocolos de SCA.',
      },
    },
  },
  sources: [
    {
      title: 'MDCalc: HEART Score for Major Cardiac Events',
      url: 'https://www.mdcalc.com/calc/1752/heart-score-major-cardiac-events',
      note: 'Usado para definições dos componentes, faixas de pontuação e interpretação à beira-leito.',
    },
    {
      title: 'Six AJ, Backus BE, Kelder JC. Chest pain in the emergency room: value of the HEART score. Neth Heart J. 2008.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/19623256/',
      note: 'Publicação original do escore HEART.',
    },
    {
      title: 'Backus BE et al. A prospective validation of the HEART score for chest pain patients at the emergency department. Int J Cardiol. 2013.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/23465250/',
      note: 'Estudo prospectivo de validação.',
    },
  ],
}

const calculatorRegistry = {
  en: [heartScoreEn],
  'pt-BR': [heartScorePt],
} satisfies Record<Locale, ClinicalCalculator[]>

export const getClinicalCalculators = (locale: Locale): ClinicalCalculator[] =>
  calculatorRegistry[locale] ?? calculatorRegistry[defaultLocale]

export const getClinicalCalculatorById = (
  calculatorId: string | string[] | undefined,
  locale: Locale,
): ClinicalCalculator | undefined => {
  const selectedCalculatorId = Array.isArray(calculatorId) ? calculatorId[0] : calculatorId

  return getClinicalCalculators(locale).find((calculator) => calculator.id === selectedCalculatorId)
}

export const getCalculatorsByCategory = (
  locale: Locale,
): Record<CalculatorCategory, ClinicalCalculator[]> => {
  return getClinicalCalculators(locale).reduce(
    (groupedCalculators, calculator) => {
      groupedCalculators[calculator.category].push(calculator)

      return groupedCalculators
    },
    {
      scores: [],
      renal: [],
      drugs: [],
    } as Record<CalculatorCategory, ClinicalCalculator[]>,
  )
}
