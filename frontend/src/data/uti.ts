import type {
  BooleanField,
  ClinicalWorkflow,
  MultiselectField,
  SelectField,
  TextField,
} from '@/data/workflow'

const ageField: TextField = {
  key: 'age',
  label: { en: 'Age', 'pt-BR': 'Idade' },
  type: 'text',
  placeholder: { en: 'Example: 28 years', 'pt-BR': 'Ex.: 28 anos' },
  narrative: { suffix: { en: 'old', 'pt-BR': 'de idade' } },
}

const sexField: SelectField = {
  key: 'sex',
  label: { en: 'Sex', 'pt-BR': 'Sexo' },
  type: 'select',
  options: [
    { label: { en: 'Female', 'pt-BR': 'Feminino' }, value: 'female', narrative: { en: 'female patient', 'pt-BR': 'paciente do sexo feminino' } },
    { label: { en: 'Male', 'pt-BR': 'Masculino' }, value: 'male', narrative: { en: 'male patient', 'pt-BR': 'paciente do sexo masculino' } },
    { label: { en: 'Other / not specified', 'pt-BR': 'Outro / não especificado' }, value: 'other', narrative: { en: 'patient', 'pt-BR': 'paciente' } },
  ],
}

const durationField: TextField = {
  key: 'duration',
  label: { en: 'Symptom duration', 'pt-BR': 'Duração dos sintomas' },
  type: 'text',
  placeholder: { en: 'Example: 2 days, started this morning', 'pt-BR': 'Ex.: 2 dias, começou hoje pela manhã' },
  required: true,
  narrative: { prefix: { en: 'for', 'pt-BR': 'há' } },
}

const pregnancyStatusField: SelectField = {
  key: 'pregnancyStatus',
  label: { en: 'Pregnancy status', 'pt-BR': 'Estado gestacional' },
  type: 'select',
  options: [
    { label: { en: 'Not pregnant', 'pt-BR': 'Não gestante' }, value: 'not-pregnant', narrative: { en: 'not pregnant', 'pt-BR': 'não gestante' } },
    { label: { en: 'Pregnant', 'pt-BR': 'Gestante' }, value: 'pregnant', narrative: { en: 'pregnancy', 'pt-BR': 'gestação' } },
    { label: { en: 'Unknown', 'pt-BR': 'Desconhecido' }, value: 'unknown', narrative: { en: 'unknown pregnancy status', 'pt-BR': 'estado gestacional desconhecido' } },
    { label: { en: 'Not applicable', 'pt-BR': 'Não se aplica' }, value: 'not-applicable', narrative: { en: 'pregnancy not applicable', 'pt-BR': 'gestação não aplicável' } },
  ],
}

const feverField: BooleanField = {
  key: 'fever',
  label: { en: 'Fever', 'pt-BR': 'Febre' },
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: { en: 'fever', 'pt-BR': 'febre' } },
}

const temperatureField: TextField = {
  key: 'temperature',
  label: { en: 'Temperature', 'pt-BR': 'Temperatura' },
  type: 'text',
  placeholder: { en: 'Example: 38.9 C', 'pt-BR': 'Ex.: 38,9 °C' },
  displayIf: { fieldKey: 'fever', equals: true },
  narrative: { prefix: { en: 'temperature', 'pt-BR': 'temperatura de' } },
}

const redFlagFields: BooleanField[] = [
  {
    key: 'flankPain',
    label: { en: 'Flank pain or CVA tenderness', 'pt-BR': 'Dor lombar/em flanco ou punho-percussão positiva' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'flank pain or CVA tenderness', 'pt-BR': 'dor lombar/em flanco ou punho-percussão positiva' } },
  },
  {
    key: 'nauseaVomiting',
    label: { en: 'Nausea or vomiting', 'pt-BR': 'Náuseas ou vômitos' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'nausea or vomiting', 'pt-BR': 'náuseas ou vômitos' } },
  },
]

const systemicSymptomsField: MultiselectField = {
  key: 'systemicSymptoms',
  label: { en: 'Systemic illness signs', 'pt-BR': 'Sinais sistêmicos' },
  type: 'multiselect',
  options: [
    { label: { en: 'Chills or rigors', 'pt-BR': 'Calafrios ou tremores' }, value: 'rigors', narrative: { en: 'chills or rigors', 'pt-BR': 'calafrios ou tremores' } },
    { label: { en: 'Hemodynamic instability', 'pt-BR': 'Instabilidade hemodinâmica' }, value: 'hemodynamic-instability', narrative: { en: 'hemodynamic instability', 'pt-BR': 'instabilidade hemodinâmica' } },
    { label: { en: 'Altered mental status', 'pt-BR': 'Alteração do estado mental' }, value: 'altered-mental-status', narrative: { en: 'altered mental status', 'pt-BR': 'alteração do estado mental' } },
    { label: { en: 'Marked fatigue or malaise', 'pt-BR': 'Fadiga ou mal-estar importante' }, value: 'malaise', narrative: { en: 'marked fatigue or malaise', 'pt-BR': 'fadiga ou mal-estar importante' } },
  ],
  defaultValue: [],
}

