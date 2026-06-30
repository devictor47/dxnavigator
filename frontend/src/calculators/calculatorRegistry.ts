import ChecklistScoreCalculator from '@/calculators/components/ChecklistScoreCalculator.vue'
import GlasgowComaScaleCalculator from '@/calculators/components/GlasgowComaScaleCalculator.vue'
import HeartScoreCalculator from '@/calculators/components/HeartScoreCalculator.vue'
import InfusionDoseConverter from '@/calculators/components/InfusionDoseConverter.vue'
import NihStrokeScaleCalculator from '@/calculators/components/NihStrokeScaleCalculator.vue'
import TokyoCholecystitisCalculator from '@/calculators/components/TokyoCholecystitisCalculator.vue'
import WellsDvtCalculator from '@/calculators/components/WellsDvtCalculator.vue'
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

type WellsDvtContent = {
  inputLabel: string
  criteriaLabel: string
  resultLabel: string
  selectedCriteriaLabel: string
  limitation: string
  criteria: Array<{
    key:
      | 'activeCancer'
      | 'paralysisParesisImmobilization'
      | 'recentBedriddenOrSurgery'
      | 'localizedTenderness'
      | 'entireLegSwollen'
      | 'calfSwelling'
      | 'pittingEdema'
      | 'collateralVeins'
      | 'previousDvt'
      | 'alternativeDiagnosis'
    label: string
    description?: string
    points: number
  }>
  riskGroups: {
    unlikely: {
      label: string
      description: string
    }
    moderate: {
      label: string
      description: string
    }
    likely: {
      label: string
      description: string
    }
  }
}

export type WellsDvtCalculatorDefinition = ClinicalCalculator & {
  content: WellsDvtContent
}

type ChecklistScoreContent = {
  inputLabel: string
  criteriaLabel: string
  resultLabel: string
  selectedCriteriaLabel: string
  limitation: string
  criteria: Array<{
    key: string
    label: string
    description?: string
    points: number
  }>
  riskGroups: Array<{
    min: number
    max?: number
    label: string
    description: string
  }>
}

export type ChecklistScoreCalculatorDefinition = ClinicalCalculator & {
  content: ChecklistScoreContent
}

type InfusionDoseConverterContent = {
  inputLabel: string
  modeLabel: string
  rateToDoseLabel: string
  doseToRateLabel: string
  infusionLabel: string
  infusionRateLabel: string
  targetDoseLabel: string
  weightLabel: string
  solutionLabel: string
  medicationAmountLabel: string
  medicationUnitLabel: string
  totalVolumeLabel: string
  resultLabel: string
  doseResultLabel: string
  rateResultLabel: string
  concentrationLabel: string
  deliveredAmountLabel: string
  emptyValue: string
  limitation: string
}

export type InfusionDoseConverterDefinition = ClinicalCalculator & {
  content: InfusionDoseConverterContent
}

type GlasgowComaScaleContent = {
  inputLabel: string
  resultLabel: string
  limitation: string
  components: Array<{
    key: 'eye' | 'verbal' | 'motor'
    label: string
    options: Array<{
      value: number
      label: string
      description: string
    }>
  }>
  riskGroups: Array<{
    min: number
    max?: number
    label: string
    description: string
  }>
}

export type GlasgowComaScaleCalculatorDefinition = ClinicalCalculator & {
  content: GlasgowComaScaleContent
}

type NihStrokeScaleContent = {
  inputLabel: string
  resultLabel: string
  limitation: string
  components: Array<{
    key: string
    label: string
    description?: string
    defaultValue: number
    options: Array<{
      value: number
      label: string
      description: string
    }>
  }>
  severityGroups: Array<{
    min: number
    max?: number
    label: string
    description: string
  }>
}

export type NihStrokeScaleCalculatorDefinition = ClinicalCalculator & {
  content: NihStrokeScaleContent
}

type TokyoCriterion = {
  key: string
  label: string
  description: string
}

type TokyoResult = {
  shortLabel: string
  label: string
  description: string
}

type TokyoCholecystitisContent = {
  inputLabel: string
  resultLabel: string
  severityLabel: string
  limitation: string
  localLabel: string
  systemicLabel: string
  imagingLabel: string
  gradeTwoLabel: string
  gradeThreeLabel: string
  localCriteria: TokyoCriterion[]
  systemicCriteria: TokyoCriterion[]
  imagingCriteria: TokyoCriterion[]
  gradeTwoCriteria: TokyoCriterion[]
  gradeThreeCriteria: TokyoCriterion[]
  diagnosis: {
    notMet: TokyoResult
    suspected: TokyoResult
    definite: TokyoResult
  }
  severity: {
    gradeOne: {
      label: string
      description: string
    }
    gradeTwo: {
      label: string
      description: string
    }
    gradeThree: {
      label: string
      description: string
    }
  }
}

