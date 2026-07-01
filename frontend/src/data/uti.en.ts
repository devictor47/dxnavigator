import type {
  BooleanField,
  ClinicalWorkflow,
  MultiselectField,
  SelectField,
  TextField,
} from '@/data/workflow'
const ageField: TextField = {
  key: 'age',
  label: 'Age',
  type: 'text',
  placeholder: 'Example: 28',
  narrative: { suffix: 'years old' },
}
const sexField: SelectField = {
  key: 'sex',
  label: 'Sex',
  type: 'select',
  options: [
    { label: 'Female', value: 'female', narrative: 'female' },
    { label: 'Male', value: 'male', narrative: 'male' },
    { label: 'Other / not specified', value: 'other' },
  ],
}
const durationField: TextField = {
  key: 'duration',
  label: 'Symptom duration',
  type: 'text',
  placeholder: 'Example: 2 days, started this morning',
  required: true,
  narrative: { prefix: 'for' },
}
const pregnancyStatusField: SelectField = {
  key: 'pregnancyStatus',
  label: 'Pregnancy status',
  type: 'select',
  options: [
    { label: 'Not pregnant', value: 'not-pregnant', narrative: 'not pregnant' },
    { label: 'Pregnant', value: 'pregnant', narrative: 'pregnancy' },
    { label: 'Unknown', value: 'unknown', narrative: 'unknown pregnancy status' },
    { label: 'Not applicable', value: 'not-applicable', narrative: 'pregnancy not applicable' },
  ],
}
const feverField: BooleanField = {
  key: 'fever',
  label: 'Fever',
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: 'fever' },
}
const temperatureField: TextField = {
  key: 'temperature',
  label: 'Temperature',
  type: 'text',
  placeholder: 'Example: 38.9 C',
  displayIf: { fieldKey: 'fever', equals: true },
  narrative: { prefix: 'temperature' },
}
const redFlagFields: BooleanField[] = [
  {
    key: 'flankPain',
    label: 'Flank pain or CVA tenderness',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'flank pain or CVA tenderness' },
  },
  {
    key: 'nauseaVomiting',
    label: 'Nausea or vomiting',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'nausea or vomiting' },
  },
]
const systemicSymptomsField: MultiselectField = {
  key: 'systemicSymptoms',
  label: 'Systemic illness signs',
  type: 'multiselect',
  options: [
    { label: 'Chills or rigors', value: 'rigors', narrative: 'chills or rigors' },
    {
      label: 'Hemodynamic instability',
      value: 'hemodynamic-instability',
      narrative: 'hemodynamic instability',
    },
    {
      label: 'Altered mental status',
      value: 'altered-mental-status',
      narrative: 'altered mental status',
    },
    {
      label: 'Marked fatigue or malaise',
      value: 'malaise',
      narrative: 'marked fatigue or malaise',
    },
  ],
  defaultValue: [],
}
const obstructionSymptomsField: MultiselectField = {
  key: 'obstructionSymptoms',
  label: 'Obstruction symptoms',
  type: 'multiselect',
  options: [
    { label: 'Unable to void', value: 'unable-to-void', narrative: 'inability to void' },
    {
      label: 'Severe urinary retention',
      value: 'severe-retention',
      narrative: 'severe urinary retention',
    },
  ],
  defaultValue: [],
}
const cystitisSymptomFields: BooleanField[] = [
  {
    key: 'dysuria',
    label: 'Dysuria',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'dysuria' },
  },
  {
    key: 'frequency',
    label: 'Urinary frequency',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'urinary frequency' },
  },
  {
    key: 'urgency',
    label: 'Urinary urgency',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'urinary urgency' },
  },
  {
    key: 'suprapubicPain',
    label: 'Suprapubic pain',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'suprapubic pain' },
  },
  {
    key: 'hematuria',
    label: 'Hematuria',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'hematuria' },
  },
  {
    key: 'nocturia',
    label: 'Nocturia',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'nocturia' },
  },
]
const alternativeDiagnosisFields: BooleanField[] = [
  {
    key: 'vaginalDischarge',
    label: 'Vaginal discharge or irritation',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'vaginal discharge or irritation' },
  },
  {
    key: 'genitalLesions',
    label: 'Genital lesions, rash, or STI concern',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'genital lesions, rash, or STI concern' },
  },
  {
    key: 'diarrhea',
    label: 'Diarrhea',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'diarrhea' },
  },
  {
    key: 'respiratorySymptoms',
    label: 'Cough or respiratory symptoms',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'cough or respiratory symptoms' },
  },
]
const resistanceRiskFields: BooleanField[] = [
  {
    key: 'recentUti',
    label: 'UTI in the last 3 months',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'recent UTI' },
  },
  {
    key: 'recentAntibiotics',
    label: 'Antibiotic use in the last 3 months',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'recent antibiotic use' },
  },
  {
    key: 'resistantOrganismHistory',
    label: 'History of resistant urinary organism',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'history of resistant urinary organism' },
  },
  {
    key: 'diabetes',
    label: 'Diabetes',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'diabetes' },
  },
  {
    key: 'immunocompromised',
    label: 'Immunocompromised',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'immunocompromised status' },
  },
]
const antibioticDetailsField: TextField = {
  key: 'recentAntibioticName',
  label: 'Recent antibiotic details',
  type: 'text',
  placeholder: 'Example: TMP-SMX 6 weeks ago',
  displayIf: { fieldKey: 'recentAntibiotics', equals: true },
  narrative: { prefix: 'recent antibiotic' },
}
const resistantOrganismDetailsField: TextField = {
  key: 'resistantOrganismName',
  label: 'Resistant organism details',
  type: 'text',
  placeholder: 'Example: ESBL E. coli',
  displayIf: { fieldKey: 'resistantOrganismHistory', equals: true },
  narrative: { prefix: 'resistant organism history' },
}
const immunocompromiseDetailsField: TextField = {
  key: 'immunocompromiseDetails',
  label: 'Type of immunocompromise',
  type: 'text',
  placeholder: 'Example: chemotherapy, transplant, steroids',
  displayIf: { fieldKey: 'immunocompromised', equals: true },
  narrative: { prefix: 'immunocompromise details' },
}
const catheterField: SelectField = {
  key: 'urinaryCatheter',
  label: 'Urinary catheter',
  type: 'select',
  options: [
    { label: 'None', value: 'none', narrative: 'no urinary catheter' },
    { label: 'Indwelling Foley', value: 'indwelling', narrative: 'indwelling urinary catheter' },
    {
      label: 'Intermittent catheterization',
      value: 'intermittent',
      narrative: 'intermittent catheterization',
    },
    { label: 'Suprapubic catheter', value: 'suprapubic', narrative: 'suprapubic catheter' },
    {
      label: 'Removed within 48 hours',
      value: 'recently-removed',
      narrative: 'catheter removed within 48 hours',
    },
  ],
  defaultValue: 'none',
}
const urologicAbnormalityField: BooleanField = {
  key: 'urologicAbnormality',
  label: 'Known urologic abnormality or recent procedure',
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: 'known urologic abnormality or recent procedure' },
}
const urologicDetailsField: TextField = {
  key: 'urologicDetails',
  label: 'Urologic details',
  type: 'text',
  placeholder: 'Example: stent, stone, recent cystoscopy',
  displayIf: { fieldKey: 'urologicAbnormality', equals: true },
  narrative: { prefix: 'urologic details' },
}
const prostateSymptomsField: BooleanField = {
  key: 'prostateSymptoms',
  label: 'Perineal/prostate symptoms',
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: 'perineal or prostate symptoms' },
}
const oralToleranceField: BooleanField = {
  key: 'oralTolerance',
  label: 'Able to tolerate oral intake',
  type: 'boolean',
  narrative: { whenTrue: 'able to tolerate oral intake' },
}
const hpiTemplate = `
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
  `
