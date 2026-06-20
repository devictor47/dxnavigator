import {
  getBooleanAnswer,
  getSelectedNarratives,
  getTextAnswer,
  joinNarrativeList,
  type ClinicalWorkflow,
  type MultiselectField,
} from '@/data/workflow'

const headacheFeaturesField: MultiselectField = {
  key: 'headacheFeatures',
  label: 'Headache features',
  type: 'multiselect',
  helperText: 'Select the features that characterize the headache episode.',
  options: [
    { label: 'Unilateral', value: 'unilateral', narrative: 'unilateral headache' },
    { label: 'Pulsating', value: 'pulsating', narrative: 'pulsating quality' },
    { label: 'Moderate to severe', value: 'moderate-severe', narrative: 'moderate to severe intensity' },
    { label: 'Worse with activity', value: 'activity', narrative: 'worsening with activity' },
  ],
  defaultValue: [],
}

const associatedSymptomsField: MultiselectField = {
  key: 'associatedSymptoms',
  label: 'Associated symptoms',
  type: 'multiselect',
  options: [
    { label: 'Nausea', value: 'nausea', narrative: 'nausea' },
    { label: 'Vomiting', value: 'vomiting', narrative: 'vomiting' },
    { label: 'Photophobia', value: 'photophobia', narrative: 'photophobia' },
    { label: 'Phonophobia', value: 'phonophobia', narrative: 'phonophobia' },
    { label: 'Aura', value: 'aura', narrative: 'aura' },
  ],
  defaultValue: [],
}

const triggerField: MultiselectField = {
  key: 'triggers',
  label: 'Triggers or context',
  type: 'multiselect',
  options: [
    { label: 'Sleep deprivation', value: 'sleep', narrative: 'sleep deprivation' },
    { label: 'Stress', value: 'stress', narrative: 'stress' },
    { label: 'Menses', value: 'menses', narrative: 'menses' },
    { label: 'Alcohol', value: 'alcohol', narrative: 'alcohol exposure' },
    { label: 'Medication overuse', value: 'medication-overuse', narrative: 'possible medication overuse' },
  ],
  defaultValue: [],
}

export const migraineModule: ClinicalWorkflow = {
  id: 'migraine',
  title: 'Migraine (Enxaqueca)',
  overview:
    'Structure headache evaluation around migraine features, associated symptoms, red flags, triggers, and need for urgent neuro workup.',
  sections: [
    {
      id: 'headache-pattern',
      title: 'Headache pattern',
      description: 'Capture onset, duration, and migraine-defining features.',
      fields: [
        {
          key: 'duration',
          label: 'Duration and timing',
          type: 'text',
          placeholder: 'Example: 6 hours, since yesterday, recurrent monthly',
          required: true,
          narrative: {
            prefix: 'for',
          },
        },
        {
          key: 'location',
          label: 'Location',
          type: 'text',
          placeholder: 'Example: left temporal, bifrontal',
        },
        headacheFeaturesField,
      ],
    },
    {
      id: 'associated-symptoms',
      title: 'Associated symptoms',
      fields: [associatedSymptomsField],
    },
    {
      id: 'red-flag-screen',
      title: 'Red flag screen',
      fields: [
        {
          key: 'suddenOnset',
          label: 'Thunderclap or sudden maximal onset',
          type: 'boolean',
          defaultValue: false,
          narrative: {
            whenTrue: 'with sudden maximal onset',
          },
        },
        {
          key: 'neuroDeficit',
          label: 'Neurologic deficit or altered mental status',
          type: 'boolean',
          defaultValue: false,
          narrative: {
            whenTrue: 'with neurologic deficit or altered mental status',
          },
        },
        {
          key: 'feverNeckStiffness',
          label: 'Fever or neck stiffness',
          type: 'boolean',
          defaultValue: false,
          narrative: {
            whenTrue: 'with fever or neck stiffness',
          },
        },
        triggerField,
      ],
    },
  ],
  redFlags: [
    {
      title: 'Thunderclap onset',
      description: 'Sudden maximal headache raises concern for subarachnoid hemorrhage.',
    },
    {
      title: 'Neurologic deficit',
      description: 'Focal deficits, altered mental status, seizure, or papilledema need urgent evaluation.',
    },
    {
      title: 'Fever or meningismus',
      description: 'Consider meningitis, encephalitis, or systemic infection.',
    },
    {
      title: 'New or changed headache pattern',
      description: 'Especially concerning with age over 50, cancer, pregnancy, immunosuppression, or anticoagulation.',
    },
  ],
  differentials: [
    {
      title: 'Migraine',
      description: 'Recurrent headache with nausea, photophobia, phonophobia, aura, or activity worsening.',
    },
    {
      title: 'Tension-type headache',
      description: 'Bilateral pressure-like pain without prominent nausea or sensory sensitivity.',
    },
    {
      title: 'Cluster headache',
      description: 'Severe unilateral orbital pain with autonomic symptoms and circadian pattern.',
    },
    {
      title: 'Subarachnoid hemorrhage',
      description: 'Thunderclap onset, exertional trigger, syncope, or neurologic symptoms.',
    },
    {
      title: 'Meningitis or encephalitis',
      description: 'Fever, neck stiffness, altered mental status, rash, or immunocompromise.',
    },
  ],
  workup: [
    {
      title: 'Focused neurologic exam',
      description: 'Assess mental status, cranial nerves, motor, sensory, coordination, gait, and fundoscopic signs.',
    },
    {
      title: 'No routine imaging for typical migraine',
      description: 'Avoid imaging when presentation is stable, recurrent, and neurologic exam is normal.',
    },
    {
      title: 'Neuroimaging if red flags',
      description: 'Use CT, CTA, MRI, or other testing based on thunderclap, deficits, cancer, pregnancy, or infection risk.',
    },
    {
      title: 'Pregnancy test when relevant',
      description: 'Important for medication selection and secondary headache risk.',
    },
    {
      title: 'Medication review',
      description: 'Assess analgesic frequency, triptan use, anticoagulants, hormones, and contraindications.',
    },
  ],
  generateHpi: (answers) => {
    const duration = getTextAnswer(answers, 'duration')
    const location = getTextAnswer(answers, 'location')
    const features = joinNarrativeList(getSelectedNarratives(headacheFeaturesField, answers))
    const associatedSymptoms = joinNarrativeList(getSelectedNarratives(associatedSymptomsField, answers))
    const triggers = joinNarrativeList(getSelectedNarratives(triggerField, answers))
    const redFlags = [
      getBooleanAnswer(answers, 'suddenOnset') ? 'sudden maximal onset' : '',
      getBooleanAnswer(answers, 'neuroDeficit') ? 'neurologic deficit or altered mental status' : '',
      getBooleanAnswer(answers, 'feverNeckStiffness') ? 'fever or neck stiffness' : '',
    ].filter(Boolean)

    const locationClause = location ? `${location} headache` : 'headache'
    const durationClause = duration ? ` for ${duration}` : ''
    const featureClause = features ? ` Features include ${features}.` : ''
    const associatedClause = associatedSymptoms ? ` Associated symptoms include ${associatedSymptoms}.` : ''
    const triggerClause = triggers ? ` Reported triggers or context include ${triggers}.` : ''
    const redFlagClause = redFlags.length > 0 ? ` Red flag features include ${joinNarrativeList(redFlags)}.` : ''

    return `Patient presents with ${locationClause}${durationClause}.${featureClause}${associatedClause}${triggerClause}${redFlagClause}`
  },
}