export type TokyoCholecystitisCalculatorDefinition = ClinicalCalculator & {
  content: TokyoCholecystitisContent
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

const wellsDvtEn: WellsDvtCalculatorDefinition = {
  id: 'wells-dvt',
  language: 'en',
  title: 'Wells Criteria for DVT',
  description:
    'Clinical prediction rule for estimating pretest probability of lower-extremity deep vein thrombosis.',
  category: 'scores',
  component: WellsDvtCalculator,
  content: {
    inputLabel: 'Wells DVT criteria',
    criteriaLabel: 'Clinical criteria',
    resultLabel: 'Result',
    selectedCriteriaLabel: 'Selected criteria',
    limitation:
      'Use for patients with suspected lower-extremity DVT. This score estimates pretest probability and does not replace clinical judgment, D-dimer strategy, compression ultrasound, or local protocols.',
    criteria: [
      {
        key: 'activeCancer',
        label: 'Active cancer',
        description: 'Treatment ongoing, within previous 6 months, or palliative.',
        points: 1,
      },
      {
        key: 'paralysisParesisImmobilization',
        label: 'Paralysis, paresis, or recent plaster immobilization of the lower extremities',
        description: 'Recent immobilization or neurologic deficit affecting the symptomatic limb.',
        points: 1,
      },
      {
        key: 'recentBedriddenOrSurgery',
        label: 'Recently bedridden or major surgery',
        description: 'Bedridden for more than 3 days or major surgery within 12 weeks requiring anesthesia.',
        points: 1,
      },
      {
        key: 'localizedTenderness',
        label: 'Localized tenderness along the deep venous system',
        description: 'Tenderness following the expected course of deep veins.',
        points: 1,
      },
      {
        key: 'entireLegSwollen',
        label: 'Entire leg swollen',
        description: 'Diffuse swelling of the whole symptomatic lower extremity.',
        points: 1,
      },
      {
        key: 'calfSwelling',
        label: 'Calf swelling greater than 3 cm compared with the asymptomatic leg',
        description: 'Measured 10 cm below the tibial tuberosity.',
        points: 1,
      },
      {
        key: 'pittingEdema',
        label: 'Pitting edema confined to the symptomatic leg',
        description: 'Unilateral pitting edema on the side being evaluated.',
        points: 1,
      },
      {
        key: 'collateralVeins',
        label: 'Collateral superficial veins',
        description: 'Non-varicose collateral veins.',
        points: 1,
      },
      {
        key: 'previousDvt',
        label: 'Previously documented DVT',
        description: 'Prior objective diagnosis of deep vein thrombosis.',
        points: 1,
      },
      {
        key: 'alternativeDiagnosis',
        label: 'Alternative diagnosis at least as likely as DVT',
        description: 'Subtract points when another diagnosis explains the presentation as well as DVT.',
        points: -2,
      },
    ],
    riskGroups: {
      unlikely: {
        label: 'DVT unlikely',
        description: 'Score <= 0. Consider D-dimer and local diagnostic pathways when appropriate.',
      },
      moderate: {
        label: 'Moderate probability',
        description: 'Score 1-2. Correlate with exam, D-dimer strategy, and imaging availability.',
      },
      likely: {
        label: 'DVT likely',
        description: 'Score >= 3. Consider compression ultrasound and local anticoagulation pathways.',
      },
    },
  },
  sources: [
    {
      title: 'MDCalc: Wells Criteria for DVT',
      url: 'https://www.mdcalc.com/calc/362/wells-criteria-dvt',
      note: 'Used for criteria wording, point values, and interpretation framing.',
    },
    {
      title: 'Wells PS et al. Evaluation of D-dimer in the diagnosis of suspected deep-vein thrombosis. N Engl J Med. 2003.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/12853587/',
      note: 'Validation of clinical model combined with D-dimer testing.',
    },
  ],
}

const wellsDvtPt: WellsDvtCalculatorDefinition = {
  ...wellsDvtEn,
  language: 'pt-BR',
  title: 'Critérios de Wells para TVP',
  description:
    'Regra de predição clínica para estimar a probabilidade pré-teste de trombose venosa profunda de membros inferiores.',
  content: {
    inputLabel: 'Critérios de Wells para TVP',
    criteriaLabel: 'Critérios clínicos',
    resultLabel: 'Resultado',
    selectedCriteriaLabel: 'Critérios marcados',
    limitation:
      'Use em pacientes com suspeita de TVP de membros inferiores. O escore estima probabilidade pré-teste e não substitui julgamento clínico, estratégia com D-dímero, ultrassonografia venosa compressiva ou protocolos locais.',
    criteria: [
      {
        key: 'activeCancer',
        label: 'Câncer ativo',
        description: 'Tratamento em andamento, nos últimos 6 meses, ou paliativo.',
        points: 1,
      },
      {
        key: 'paralysisParesisImmobilization',
        label: 'Paralisia, paresia ou imobilização gessada recente de membros inferiores',
        description: 'Imobilização recente ou déficit neurológico afetando o membro sintomático.',
        points: 1,
      },
      {
        key: 'recentBedriddenOrSurgery',
        label: 'Acamado recentemente ou cirurgia de grande porte',
        description: 'Acamado por mais de 3 dias ou cirurgia de grande porte nas últimas 12 semanas com anestesia.',
        points: 1,
      },
      {
        key: 'localizedTenderness',
        label: 'Dor localizada ao longo do sistema venoso profundo',
        description: 'Dor seguindo o trajeto esperado das veias profundas.',
        points: 1,
      },
      {
        key: 'entireLegSwollen',
        label: 'Todo o membro inferior está edemaciado',
        description: 'Edema difuso de todo o membro inferior sintomático.',
        points: 1,
      },
      {
        key: 'calfSwelling',
        label: 'Panturrilha com edema maior que 3 cm em relação ao lado assintomático',
        description: 'Medido 10 cm abaixo da tuberosidade tibial.',
        points: 1,
      },
      {
        key: 'pittingEdema',
        label: 'Edema depressível restrito ao membro sintomático',
        description: 'Edema com cacifo unilateral no lado avaliado.',
        points: 1,
      },
      {
        key: 'collateralVeins',
        label: 'Veias superficiais colaterais',
        description: 'Veias colaterais não varicosas.',
        points: 1,
      },
      {
        key: 'previousDvt',
        label: 'TVP previamente documentada',
        description: 'Diagnóstico objetivo prévio de trombose venosa profunda.',
        points: 1,
      },
      {
        key: 'alternativeDiagnosis',
        label: 'Diagnóstico alternativo pelo menos tão provável quanto TVP',
        description: 'Subtraia pontos quando outro diagnóstico explicar o quadro tão bem quanto TVP.',
        points: -2,
      },
    ],
    riskGroups: {
      unlikely: {
        label: 'TVP improvável',
        description: 'Escore <= 0. Considere D-dímero e fluxos diagnósticos locais quando apropriado.',
      },
      moderate: {
        label: 'Probabilidade moderada',
        description: 'Escore 1-2. Correlacione com exame físico, estratégia com D-dímero e disponibilidade de imagem.',
      },
      likely: {
        label: 'TVP provável',
        description: 'Escore >= 3. Considere ultrassonografia venosa compressiva e fluxos locais de anticoagulação.',
      },
    },
  },
  sources: [
    {
      title: 'MDCalc: Wells Criteria for DVT',
      url: 'https://www.mdcalc.com/calc/362/wells-criteria-dvt',
      note: 'Usado para critérios, valores de pontuação e interpretação à beira-leito.',
    },
    {
      title: 'Wells PS et al. Evaluation of D-dimer in the diagnosis of suspected deep-vein thrombosis. N Engl J Med. 2003.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/12853587/',
      note: 'Validação do modelo clínico combinado ao D-dímero.',
    },
  ],
}

const alvaradoEn: ChecklistScoreCalculatorDefinition = {
  id: 'alvarado-score',
  language: 'en',
  title: 'Alvarado Score',
  description:
    'Clinical score for estimating likelihood of acute appendicitis in patients with abdominal pain.',
  category: 'scores',
  component: ChecklistScoreCalculator,
  content: {
    inputLabel: 'Alvarado Score criteria',
    criteriaLabel: 'MANTRELS criteria',
    resultLabel: 'Result',
    selectedCriteriaLabel: 'Selected criteria',
    limitation:
      'Use as a clinical risk stratification aid for suspected appendicitis. It does not replace serial abdominal exams, imaging strategy, surgical consultation, pregnancy considerations, or local pathways.',
    criteria: [
      { key: 'migration', label: 'Migration of pain to the right lower quadrant', description: 'Pain began elsewhere and moved toward the right lower quadrant.', points: 1 },
      { key: 'anorexia', label: 'Anorexia', description: 'Reduced appetite associated with the current abdominal pain episode.', points: 1 },
      { key: 'nauseaVomiting', label: 'Nausea or vomiting', description: 'Gastrointestinal symptoms accompanying the abdominal pain.', points: 1 },
      { key: 'rlqTenderness', label: 'Right lower quadrant tenderness', description: 'Tenderness to palpation in the right lower quadrant.', points: 2 },
      { key: 'rebound', label: 'Rebound tenderness', description: 'Pain worsens with release of abdominal palpation.', points: 1 },
      { key: 'fever', label: 'Elevated temperature', description: 'Temperature elevation during this illness.', points: 1 },
      { key: 'leukocytosis', label: 'Leukocytosis', description: 'Elevated white blood cell count.', points: 2 },
      { key: 'leftShift', label: 'Left shift of neutrophils', description: 'Neutrophil predominance or bandemia suggesting inflammatory response.', points: 1 },
    ],
    riskGroups: [
      {
        min: 0,
        max: 4,
        label: 'Appendicitis less likely',
        description: 'Score 0-4. Consider observation, alternate diagnoses, and reassessment if symptoms evolve.',
      },
      {
        min: 5,
        max: 6,
        label: 'Compatible with appendicitis',
        description: 'Score 5-6. Clinical correlation, observation, imaging, or surgical pathway may be appropriate.',
      },
      {
        min: 7,
        max: 8,
        label: 'Probable appendicitis',
        description: 'Score 7-8. Higher concern; consider imaging and surgical consultation according to local practice.',
      },
      {
        min: 9,
        label: 'Very probable appendicitis',
        description: 'Score 9-10. High concern group; urgent surgical pathway is commonly considered.',
      },
    ],
  },
  sources: [
    {
      title: 'MDCalc: Alvarado Score for Acute Appendicitis',
      url: 'https://www.mdcalc.com/calc/104/alvarado-score-acute-appendicitis',
      note: 'Used for score criteria, point values, and bedside interpretation framing.',
    },
    {
      title: 'Alvarado A. A practical score for the early diagnosis of acute appendicitis. Ann Emerg Med. 1986.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/3963537/',
      note: 'Original Alvarado Score publication.',
    },
  ],
}

const alvaradoPt: ChecklistScoreCalculatorDefinition = {
  ...alvaradoEn,
  language: 'pt-BR',
  title: 'Escore de Alvarado',
  description:
    'Escore clínico para estimar a probabilidade de apendicite aguda em pacientes com dor abdominal.',
  content: {
    inputLabel: 'Critérios do Escore de Alvarado',
    criteriaLabel: 'Critérios MANTRELS',
    resultLabel: 'Resultado',
    selectedCriteriaLabel: 'Critérios marcados',
    limitation:
      'Use como ferramenta de estratificação de risco em suspeita de apendicite. O escore não substitui exames abdominais seriados, estratégia de imagem, avaliação cirúrgica, considerações sobre gestação ou fluxos locais.',
    criteria: [
      { key: 'migration', label: 'Migração da dor para a fossa ilíaca direita', description: 'Dor iniciou em outro local e migrou para a fossa ilíaca direita.', points: 1 },
      { key: 'anorexia', label: 'Anorexia', description: 'Redução do apetite associada ao episódio atual de dor abdominal.', points: 1 },
      { key: 'nauseaVomiting', label: 'Náuseas ou vômitos', description: 'Sintomas gastrointestinais acompanhando a dor abdominal.', points: 1 },
      { key: 'rlqTenderness', label: 'Dor à palpação em fossa ilíaca direita', description: 'Dor à palpação localizada em fossa ilíaca direita.', points: 2 },
      { key: 'rebound', label: 'Dor à descompressão brusca', description: 'Dor piora com a retirada súbita da palpação abdominal.', points: 1 },
      { key: 'fever', label: 'Temperatura elevada', description: 'Elevação da temperatura durante o quadro atual.', points: 1 },
      { key: 'leukocytosis', label: 'Leucocitose', description: 'Contagem de leucócitos elevada.', points: 2 },
      { key: 'leftShift', label: 'Desvio à esquerda de neutrófilos', description: 'Predomínio de neutrófilos ou bastonetes sugerindo resposta inflamatória.', points: 1 },
    ],
    riskGroups: [
      {
        min: 0,
        max: 4,
        label: 'Apendicite menos provável',
        description: 'Escore 0-4. Considere observação, diagnósticos alternativos e reavaliação se houver evolução dos sintomas.',
      },
      {
        min: 5,
        max: 6,
        label: 'Compatível com apendicite',
        description: 'Escore 5-6. Correlação clínica, observação, imagem ou fluxo cirúrgico podem ser apropriados.',
      },
      {
        min: 7,
        max: 8,
        label: 'Apendicite provável',
        description: 'Escore 7-8. Maior preocupação; considere imagem e avaliação cirúrgica conforme prática local.',
      },
      {
        min: 9,
        label: 'Apendicite muito provável',
        description: 'Escore 9-10. Grupo de alta preocupação; fluxo cirúrgico urgente costuma ser considerado.',
      },
    ],
  },
  sources: [
    {
      title: 'MDCalc: Alvarado Score for Acute Appendicitis',
      url: 'https://www.mdcalc.com/calc/104/alvarado-score-acute-appendicitis',
      note: 'Usado para critérios, valores de pontuação e interpretação à beira-leito.',
    },
    {
      title: 'Alvarado A. A practical score for the early diagnosis of acute appendicitis. Ann Emerg Med. 1986.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/3963537/',
      note: 'Publicação original do Escore de Alvarado.',
    },
  ],
}

const pediatricAppendicitisScoreEn: ChecklistScoreCalculatorDefinition = {
  id: 'pediatric-appendicitis-score',
  language: 'en',
  title: 'Pediatric Appendicitis Score',
  description:
    'Clinical score for estimating likelihood of acute appendicitis in children with abdominal pain.',
  category: 'scores',
  component: ChecklistScoreCalculator,
  content: {
    inputLabel: 'Pediatric Appendicitis Score criteria',
    criteriaLabel: 'PAS criteria',
    resultLabel: 'Result',
    selectedCriteriaLabel: 'Selected criteria',
    limitation:
      'Use only as an adjunct for children with suspected appendicitis. The score does not replace pediatric assessment, serial exams, imaging strategy, surgical consultation, or local pathways.',
    criteria: [
      { key: 'migration', label: 'Migration of pain', description: 'Pain moved toward the right lower quadrant during the illness.', points: 1 },
      { key: 'anorexia', label: 'Anorexia', description: 'Reduced appetite during the current abdominal pain episode.', points: 1 },
      { key: 'nauseaVomiting', label: 'Nausea or vomiting', description: 'Nausea and/or vomiting associated with the abdominal pain.', points: 1 },
      { key: 'rlqTenderness', label: 'Right lower quadrant tenderness', description: 'Tenderness to palpation in the right lower quadrant.', points: 2 },
      { key: 'coughPercussionHopTenderness', label: 'Cough, percussion, or hopping tenderness in the right lower quadrant', description: 'Pain provoked by movement, percussion, cough, or hopping.', points: 2 },
      { key: 'fever', label: 'Fever', description: 'Temperature >= 38 C.', points: 1 },
      { key: 'leukocytosis', label: 'Leukocytosis', description: 'White blood cell count > 10,000/mm3.', points: 1 },
      { key: 'neutrophilia', label: 'Neutrophilia', description: 'Absolute neutrophil count > 7,500/mm3 or neutrophils > 75%.', points: 1 },
    ],
    riskGroups: [
      {
        min: 0,
        max: 3,
        label: 'Low probability',
        description: 'Score 0-3. Appendicitis is less likely, but reassessment is important if symptoms persist or evolve.',
      },
      {
        min: 4,
        max: 6,
        label: 'Equivocal probability',
        description: 'Score 4-6. Observation, repeat examination, labs, imaging, or surgical consultation may be appropriate.',
      },
      {
        min: 7,
        label: 'High probability',
        description: 'Score 7-10. Higher concern for appendicitis; consider imaging and surgical pathway according to local practice.',
      },
    ],
  },
  sources: [
    {
      title: 'MDCalc: Pediatric Appendicitis Score',
      url: 'https://www.mdcalc.com/calc/102/pediatric-appendicitis-score-pas',
      note: 'Used for criteria, point values, and interpretation framing.',
    },
    {
      title: 'Samuel M. Pediatric appendicitis score. J Pediatr Surg. 2002.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/12037754/',
      note: 'Original Pediatric Appendicitis Score publication.',
    },
  ],
}

const pediatricAppendicitisScorePt: ChecklistScoreCalculatorDefinition = {
  ...pediatricAppendicitisScoreEn,
  language: 'pt-BR',
  title: 'Escore Pediátrico de Apendicite',
  description:
    'Escore clínico para estimar a probabilidade de apendicite aguda em crianças com dor abdominal.',
  content: {
    inputLabel: 'Critérios do Escore Pediátrico de Apendicite',
    criteriaLabel: 'Critérios PAS',
    resultLabel: 'Resultado',
    selectedCriteriaLabel: 'Critérios marcados',
    limitation:
      'Use apenas como apoio em crianças com suspeita de apendicite. O escore não substitui avaliação pediátrica, exames seriados, estratégia de imagem, avaliação cirúrgica ou fluxos locais.',
    criteria: [
      { key: 'migration', label: 'Migração da dor', description: 'Dor migrou para a fossa ilíaca direita durante o quadro.', points: 1 },
      { key: 'anorexia', label: 'Anorexia', description: 'Redução do apetite durante o episódio atual de dor abdominal.', points: 1 },
      { key: 'nauseaVomiting', label: 'Náuseas ou vômitos', description: 'Náuseas e/ou vômitos associados à dor abdominal.', points: 1 },
      { key: 'rlqTenderness', label: 'Dor à palpação em fossa ilíaca direita', description: 'Dor à palpação localizada em fossa ilíaca direita.', points: 2 },
      { key: 'coughPercussionHopTenderness', label: 'Dor em fossa ilíaca direita ao tossir, percutir ou pular', description: 'Dor provocada por movimento, percussão, tosse ou pulo.', points: 2 },
      { key: 'fever', label: 'Febre', description: 'Temperatura >= 38 C.', points: 1 },
      { key: 'leukocytosis', label: 'Leucocitose', description: 'Leucócitos > 10.000/mm3.', points: 1 },
      { key: 'neutrophilia', label: 'Neutrofilia', description: 'Neutrófilos absolutos > 7.500/mm3 ou neutrófilos > 75%.', points: 1 },
    ],
    riskGroups: [
      {
        min: 0,
        max: 3,
        label: 'Baixa probabilidade',
        description: 'Escore 0-3. Apendicite é menos provável, mas reavaliação é importante se os sintomas persistirem ou evoluírem.',
      },
      {
        min: 4,
        max: 6,
        label: 'Probabilidade intermediária',
        description: 'Escore 4-6. Observação, novo exame físico, exames laboratoriais, imagem ou avaliação cirúrgica podem ser apropriados.',
      },
      {
        min: 7,
        label: 'Alta probabilidade',
        description: 'Escore 7-10. Maior preocupação para apendicite; considere imagem e fluxo cirúrgico conforme prática local.',
      },
    ],
  },
  sources: [
    {
      title: 'MDCalc: Pediatric Appendicitis Score',
      url: 'https://www.mdcalc.com/calc/102/pediatric-appendicitis-score-pas',
      note: 'Usado para critérios, valores de pontuação e interpretação.',
    },
    {
      title: 'Samuel M. Pediatric appendicitis score. J Pediatr Surg. 2002.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/12037754/',
      note: 'Publicação original do Escore Pediátrico de Apendicite.',
    },
  ],
}

const qsofaScoreEn: ChecklistScoreCalculatorDefinition = {
  id: 'qsofa-score',
  language: 'en',
  title: 'qSOFA Score',
  description:
    'Bedside score for identifying adults with suspected infection at higher risk of poor outcomes.',
  category: 'scores',
  component: ChecklistScoreCalculator,
  content: {
    inputLabel: 'qSOFA criteria',
    criteriaLabel: 'Bedside criteria',
    resultLabel: 'Result',
    selectedCriteriaLabel: 'Criteria present',
    limitation:
      'Use only as a rapid bedside risk flag in adults with suspected infection. qSOFA does not diagnose sepsis and should not replace clinical judgment, lactate, organ dysfunction assessment, or local sepsis protocols.',
    criteria: [
      {
        key: 'alteredMentation',
        label: 'Altered mentation',
        description: 'Glasgow Coma Scale < 15 or new mental status change.',
        points: 1,
      },
      {
        key: 'respiratoryRate',
        label: 'Respiratory rate >= 22/min',
        description: 'Tachypnea at or above the qSOFA threshold.',
        points: 1,
      },
      {
        key: 'systolicBloodPressure',
        label: 'Systolic blood pressure <= 100 mmHg',
        description: 'Hypotension at or below the qSOFA threshold.',
        points: 1,
      },
    ],
    riskGroups: [
      {
        min: 0,
        max: 1,
        label: 'Lower qSOFA risk flag',
        description: 'Score 0-1. Continue clinical assessment; qSOFA can miss sepsis and does not rule it out.',
      },
      {
        min: 2,
        label: 'Higher qSOFA risk flag',
        description: 'Score >= 2. Associated with higher risk of poor outcome; consider urgent sepsis evaluation and local protocols.',
      },
    ],
  },
  sources: [
    {
      title: 'Singer M et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/26903338/',
      note: 'Consensus publication introducing qSOFA as a bedside prompt for suspected infection.',
    },
    {
      title: 'Surviving Sepsis Campaign Guidelines 2021',
      url: 'https://pubmed.ncbi.nlm.nih.gov/34599691/',
      note: 'Clinical context for sepsis recognition and management; qSOFA is not used as a standalone diagnostic rule.',
    },
  ],
}

const qsofaScorePt: ChecklistScoreCalculatorDefinition = {
  ...qsofaScoreEn,
  language: 'pt-BR',
  title: 'Escore qSOFA',
  description:
    'Escore à beira-leito para identificar adultos com suspeita de infecção e maior risco de desfechos desfavoráveis.',
  content: {
    inputLabel: 'Critérios qSOFA',
    criteriaLabel: 'Critérios à beira-leito',
    resultLabel: 'Resultado',
    selectedCriteriaLabel: 'Critérios presentes',
    limitation:
      'Use apenas como alerta rápido de risco à beira-leito em adultos com suspeita de infecção. O qSOFA não diagnostica sepse e não substitui julgamento clínico, lactato, avaliação de disfunção orgânica ou protocolos locais de sepse.',
    criteria: [
      {
        key: 'alteredMentation',
        label: 'Alteração do estado mental',
        description: 'Escala de Coma de Glasgow < 15 ou nova alteração do estado mental.',
        points: 1,
      },
      {
        key: 'respiratoryRate',
        label: 'Frequência respiratória >= 22/min',
        description: 'Taquipneia no limiar do qSOFA ou acima dele.',
        points: 1,
      },
      {
        key: 'systolicBloodPressure',
        label: 'Pressão arterial sistólica <= 100 mmHg',
        description: 'Hipotensão no limiar do qSOFA ou abaixo dele.',
        points: 1,
      },
    ],
    riskGroups: [
      {
        min: 0,
        max: 1,
        label: 'Menor alerta de risco pelo qSOFA',
        description: 'Escore 0-1. Continue a avaliação clínica; qSOFA pode não identificar sepse e não exclui o diagnóstico.',
      },
      {
        min: 2,
        label: 'Maior alerta de risco pelo qSOFA',
        description: 'Escore >= 2. Associado a maior risco de desfecho desfavorável; considere avaliação urgente para sepse e protocolos locais.',
      },
    ],
  },
  sources: [
    {
      title: 'Singer M et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/26903338/',
      note: 'Publicação de consenso que introduziu o qSOFA como alerta à beira-leito em suspeita de infecção.',
    },
    {
      title: 'Surviving Sepsis Campaign Guidelines 2021',
      url: 'https://pubmed.ncbi.nlm.nih.gov/34599691/',
      note: 'Contexto clínico para reconhecimento e manejo de sepse; qSOFA não deve ser usado como regra diagnóstica isolada.',
    },
  ],
}

const wellsPeEn: ChecklistScoreCalculatorDefinition = {
  id: 'wells-pe',
  language: 'en',
  title: 'Wells Criteria for PE',
  description: 'Clinical prediction score for estimating pretest probability of pulmonary embolism.',
  category: 'scores',
  component: ChecklistScoreCalculator,
  content: {
    inputLabel: 'Wells PE criteria',
    criteriaLabel: 'Clinical criteria',
    resultLabel: 'Result',
    selectedCriteriaLabel: 'Criteria present',
    limitation:
      'Use for patients where pulmonary embolism is clinically suspected. This score estimates pretest probability and does not replace clinical judgment, D-dimer strategy, imaging decisions, or local protocols.',
    criteria: [
      { key: 'clinicalSignsDvt', label: 'Clinical signs and symptoms of DVT', description: 'Minimum of leg swelling and pain with palpation of deep veins.', points: 3 },
      { key: 'peMostLikely', label: 'PE is the most likely diagnosis', description: 'Alternative diagnosis is less likely than pulmonary embolism.', points: 3 },
      { key: 'heartRate', label: 'Heart rate > 100/min', description: 'Tachycardia above the Wells threshold.', points: 1.5 },
      { key: 'immobilizationSurgery', label: 'Recent immobilization or surgery', description: 'Immobilization for at least 3 days or surgery in the previous 4 weeks.', points: 1.5 },
      { key: 'previousVte', label: 'Previous DVT or PE', description: 'Previously documented venous thromboembolism.', points: 1.5 },
      { key: 'hemoptysis', label: 'Hemoptysis', description: 'Coughing blood with the current illness.', points: 1 },
      { key: 'malignancy', label: 'Malignancy', description: 'Treatment ongoing, within previous 6 months, or palliative.', points: 1 },
    ],
    riskGroups: [
      { min: 0, max: 1, label: 'Low probability', description: 'Score 0-1. Use with local PE pathway and D-dimer strategy when appropriate.' },
      { min: 2, max: 6, label: 'Moderate probability', description: 'Score 2-6. Correlate with clinical picture, D-dimer strategy, and imaging threshold.' },
      { min: 6.5, label: 'High probability', description: 'Score > 6. Higher concern group; consider definitive imaging according to local protocol.' },
    ],
  },
  sources: [
    { title: 'MDCalc: Wells Criteria for Pulmonary Embolism', url: 'https://www.mdcalc.com/calc/115/wells-criteria-pulmonary-embolism', note: 'Used for criteria, point values, and interpretation framing.' },
    { title: 'Wells PS et al. Derivation of a simple clinical model to categorize patients probability of pulmonary embolism. Thromb Haemost. 2000.', url: 'https://pubmed.ncbi.nlm.nih.gov/10744147/', note: 'Clinical model derivation paper.' },
  ],
}

const wellsPePt: ChecklistScoreCalculatorDefinition = {
  ...wellsPeEn,
  language: 'pt-BR',
  title: 'Critérios de Wells para TEP',
  description: 'Escore de predição clínica para estimar a probabilidade pré-teste de tromboembolismo pulmonar.',
  content: {
    inputLabel: 'Critérios de Wells para TEP',
    criteriaLabel: 'Critérios clínicos',
    resultLabel: 'Resultado',
    selectedCriteriaLabel: 'Critérios presentes',
    limitation:
      'Use em pacientes com suspeita clínica de tromboembolismo pulmonar. O escore estima probabilidade pré-teste e não substitui julgamento clínico, estratégia com D-dímero, decisão de imagem ou protocolos locais.',
    criteria: [
      { key: 'clinicalSignsDvt', label: 'Sinais e sintomas clínicos de TVP', description: 'No mínimo edema de perna e dor à palpação de veias profundas.', points: 3 },
      { key: 'peMostLikely', label: 'TEP é o diagnóstico mais provável', description: 'Diagnóstico alternativo é menos provável que tromboembolismo pulmonar.', points: 3 },
      { key: 'heartRate', label: 'Frequência cardíaca > 100/min', description: 'Taquicardia acima do limiar de Wells.', points: 1.5 },
      { key: 'immobilizationSurgery', label: 'Imobilização ou cirurgia recente', description: 'Imobilização por pelo menos 3 dias ou cirurgia nas últimas 4 semanas.', points: 1.5 },
      { key: 'previousVte', label: 'TVP ou TEP prévio', description: 'Tromboembolismo venoso previamente documentado.', points: 1.5 },
      { key: 'hemoptysis', label: 'Hemoptise', description: 'Expectoração com sangue no quadro atual.', points: 1 },
      { key: 'malignancy', label: 'Neoplasia', description: 'Tratamento em andamento, nos últimos 6 meses, ou paliativo.', points: 1 },
    ],
    riskGroups: [
      { min: 0, max: 1, label: 'Baixa probabilidade', description: 'Escore 0-1. Use com fluxo local para TEP e estratégia com D-dímero quando apropriado.' },
      { min: 2, max: 6, label: 'Probabilidade moderada', description: 'Escore 2-6. Correlacione com quadro clínico, estratégia com D-dímero e limiar para imagem.' },
      { min: 6.5, label: 'Alta probabilidade', description: 'Escore > 6. Grupo de maior preocupação; considere imagem definitiva conforme protocolo local.' },
    ],
  },
  sources: [
    { title: 'MDCalc: Wells Criteria for Pulmonary Embolism', url: 'https://www.mdcalc.com/calc/115/wells-criteria-pulmonary-embolism', note: 'Usado para critérios, valores de pontuação e interpretação.' },
    { title: 'Wells PS et al. Derivation of a simple clinical model to categorize patients probability of pulmonary embolism. Thromb Haemost. 2000.', url: 'https://pubmed.ncbi.nlm.nih.gov/10744147/', note: 'Publicação de derivação do modelo clínico.' },
  ],
}

const percEn: ChecklistScoreCalculatorDefinition = {
  id: 'perc-rule',
  language: 'en',
  title: 'PERC Rule',
  description: 'Pulmonary embolism rule-out criteria for very low-risk patients.',
  category: 'scores',
  component: ChecklistScoreCalculator,
  content: {
    inputLabel: 'PERC criteria',
    criteriaLabel: 'Positive criteria',
    resultLabel: 'Result',
    selectedCriteriaLabel: 'Criteria present',
    limitation:
      'Use only when clinician gestalt already suggests low pretest probability for PE. PERC is not intended for moderate or high-risk patients and does not replace clinical judgment.',
    criteria: [
      { key: 'age', label: 'Age >= 50 years', description: 'Patient is 50 years or older.', points: 1 },
      { key: 'heartRate', label: 'Heart rate >= 100/min', description: 'Tachycardia at or above the PERC threshold.', points: 1 },
      { key: 'oxygenSaturation', label: 'Oxygen saturation < 95%', description: 'Room-air oxygen saturation below 95%.', points: 1 },
      { key: 'hemoptysis', label: 'Hemoptysis', description: 'Coughing blood with the current illness.', points: 1 },
      { key: 'estrogen', label: 'Estrogen use', description: 'Current exogenous estrogen use.', points: 1 },
      { key: 'priorVte', label: 'Prior DVT or PE', description: 'Previously documented venous thromboembolism.', points: 1 },
      { key: 'unilateralLegSwelling', label: 'Unilateral leg swelling', description: 'Asymmetric lower-extremity swelling.', points: 1 },
      { key: 'recentSurgeryTrauma', label: 'Recent surgery or trauma', description: 'Surgery or trauma requiring hospitalization within the previous 4 weeks.', points: 1 },
    ],
    riskGroups: [
      { min: 0, max: 0, label: 'PERC negative', description: 'No criteria present. In a truly low-risk patient, PE may be ruled out without D-dimer according to local pathways.' },
      { min: 1, label: 'PERC positive', description: 'At least one criterion present. PERC cannot be used to rule out PE.' },
    ],
  },
  sources: [
    { title: 'MDCalc: PERC Rule for Pulmonary Embolism', url: 'https://www.mdcalc.com/calc/347/perc-rule-pulmonary-embolism', note: 'Used for criteria and bedside interpretation framing.' },
    { title: 'Kline JA et al. Clinical criteria to prevent unnecessary diagnostic testing in emergency department patients with suspected pulmonary embolism. J Thromb Haemost. 2004.', url: 'https://pubmed.ncbi.nlm.nih.gov/15304025/', note: 'Original PERC publication.' },
  ],
}

const percPt: ChecklistScoreCalculatorDefinition = {
  ...percEn,
  language: 'pt-BR',
  title: 'Regra PERC',
  description: 'Critérios para excluir tromboembolismo pulmonar em pacientes de muito baixo risco.',
  content: {
    inputLabel: 'Critérios PERC',
    criteriaLabel: 'Critérios positivos',
    resultLabel: 'Resultado',
    selectedCriteriaLabel: 'Critérios presentes',
    limitation:
      'Use apenas quando a impressão clínica já sugerir baixa probabilidade pré-teste para TEP. PERC não foi feito para pacientes de risco moderado ou alto e não substitui julgamento clínico.',
    criteria: [
      { key: 'age', label: 'Idade >= 50 anos', description: 'Paciente com 50 anos ou mais.', points: 1 },
      { key: 'heartRate', label: 'Frequência cardíaca >= 100/min', description: 'Taquicardia no limiar do PERC ou acima dele.', points: 1 },
      { key: 'oxygenSaturation', label: 'Saturação de oxigênio < 95%', description: 'Saturação em ar ambiente abaixo de 95%.', points: 1 },
      { key: 'hemoptysis', label: 'Hemoptise', description: 'Expectoração com sangue no quadro atual.', points: 1 },
      { key: 'estrogen', label: 'Uso de estrogênio', description: 'Uso atual de estrogênio exógeno.', points: 1 },
      { key: 'priorVte', label: 'TVP ou TEP prévio', description: 'Tromboembolismo venoso previamente documentado.', points: 1 },
      { key: 'unilateralLegSwelling', label: 'Edema unilateral de perna', description: 'Edema assimétrico de membro inferior.', points: 1 },
      { key: 'recentSurgeryTrauma', label: 'Cirurgia ou trauma recente', description: 'Cirurgia ou trauma com hospitalização nas últimas 4 semanas.', points: 1 },
    ],
    riskGroups: [
      { min: 0, max: 0, label: 'PERC negativo', description: 'Nenhum critério presente. Em paciente realmente de baixo risco, TEP pode ser excluído sem D-dímero conforme fluxos locais.' },
      { min: 1, label: 'PERC positivo', description: 'Pelo menos um critério presente. PERC não pode ser usado para excluir TEP.' },
    ],
  },
  sources: [
    { title: 'MDCalc: PERC Rule for Pulmonary Embolism', url: 'https://www.mdcalc.com/calc/347/perc-rule-pulmonary-embolism', note: 'Usado para critérios e interpretação à beira-leito.' },
    { title: 'Kline JA et al. Clinical criteria to prevent unnecessary diagnostic testing in emergency department patients with suspected pulmonary embolism. J Thromb Haemost. 2004.', url: 'https://pubmed.ncbi.nlm.nih.gov/15304025/', note: 'Publicação original da regra PERC.' },
  ],
}

const curb65En: ChecklistScoreCalculatorDefinition = {
  id: 'curb-65',
  language: 'en',
  title: 'CURB-65',
  description: 'Pneumonia severity score using confusion, urea, respiratory rate, blood pressure, and age.',
  category: 'scores',
  component: ChecklistScoreCalculator,
  content: {
    inputLabel: 'CURB-65 criteria',
    criteriaLabel: 'Severity criteria',
    resultLabel: 'Result',
    selectedCriteriaLabel: 'Criteria present',
    limitation:
      'Use for adults with community-acquired pneumonia. This score supports severity assessment and disposition decisions but does not replace oxygenation, comorbidity, social context, pregnancy status, or local protocols.',
    criteria: [
      { key: 'confusion', label: 'Confusion', description: 'New disorientation or altered mental status.', points: 1 },
      { key: 'urea', label: 'Urea > 7 mmol/L or BUN > 19 mg/dL', description: 'Elevated urea nitrogen criterion.', points: 1 },
      { key: 'respiratoryRate', label: 'Respiratory rate >= 30/min', description: 'Tachypnea at or above the CURB-65 threshold.', points: 1 },
      { key: 'bloodPressure', label: 'Low blood pressure', description: 'Systolic < 90 mmHg or diastolic <= 60 mmHg.', points: 1 },
      { key: 'age', label: 'Age >= 65 years', description: 'Age criterion for CURB-65.', points: 1 },
    ],
    riskGroups: [
      { min: 0, max: 1, label: 'Low severity', description: 'Score 0-1. Outpatient treatment may be considered if otherwise appropriate.' },
      { min: 2, max: 2, label: 'Moderate severity', description: 'Score 2. Consider short inpatient treatment or closely supervised outpatient care depending on context.' },
      { min: 3, label: 'High severity', description: 'Score 3-5. Consider inpatient care and possible ICU-level evaluation depending on clinical status.' },
    ],
  },
  sources: [
    { title: 'MDCalc: CURB-65 Score for Pneumonia Severity', url: 'https://www.mdcalc.com/calc/324/curb-65-score-pneumonia-severity', note: 'Used for criteria, point values, and interpretation framing.' },
    { title: 'Lim WS et al. Defining community acquired pneumonia severity on presentation to hospital. Thorax. 2003.', url: 'https://pubmed.ncbi.nlm.nih.gov/12728155/', note: 'CURB-65 derivation/validation publication.' },
  ],
}

const curb65Pt: ChecklistScoreCalculatorDefinition = {
  ...curb65En,
  language: 'pt-BR',
  title: 'CURB-65',
  description: 'Escore de gravidade para pneumonia usando confusão, ureia, frequência respiratória, pressão arterial e idade.',
  content: {
    inputLabel: 'Critérios CURB-65',
    criteriaLabel: 'Critérios de gravidade',
    resultLabel: 'Resultado',
    selectedCriteriaLabel: 'Critérios presentes',
    limitation:
      'Use em adultos com pneumonia adquirida na comunidade. O escore apoia avaliação de gravidade e decisão de local de tratamento, mas não substitui oxigenação, comorbidades, contexto social, gestação ou protocolos locais.',
    criteria: [
      { key: 'confusion', label: 'Confusão', description: 'Desorientação nova ou alteração do estado mental.', points: 1 },
      { key: 'urea', label: 'Ureia > 7 mmol/L ou BUN > 19 mg/dL', description: 'Critério de ureia nitrogenada elevada.', points: 1 },
      { key: 'respiratoryRate', label: 'Frequência respiratória >= 30/min', description: 'Taquipneia no limiar do CURB-65 ou acima dele.', points: 1 },
      { key: 'bloodPressure', label: 'Pressão arterial baixa', description: 'Sistólica < 90 mmHg ou diastólica <= 60 mmHg.', points: 1 },
      { key: 'age', label: 'Idade >= 65 anos', description: 'Critério de idade do CURB-65.', points: 1 },
    ],
    riskGroups: [
      { min: 0, max: 1, label: 'Baixa gravidade', description: 'Escore 0-1. Tratamento ambulatorial pode ser considerado se o restante do contexto permitir.' },
      { min: 2, max: 2, label: 'Gravidade moderada', description: 'Escore 2. Considere internação breve ou cuidado ambulatorial supervisionado conforme contexto.' },
      { min: 3, label: 'Alta gravidade', description: 'Escore 3-5. Considere internação e possível avaliação em nível de UTI conforme estado clínico.' },
    ],
  },
  sources: [
    { title: 'MDCalc: CURB-65 Score for Pneumonia Severity', url: 'https://www.mdcalc.com/calc/324/curb-65-score-pneumonia-severity', note: 'Usado para critérios, valores de pontuação e interpretação.' },
    { title: 'Lim WS et al. Defining community acquired pneumonia severity on presentation to hospital. Thorax. 2003.', url: 'https://pubmed.ncbi.nlm.nih.gov/12728155/', note: 'Publicação de derivação/validação do CURB-65.' },
  ],
}

const crb65En: ChecklistScoreCalculatorDefinition = {
  ...curb65En,
  id: 'crb-65',
  title: 'CRB-65',
  description: 'Pneumonia severity score using bedside criteria without urea measurement.',
  content: {
    ...curb65En.content,
    inputLabel: 'CRB-65 criteria',
    criteriaLabel: 'Bedside severity criteria',
    limitation:
      'Use for adults with community-acquired pneumonia when urea is not available. CRB-65 supports severity assessment but does not replace full clinical evaluation or local protocols.',
    criteria: curb65En.content.criteria.filter((criterion) => criterion.key !== 'urea'),
    riskGroups: [
      { min: 0, max: 0, label: 'Low severity', description: 'Score 0. Outpatient treatment may be considered if otherwise appropriate.' },
      { min: 1, max: 2, label: 'Increased severity', description: 'Score 1-2. Consider hospital assessment depending on clinical and social context.' },
      { min: 3, label: 'High severity', description: 'Score 3-4. Consider urgent hospital assessment and possible higher level of care.' },
    ],
  },
}

const crb65Pt: ChecklistScoreCalculatorDefinition = {
  ...curb65Pt,
  id: 'crb-65',
  title: 'CRB-65',
  description: 'Escore de gravidade para pneumonia usando critérios à beira-leito sem ureia.',
  content: {
    ...curb65Pt.content,
    inputLabel: 'Critérios CRB-65',
    criteriaLabel: 'Critérios de gravidade à beira-leito',
    limitation:
      'Use em adultos com pneumonia adquirida na comunidade quando ureia não estiver disponível. CRB-65 apoia avaliação de gravidade, mas não substitui avaliação clínica completa ou protocolos locais.',
    criteria: curb65Pt.content.criteria.filter((criterion) => criterion.key !== 'urea'),
    riskGroups: [
      { min: 0, max: 0, label: 'Baixa gravidade', description: 'Escore 0. Tratamento ambulatorial pode ser considerado se o restante do contexto permitir.' },
      { min: 1, max: 2, label: 'Gravidade aumentada', description: 'Escore 1-2. Considere avaliação hospitalar conforme contexto clínico e social.' },
      { min: 3, label: 'Alta gravidade', description: 'Escore 3-4. Considere avaliação hospitalar urgente e possível cuidado em maior complexidade.' },
    ],
  },
}

const glasgowComaScaleEn: GlasgowComaScaleCalculatorDefinition = {
  id: 'glasgow-coma-scale',
  language: 'en',
  title: 'Glasgow Coma Scale',
  description: 'Neurologic scale scoring eye, verbal, and motor responses from 3 to 15.',
  category: 'scores',
  component: GlasgowComaScaleCalculator,
  content: {
    inputLabel: 'Glasgow Coma Scale components',
    resultLabel: 'Result',
    limitation:
      'Use to document level of consciousness. Interpret in clinical context, including intubation, sedation, intoxication, language barriers, facial trauma, and focal neurologic deficits.',
    components: [
      {
        key: 'eye',
        label: 'Eye opening',
        options: [
          { value: 4, label: 'Spontaneous', description: 'Eyes open spontaneously.' },
          { value: 3, label: 'To speech', description: 'Eyes open to voice or command.' },
          { value: 2, label: 'To pain', description: 'Eyes open only to painful stimulus.' },
          { value: 1, label: 'None', description: 'No eye opening.' },
        ],
      },
      {
        key: 'verbal',
        label: 'Verbal response',
        options: [
          { value: 5, label: 'Oriented', description: 'Oriented and converses normally.' },
          { value: 4, label: 'Confused', description: 'Confused conversation but able to answer.' },
          { value: 3, label: 'Inappropriate words', description: 'Words present but inappropriate.' },
          { value: 2, label: 'Incomprehensible sounds', description: 'Moaning or sounds without words.' },
          { value: 1, label: 'None', description: 'No verbal response.' },
        ],
      },
      {
        key: 'motor',
        label: 'Motor response',
        options: [
          { value: 6, label: 'Obeys commands', description: 'Follows commands appropriately.' },
          { value: 5, label: 'Localizes pain', description: 'Purposeful movement toward painful stimulus.' },
          { value: 4, label: 'Withdraws from pain', description: 'Flexion withdrawal from painful stimulus.' },
          { value: 3, label: 'Abnormal flexion', description: 'Decorticate-type flexion response.' },
          { value: 2, label: 'Extension', description: 'Decerebrate-type extension response.' },
          { value: 1, label: 'None', description: 'No motor response.' },
        ],
      },
    ],
    riskGroups: [
      { min: 13, max: 15, label: 'Mild impairment range', description: 'GCS 13-15. Interpret with trend and clinical context.' },
      { min: 9, max: 12, label: 'Moderate impairment range', description: 'GCS 9-12. Increased concern; reassess airway, trajectory, and cause.' },
      { min: 3, max: 8, label: 'Severe impairment range', description: 'GCS 3-8. High concern group; urgent airway and neurologic evaluation may be needed.' },
    ],
  },
  sources: [
    { title: 'MDCalc: Glasgow Coma Scale/Score', url: 'https://www.mdcalc.com/calc/64/glasgow-coma-scale-score-gcs', note: 'Used for component labels, point values, and interpretation framing.' },
    { title: 'Teasdale G, Jennett B. Assessment of coma and impaired consciousness. Lancet. 1974.', url: 'https://pubmed.ncbi.nlm.nih.gov/4136544/', note: 'Original Glasgow Coma Scale publication.' },
  ],
}

const glasgowComaScalePt: GlasgowComaScaleCalculatorDefinition = {
  ...glasgowComaScaleEn,
  language: 'pt-BR',
  title: 'Escala de Coma de Glasgow',
  description: 'Escala neurológica que pontua abertura ocular, resposta verbal e resposta motora de 3 a 15.',
  content: {
    inputLabel: 'Componentes da Escala de Coma de Glasgow',
    resultLabel: 'Resultado',
    limitation:
      'Use para documentar nível de consciência. Interprete no contexto clínico, incluindo intubação, sedação, intoxicação, barreiras de linguagem, trauma facial e déficits neurológicos focais.',
    components: [
      {
        key: 'eye',
        label: 'Abertura ocular',
        options: [
          { value: 4, label: 'Espontânea', description: 'Olhos abrem espontaneamente.' },
          { value: 3, label: 'Ao chamado', description: 'Olhos abrem à voz ou comando.' },
          { value: 2, label: 'À dor', description: 'Olhos abrem apenas ao estímulo doloroso.' },
          { value: 1, label: 'Nenhuma', description: 'Sem abertura ocular.' },
        ],
      },
      {
        key: 'verbal',
        label: 'Resposta verbal',
        options: [
          { value: 5, label: 'Orientada', description: 'Orientado e conversa normalmente.' },
          { value: 4, label: 'Confusa', description: 'Conversa confusa, mas consegue responder.' },
          { value: 3, label: 'Palavras inapropriadas', description: 'Há palavras, mas inapropriadas.' },
          { value: 2, label: 'Sons incompreensíveis', description: 'Gemidos ou sons sem palavras.' },
          { value: 1, label: 'Nenhuma', description: 'Sem resposta verbal.' },
        ],
      },
      {
        key: 'motor',
        label: 'Resposta motora',
        options: [
          { value: 6, label: 'Obedece comandos', description: 'Segue comandos adequadamente.' },
          { value: 5, label: 'Localiza dor', description: 'Movimento intencional em direção ao estímulo doloroso.' },
          { value: 4, label: 'Retira à dor', description: 'Retirada em flexão ao estímulo doloroso.' },
          { value: 3, label: 'Flexão anormal', description: 'Resposta em flexão do tipo decorticação.' },
          { value: 2, label: 'Extensão', description: 'Resposta em extensão do tipo descerebração.' },
          { value: 1, label: 'Nenhuma', description: 'Sem resposta motora.' },
        ],
      },
    ],
    riskGroups: [
      { min: 13, max: 15, label: 'Faixa de comprometimento leve', description: 'GCS 13-15. Interprete com tendência e contexto clínico.' },
      { min: 9, max: 12, label: 'Faixa de comprometimento moderado', description: 'GCS 9-12. Maior preocupação; reavalie via aérea, trajetória e causa.' },
      { min: 3, max: 8, label: 'Faixa de comprometimento grave', description: 'GCS 3-8. Grupo de alta preocupação; avaliação urgente de via aérea e neurológica pode ser necessária.' },
    ],
  },
  sources: [
    { title: 'MDCalc: Glasgow Coma Scale/Score', url: 'https://www.mdcalc.com/calc/64/glasgow-coma-scale-score-gcs', note: 'Usado para componentes, valores de pontuação e interpretação.' },
    { title: 'Teasdale G, Jennett B. Assessment of coma and impaired consciousness. Lancet. 1974.', url: 'https://pubmed.ncbi.nlm.nih.gov/4136544/', note: 'Publicação original da Escala de Coma de Glasgow.' },
  ],
}

const canadianCtHeadRuleEn: ChecklistScoreCalculatorDefinition = {
  id: 'canadian-ct-head-rule',
  language: 'en',
  title: 'Canadian CT Head Rule',
  description: 'Decision rule for CT imaging after minor head injury in adults.',
  category: 'scores',
  component: ChecklistScoreCalculator,
  content: {
    inputLabel: 'Canadian CT Head Rule criteria',
    criteriaLabel: 'CT indication criteria',
    resultLabel: 'Result',
    selectedCriteriaLabel: 'Criteria present',
    limitation:
      'Use for adults with minor head injury, GCS 13-15, and witnessed loss of consciousness, amnesia, or confusion. Do not use for anticoagulated patients, bleeding disorders, seizure after injury, obvious open/depressed skull fracture, unstable trauma, or age under 16.',
    criteria: [
      { key: 'gcsUnder15AtTwoHours', label: 'GCS < 15 at 2 hours after injury', description: 'High-risk criterion for neurosurgical intervention.', points: 1 },
      { key: 'suspectedOpenDepressedSkullFracture', label: 'Suspected open or depressed skull fracture', description: 'High-risk criterion for neurosurgical intervention.', points: 1 },
      { key: 'basalSkullFractureSigns', label: 'Signs of basal skull fracture', description: 'Hemotympanum, raccoon eyes, CSF otorrhea/rhinorrhea, or Battle sign.', points: 1 },
      { key: 'vomiting', label: 'Two or more episodes of vomiting', description: 'High-risk criterion for neurosurgical intervention.', points: 1 },
      { key: 'age', label: 'Age >= 65 years', description: 'High-risk criterion for neurosurgical intervention.', points: 1 },
      { key: 'amnesia', label: 'Amnesia before impact >= 30 minutes', description: 'Medium-risk criterion for clinically important brain injury.', points: 1 },
      { key: 'dangerousMechanism', label: 'Dangerous mechanism', description: 'Pedestrian struck, occupant ejected from motor vehicle, or fall from elevation >= 3 feet or 5 stairs.', points: 1 },
    ],
    riskGroups: [
      { min: 0, max: 0, label: 'No rule criteria present', description: 'No listed Canadian CT Head Rule criteria selected. Continue clinical judgment and local head injury pathway.' },
      { min: 1, label: 'CT criterion present', description: 'At least one criterion is present. Head CT is generally indicated by this rule, assuming the rule applies to the patient.' },
    ],
  },
  sources: [
    { title: 'MDCalc: Canadian CT Head Injury/Trauma Rule', url: 'https://www.mdcalc.com/calc/33/canadian-ct-head-injury-trauma-rule', note: 'Used for criteria, exclusions, and bedside interpretation framing.' },
    { title: 'Stiell IG et al. The Canadian CT Head Rule for patients with minor head injury. Lancet. 2001.', url: 'https://pubmed.ncbi.nlm.nih.gov/11356436/', note: 'Original Canadian CT Head Rule publication.' },
  ],
}

const canadianCtHeadRulePt: ChecklistScoreCalculatorDefinition = {
  ...canadianCtHeadRuleEn,
  language: 'pt-BR',
  title: 'Regra Canadense de TC de Crânio',
  description: 'Regra de decisão para tomografia após trauma cranioencefálico leve em adultos.',
  content: {
    inputLabel: 'Critérios da Regra Canadense de TC de Crânio',
    criteriaLabel: 'Critérios de indicação de TC',
    resultLabel: 'Resultado',
    selectedCriteriaLabel: 'Critérios presentes',
    limitation:
      'Use em adultos com trauma craniano leve, GCS 13-15, e perda de consciência testemunhada, amnésia ou confusão. Não use em anticoagulados, distúrbios de coagulação, convulsão após trauma, fratura craniana aberta/deprimida óbvia, trauma instável ou idade menor que 16 anos.',
    criteria: [
      { key: 'gcsUnder15AtTwoHours', label: 'GCS < 15 após 2 horas do trauma', description: 'Critério de alto risco para intervenção neurocirúrgica.', points: 1 },
      { key: 'suspectedOpenDepressedSkullFracture', label: 'Suspeita de fratura craniana aberta ou deprimida', description: 'Critério de alto risco para intervenção neurocirúrgica.', points: 1 },
      { key: 'basalSkullFractureSigns', label: 'Sinais de fratura de base de crânio', description: 'Hemotímpano, olhos de guaxinim, otorreia/rinorreia liquórica ou sinal de Battle.', points: 1 },
      { key: 'vomiting', label: 'Dois ou mais episódios de vômitos', description: 'Critério de alto risco para intervenção neurocirúrgica.', points: 1 },
      { key: 'age', label: 'Idade >= 65 anos', description: 'Critério de alto risco para intervenção neurocirúrgica.', points: 1 },
      { key: 'amnesia', label: 'Amnésia antes do impacto >= 30 minutos', description: 'Critério de risco moderado para lesão cerebral clinicamente importante.', points: 1 },
      { key: 'dangerousMechanism', label: 'Mecanismo perigoso', description: 'Pedestre atropelado, ocupante ejetado de veículo ou queda de altura >= 3 pés ou 5 degraus.', points: 1 },
    ],
    riskGroups: [
      { min: 0, max: 0, label: 'Nenhum critério da regra presente', description: 'Nenhum critério listado da Regra Canadense de TC de Crânio foi selecionado. Continue julgamento clínico e fluxo local de trauma craniano.' },
      { min: 1, label: 'Critério de TC presente', description: 'Pelo menos um critério está presente. TC de crânio geralmente é indicada por esta regra, assumindo que a regra se aplica ao paciente.' },
    ],
  },
  sources: [
    { title: 'MDCalc: Canadian CT Head Injury/Trauma Rule', url: 'https://www.mdcalc.com/calc/33/canadian-ct-head-injury-trauma-rule', note: 'Usado para critérios, exclusões e interpretação à beira-leito.' },
    { title: 'Stiell IG et al. The Canadian CT Head Rule for patients with minor head injury. Lancet. 2001.', url: 'https://pubmed.ncbi.nlm.nih.gov/11356436/', note: 'Publicação original da Regra Canadense de TC de Crânio.' },
  ],
}

const tokyoCholecystitisEn: TokyoCholecystitisCalculatorDefinition = {
  id: 'tokyo-cholecystitis',
  language: 'en',
  title: 'Tokyo Criteria for Acute Cholecystitis',
  description:
    'Tokyo Guidelines diagnostic and severity framework for suspected acute cholecystitis.',
  category: 'scores',
  component: TokyoCholecystitisCalculator,
  content: {
    inputLabel: 'Tokyo acute cholecystitis criteria',
    resultLabel: 'Diagnostic result',
    severityLabel: 'Severity grade',
    localLabel: 'A. Local signs of inflammation',
    systemicLabel: 'B. Systemic signs of inflammation',
    imagingLabel: 'C. Imaging findings',
    gradeTwoLabel: 'Grade II criteria',
    gradeThreeLabel: 'Grade III organ dysfunction',
    limitation:
      'Use as a structured reference for suspected acute cholecystitis. The Tokyo framework does not replace surgical evaluation, imaging interpretation, source control planning, antibiotic decisions, or local protocol.',
    localCriteria: [
      {
        key: 'murphySign',
        label: 'Murphy sign',
        description: 'Inspiratory arrest or marked tenderness during right upper quadrant palpation.',
      },
      {
        key: 'ruqInflammation',
        label: 'Right upper quadrant mass, pain, or tenderness',
        description: 'Local inflammatory findings in the gallbladder region.',
      },
    ],
    systemicCriteria: [
      {
        key: 'fever',
        label: 'Fever',
        description: 'Temperature elevation compatible with systemic inflammation.',
      },
      {
        key: 'elevatedCrp',
        label: 'Elevated CRP',
        description: 'C-reactive protein elevation supporting inflammation.',
      },
      {
        key: 'elevatedWbc',
        label: 'Elevated WBC count',
        description: 'Leukocytosis supporting systemic inflammation.',
      },
    ],
    imagingCriteria: [
      {
        key: 'imagingCompatible',
        label: 'Imaging findings characteristic of acute cholecystitis',
        description: 'Ultrasound, CT, MRI, or other imaging compatible with acute cholecystitis.',
      },
    ],
    gradeTwoCriteria: [
      {
        key: 'wbcMarked',
        label: 'Marked WBC abnormality',
        description: 'White blood cell count greater than 18,000/mm3.',
      },
      {
        key: 'palpableMass',
        label: 'Palpable tender mass in the right upper quadrant',
        description: 'Tender mass suggesting more advanced local inflammation.',
      },
      {
        key: 'duration',
        label: 'Duration of complaints greater than 72 hours',
        description: 'Symptoms have persisted for more than 72 hours.',
      },
      {
        key: 'markedLocalInflammation',
        label: 'Marked local inflammation',
        description: 'Examples include gangrenous cholecystitis, pericholecystic abscess, hepatic abscess, biliary peritonitis, or emphysematous cholecystitis.',
      },
    ],
    gradeThreeCriteria: [
      {
        key: 'cardiovascular',
        label: 'Cardiovascular dysfunction',
        description: 'Hypotension requiring dopamine >= 5 mcg/kg/min or any norepinephrine.',
      },
      {
        key: 'neurologic',
        label: 'Neurologic dysfunction',
        description: 'Decreased level of consciousness.',
      },
      {
        key: 'respiratory',
        label: 'Respiratory dysfunction',
        description: 'PaO2/FiO2 ratio less than 300.',
      },
      {
        key: 'renal',
        label: 'Renal dysfunction',
        description: 'Oliguria or creatinine greater than 2.0 mg/dL.',
      },
      {
        key: 'hepatic',
        label: 'Hepatic dysfunction',
        description: 'INR greater than 1.5.',
      },
      {
        key: 'hematologic',
        label: 'Hematologic dysfunction',
        description: 'Platelet count less than 100,000/mm3.',
      },
    ],
    diagnosis: {
      notMet: {
        shortLabel: 'Not met',
        label: 'Tokyo diagnostic criteria not met',
        description: 'Local plus systemic inflammatory criteria are not both present.',
      },
      suspected: {
        shortLabel: 'Suspected',
        label: 'Suspected acute cholecystitis',
        description: 'At least one local sign and one systemic sign are present; imaging confirmation is not selected.',
      },
      definite: {
        shortLabel: 'Definite',
        label: 'Definite acute cholecystitis by Tokyo criteria',
        description: 'Local signs, systemic signs, and compatible imaging are selected.',
      },
    },
    severity: {
      gradeOne: {
        label: 'Grade I',
        description: 'Mild acute cholecystitis by Tokyo severity logic when Grade II and Grade III criteria are absent.',
      },
      gradeTwo: {
        label: 'Grade II',
        description: 'Moderate acute cholecystitis: at least one Grade II criterion is selected and no Grade III organ dysfunction is selected.',
      },
      gradeThree: {
        label: 'Grade III',
        description: 'Severe acute cholecystitis: organ dysfunction criterion selected.',
      },
    },
  },
  sources: [
    {
      title: 'MDCalc: Tokyo Guidelines for Acute Cholecystitis',
      url: 'https://www.mdcalc.com/calc/10217/tokyo-guidelines-acute-cholecystitis',
      note: 'Used for diagnostic criteria, severity criteria, and bedside framing.',
    },
    {
      title: 'Yokoe M et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholecystitis. J Hepatobiliary Pancreat Sci. 2018.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/29032636/',
      note: 'Tokyo Guidelines 2018 diagnostic and severity grading publication.',
    },
  ],
}

const tokyoCholecystitisPt: TokyoCholecystitisCalculatorDefinition = {
  ...tokyoCholecystitisEn,
  language: 'pt-BR',
  title: 'Critérios de Tokyo para Colecistite Aguda',
  description:
    'Estrutura diagnóstica e de gravidade das Diretrizes de Tokyo para suspeita de colecistite aguda.',
  content: {
    inputLabel: 'Critérios de Tokyo para colecistite aguda',
    resultLabel: 'Resultado diagnóstico',
    severityLabel: 'Grau de gravidade',
    localLabel: 'A. Sinais locais de inflamação',
    systemicLabel: 'B. Sinais sistêmicos de inflamação',
    imagingLabel: 'C. Achados de imagem',
    gradeTwoLabel: 'Critérios de Grau II',
    gradeThreeLabel: 'Disfunção orgânica de Grau III',
    limitation:
      'Use como referência estruturada em suspeita de colecistite aguda. A estrutura de Tokyo não substitui avaliação cirúrgica, interpretação de imagem, planejamento de controle de foco, decisão de antibiótico ou protocolo local.',
    localCriteria: [
      {
        key: 'murphySign',
        label: 'Sinal de Murphy',
        description: 'Interrupção inspiratória ou dor importante durante palpação do hipocôndrio direito.',
      },
      {
        key: 'ruqInflammation',
        label: 'Massa, dor ou defesa em hipocôndrio direito',
        description: 'Achados inflamatórios locais na região da vesícula biliar.',
      },
    ],
    systemicCriteria: [
      {
        key: 'fever',
        label: 'Febre',
        description: 'Elevação de temperatura compatível com inflamação sistêmica.',
      },
      {
        key: 'elevatedCrp',
        label: 'PCR elevada',
        description: 'Elevação de proteína C reativa apoiando inflamação.',
      },
      {
        key: 'elevatedWbc',
        label: 'Leucócitos elevados',
        description: 'Leucocitose apoiando inflamação sistêmica.',
      },
    ],
    imagingCriteria: [
      {
        key: 'imagingCompatible',
        label: 'Imagem característica de colecistite aguda',
        description: 'Ultrassom, TC, RM ou outro exame compatível com colecistite aguda.',
      },
    ],
    gradeTwoCriteria: [
      {
        key: 'wbcMarked',
        label: 'Alteração importante de leucócitos',
        description: 'Leucócitos acima de 18.000/mm3.',
      },
      {
        key: 'palpableMass',
        label: 'Massa dolorosa palpável em hipocôndrio direito',
        description: 'Massa dolorosa sugerindo inflamação local mais avançada.',
      },
      {
        key: 'duration',
        label: 'Duração dos sintomas maior que 72 horas',
        description: 'Sintomas persistem há mais de 72 horas.',
      },
      {
        key: 'markedLocalInflammation',
        label: 'Inflamação local importante',
        description: 'Exemplos incluem colecistite gangrenosa, abscesso pericolecístico, abscesso hepático, peritonite biliar ou colecistite enfisematosa.',
      },
    ],
    gradeThreeCriteria: [
      {
        key: 'cardiovascular',
        label: 'Disfunção cardiovascular',
        description: 'Hipotensão exigindo dopamina >= 5 mcg/kg/min ou qualquer noradrenalina.',
      },
      {
        key: 'neurologic',
        label: 'Disfunção neurológica',
        description: 'Redução do nível de consciência.',
      },
      {
        key: 'respiratory',
        label: 'Disfunção respiratória',
        description: 'Relação PaO2/FiO2 menor que 300.',
      },
      {
        key: 'renal',
        label: 'Disfunção renal',
        description: 'Oligúria ou creatinina maior que 2,0 mg/dL.',
      },
      {
        key: 'hepatic',
        label: 'Disfunção hepática',
        description: 'INR maior que 1,5.',
      },
      {
        key: 'hematologic',
        label: 'Disfunção hematológica',
        description: 'Plaquetas abaixo de 100.000/mm3.',
      },
    ],
    diagnosis: {
      notMet: {
        shortLabel: 'Não fecha',
        label: 'Critérios diagnósticos de Tokyo não preenchidos',
        description: 'Critérios locais e sistêmicos de inflamação não estão ambos presentes.',
      },
      suspected: {
        shortLabel: 'Suspeita',
        label: 'Suspeita de colecistite aguda',
        description: 'Pelo menos um sinal local e um sinal sistêmico estão presentes; confirmação por imagem não foi selecionada.',
      },
      definite: {
        shortLabel: 'Definida',
        label: 'Colecistite aguda definida pelos critérios de Tokyo',
        description: 'Sinais locais, sinais sistêmicos e imagem compatível foram selecionados.',
      },
    },
    severity: {
      gradeOne: {
        label: 'Grau I',
        description: 'Colecistite aguda leve pela lógica de gravidade de Tokyo quando critérios de Grau II e Grau III estão ausentes.',
      },
      gradeTwo: {
        label: 'Grau II',
        description: 'Colecistite aguda moderada: pelo menos um critério de Grau II selecionado e nenhum critério de disfunção orgânica Grau III selecionado.',
      },
      gradeThree: {
        label: 'Grau III',
        description: 'Colecistite aguda grave: critério de disfunção orgânica selecionado.',
      },
    },
  },
  sources: [
    {
      title: 'MDCalc: Tokyo Guidelines for Acute Cholecystitis',
      url: 'https://www.mdcalc.com/calc/10217/tokyo-guidelines-acute-cholecystitis',
      note: 'Usado para critérios diagnósticos, critérios de gravidade e interpretação à beira-leito.',
    },
    {
      title: 'Yokoe M et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholecystitis. J Hepatobiliary Pancreat Sci. 2018.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/29032636/',
      note: 'Publicação das Diretrizes de Tokyo 2018 sobre diagnóstico e gravidade.',
    },
  ],
}

const nihssEn: NihStrokeScaleCalculatorDefinition = {
  id: 'nih-stroke-scale',
  language: 'en',
  title: 'NIH Stroke Scale',
  description: 'Structured neurologic examination score for quantifying stroke severity.',
  category: 'scores',
  component: NihStrokeScaleCalculator,
  content: {
    inputLabel: 'NIH Stroke Scale items',
    resultLabel: 'Result',
    limitation:
      'Use as a structured neurologic severity score. NIHSS does not replace stroke team activation, last-known-well assessment, glucose check, imaging, thrombolysis/thrombectomy eligibility assessment, or local stroke protocol.',
    components: [
      {
        key: 'levelOfConsciousness',
        label: '1a. Level of consciousness',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Alert', description: 'Keenly responsive.' },
          { value: 1, label: 'Not alert, arousable', description: 'Arouses to minor stimulation.' },
          { value: 2, label: 'Not alert, repeated stimulation', description: 'Requires repeated stimulation or strong/painful stimulation.' },
          { value: 3, label: 'Unresponsive', description: 'Responds only with reflex motor/autonomic effects or totally unresponsive.' },
        ],
      },
      {
        key: 'locQuestions',
        label: '1b. LOC questions',
        description: 'Ask month and age.',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Answers both correctly', description: 'Both month and age correct.' },
          { value: 1, label: 'Answers one correctly', description: 'One answer correct.' },
          { value: 2, label: 'Answers neither correctly', description: 'Neither answer correct, aphasic, or unable.' },
        ],
      },
      {
        key: 'locCommands',
        label: '1c. LOC commands',
        description: 'Open/close eyes and grip/release hand.',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Performs both correctly', description: 'Both commands completed.' },
          { value: 1, label: 'Performs one correctly', description: 'One command completed.' },
          { value: 2, label: 'Performs neither correctly', description: 'Neither command completed.' },
        ],
      },
      {
        key: 'bestGaze',
        label: '2. Best gaze',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Normal', description: 'Normal horizontal eye movements.' },
          { value: 1, label: 'Partial gaze palsy', description: 'Abnormal gaze but forced deviation absent.' },
          { value: 2, label: 'Forced deviation', description: 'Forced gaze deviation or total gaze paresis.' },
        ],
      },
      {
        key: 'visual',
        label: '3. Visual fields',
        defaultValue: 0,
        options: [
          { value: 0, label: 'No visual loss', description: 'No visual field deficit.' },
          { value: 1, label: 'Partial hemianopia', description: 'Partial field loss.' },
          { value: 2, label: 'Complete hemianopia', description: 'Complete field loss.' },
          { value: 3, label: 'Bilateral hemianopia', description: 'Blindness including cortical blindness.' },
        ],
      },
      {
        key: 'facialPalsy',
        label: '4. Facial palsy',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Normal', description: 'Normal symmetric movement.' },
          { value: 1, label: 'Minor paralysis', description: 'Flattened nasolabial fold or smile asymmetry.' },
          { value: 2, label: 'Partial paralysis', description: 'Total or near-total lower face paralysis.' },
          { value: 3, label: 'Complete paralysis', description: 'No movement in upper and lower face.' },
        ],
      },
      {
        key: 'motorArmLeft',
        label: '5a. Motor arm, left',
        defaultValue: 0,
        options: [
          { value: 0, label: 'No drift', description: 'Holds arm 90/45 degrees for 10 seconds.' },
          { value: 1, label: 'Drift', description: 'Drifts but does not hit bed.' },
          { value: 2, label: 'Some effort against gravity', description: 'Cannot maintain position; some effort against gravity.' },
          { value: 3, label: 'No effort against gravity', description: 'Falls with no effort against gravity.' },
          { value: 4, label: 'No movement', description: 'No movement.' },
        ],
      },
      {
        key: 'motorArmRight',
        label: '5b. Motor arm, right',
        defaultValue: 0,
        options: [
          { value: 0, label: 'No drift', description: 'Holds arm 90/45 degrees for 10 seconds.' },
          { value: 1, label: 'Drift', description: 'Drifts but does not hit bed.' },
          { value: 2, label: 'Some effort against gravity', description: 'Cannot maintain position; some effort against gravity.' },
          { value: 3, label: 'No effort against gravity', description: 'Falls with no effort against gravity.' },
          { value: 4, label: 'No movement', description: 'No movement.' },
        ],
      },
      {
        key: 'motorLegLeft',
        label: '6a. Motor leg, left',
        defaultValue: 0,
        options: [
          { value: 0, label: 'No drift', description: 'Holds leg at 30 degrees for 5 seconds.' },
          { value: 1, label: 'Drift', description: 'Drifts but does not hit bed.' },
          { value: 2, label: 'Some effort against gravity', description: 'Cannot maintain position; some effort against gravity.' },
          { value: 3, label: 'No effort against gravity', description: 'Falls with no effort against gravity.' },
          { value: 4, label: 'No movement', description: 'No movement.' },
        ],
      },
      {
        key: 'motorLegRight',
        label: '6b. Motor leg, right',
        defaultValue: 0,
        options: [
          { value: 0, label: 'No drift', description: 'Holds leg at 30 degrees for 5 seconds.' },
          { value: 1, label: 'Drift', description: 'Drifts but does not hit bed.' },
          { value: 2, label: 'Some effort against gravity', description: 'Cannot maintain position; some effort against gravity.' },
          { value: 3, label: 'No effort against gravity', description: 'Falls with no effort against gravity.' },
          { value: 4, label: 'No movement', description: 'No movement.' },
        ],
      },
      {
        key: 'limbAtaxia',
        label: '7. Limb ataxia',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Absent', description: 'No ataxia.' },
          { value: 1, label: 'Present in one limb', description: 'Ataxia in one limb.' },
          { value: 2, label: 'Present in two limbs', description: 'Ataxia in two limbs.' },
        ],
      },
      {
        key: 'sensory',
        label: '8. Sensory',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Normal', description: 'No sensory loss.' },
          { value: 1, label: 'Mild to moderate loss', description: 'Patient feels pinprick less sharp or dull.' },
          { value: 2, label: 'Severe to total loss', description: 'Patient is unaware of being touched.' },
        ],
      },
      {
        key: 'language',
        label: '9. Best language',
        defaultValue: 0,
        options: [
          { value: 0, label: 'No aphasia', description: 'Normal language.' },
          { value: 1, label: 'Mild to moderate aphasia', description: 'Some loss of fluency or comprehension.' },
          { value: 2, label: 'Severe aphasia', description: 'Fragmentary expression; examiner carries conversation.' },
          { value: 3, label: 'Mute/global aphasia', description: 'No usable speech or auditory comprehension.' },
        ],
      },
      {
        key: 'dysarthria',
        label: '10. Dysarthria',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Normal', description: 'Normal articulation.' },
          { value: 1, label: 'Mild to moderate', description: 'Slurs some words but can be understood.' },
          { value: 2, label: 'Severe', description: 'Unintelligible or mute/anarthric.' },
        ],
      },
      {
        key: 'extinctionInattention',
        label: '11. Extinction and inattention',
        defaultValue: 0,
        options: [
          { value: 0, label: 'No abnormality', description: 'No neglect.' },
          { value: 1, label: 'Partial neglect', description: 'Extinction or inattention in one sensory modality.' },
          { value: 2, label: 'Profound neglect', description: 'Profound hemi-inattention or neglect of more than one modality.' },
        ],
      },
    ],
    severityGroups: [
      { min: 0, max: 4, label: 'Minor stroke range', description: 'NIHSS 0-4. Interpret with syndrome, disabling symptoms, and trajectory.' },
      { min: 5, max: 15, label: 'Moderate stroke range', description: 'NIHSS 5-15. Stroke severity is clinically significant; follow local stroke pathway.' },
      { min: 16, max: 20, label: 'Moderate to severe stroke range', description: 'NIHSS 16-20. High concern; urgent stroke protocol assessment is important.' },
      { min: 21, label: 'Severe stroke range', description: 'NIHSS >= 21. Very high severity range; urgent advanced stroke assessment is important.' },
    ],
  },
  sources: [
    { title: 'MDCalc: NIH Stroke Scale/Score', url: 'https://www.mdcalc.com/calc/715/nih-stroke-scale-score-nihss', note: 'Used for item structure, point values, and severity framing.' },
    { title: 'Brott T et al. Measurements of acute cerebral infarction: a clinical examination scale. Stroke. 1989.', url: 'https://pubmed.ncbi.nlm.nih.gov/2749846/', note: 'Original NIH Stroke Scale publication.' },
  ],
}