const obstructionSymptomsField: MultiselectField = {
  key: 'obstructionSymptoms',
  label: { en: 'Obstruction symptoms', 'pt-BR': 'Sintomas de obstrução urinária' },
  type: 'multiselect',
  options: [
    { label: { en: 'Unable to void', 'pt-BR': 'Incapacidade de urinar' }, value: 'unable-to-void', narrative: { en: 'inability to void', 'pt-BR': 'incapacidade de urinar' } },
    { label: { en: 'Severe urinary retention', 'pt-BR': 'Retenção urinária importante' }, value: 'severe-retention', narrative: { en: 'severe urinary retention', 'pt-BR': 'retenção urinária importante' } },
  ],
  defaultValue: [],
}

const cystitisSymptomFields: BooleanField[] = [
  {
    key: 'dysuria',
    label: { en: 'Dysuria', 'pt-BR': 'Disúria' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'dysuria', 'pt-BR': 'disúria' } },
  },
  {
    key: 'frequency',
    label: { en: 'Urinary frequency', 'pt-BR': 'Polaciúria' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'urinary frequency', 'pt-BR': 'polaciúria' } },
  },
  {
    key: 'urgency',
    label: { en: 'Urinary urgency', 'pt-BR': 'Urgência urinária' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'urinary urgency', 'pt-BR': 'urgência urinária' } },
  },
  {
    key: 'suprapubicPain',
    label: { en: 'Suprapubic pain', 'pt-BR': 'Dor suprapúbica' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'suprapubic pain', 'pt-BR': 'dor suprapúbica' } },
  },
  {
    key: 'hematuria',
    label: { en: 'Hematuria', 'pt-BR': 'Hematúria' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'hematuria', 'pt-BR': 'hematúria' } },
  },
  {
    key: 'nocturia',
    label: { en: 'Nocturia', 'pt-BR': 'Noctúria' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'nocturia', 'pt-BR': 'noctúria' } },
  },
]

const alternativeDiagnosisFields: BooleanField[] = [
  {
    key: 'vaginalDischarge',
    label: { en: 'Vaginal discharge or irritation', 'pt-BR': 'Corrimento ou irritação vaginal' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'vaginal discharge or irritation', 'pt-BR': 'corrimento ou irritação vaginal' } },
  },
  {
    key: 'genitalLesions',
    label: { en: 'Genital lesions, rash, or STI concern', 'pt-BR': 'Lesões genitais, rash ou suspeita de IST' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'genital lesions, rash, or STI concern', 'pt-BR': 'lesões genitais, rash ou suspeita de IST' } },
  },
  {
    key: 'diarrhea',
    label: { en: 'Diarrhea', 'pt-BR': 'Diarreia' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'diarrhea', 'pt-BR': 'diarreia' } },
  },
  {
    key: 'respiratorySymptoms',
    label: { en: 'Cough or respiratory symptoms', 'pt-BR': 'Tosse ou sintomas respiratórios' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'cough or respiratory symptoms', 'pt-BR': 'tosse ou sintomas respiratórios' } },
  },
]

const resistanceRiskFields: BooleanField[] = [
  {
    key: 'recentUti',
    label: { en: 'UTI in the last 3 months', 'pt-BR': 'ITU nos últimos 3 meses' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'recent UTI', 'pt-BR': 'ITU recente' } },
  },
  {
    key: 'recentAntibiotics',
    label: { en: 'Antibiotic use in the last 3 months', 'pt-BR': 'Uso de antibiótico nos últimos 3 meses' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'recent antibiotic use', 'pt-BR': 'uso recente de antibiótico' } },
  },
  {
    key: 'resistantOrganismHistory',
    label: { en: 'History of resistant urinary organism', 'pt-BR': 'História de microrganismo urinário resistente' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'history of resistant urinary organism', 'pt-BR': 'história de microrganismo urinário resistente' } },
  },
  {
    key: 'diabetes',
    label: { en: 'Diabetes', 'pt-BR': 'Diabetes' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'diabetes', 'pt-BR': 'diabetes' } },
  },
  {
    key: 'immunocompromised',
    label: { en: 'Immunocompromised', 'pt-BR': 'Imunossupressão' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'immunocompromised status', 'pt-BR': 'imunossupressão' } },
  },
]

const antibioticDetailsField: TextField = {
  key: 'recentAntibioticName',
  label: { en: 'Recent antibiotic details', 'pt-BR': 'Detalhes do antibiótico recente' },
  type: 'text',
  placeholder: { en: 'Example: TMP-SMX 6 weeks ago', 'pt-BR': 'Ex.: TMP-SMX há 6 semanas' },
  displayIf: { fieldKey: 'recentAntibiotics', equals: true },
  narrative: { prefix: { en: 'recent antibiotic', 'pt-BR': 'antibiótico recente' } },
}

