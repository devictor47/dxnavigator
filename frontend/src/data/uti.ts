import {
  getBooleanAnswer,
  getSelectedNarratives,
  getTextAnswer,
  joinNarrativeList,
  type ClinicalWorkflow,
  type MultiselectField,
} from '@/data/workflow'

const urinarySymptomsField: MultiselectField = {
  key: 'urinarySymptoms',
  label: 'Urinary symptoms',
  type: 'multiselect',
  helperText: 'Select the symptoms reported during the urinary history.',
  options: [
    { label: 'Dysuria', value: 'dysuria', narrative: 'dysuria' },
    { label: 'Frequency', value: 'frequency', narrative: 'urinary frequency' },
    { label: 'Urgency', value: 'urgency', narrative: 'urinary urgency' },
    { label: 'Suprapubic pain', value: 'suprapubic-pain', narrative: 'suprapubic pain' },
    { label: 'Hematuria', value: 'hematuria', narrative: 'hematuria' },
  ],
  defaultValue: [],
}

const riskFactorsField: MultiselectField = {
  key: 'riskFactors',
  label: 'Risk context',
  type: 'multiselect',
  options: [
    { label: 'Pregnancy', value: 'pregnancy', narrative: 'pregnancy' },
    { label: 'Diabetes', value: 'diabetes', narrative: 'diabetes' },
    { label: 'Indwelling catheter', value: 'catheter', narrative: 'an indwelling catheter' },
    { label: 'Recent urologic procedure', value: 'procedure', narrative: 'recent urologic procedure' },
    { label: 'Recurrent UTI', value: 'recurrent-uti', narrative: 'recurrent UTI' },
  ],
  defaultValue: [],
}

export const utiModule: ClinicalWorkflow = {
  id: 'uti',
  title: 'UTI',
  overview:
    'Collect urinary symptoms, screen for complicated infection, and keep pyelonephritis and alternative diagnoses visible.',
  sections: [
    {
      id: 'urinary-history',
      title: 'Urinary history',
      description: 'Establish symptom pattern, duration, and localization of discomfort.',
      fields: [
        {
          key: 'duration',
          label: 'Symptom duration',
          type: 'text',
          placeholder: 'Example: 2 days, started this morning',
          required: true,
        },
        urinarySymptomsField,
      ],
    },
    {
      id: 'upper-tract-symptoms',
      title: 'Upper tract and systemic symptoms',
      fields: [
        {
          key: 'fever',
          label: 'Fever or chills',
          type: 'boolean',
          defaultValue: false,
          trueNarrative: 'associated with fever or chills',
        },
        {
          key: 'flankPain',
          label: 'Flank pain',
          type: 'boolean',
          defaultValue: false,
          trueNarrative: 'associated with flank pain',
        },
        {
          key: 'nauseaVomiting',
          label: 'Nausea or vomiting',
          type: 'boolean',
          defaultValue: false,
          trueNarrative: 'associated with nausea or vomiting',
        },
      ],
    },
    {
      id: 'risk-context',
      title: 'Risk context',
      fields: [
        riskFactorsField,
        {
          key: 'vaginalSymptoms',
          label: 'Vaginal discharge or irritation',
          type: 'boolean',
          defaultValue: false,
          trueNarrative: 'with vaginal discharge or irritation',
        },
      ],
    },
  ],
  redFlags: [
    {
      title: 'Fever with flank pain',
      description: 'Raises concern for pyelonephritis or complicated upper tract infection.',
    },
    {
      title: 'Pregnancy',
      description: 'Requires lower threshold for urine culture and treatment due to maternal-fetal risk.',
    },
    {
      title: 'Sepsis physiology',
      description: 'Hypotension, tachycardia, altered mental status, or poor perfusion needs urgent escalation.',
    },
    {
      title: 'Obstruction concern',
      description: 'Severe flank pain, known stone disease, or solitary kidney may require imaging.',
    },
  ],
  differentials: [
    {
      title: 'Acute uncomplicated cystitis',
      description: 'Dysuria, frequency, urgency, and suprapubic discomfort without systemic symptoms.',
    },
    {
      title: 'Pyelonephritis',
      description: 'Fever, chills, flank pain, nausea, vomiting, or systemic illness.',
    },
    {
      title: 'Urethritis or STI',
      description: 'Consider with exposure risk, discharge, pelvic symptoms, or negative urine testing.',
    },
    {
      title: 'Vaginitis',
      description: 'Discharge, irritation, odor, or dyspareunia can point away from isolated UTI.',
    },
    {
      title: 'Nephrolithiasis',
      description: 'Colicky flank pain, hematuria, nausea, or history of stones.',
    },
  ],
  workup: [
    {
      title: 'Urinalysis',
      description: 'Assess leukocyte esterase, nitrites, pyuria, hematuria, and contamination markers.',
    },
    {
      title: 'Urine culture when indicated',
      description: 'Use for pregnancy, recurrent UTI, suspected pyelonephritis, or complicated infection.',
    },
    {
      title: 'Pregnancy test when relevant',
      description: 'Important before medication selection and risk stratification.',
    },
    {
      title: 'STI testing when indicated',
      description: 'Consider NAAT testing if urethritis, cervicitis, or exposure risk is present.',
    },
    {
      title: 'Imaging if complicated',
      description: 'Consider if obstruction, stone, severe illness, or lack of improvement is suspected.',
    },
  ],
  generateHpi: (answers) => {
    const duration = getTextAnswer(answers, 'duration')
    const urinarySymptoms = joinNarrativeList(getSelectedNarratives(urinarySymptomsField, answers))
    const riskFactors = joinNarrativeList(getSelectedNarratives(riskFactorsField, answers))
    const systemicFeatures = [
      getBooleanAnswer(answers, 'fever') ? 'fever or chills' : '',
      getBooleanAnswer(answers, 'flankPain') ? 'flank pain' : '',
      getBooleanAnswer(answers, 'nauseaVomiting') ? 'nausea or vomiting' : '',
      getBooleanAnswer(answers, 'vaginalSymptoms') ? 'vaginal discharge or irritation' : '',
    ].filter(Boolean)

    const symptomClause = urinarySymptoms || 'urinary symptoms'
    const durationClause = duration ? ` for ${duration}` : ''
    const systemicClause =
      systemicFeatures.length > 0
        ? ` Associated symptoms include ${joinNarrativeList(systemicFeatures)}.`
        : ''
    const riskClause = riskFactors ? ` Relevant risk context includes ${riskFactors}.` : ''

    return `Patient presents with ${symptomClause}${durationClause}.${systemicClause}${riskClause}`
  },
}