export const utiModule: ClinicalWorkflow = {
  id: 'uti',
  language: 'en',
  title: 'UTI',
  overview:
    'Triage urinary symptoms by red flags, classic cystitis pattern, alternative diagnoses, resistance risk, and complicated UTI features.',
  sections: [
    {
      id: 'patient-context',
      title: 'Patient context',
      fields: [ageField, sexField, durationField, pregnancyStatusField],
    },
    {
      id: 'red-flag-screen',
      title: 'Red flag screen',
      description:
        'Positive findings here argue against simple UTI triage and may require same-day in-person evaluation or ED escalation.',
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
      title: 'Core cystitis symptoms',
      fields: cystitisSymptomFields,
    },
    {
      id: 'alternative-diagnosis-screen',
      title: 'Alternative diagnosis screen',
      fields: alternativeDiagnosisFields,
    },
    {
      id: 'resistance-and-complication-risk',
      title: 'Resistance and complication risk',
      fields: [
        ...resistanceRiskFields,
        antibioticDetailsField,
        resistantOrganismDetailsField,
        immunocompromiseDetailsField,
      ],
    },
    {
      id: 'urologic-history',
      title: 'Urologic history',
      fields: [
        catheterField,
        urologicAbnormalityField,
        urologicDetailsField,
        prostateSymptomsField,
      ],
    },
  ],
  redFlags: [
    {
      title: 'Fever, flank pain, or CVA tenderness',
      description: 'Raises concern for pyelonephritis or complicated upper tract infection.',
    },
    {
      title: 'Rigors, hemodynamic instability, or altered mental status',
      description: 'Suggests possible urosepsis and need for urgent escalation.',
    },
    {
      title: 'Urinary obstruction symptoms',
      description:
        'Inability to void or severe retention may require urgent decompression or urologic evaluation.',
    },
    {
      title: 'Pregnancy',
      description: 'Requires culture and treatment strategy adjusted for maternal-fetal risk.',
    },
    {
      title: 'Catheter, immunocompromise, or urologic abnormality',
      description:
        'Defines higher-risk or complicated UTI context and lowers threshold for culture and broader evaluation.',
    },
  ],
  differentials: [
    {
      title: 'Acute uncomplicated cystitis',
      description:
        'Dysuria, frequency, urgency, and suprapubic discomfort without fever, flank pain, or vaginal discharge.',
    },
    {
      title: 'Pyelonephritis',
      description:
        'Fever, chills, flank pain, CVA tenderness, nausea, vomiting, or systemic illness.',
    },
    {
      title: 'Urosepsis',
      description:
        'Rigors, hemodynamic instability, altered mental status, poor perfusion, or systemic toxicity.',
    },
    {
      title: 'Urethritis or STI',
      description:
        'Dysuria with discharge, genital lesions, rash, exposure risk, or negative urine testing.',
    },
    {
      title: 'Vaginitis',
      description: 'Vaginal discharge, itching, odor, dyspareunia, or external dysuria.',
    },
    {
      title: 'Nephrolithiasis or obstruction',
      description:
        'Colicky flank pain, hematuria, severe retention, inability to void, or obstructive uropathy risk.',
    },
    {
      title: 'Prostatitis',
      description:
        'Male patient with pelvic/perineal pain, obstructive symptoms, fever, or tender prostate.',
    },
  ],
  workup: [
    {
      title: 'Urinalysis when presentation is not low-risk classic cystitis',
      description:
        'Useful for men, atypical symptoms, alternative diagnosis concern, resistance risk, or complicated infection features.',
    },
    {
      title: 'Urine culture with susceptibility when indicated',
      description:
        'Obtain for men, age 65 or older, recurrent UTI, recent antibiotics, treatment failure, resistant organism history, pregnancy, immunocompromise, catheter, or suspected pyelonephritis.',
    },
    {
      title: 'Pregnancy test when relevant',
      description:
        'Pregnancy changes risk stratification, culture threshold, and antibiotic selection.',
    },
    {
      title: 'STI/vaginitis testing when indicated',
      description:
        'Consider with discharge, genital lesions, irritation, pelvic symptoms, exposure risk, or atypical dysuria.',
    },
    {
      title: 'CBC, BMP, blood cultures, and imaging for high-risk illness',
      description:
        'Use when pyelonephritis, sepsis, obstruction, AKI, severe illness, immunocompromise, or lack of improvement is suspected.',
    },
  ],
  quickGuides: [
    {
      title: 'Low-risk classic cystitis',
      description:
        'Typical pathway for adult nonpregnant women with classic symptoms and no red flags.',
      criteria: [
        'Dysuria, frequency, urgency, or suprapubic pain',
        'No fever, flank pain, nausea/vomiting, systemic illness, or obstruction symptoms',
        'No vaginal discharge and no resistance or complicated UTI risk factors',
      ],
      actions: [
        'Empiric treatment may be appropriate without urine testing',
        'Provide return precautions for fever, flank pain, worsening symptoms, or oral intolerance',
      ],
    },
    {
      title: 'Culture recommended before antibiotics',
      description:
        'Use when resistance risk, complicated UTI context, or non-low-risk presentation is present.',
      criteria: [
        'Male patient, age 65 or older, recurrent UTI, recent antibiotics, or resistant organism history',
        'Pregnancy, immunocompromise, catheter, urologic abnormality, or suspected pyelonephritis',
      ],
      actions: [
        'Obtain urinalysis and culture or reflex culture when feasible',
        'Document reason for culture and plan to adjust therapy to susceptibilities',
      ],
    },
    {
      title: 'Same-day evaluation / escalation',
      description:
        'Use when symptoms suggest pyelonephritis, obstruction, sepsis, or another diagnosis.',
      criteria: [
        'Fever, flank pain/CVA tenderness, nausea/vomiting, rigors, hemodynamic instability, or altered mental status',
        'Unable to void, severe retention, or significant obstruction concern',
      ],
      actions: [
        'Arrange same-day in-person evaluation or ED care depending on severity',
        'Consider labs, cultures, IV therapy, imaging, or urology involvement when indicated',
      ],
    },
    {
      title: 'Alternative diagnosis likely',
      description: 'Use when symptoms point away from isolated simple cystitis.',
      criteria: [
        'Vaginal discharge, genital lesions, STI concern, diarrhea, respiratory symptoms, or gross hematuria without cystitis symptoms',
      ],
      actions: [
        'Evaluate for vaginitis, urethritis/STI, gastroenteritis, respiratory infection, stones, or other causes',
      ],
    },
  ],
  sourceFigures: [
    {
      title: 'UTI triage algorithm for adult nonpregnant women',
      source: 'JAMA Network Open, 2026',
      sourceUrl: 'https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2844483',
      citation:
        'Meddings J, Chrouser K, Fowler KE, et al. Ann Arbor Guide to Triaging Adults With Suspected Urinary Tract Infection for in-Person and Telehealth Settings. JAMA Network Open. 2026;9(1):e2556135.',
      notes:
        'Source algorithm reviewed locally for empiric treatment eligibility, urine testing triggers, alternative diagnosis screen, and same-day evaluation criteria.',
    },
    {
      title: 'Key recommendations for uncomplicated UTI',
      source: 'American Family Physician, 2024',
      sourceUrl: 'https://www.aafp.org/afp/2024/0200/acute-uncomplicated-utis-adults',
      citation:
        'Kurotschka PK, Gágyor I, Ebell MH. Acute Uncomplicated UTIs in Adults: Rapid Evidence Review. American Family Physician. 2024;109(2):167-174.',
      notes:
        'Source table reviewed locally for clinical diagnosis of uncomplicated UTI, culture indications, first-line antibiotic options, hydration, and delayed antibiotic strategies.',
    },
  ],
  presets: [
    {
      id: 'low-risk-classic-cystitis',
      title: 'Low-risk classic cystitis',
      description: 'Young nonpregnant woman with classic lower urinary symptoms and no red flags.',
      answers: {
        sex: 'female',
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
      title: 'Culture needed: resistance risk',
      description:
        'Classic symptoms with recent UTI, antibiotics, diabetes, or other resistance context.',
      answers: {
        sex: 'female',
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
      title: 'Pyelonephritis / high risk',
      description: 'Fever and flank pain with systemic symptoms or poor oral tolerance.',
      answers: {
        sex: 'female',
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
      title: 'Alternative diagnosis screen positive',
      description: 'Dysuria with vaginal/genital symptoms or non-urinary symptoms.',
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