const resistantOrganismDetailsField: TextField = {
  key: 'resistantOrganismName',
  label: { en: 'Resistant organism details', 'pt-BR': 'Detalhes do microrganismo resistente' },
  type: 'text',
  placeholder: { en: 'Example: ESBL E. coli', 'pt-BR': 'Ex.: E. coli ESBL' },
  displayIf: { fieldKey: 'resistantOrganismHistory', equals: true },
  narrative: { prefix: { en: 'resistant organism history', 'pt-BR': 'histórico de microrganismo resistente' } },
}

const immunocompromiseDetailsField: TextField = {
  key: 'immunocompromiseDetails',
  label: { en: 'Type of immunocompromise', 'pt-BR': 'Tipo de imunossupressão' },
  type: 'text',
  placeholder: { en: 'Example: chemotherapy, transplant, steroids', 'pt-BR': 'Ex.: quimioterapia, transplante, corticoide' },
  displayIf: { fieldKey: 'immunocompromised', equals: true },
  narrative: { prefix: { en: 'immunocompromise details', 'pt-BR': 'detalhes da imunossupressão' } },
}

const catheterField: SelectField = {
  key: 'urinaryCatheter',
  label: { en: 'Urinary catheter', 'pt-BR': 'Cateter vesical' },
  type: 'select',
  options: [
    { label: { en: 'None', 'pt-BR': 'Nenhum' }, value: 'none', narrative: { en: 'no urinary catheter', 'pt-BR': 'sem cateter vesical' } },
    { label: { en: 'Indwelling Foley', 'pt-BR': 'Sonda vesical de demora' }, value: 'indwelling', narrative: { en: 'indwelling urinary catheter', 'pt-BR': 'sonda vesical de demora' } },
    { label: { en: 'Intermittent catheterization', 'pt-BR': 'Cateterismo intermitente' }, value: 'intermittent', narrative: { en: 'intermittent catheterization', 'pt-BR': 'cateterismo intermitente' } },
    { label: { en: 'Suprapubic catheter', 'pt-BR': 'Cistostomia / cateter suprapúbico' }, value: 'suprapubic', narrative: { en: 'suprapubic catheter', 'pt-BR': 'cistostomia / cateter suprapúbico' } },
    { label: { en: 'Removed within 48 hours', 'pt-BR': 'Removido nas últimas 48 horas' }, value: 'recently-removed', narrative: { en: 'catheter removed within 48 hours', 'pt-BR': 'cateter removido nas últimas 48 horas' } },
  ],
  defaultValue: 'none',
}

const urologicAbnormalityField: BooleanField = {
  key: 'urologicAbnormality',
  label: { en: 'Known urologic abnormality or recent procedure', 'pt-BR': 'Anormalidade urológica conhecida ou procedimento recente' },
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: { en: 'known urologic abnormality or recent procedure', 'pt-BR': 'anormalidade urológica conhecida ou procedimento recente' } },
}

const urologicDetailsField: TextField = {
  key: 'urologicDetails',
  label: { en: 'Urologic details', 'pt-BR': 'Detalhes urológicos' },
  type: 'text',
  placeholder: { en: 'Example: stent, stone, recent cystoscopy', 'pt-BR': 'Ex.: stent, cálculo, cistoscopia recente' },
  displayIf: { fieldKey: 'urologicAbnormality', equals: true },
  narrative: { prefix: { en: 'urologic details', 'pt-BR': 'detalhes urológicos' } },
}

const prostateSymptomsField: BooleanField = {
  key: 'prostateSymptoms',
  label: { en: 'Perineal/prostate symptoms', 'pt-BR': 'Sintomas perineais ou prostáticos' },
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: { en: 'perineal or prostate symptoms', 'pt-BR': 'sintomas perineais ou prostáticos' } },
}

const oralToleranceField: BooleanField = {
  key: 'oralTolerance',
  label: { en: 'Able to tolerate oral intake', 'pt-BR': 'Tolera ingestão oral' },
  type: 'boolean',
  defaultValue: true,
  narrative: { whenTrue: { en: 'able to tolerate oral intake', 'pt-BR': 'tolerando ingestão oral' } },
}

