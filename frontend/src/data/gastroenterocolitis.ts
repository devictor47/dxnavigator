import {
  getBooleanAnswer,
  getSelectedNarratives,
  getTextAnswer,
  joinNarrativeList,
  type ClinicalWorkflow,
  type MultiselectField,
} from '@/data/workflow'

const symptomsField: MultiselectField = {
  key: 'symptoms',
  label: 'GI symptoms',
  type: 'multiselect',
  helperText: 'Select the main symptoms driving the current episode.',
  options: [
    { label: 'Diarrhea', value: 'diarrhea', narrative: 'diarrhea' },
    { label: 'Vomiting', value: 'vomiting', narrative: 'vomiting' },
    { label: 'Nausea', value: 'nausea', narrative: 'nausea' },
    { label: 'Abdominal pain', value: 'abdominal-pain', narrative: 'abdominal pain' },
    { label: 'Fever', value: 'fever', narrative: 'fever' },
  ],
  defaultValue: [],
}

const stoolFeaturesField: MultiselectField = {
  key: 'stoolFeatures',
  label: 'Stool features',
  type: 'multiselect',
  options: [
    { label: 'Watery', value: 'watery', narrative: 'watery stools' },
    { label: 'Bloody', value: 'bloody', narrative: 'bloody stools' },
    { label: 'Mucus', value: 'mucus', narrative: 'mucus in stool' },
    { label: 'Black stools', value: 'melena', narrative: 'black stools' },
  ],
  defaultValue: [],
}

const exposureField: MultiselectField = {
  key: 'exposures',
  label: 'Exposure context',
  type: 'multiselect',
  options: [
    { label: 'Sick contacts', value: 'sick-contacts', narrative: 'sick contacts' },
    { label: 'Suspicious food', value: 'food', narrative: 'suspicious food exposure' },
    { label: 'Recent travel', value: 'travel', narrative: 'recent travel' },
    { label: 'Recent antibiotics', value: 'antibiotics', narrative: 'recent antibiotic use' },
    { label: 'Daycare or institutional exposure', value: 'institutional', narrative: 'institutional exposure' },
  ],
  defaultValue: [],
}

export const gastroenterocolitisModule: ClinicalWorkflow = {
  id: 'gastroenterocolitis',
  title: 'Gastroenterocolitis (GECA)',
  overview:
    'Structure acute diarrhea and vomiting evaluation around hydration status, invasive features, exposures, and need for testing or escalation.',
  sections: [
    {
      id: 'illness-course',
      title: 'Illness course',
      description: 'Define timing, symptom pattern, and stool character before risk stratification.',
      fields: [
        {
          key: 'duration',
          label: 'Symptom duration',
          type: 'text',
          placeholder: 'Example: 12 hours, 3 days',
          required: true,
          narrative: {
            prefix: 'for',
          },
        },
        symptomsField,
        stoolFeaturesField,
      ],
    },
    {
      id: 'hydration-severity',
      title: 'Hydration and severity',
      fields: [
        {
          key: 'poorIntake',
          label: 'Poor oral intake',
          type: 'boolean',
          defaultValue: false,
          narrative: {
            whenTrue: 'with poor oral intake',
          },
        },
        {
          key: 'dehydrationSigns',
          label: 'Signs of dehydration',
          type: 'boolean',
          defaultValue: false,
          narrative: {
            whenTrue: 'with signs of dehydration',
          },
        },
        {
          key: 'severePain',
          label: 'Severe or localized abdominal pain',
          type: 'boolean',
          defaultValue: false,
          narrative: {
            whenTrue: 'with severe or localized abdominal pain',
          },
        },
      ],
    },
    {
      id: 'exposure-risk',
      title: 'Exposure and risk context',
      fields: [
        exposureField,
        {
          key: 'immunocompromised',
          label: 'Immunocompromised or high-risk host',
          type: 'boolean',
          defaultValue: false,
          narrative: {
            whenTrue: 'in a high-risk or immunocompromised host',
          },
        },
      ],
    },
  ],
  redFlags: [
    {
      title: 'Dehydration or inability to tolerate fluids',
      description: 'Requires assessment for oral rehydration failure, IV fluids, or observation.',
    },
    {
      title: 'Bloody diarrhea or melena',
      description: 'Raises concern for invasive infection, ischemia, or gastrointestinal bleeding.',
    },
    {
      title: 'Severe localized abdominal pain',
      description: 'Consider appendicitis, obstruction, ischemia, or other surgical pathology.',
    },
    {
      title: 'High-risk host',
      description: 'Infants, older adults, pregnancy, and immunocompromise lower the threshold for testing.',
    },
  ],
  differentials: [
    {
      title: 'Viral gastroenteritis',
      description: 'Watery diarrhea, vomiting, sick contacts, and self-limited course.',
    },
    {
      title: 'Bacterial enterocolitis',
      description: 'Fever, bloody diarrhea, severe symptoms, travel, or foodborne exposure.',
    },
    {
      title: 'Food toxin-mediated illness',
      description: 'Abrupt onset vomiting or diarrhea after shared food exposure.',
    },
    {
      title: 'C. difficile infection',
      description: 'Recent antibiotics, healthcare exposure, or recurrent watery diarrhea.',
    },
    {
      title: 'Surgical abdomen mimic',
      description: 'Localized pain, peritonitis, persistent vomiting, or worsening trajectory.',
    },
  ],
  workup: [
    {
      title: 'Hydration assessment',
      description: 'Vital signs, mucous membranes, urine output, mental status, and orthostasis when relevant.',
    },
    {
      title: 'Stool testing when indicated',
      description: 'Consider with bloody diarrhea, fever, severe illness, outbreak risk, or immunocompromise.',
    },
    {
      title: 'Electrolytes when moderate or severe',
      description: 'Use when dehydration, prolonged symptoms, older age, or significant vomiting is present.',
    },
    {
      title: 'Pregnancy test when relevant',
      description: 'Important for abdominal pain and medication selection.',
    },
    {
      title: 'Imaging if surgical concern',
      description: 'Escalate when pain is focal, severe, progressive, or exam suggests peritonitis.',
    },
  ],
  generateHpi: (answers) => {
    const duration = getTextAnswer(answers, 'duration')
    const symptoms = joinNarrativeList(getSelectedNarratives(symptomsField, answers))
    const stoolFeatures = joinNarrativeList(getSelectedNarratives(stoolFeaturesField, answers))
    const exposures = joinNarrativeList(getSelectedNarratives(exposureField, answers))
    const severity = [
      getBooleanAnswer(answers, 'poorIntake') ? 'poor oral intake' : '',
      getBooleanAnswer(answers, 'dehydrationSigns') ? 'signs of dehydration' : '',
      getBooleanAnswer(answers, 'severePain') ? 'severe or localized abdominal pain' : '',
      getBooleanAnswer(answers, 'immunocompromised') ? 'high-risk host status' : '',
    ].filter(Boolean)

    const durationClause = duration ? ` for ${duration}` : ''
    const stoolClause = stoolFeatures ? ` Stool features include ${stoolFeatures}.` : ''
    const severityClause = severity.length > 0 ? ` Severity features include ${joinNarrativeList(severity)}.` : ''
    const exposureClause = exposures ? ` Relevant exposures include ${exposures}.` : ''

    return `Patient presents with ${symptoms || 'acute gastrointestinal symptoms'}${durationClause}.${stoolClause}${severityClause}${exposureClause}`
  },
}