const nihssPt: NihStrokeScaleCalculatorDefinition = {
  ...nihssEn,
  language: 'pt-BR',
  title: 'Escala de AVC do NIH',
  description: 'Exame neurológico estruturado para quantificar gravidade do AVC.',
  content: {
    ...nihssEn.content,
    inputLabel: 'Itens da Escala de AVC do NIH',
    resultLabel: 'Resultado',
    limitation:
      'Use como escore neurológico estruturado de gravidade. NIHSS não substitui acionamento de protocolo de AVC, avaliação de último momento bem, glicemia, imagem, elegibilidade para trombólise/trombectomia ou protocolo local.',
    components: [
      {
        key: 'levelOfConsciousness',
        label: '1a. Nível de consciência',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Alerta', description: 'Responde prontamente.' },
          { value: 1, label: 'Não alerta, despertável', description: 'Desperta com estímulo leve.' },
          { value: 2, label: 'Não alerta, estímulo repetido', description: 'Requer estímulo repetido, forte ou doloroso.' },
          { value: 3, label: 'Não responsivo', description: 'Responde apenas com reflexos motores/autonômicos ou não responde.' },
        ],
      },
      {
        key: 'locQuestions',
        label: '1b. Perguntas de consciência',
        description: 'Pergunte mês e idade.',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Responde ambas corretamente', description: 'Mês e idade corretos.' },
          { value: 1, label: 'Responde uma corretamente', description: 'Uma resposta correta.' },
          { value: 2, label: 'Não responde corretamente', description: 'Nenhuma correta, afásico ou incapaz.' },
        ],
      },
      {
        key: 'locCommands',
        label: '1c. Comandos de consciência',
        description: 'Abrir/fechar olhos e apertar/soltar mão.',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Realiza ambos corretamente', description: 'Ambos os comandos completos.' },
          { value: 1, label: 'Realiza um corretamente', description: 'Um comando completo.' },
          { value: 2, label: 'Não realiza corretamente', description: 'Nenhum comando completo.' },
        ],
      },
      {
        key: 'bestGaze',
        label: '2. Melhor olhar conjugado',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Normal', description: 'Movimentos oculares horizontais normais.' },
          { value: 1, label: 'Paresia parcial do olhar', description: 'Olhar anormal, mas sem desvio forçado.' },
          { value: 2, label: 'Desvio forçado', description: 'Desvio forçado do olhar ou paresia total do olhar.' },
        ],
      },
      {
        key: 'visual',
        label: '3. Campos visuais',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Sem perda visual', description: 'Sem déficit de campo visual.' },
          { value: 1, label: 'Hemianopsia parcial', description: 'Perda parcial de campo visual.' },
          { value: 2, label: 'Hemianopsia completa', description: 'Perda completa de campo visual.' },
          { value: 3, label: 'Hemianopsia bilateral', description: 'Cegueira, incluindo cegueira cortical.' },
        ],
      },
      {
        key: 'facialPalsy',
        label: '4. Paralisia facial',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Normal', description: 'Movimento simétrico normal.' },
          { value: 1, label: 'Paralisia leve', description: 'Sulco nasolabial apagado ou assimetria ao sorrir.' },
          { value: 2, label: 'Paralisia parcial', description: 'Paralisia total ou quase total da face inferior.' },
          { value: 3, label: 'Paralisia completa', description: 'Sem movimento na face superior e inferior.' },
        ],
      },
      {
        key: 'motorArmLeft',
        label: '5a. Motor braço esquerdo',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Sem queda', description: 'Mantém o braço a 90/45 graus por 10 segundos.' },
          { value: 1, label: 'Queda', description: 'Cai, mas não toca o leito.' },
          { value: 2, label: 'Algum esforço contra gravidade', description: 'Não mantém posição; algum esforço contra gravidade.' },
          { value: 3, label: 'Sem esforço contra gravidade', description: 'Cai sem esforço contra gravidade.' },
          { value: 4, label: 'Sem movimento', description: 'Nenhum movimento.' },
        ],
      },
      {
        key: 'motorArmRight',
        label: '5b. Motor braço direito',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Sem queda', description: 'Mantém o braço a 90/45 graus por 10 segundos.' },
          { value: 1, label: 'Queda', description: 'Cai, mas não toca o leito.' },
          { value: 2, label: 'Algum esforço contra gravidade', description: 'Não mantém posição; algum esforço contra gravidade.' },
          { value: 3, label: 'Sem esforço contra gravidade', description: 'Cai sem esforço contra gravidade.' },
          { value: 4, label: 'Sem movimento', description: 'Nenhum movimento.' },
        ],
      },
      {
        key: 'motorLegLeft',
        label: '6a. Motor perna esquerda',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Sem queda', description: 'Mantém a perna a 30 graus por 5 segundos.' },
          { value: 1, label: 'Queda', description: 'Cai, mas não toca o leito.' },
          { value: 2, label: 'Algum esforço contra gravidade', description: 'Não mantém posição; algum esforço contra gravidade.' },
          { value: 3, label: 'Sem esforço contra gravidade', description: 'Cai sem esforço contra gravidade.' },
          { value: 4, label: 'Sem movimento', description: 'Nenhum movimento.' },
        ],
      },
      {
        key: 'motorLegRight',
        label: '6b. Motor perna direita',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Sem queda', description: 'Mantém a perna a 30 graus por 5 segundos.' },
          { value: 1, label: 'Queda', description: 'Cai, mas não toca o leito.' },
          { value: 2, label: 'Algum esforço contra gravidade', description: 'Não mantém posição; algum esforço contra gravidade.' },
          { value: 3, label: 'Sem esforço contra gravidade', description: 'Cai sem esforço contra gravidade.' },
          { value: 4, label: 'Sem movimento', description: 'Nenhum movimento.' },
        ],
      },
      {
        key: 'limbAtaxia',
        label: '7. Ataxia de membros',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Ausente', description: 'Sem ataxia.' },
          { value: 1, label: 'Presente em um membro', description: 'Ataxia em um membro.' },
          { value: 2, label: 'Presente em dois membros', description: 'Ataxia em dois membros.' },
        ],
      },
      {
        key: 'sensory',
        label: '8. Sensibilidade',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Normal', description: 'Sem perda sensitiva.' },
          { value: 1, label: 'Perda leve a moderada', description: 'Paciente sente a picada menos aguda ou mais romba.' },
          { value: 2, label: 'Perda grave a total', description: 'Paciente não percebe que está sendo tocado.' },
        ],
      },
      {
        key: 'language',
        label: '9. Melhor linguagem',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Sem afasia', description: 'Linguagem normal.' },
          { value: 1, label: 'Afasia leve a moderada', description: 'Alguma perda de fluência ou compreensão.' },
          { value: 2, label: 'Afasia grave', description: 'Expressão fragmentada; examinador conduz a conversa.' },
          { value: 3, label: 'Mudo/afasia global', description: 'Sem fala útil ou compreensão auditiva.' },
        ],
      },
      {
        key: 'dysarthria',
        label: '10. Disartria',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Normal', description: 'Articulação normal.' },
          { value: 1, label: 'Leve a moderada', description: 'Arrasta algumas palavras, mas pode ser compreendido.' },
          { value: 2, label: 'Grave', description: 'Ininteligível ou mudo/anartria.' },
        ],
      },
      {
        key: 'extinctionInattention',
        label: '11. Extinção e inatenção',
        defaultValue: 0,
        options: [
          { value: 0, label: 'Sem anormalidade', description: 'Sem negligência.' },
          { value: 1, label: 'Negligência parcial', description: 'Extinção ou inatenção em uma modalidade sensorial.' },
          { value: 2, label: 'Negligência profunda', description: 'Hemi-inatenção profunda ou negligência em mais de uma modalidade.' },
        ],
      },
    ],
    severityGroups: [
      { min: 0, max: 4, label: 'Faixa de AVC menor', description: 'NIHSS 0-4. Interprete com síndrome, sintomas incapacitantes e evolução.' },
      { min: 5, max: 15, label: 'Faixa de AVC moderado', description: 'NIHSS 5-15. Gravidade clinicamente significativa; siga fluxo local de AVC.' },
      { min: 16, max: 20, label: 'Faixa de AVC moderado a grave', description: 'NIHSS 16-20. Alta preocupação; avaliação urgente por protocolo de AVC é importante.' },
      { min: 21, label: 'Faixa de AVC grave', description: 'NIHSS >= 21. Faixa de gravidade muito alta; avaliação avançada urgente é importante.' },
    ],
  },
  sources: [
    { title: 'MDCalc: NIH Stroke Scale/Score', url: 'https://www.mdcalc.com/calc/715/nih-stroke-scale-score-nihss', note: 'Usado para estrutura dos itens, valores de pontuação e interpretação de gravidade.' },
    { title: 'Brott T et al. Measurements of acute cerebral infarction: a clinical examination scale. Stroke. 1989.', url: 'https://pubmed.ncbi.nlm.nih.gov/2749846/', note: 'Publicação original da NIH Stroke Scale.' },
  ],
}