const hpiTemplate = {
  en: `
    {% assign demographics = age | compact_append: sex %}
    Patient{% if demographics %} is a {{ demographics | list: locale }}{% endif %}{% if duration %} presenting with urinary symptoms {{ duration }}{% else %} presenting with urinary symptoms{% endif %}.
    {% assign cystitisSymptoms = dysuria | compact_append: frequency | compact_append: urgency | compact_append: suprapubicPain | compact_append: hematuria | compact_append: nocturia %}
    {% if cystitisSymptoms %}Lower urinary symptoms include {{ cystitisSymptoms | list: locale }}.{% endif %}
    {% assign upperTract = fever | compact_append: temperature | compact_append: flankPain | compact_append: nauseaVomiting | compact_append: systemicSymptoms %}
    {% if upperTract %}Upper-tract or systemic features include {{ upperTract | list: locale }}.{% endif %}
    {% if obstructionSymptoms %}Obstruction symptoms include {{ obstructionSymptoms | list: locale }}.{% endif %}
    {% assign alternatives = vaginalDischarge | compact_append: genitalLesions | compact_append: diarrhea | compact_append: respiratorySymptoms %}
    {% if alternatives %}Alternative-diagnosis features include {{ alternatives | list: locale }}.{% endif %}
    {% assign riskContext = pregnancyStatus | compact_append: recentUti | compact_append: recentAntibiotics | compact_append: resistantOrganismHistory | compact_append: diabetes | compact_append: immunocompromised | compact_append: urinaryCatheter | compact_append: urologicAbnormality | compact_append: prostateSymptoms | compact_append: oralTolerance %}
    {% if riskContext %}Risk and disposition context includes {{ riskContext | list: locale }}.{% endif %}
    {% assign details = recentAntibioticName | compact_append: resistantOrganismName | compact_append: immunocompromiseDetails | compact_append: urologicDetails %}
    {% if details %}Additional details: {{ details | list: locale }}.{% endif %}
  `,
  'pt-BR': `
    {% assign demographics = age | compact_append: sex %}
    Paciente{% if demographics %} {{ demographics | list: locale }}{% endif %}{% if duration %} apresenta sintomas urinários {{ duration }}{% else %} apresenta sintomas urinários{% endif %}.
    {% assign cystitisSymptoms = dysuria | compact_append: frequency | compact_append: urgency | compact_append: suprapubicPain | compact_append: hematuria | compact_append: nocturia %}
    {% if cystitisSymptoms %}Sintomas urinários baixos incluem {{ cystitisSymptoms | list: locale }}.{% endif %}
    {% assign upperTract = fever | compact_append: temperature | compact_append: flankPain | compact_append: nauseaVomiting | compact_append: systemicSymptoms %}
    {% if upperTract %}Achados sistêmicos ou sugestivos de acometimento de trato urinário alto incluem {{ upperTract | list: locale }}.{% endif %}
    {% if obstructionSymptoms %}Sintomas de obstrução urinária incluem {{ obstructionSymptoms | list: locale }}.{% endif %}
    {% assign alternatives = vaginalDischarge | compact_append: genitalLesions | compact_append: diarrhea | compact_append: respiratorySymptoms %}
    {% if alternatives %}Achados que sugerem diagnóstico alternativo incluem {{ alternatives | list: locale }}.{% endif %}
    {% assign riskContext = pregnancyStatus | compact_append: recentUti | compact_append: recentAntibiotics | compact_append: resistantOrganismHistory | compact_append: diabetes | compact_append: immunocompromised | compact_append: urinaryCatheter | compact_append: urologicAbnormality | compact_append: prostateSymptoms | compact_append: oralTolerance %}
    {% if riskContext %}Fatores de risco e elementos para definição de conduta incluem {{ riskContext | list: locale }}.{% endif %}
    {% assign details = recentAntibioticName | compact_append: resistantOrganismName | compact_append: immunocompromiseDetails | compact_append: urologicDetails %}
    {% if details %}Detalhes adicionais: {{ details | list: locale }}.{% endif %}
  `,
}

