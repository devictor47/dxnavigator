import {
  type BooleanField,
  type ClinicalWorkflow,
  type MultiselectField,
  type TextField,
} from '@/data/workflow'
const onsetField: TextField = {
  key: 'onset',
  label: 'Onset and duration',
  type: 'text',
  placeholder: 'Example: started 2 hours ago, intermittent for 3 days',
  required: true,
}
const locationField: TextField = {
  key: 'location',
  label: 'Location or quality',
  type: 'text',
  placeholder: 'Example: retrosternal pressure',
}
const radiationField: MultiselectField = {
  key: 'radiation',
  label: 'Radiation',
  type: 'multiselect',
  helperText: 'Select all locations described by the patient.',
  options: [
    {
      label: 'Left arm',
      value: 'left-arm',
      narrative: 'left arm',
    },
    {
      label: 'Jaw',
      value: 'jaw',
      narrative: 'jaw',
    },
    {
      label: 'Back',
      value: 'back',
      narrative: 'back',
    },
    {
      label: 'Epigastrium',
      value: 'epigastrium',
      narrative: 'epigastrium',
    },
  ],
  defaultValue: [],
}
const associatedSymptomsField: MultiselectField = {
  key: 'associatedSymptoms',
  label: 'Associated symptoms',
  type: 'multiselect',
  options: [
    {
      label: 'Dyspnea',
      value: 'dyspnea',
      narrative: 'dyspnea',
    },
    {
      label: 'Diaphoresis',
      value: 'diaphoresis',
      narrative: 'diaphoresis',
    },
    {
      label: 'Nausea',
      value: 'nausea',
      narrative: 'nausea',
    },
    {
      label: 'Palpitations',
      value: 'palpitations',
      narrative: 'palpitations',
    },
    {
      label: 'Syncope',
      value: 'syncope',
      narrative: 'syncope',
    },
  ],
  defaultValue: [],
}
const feverField: BooleanField = {
  key: 'fever',
  label: 'Fever?',
  type: 'boolean',
  defaultValue: false,
  narrative: {
    whenTrue: 'fever',
  },
}
const temperatureField: TextField = {
  key: 'temperature',
  label: 'Temperature record',
  type: 'text',
  placeholder: 'Example: 38.5 C at home',
  displayIf: {
    fieldKey: 'fever',
    equals: true,
  },
}
const exertionalField: BooleanField = {
  key: 'exertional',
  label: 'Triggered by exertion',
  type: 'boolean',
  defaultValue: false,
  narrative: {
    whenTrue: 'triggered by exertion',
  },
}
const relievedByRestField: BooleanField = {
  key: 'relievedByRest',
  label: 'Improves with rest',
  type: 'boolean',
  defaultValue: false,
  narrative: {
    whenTrue: 'relieved by rest',
  },
}
const pleuriticField: BooleanField = {
  key: 'pleuritic',
  label: 'Pleuritic component',
  type: 'boolean',
  defaultValue: false,
  narrative: {
    whenTrue: 'worse with inspiration',
  },
}
const hpiTemplate = `
    Patient presents with {% if location %}{{ location }}{% else %}chest pain{% endif %}{% if onset %} beginning {{ onset }}{% endif %}.
    {% if radiation %}Pain radiates to {{ radiation | list: locale }}.{% endif %}
    {% assign painModifiers = exertional | compact_append: relievedByRest | compact_append: pleuritic %}
    {% if painModifiers %}Pain is {{ painModifiers | list: locale }}.{% endif %}
    {% if associatedSymptoms %}Associated symptoms include {{ associatedSymptoms | list: locale }}.{% endif %}
    {% if fever %}Patient reports fever{% if temperature %} with recorded temperature {{ temperature }}{% endif %}.{% endif %}
  `
export const chestPainModule: ClinicalWorkflow = {
  id: 'chest-pain',
  language: 'en',
  title: 'Chest Pain',
  overview:
    'Capture structured history, generate the HPI in real time, and keep high-risk diagnoses visible during the initial evaluation.',
  sections: [
    {
      id: 'pain-characteristics',
      title: 'Pain characteristics',
      description:
        'Define the core chest pain story before moving into risk and associated symptoms.',
      fields: [onsetField, locationField, radiationField],
    },
    {
      id: 'triggers-relief',
      title: 'Triggers and relief',
      fields: [exertionalField, relievedByRestField, pleuriticField],
    },
    {
      id: 'associated-symptoms',
      title: 'Associated symptoms',
      fields: [associatedSymptomsField, feverField, temperatureField],
    },
  ],
  redFlags: [
    {
      title: 'Syncope or near-syncope',
      description: 'May indicate arrhythmia, pulmonary embolism, aortic dissection, or shock.',
    },
    {
      title: 'Hemodynamic instability',
      description:
        'Hypotension, altered mental status, severe hypoxia, or signs of poor perfusion.',
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
      description:
        'Abrupt severe pain, pulse deficits, neurologic symptoms, or mediastinal widening.',
    },
    {
      title: 'Pericarditis',
      description:
        'Sharp positional pain, pericardial rub, diffuse ST elevation, or recent viral illness.',
    },
    {
      title: 'Pneumothorax',
      description: 'Acute pleuritic pain with dyspnea and decreased breath sounds.',
    },
  ],
  workup: [
    {
      title: 'ECG',
      description:
        'Obtain early to identify STEMI, ischemia, arrhythmia, or pericarditis patterns.',
    },
    {
      title: 'Troponin',
      description: 'Use serial testing when ACS remains possible after the initial result.',
    },
    {
      title: 'Chest X-Ray',
      description:
        'Evaluate mediastinum, pneumothorax, pneumonia, pulmonary edema, or other causes.',
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
  hpiTemplate,
}