const infusionDoseConverterEn: InfusionDoseConverterDefinition = {
  id: 'infusion-dose-converter',
  language: 'en',
  title: 'Infusion Dose Converter',
  description:
    'Bidirectional converter between pump rate in mL/h and weight-based infusion dose in mcg/kg/min.',
  category: 'drugs',
  component: InfusionDoseConverter,
  content: {
    inputLabel: 'Infusion dose conversion inputs',
    modeLabel: 'Conversion direction',
    rateToDoseLabel: 'mL/h to mcg/kg/min',
    doseToRateLabel: 'mcg/kg/min to mL/h',
    infusionLabel: 'Infusion',
    infusionRateLabel: 'Pump rate (mL/h)',
    targetDoseLabel: 'Target dose (mcg/kg/min)',
    weightLabel: 'Patient weight (kg)',
    solutionLabel: 'Solution',
    medicationAmountLabel: 'Medication amount',
    medicationUnitLabel: 'Medication unit',
    totalVolumeLabel: 'Final solution volume (mL)',
    resultLabel: 'Result',
    doseResultLabel: 'Dose',
    rateResultLabel: 'Pump rate',
    concentrationLabel: 'Concentration',
    deliveredAmountLabel: 'Delivered amount',
    emptyValue: '--',
    limitation:
      'This calculator only converts concentration, pump rate, and weight-based dose. It does not recommend a dose. Confirm medication, final concentration, pump programming, line, and local protocol.',
  },
  sources: [
    {
      title: 'OpenRN Nursing Skills: Dosage Calculations',
      url: 'https://www.ncbi.nlm.nih.gov/books/NBK593209/',
      note: 'General medication calculation and dimensional-analysis reference.',
    },
    {
      title: 'Surviving Sepsis Campaign Guidelines 2021',
      url: 'https://pubmed.ncbi.nlm.nih.gov/34599691/',
      note: 'Clinical context for vasoactive medication use; not used as a dosing recommendation for this converter.',
    },
  ],
}