export const utiModule: ClinicalWorkflow = {
  id: 'uti',
  title: { en: 'UTI', 'pt-BR': 'ITU' },
  overview: {
    en: 'Triage urinary symptoms by red flags, classic cystitis pattern, alternative diagnoses, resistance risk, and complicated UTI features.',
    'pt-BR': 'Faça a triagem dos sintomas urinários com base em sinais de alerta, padrão clássico de cistite, diagnósticos alternativos, risco de resistência e fatores de ITU complicada.',
  },
  sections: [
    {
      id: 'patient-context',
      title: { en: 'Patient context', 'pt-BR': 'Contexto do paciente' },
      fields: [ageField, sexField, durationField, pregnancyStatusField],
    },
    {
      id: 'red-flag-screen',
      title: { en: 'Red flag screen', 'pt-BR': 'Triagem de sinais de alerta' },
      description: {
        en: 'Positive findings here argue against simple UTI triage and may require same-day in-person evaluation or ED escalation.',
        'pt-BR': 'Achados positivos aqui afastam uma triagem simples de ITU e podem exigir avaliação presencial no mesmo dia ou atendimento de emergência.',
      },
      fields: [
        feverField,
        temperatureField,
        ...redFlagFields,
        systemicSymptomsField,
        obstructionSymptomsField,
        oralToleranceField,
      ],
    },
    {
      id: 'core-cystitis-symptoms',
      title: { en: 'Core cystitis symptoms', 'pt-BR': 'Sintomas centrais de cistite' },
      fields: cystitisSymptomFields,
    },
    {
      id: 'alternative-diagnosis-screen',
      title: { en: 'Alternative diagnosis screen', 'pt-BR': 'Triagem de diagnóstico alternativo' },
      fields: alternativeDiagnosisFields,
    },
    {
      id: 'resistance-and-complication-risk',
      title: { en: 'Resistance and complication risk', 'pt-BR': 'Risco de resistência e ITU complicada' },
      fields: [
        ...resistanceRiskFields,
        antibioticDetailsField,
        resistantOrganismDetailsField,
        immunocompromiseDetailsField,
      ],
    },
    {
      id: 'urologic-history',
      title: { en: 'Urologic history', 'pt-BR': 'História urológica' },
      fields: [catheterField, urologicAbnormalityField, urologicDetailsField, prostateSymptomsField],
    },
  ],
  redFlags: [
    {
      title: { en: 'Fever, flank pain, or CVA tenderness', 'pt-BR': 'Febre, dor em flanco ou punho-percussão positiva' },
      description: {
        en: 'Raises concern for pyelonephritis or complicated upper tract infection.',
        'pt-BR': 'Aumenta a suspeita de pielonefrite ou infecção complicada de trato urinário alto.',
      },
    },
    {
      title: { en: 'Rigors, hemodynamic instability, or altered mental status', 'pt-BR': 'Calafrios intensos, instabilidade hemodinâmica ou alteração mental' },
      description: {
        en: 'Suggests possible urosepsis and need for urgent escalation.',
        'pt-BR': 'Sugere possível urosepse e necessidade de escalonamento urgente da avaliação.',
      },
    },
    {
      title: { en: 'Urinary obstruction symptoms', 'pt-BR': 'Sintomas de obstrução urinária' },
      description: {
        en: 'Inability to void or severe retention may require urgent decompression or urologic evaluation.',
        'pt-BR': 'Incapacidade de urinar ou retenção importante pode exigir descompressão urgente ou avaliação urológica.',
      },
    },
    {
      title: { en: 'Pregnancy', 'pt-BR': 'Gestação' },
      description: {
        en: 'Requires culture and treatment strategy adjusted for maternal-fetal risk.',
        'pt-BR': 'Exige cultura e estratégia terapêutica ajustada ao risco materno-fetal.',
      },
    },
    {
      title: { en: 'Catheter, immunocompromise, or urologic abnormality', 'pt-BR': 'Cateter, imunossupressão ou alteração urológica' },
      description: {
        en: 'Defines higher-risk or complicated UTI context and lowers threshold for culture and broader evaluation.',
        'pt-BR': 'Define contexto de ITU complicada ou de maior risco e reduz o limiar para cultura e investigação ampliada.',
      },
    },
  ],
  differentials: [
    {
      title: { en: 'Acute uncomplicated cystitis', 'pt-BR': 'Cistite aguda não complicada' },
      description: {
        en: 'Dysuria, frequency, urgency, and suprapubic discomfort without fever, flank pain, or vaginal discharge.',
        'pt-BR': 'Disúria, polaciúria, urgência urinária e desconforto suprapúbico, sem febre, dor em flanco ou corrimento vaginal.',
      },
    },
    {
      title: { en: 'Pyelonephritis', 'pt-BR': 'Pielonefrite' },
      description: {
        en: 'Fever, chills, flank pain, CVA tenderness, nausea, vomiting, or systemic illness.',
        'pt-BR': 'Febre, calafrios, dor em flanco, punho-percussão positiva, náuseas, vômitos ou sinais sistêmicos.',
      },
    },
    {
      title: { en: 'Urosepsis', 'pt-BR': 'Urosepse' },
      description: {
        en: 'Rigors, hemodynamic instability, altered mental status, poor perfusion, or systemic toxicity.',
        'pt-BR': 'Calafrios intensos, instabilidade hemodinâmica, alteração do estado mental, má perfusão ou toxicidade sistêmica.',
      },
    },
    {
      title: { en: 'Urethritis or STI', 'pt-BR': 'Uretrite ou IST' },
      description: {
        en: 'Dysuria with discharge, genital lesions, rash, exposure risk, or negative urine testing.',
        'pt-BR': 'Disúria com secreção, lesões genitais, rash, exposição sexual de risco ou urina sem achados compatíveis.',
      },
    },
    {
      title: { en: 'Vaginitis', 'pt-BR': 'Vaginite' },
      description: {
        en: 'Vaginal discharge, itching, odor, dyspareunia, or external dysuria.',
        'pt-BR': 'Corrimento vaginal, prurido, odor, dispareunia ou disúria externa.',
      },
    },
    {
      title: { en: 'Nephrolithiasis or obstruction', 'pt-BR': 'Nefrolitíase ou obstrução' },
      description: {
        en: 'Colicky flank pain, hematuria, severe retention, inability to void, or obstructive uropathy risk.',
        'pt-BR': 'Dor em flanco em cólica, hematúria, retenção urinária importante, incapacidade de urinar ou risco de uropatia obstrutiva.',
      },
    },
    {
      title: { en: 'Prostatitis', 'pt-BR': 'Prostatite' },
      description: {
        en: 'Male patient with pelvic/perineal pain, obstructive symptoms, fever, or tender prostate.',
        'pt-BR': 'Paciente masculino com dor pélvica ou perineal, sintomas obstrutivos, febre ou próstata dolorosa.',
      },
    },
  ],
  workup: [
    {
      title: { en: 'Urinalysis when presentation is not low-risk classic cystitis', 'pt-BR': 'EAS quando a apresentação não for cistite clássica de baixo risco' },
      description: {
        en: 'Useful for men, atypical symptoms, alternative diagnosis concern, resistance risk, or complicated infection features.',
        'pt-BR': 'Útil em homens, sintomas atípicos, suspeita de diagnóstico alternativo, risco de resistência ou sinais de infecção complicada.',
      },
    },
    {
      title: { en: 'Urine culture with susceptibility when indicated', 'pt-BR': 'Urocultura com antibiograma quando indicada' },
      description: {
        en: 'Obtain for men, age 65 or older, recurrent UTI, recent antibiotics, treatment failure, resistant organism history, pregnancy, immunocompromise, catheter, or suspected pyelonephritis.',
        'pt-BR': 'Obter em homens, idade ≥65 anos, ITU recorrente, uso recente de antibiótico, falha terapêutica, resistência prévia, gestação, imunossupressão, cateter ou suspeita de pielonefrite.',
      },
    },
    {
      title: { en: 'Pregnancy test when relevant', 'pt-BR': 'Teste de gravidez quando relevante' },
      description: {
        en: 'Pregnancy changes risk stratification, culture threshold, and antibiotic selection.',
        'pt-BR': 'Gestação altera a estratificação de risco, o limiar para cultura e a escolha do antibiótico.',
      },
    },
    {
      title: { en: 'STI/vaginitis testing when indicated', 'pt-BR': 'Testes para IST/vaginite quando indicado' },
      description: {
        en: 'Consider with discharge, genital lesions, irritation, pelvic symptoms, exposure risk, or atypical dysuria.',
        'pt-BR': 'Considere quando houver corrimento, lesões genitais, irritação, sintomas pélvicos, exposição sexual de risco ou disúria atípica.',
      },
    },
    {
      title: { en: 'CBC, BMP, blood cultures, and imaging for high-risk illness', 'pt-BR': 'Hemograma, eletrólitos, função renal, hemoculturas e imagem em doença de alto risco' },
      description: {
        en: 'Use when pyelonephritis, sepsis, obstruction, AKI, severe illness, immunocompromise, or lack of improvement is suspected.',
        'pt-BR': 'Use quando houver suspeita de pielonefrite, sepse, obstrução, LRA, doença grave, imunossupressão ou ausência de melhora.',
      },
    },
  ],
  quickGuides: [
    {
      title: { en: 'Low-risk classic cystitis', 'pt-BR': 'Cistite clássica de baixo risco' },
      description: {
        en: 'Typical pathway for adult nonpregnant women with classic symptoms and no red flags.',
        'pt-BR': 'Via típica para mulher adulta não gestante, com sintomas clássicos e sem sinais de alerta.',
      },
      criteria: [
        { en: 'Dysuria, frequency, urgency, or suprapubic pain', 'pt-BR': 'Disúria, polaciúria, urgência ou dor suprapúbica' },
        { en: 'No fever, flank pain, nausea/vomiting, systemic illness, or obstruction symptoms', 'pt-BR': 'Sem febre, dor em flanco, náuseas/vômitos, sinais sistêmicos ou sintomas de obstrução' },
        { en: 'No vaginal discharge and no resistance or complicated UTI risk factors', 'pt-BR': 'Sem corrimento vaginal e sem fatores de risco para resistência ou ITU complicada' },
      ],
      actions: [
        { en: 'Empiric treatment may be appropriate without urine testing', 'pt-BR': 'Tratamento empírico pode ser apropriado sem exame de urina' },
        { en: 'Provide return precautions for fever, flank pain, worsening symptoms, or oral intolerance', 'pt-BR': 'Orientar retorno em caso de febre, dor em flanco, piora dos sintomas ou intolerância oral' },
      ],
    },
    {
      title: { en: 'Culture recommended before antibiotics', 'pt-BR': 'Cultura recomendada antes do antibiótico' },
      description: {
        en: 'Use when resistance risk, complicated UTI context, or non-low-risk presentation is present.',
        'pt-BR': 'Use quando houver risco de resistência, contexto de ITU complicada ou apresentação fora do perfil de baixo risco.',
      },
      criteria: [
        { en: 'Male patient, age 65 or older, recurrent UTI, recent antibiotics, or resistant organism history', 'pt-BR': 'Homem, idade ≥65 anos, ITU recorrente, uso recente de antibiótico ou resistência prévia' },
        { en: 'Pregnancy, immunocompromise, catheter, urologic abnormality, or suspected pyelonephritis', 'pt-BR': 'Gestação, imunossupressão, cateter, alteração urológica ou suspeita de pielonefrite' },
      ],
      actions: [
        { en: 'Obtain urinalysis and culture or reflex culture when feasible', 'pt-BR': 'Obter EAS e urocultura, ou cultura reflexa, quando possível' },
        { en: 'Document reason for culture and plan to adjust therapy to susceptibilities', 'pt-BR': 'Documentar o motivo da cultura e o plano de ajuste conforme antibiograma' },
      ],
    },
    {
      title: { en: 'Same-day evaluation / escalation', 'pt-BR': 'Avaliação no mesmo dia / escalonamento' },
      description: {
        en: 'Use when symptoms suggest pyelonephritis, obstruction, sepsis, or another diagnosis.',
        'pt-BR': 'Use quando os sintomas sugerirem pielonefrite, obstrução, sepse ou outro diagnóstico.',
      },
      criteria: [
        { en: 'Fever, flank pain/CVA tenderness, nausea/vomiting, rigors, hemodynamic instability, or altered mental status', 'pt-BR': 'Febre, dor em flanco/punho-percussão positiva, náuseas/vômitos, calafrios intensos, instabilidade hemodinâmica ou alteração mental' },
        { en: 'Unable to void, severe retention, or significant obstruction concern', 'pt-BR': 'Incapacidade de urinar, retenção importante ou suspeita de obstrução' },
      ],
      actions: [
        { en: 'Arrange same-day in-person evaluation or ED care depending on severity', 'pt-BR': 'Organizar avaliação presencial no mesmo dia ou atendimento de emergência conforme a gravidade' },
        { en: 'Consider labs, cultures, IV therapy, imaging, or urology involvement when indicated', 'pt-BR': 'Considerar exames, culturas, terapia intravenosa, imagem ou avaliação urológica quando indicado' },
      ],
    },
    {
      title: { en: 'Alternative diagnosis likely', 'pt-BR': 'Diagnóstico alternativo provável' },
      description: {
        en: 'Use when symptoms point away from isolated simple cystitis.',
        'pt-BR': 'Use quando os sintomas afastarem cistite simples isolada.',
      },
      criteria: [
        { en: 'Vaginal discharge, genital lesions, STI concern, diarrhea, respiratory symptoms, or gross hematuria without cystitis symptoms', 'pt-BR': 'Corrimento vaginal, lesões genitais, suspeita de IST, diarreia, sintomas respiratórios ou hematúria sem sintomas de cistite' },
      ],
      actions: [
        { en: 'Evaluate for vaginitis, urethritis/STI, gastroenteritis, respiratory infection, stones, or other causes', 'pt-BR': 'Avaliar vaginite, uretrite/IST, gastroenterite, infecção respiratória, cálculo urinário ou outras causas' },
      ],
    },
  ],
  sourceFigures: [
    {
      title: {
        en: 'UTI triage algorithm for adult nonpregnant women',
        'pt-BR': 'Algoritmo de triagem de ITU em mulheres adultas não gestantes',
      },
      source: {
        en: 'JAMA Network Open, 2026',
        'pt-BR': 'JAMA Network Open, 2026',
      },
      sourceUrl: 'https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2844483',
      citation: {
        en: 'Meddings J, Chrouser K, Fowler KE, et al. Ann Arbor Guide to Triaging Adults With Suspected Urinary Tract Infection for in-Person and Telehealth Settings. JAMA Network Open. 2026;9(1):e2556135.',
        'pt-BR': 'Meddings J, Chrouser K, Fowler KE, et al. Ann Arbor Guide to Triaging Adults With Suspected Urinary Tract Infection for in-Person and Telehealth Settings. JAMA Network Open. 2026;9(1):e2556135.',
      },
      notes: {
        en: 'Source algorithm reviewed locally for empiric treatment eligibility, urine testing triggers, alternative diagnosis screen, and same-day evaluation criteria.',
        'pt-BR': 'Algoritmo de referência revisado localmente para elegibilidade de tratamento empírico, gatilhos de exame de urina, triagem de diagnóstico alternativo e critérios de avaliação no mesmo dia.',
      },
    },
    {
      title: {
        en: 'Key recommendations for uncomplicated UTI',
        'pt-BR': 'Recomendações-chave para ITU não complicada',
      },
      source: {
        en: 'American Family Physician, 2024',
        'pt-BR': 'American Family Physician, 2024',
      },
      sourceUrl: 'https://www.aafp.org/afp/2024/0200/acute-uncomplicated-utis-adults',
      citation: {
        en: 'Kurotschka PK, Gágyor I, Ebell MH. Acute Uncomplicated UTIs in Adults: Rapid Evidence Review. American Family Physician. 2024;109(2):167-174.',
        'pt-BR': 'Kurotschka PK, Gágyor I, Ebell MH. Acute Uncomplicated UTIs in Adults: Rapid Evidence Review. American Family Physician. 2024;109(2):167-174.',
      },
      notes: {
        en: 'Source table reviewed locally for clinical diagnosis of uncomplicated UTI, culture indications, first-line antibiotic options, hydration, and delayed antibiotic strategies.',
        'pt-BR': 'Tabela de referência revisada localmente para diagnóstico clínico de ITU não complicada, indicações de cultura, antibióticos de primeira linha, hidratação e estratégia de antibiótico postergado.',
      },
    },
  ],
  presets: [
    {
      id: 'low-risk-classic-cystitis',
      title: { en: 'Low-risk classic cystitis', 'pt-BR': 'Cistite clássica de baixo risco' },
      description: {
        en: 'Young nonpregnant woman with classic lower urinary symptoms and no red flags.',
        'pt-BR': 'Mulher jovem, não gestante, com sintomas urinários baixos clássicos e sem sinais de alerta.',
      },
      answers: {
        sex: 'female',
        age: '28 years',
        pregnancyStatus: 'not-pregnant',
        fever: false,
        flankPain: false,
        nauseaVomiting: false,
        systemicSymptoms: [],
        obstructionSymptoms: [],
        dysuria: true,
        frequency: true,
        urgency: true,
        suprapubicPain: true,
        vaginalDischarge: false,
        genitalLesions: false,
        recentUti: false,
        recentAntibiotics: false,
        resistantOrganismHistory: false,
        diabetes: false,
        immunocompromised: false,
        urinaryCatheter: 'none',
        urologicAbnormality: false,
        oralTolerance: true,
      },
    },
    {
      id: 'culture-needed-risk-factors',
      title: { en: 'Culture needed: resistance risk', 'pt-BR': 'Cultura indicada: risco de resistência' },
      description: {
        en: 'Classic symptoms with recent UTI, antibiotics, diabetes, or other resistance context.',
        'pt-BR': 'Sintomas clássicos com ITU recente, uso recente de antibiótico, diabetes ou outro contexto de resistência.',
      },
      answers: {
        sex: 'female',
        age: '45 years',
        pregnancyStatus: 'not-pregnant',
        fever: false,
        flankPain: false,
        nauseaVomiting: false,
        systemicSymptoms: [],
        obstructionSymptoms: [],
        dysuria: true,
        frequency: true,
        urgency: true,
        suprapubicPain: true,
        vaginalDischarge: false,
        recentUti: true,
        recentAntibiotics: true,
        recentAntibioticName: 'TMP-SMX 6 weeks ago',
        resistantOrganismHistory: false,
        diabetes: true,
        immunocompromised: false,
        urinaryCatheter: 'none',
        urologicAbnormality: false,
        oralTolerance: true,
      },
    },
    {
      id: 'pyelonephritis-high-risk',
      title: { en: 'Pyelonephritis / high risk', 'pt-BR': 'Pielonefrite / alto risco' },
      description: {
        en: 'Fever and flank pain with systemic symptoms or poor oral tolerance.',
        'pt-BR': 'Febre e dor em flanco, com sintomas sistêmicos ou baixa tolerância oral.',
      },
      answers: {
        sex: 'female',
        age: '72 years',
        pregnancyStatus: 'not-pregnant',
        fever: true,
        temperature: '38.9 C',
        flankPain: true,
        nauseaVomiting: true,
        systemicSymptoms: ['rigors'],
        obstructionSymptoms: [],
        dysuria: true,
        frequency: true,
        urgency: false,
        suprapubicPain: false,
        vaginalDischarge: false,
        recentUti: false,
        recentAntibiotics: false,
        resistantOrganismHistory: false,
        diabetes: true,
        immunocompromised: false,
        urinaryCatheter: 'none',
        urologicAbnormality: false,
        oralTolerance: false,
      },
    },
    {
      id: 'alternative-diagnosis-screen-positive',
      title: { en: 'Alternative diagnosis screen positive', 'pt-BR': 'Triagem positiva para diagnóstico alternativo' },
      description: {
        en: 'Dysuria with vaginal/genital symptoms or non-urinary symptoms.',
        'pt-BR': 'Disúria com sintomas vaginais/genitais ou sintomas não urinários.',
      },
      answers: {
        sex: 'female',
        pregnancyStatus: 'unknown',
        fever: false,
        flankPain: false,
        dysuria: true,
        frequency: false,
        urgency: false,
        suprapubicPain: false,
        vaginalDischarge: true,
        genitalLesions: true,
        diarrhea: false,
        respiratorySymptoms: false,
      },
    },
  ],
  hpiTemplate,
}
