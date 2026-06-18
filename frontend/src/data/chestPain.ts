import {
  getBooleanAnswer,
  getSelectedNarratives,
  getTextAnswer,
  joinNarrativeList,
  type ClinicalWorkflow,
  type MultiselectField,
} from '@/data/workflow'

const radiationField: MultiselectField = {
  key: 'radiation',
  label: 'Radiation',
  type: 'multiselect',
  helperText: 'Select all locations described by the patient.',
  options: [
    { label: 'Left arm', value: 'left-arm', narrative: 'the left arm' },
    { label: 'Jaw', value: 'jaw', narrative: 'the jaw' },
    { label: 'Back', value: 'back', narrative: 'the back' },
    { label: 'Epigastrium', value: 'epigastrium', narrative: 'the epigastrium' },
  ],
  defaultValue: [],
}

const associatedSymptomsField: MultiselectField = {
  key: 'associatedSymptoms',
  label: 'Associated symptoms',
  type: 'multiselect',
  options: [
    { label: 'Dyspnea', value: 'dyspnea', narrative: 'dyspnea' },
    { label: 'Diaphoresis', value: 'diaphoresis', narrative: 'diaphoresis' },
    { label: 'Nausea', value: 'nausea', narrative: 'nausea' },
    { label: 'Palpitations', value: 'palpitations', narrative: 'palpitations' },
    { label: 'Syncope', value: 'syncope', narrative: 'syncope' },
  ],
  defaultValue: [],
}

export const chestPainModule: ClinicalWorkflow = {
  id: 'chest-pain',
  title: 'Chest Pain',
  overview:
    'Capture structured history, generate the HPI in real time, and keep high-risk diagnoses visible during the initial evaluation.',
  sections: [
    {
      id: 'pain-characteristics',
      title: 'Pain characteristics',
      description: 'Define the core chest pain story before moving into risk and associated symptoms.',
      fields: [
        {
          key: 'onset',
          label: 'Onset and duration',
          type: 'text',
          placeholder: 'Example: started 2 hours ago, intermittent for 3 days',
          required: true,
        },
        {
          key: 'location',
          label: 'Location or quality',
          type: 'text',
          placeholder: 'Example: retrosternal pressure',
        },
        radiationField,
      ],
    },
    {
      id: 'triggers-relief',
      title: 'Triggers and relief',
      fields: [
        {
          key: 'exertional',
          label: 'Triggered by exertion',
          type: 'boolean',
          defaultValue: false,
          trueNarrative: 'triggered by exertion',
        },
        {
          key: 'relievedByRest',
          label: 'Improves with rest',
          type: 'boolean',
          defaultValue: false,
          trueNarrative: 'relieved by rest',
        },
        {
          key: 'pleuritic',
          label: 'Pleuritic component',
          type: 'boolean',
          defaultValue: false,
          trueNarrative: 'worse with inspiration',
        },
      ],
    },
    {
      id: 'associated-symptoms',
      title: 'Associated symptoms',
      fields: [
        associatedSymptomsField,
      ],
    },
  ],
  redFlags: [
    {
      title: 'Syncope or near-syncope',
      description: 'May indicate arrhythmia, pulmonary embolism, aortic dissection, or shock.',
    },
    {
      title: 'Hemodynamic instability',
      description: 'Hypotension, altered mental status, severe hypoxia, or signs of poor perfusion.',
    },
    {
      title: 'Neurologic deficit',
      description: 'Raises concern for aortic dissection with branch vessel involvement.',
    },
    {
      title: 'Severe tearing pain to the back',
      description: 'Classic high-risk feature for aortic dissection.',
    },
  ],
  differentials: [
    {
      title: 'Acute Coronary Syndrome',
      description: 'Pressure-like pain, exertional symptoms, ECG changes, or troponin elevation.',
    },
    {
      title: 'Pulmonary Embolism',
      description: 'Pleuritic pain, dyspnea, tachycardia, hypoxia, hemoptysis, or VTE risk.',
    },
    {
      title: 'Aortic Dissection',
      description: 'Abrupt severe pain, pulse deficits, neurologic symptoms, or mediastinal widening.',
    },
    {
      title: 'Pericarditis',
      description: 'Sharp positional pain, pericardial rub, diffuse ST elevation, or recent viral illness.',
    },
    {
      title: 'Pneumothorax',
      description: 'Acute pleuritic pain with dyspnea and decreased breath sounds.',
    },
  ],
  workup: [
    {
      title: 'ECG',
      description: 'Obtain early to identify STEMI, ischemia, arrhythmia, or pericarditis patterns.',
    },
    {
      title: 'Troponin',
      description: 'Use serial testing when ACS remains possible after the initial result.',
    },
    {
      title: 'Chest X-Ray',
      description: 'Evaluate mediastinum, pneumothorax, pneumonia, pulmonary edema, or other causes.',
    },
    {
      title: 'Basic labs',
      description: 'CBC, metabolic panel, and targeted testing based on presentation.',
    },
    {
      title: 'CTA or D-dimer when indicated',
      description: 'Use clinical probability to guide PE or dissection evaluation.',
    },
  ],
  generateHpi: (answers) => {
    const onset = getTextAnswer(answers, 'onset')
    const location = getTextAnswer(answers, 'location')
    const radiation = joinNarrativeList(getSelectedNarratives(radiationField, answers))
    const associatedSymptoms = joinNarrativeList(getSelectedNarratives(associatedSymptomsField, answers))

    const painDescription = location || 'chest pain'
    const openingSentence = `Patient presents with ${painDescription}${onset ? ` beginning ${onset}` : ''}.`

    const painClauses = [
      radiation ? `radiates to ${radiation}` : '',
      getBooleanAnswer(answers, 'exertional') ? 'is triggered by exertion' : '',
      getBooleanAnswer(answers, 'relievedByRest') ? 'is relieved by rest' : '',
      getBooleanAnswer(answers, 'pleuritic') ? 'is worse with inspiration' : '',
    ].filter(Boolean)

    const painSentence = painClauses.length > 0 ? ` Pain ${joinNarrativeList(painClauses)}.` : ''
    const associatedSentence = associatedSymptoms
      ? ` Associated symptoms include ${associatedSymptoms}.`
      : ''

    return `${openingSentence}${painSentence}${associatedSentence}`
  },
}