const infusionDoseConverterPt: InfusionDoseConverterDefinition = {
  ...infusionDoseConverterEn,
  language: 'pt-BR',
  title: 'Conversor de Taxa de Infusão',
  description:
    'Conversor bidirecional entre taxa da bomba em mL/h e dose baseada em peso em mcg/kg/min.',
  content: {
    inputLabel: 'Entradas para conversão de taxa de infusão',
    modeLabel: 'Direção da conversão',
    rateToDoseLabel: 'mL/h para mcg/kg/min',
    doseToRateLabel: 'mcg/kg/min para mL/h',
    infusionLabel: 'Infusão',
    infusionRateLabel: 'Taxa da bomba (mL/h)',
    targetDoseLabel: 'Dose alvo (mcg/kg/min)',
    weightLabel: 'Peso do paciente (kg)',
    solutionLabel: 'Solução',
    medicationAmountLabel: 'Quantidade de medicação',
    medicationUnitLabel: 'Unidade da medicação',
    totalVolumeLabel: 'Volume final da solução (mL)',
    resultLabel: 'Resultado',
    doseResultLabel: 'Dose',
    rateResultLabel: 'Taxa da bomba',
    concentrationLabel: 'Concentração',
    deliveredAmountLabel: 'Quantidade infundida',
    emptyValue: '--',
    limitation:
      'Este calculador apenas converte concentração, taxa da bomba e dose baseada em peso. Ele não recomenda dose. Confirme medicação, concentração final, programação da bomba, via de infusão e protocolo local.',
  },
  sources: [
    {
      title: 'OpenRN Nursing Skills: Dosage Calculations',
      url: 'https://www.ncbi.nlm.nih.gov/books/NBK593209/',
      note: 'Referência geral para cálculo de medicações e análise dimensional.',
    },
    {
      title: 'Surviving Sepsis Campaign Guidelines 2021',
      url: 'https://pubmed.ncbi.nlm.nih.gov/34599691/',
      note: 'Contexto clínico para uso de drogas vasoativas; não usado como recomendação de dose neste conversor.',
    },
  ],
}

const calculatorRegistry = {
  en: [
    heartScoreEn,
    wellsDvtEn,
    alvaradoEn,
    pediatricAppendicitisScoreEn,
    qsofaScoreEn,
    wellsPeEn,
    percEn,
    curb65En,
    crb65En,
    glasgowComaScaleEn,
    nihssEn,
    canadianCtHeadRuleEn,
    tokyoCholecystitisEn,
    infusionDoseConverterEn,
  ],
  'pt-BR': [
    heartScorePt,
    wellsDvtPt,
    alvaradoPt,
    pediatricAppendicitisScorePt,
    qsofaScorePt,
    wellsPePt,
    percPt,
    curb65Pt,
    crb65Pt,
    glasgowComaScalePt,
    nihssPt,
    canadianCtHeadRulePt,
    tokyoCholecystitisPt,
    infusionDoseConverterPt,
  ],
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
