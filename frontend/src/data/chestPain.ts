import {
  type BooleanField,
  type ClinicalWorkflow,
  type MultiselectField,
  type TextField,
} from '@/data/workflow'

const onsetField: TextField = {
  key: 'onset',
  label: {
    en: 'Onset and duration',
    'pt-BR': 'Inicio e duracao',
  },
  type: 'text',
  placeholder: {
    en: 'Example: started 2 hours ago, intermittent for 3 days',
    'pt-BR': 'Ex.: iniciou ha 2 horas, intermitente ha 3 dias',
  },
  required: true,
}

const locationField: TextField = {
  key: 'location',
  label: {
    en: 'Location or quality',
    'pt-BR': 'Localizacao ou caracteristica',
  },
  type: 'text',
  placeholder: {
    en: 'Example: retrosternal pressure',
    'pt-BR': 'Ex.: pressao retroesternal',
  },
}

const radiationField: MultiselectField = {
  key: 'radiation',
  label: {
    en: 'Radiation',
    'pt-BR': 'Irradiacao',
  },
  type: 'multiselect',
  helperText: {
    en: 'Select all locations described by the patient.',
    'pt-BR': 'Selecione todos os locais descritos pelo paciente.',
  },
  options: [
    {
      label: { en: 'Left arm', 'pt-BR': 'Braco esquerdo' },
      value: 'left-arm',
      narrative: { en: 'left arm', 'pt-BR': 'braco esquerdo' },
    },
    {
      label: { en: 'Jaw', 'pt-BR': 'Mandibula' },
      value: 'jaw',
      narrative: { en: 'jaw', 'pt-BR': 'mandibula' },
    },
    {
      label: { en: 'Back', 'pt-BR': 'Dorso' },
      value: 'back',
      narrative: { en: 'back', 'pt-BR': 'dorso' },
    },
    {
      label: { en: 'Epigastrium', 'pt-BR': 'Epigastrio' },
      value: 'epigastrium',
      narrative: { en: 'epigastrium', 'pt-BR': 'epigastrio' },
    },
  ],
  defaultValue: [],
}

const associatedSymptomsField: MultiselectField = {
  key: 'associatedSymptoms',
  label: {
    en: 'Associated symptoms',
    'pt-BR': 'Sintomas associados',
  },
  type: 'multiselect',
  options: [
    {
      label: { en: 'Dyspnea', 'pt-BR': 'Dispneia' },
      value: 'dyspnea',
      narrative: { en: 'dyspnea', 'pt-BR': 'dispneia' },
    },
    {
      label: { en: 'Diaphoresis', 'pt-BR': 'Diaforese' },
      value: 'diaphoresis',
      narrative: { en: 'diaphoresis', 'pt-BR': 'diaforese' },
    },
    {
      label: { en: 'Nausea', 'pt-BR': 'Nausea' },
      value: 'nausea',
      narrative: { en: 'nausea', 'pt-BR': 'nausea' },
    },
    {
      label: { en: 'Palpitations', 'pt-BR': 'Palpitacoes' },
      value: 'palpitations',
      narrative: { en: 'palpitations', 'pt-BR': 'palpitacoes' },
    },
    {
      label: { en: 'Syncope', 'pt-BR': 'Sincope' },
      value: 'syncope',
      narrative: { en: 'syncope', 'pt-BR': 'sincope' },
    },
  ],
  defaultValue: [],
}

const feverField: BooleanField = {
  key: 'fever',
  label: {
    en: 'Fever?',
    'pt-BR': 'Febre?',
  },
  type: 'boolean',
  defaultValue: false,
  narrative: {
    whenTrue: {
      en: 'fever',
      'pt-BR': 'febre',
    },
  },
}

const temperatureField: TextField = {
  key: 'temperature',
  label: {
    en: 'Temperature record',
    'pt-BR': 'Registro de temperatura',
  },
  type: 'text',
  placeholder: {
    en: 'Example: 38.5 C at home',
    'pt-BR': 'Ex.: 38,5 C em casa',
  },
  displayIf: {
    fieldKey: 'fever',
    equals: true,
  },
}

const exertionalField: BooleanField = {
  key: 'exertional',
  label: {
    en: 'Triggered by exertion',
    'pt-BR': 'Desencadeada por esforco',
  },
  type: 'boolean',
  defaultValue: false,
  narrative: {
    whenTrue: {
      en: 'triggered by exertion',
      'pt-BR': 'desencadeada por esforco',
    },
  },
}

const relievedByRestField: BooleanField = {
  key: 'relievedByRest',
  label: {
    en: 'Improves with rest',
    'pt-BR': 'Melhora com repouso',
  },
  type: 'boolean',
  defaultValue: false,
  narrative: {
    whenTrue: {
      en: 'relieved by rest',
      'pt-BR': 'aliviada por repouso',
    },
  },
}

const pleuriticField: BooleanField = {
  key: 'pleuritic',
  label: {
    en: 'Pleuritic component',
    'pt-BR': 'Componente pleuritico',
  },
  type: 'boolean',
  defaultValue: false,
  narrative: {
    whenTrue: {
      en: 'worse with inspiration',
      'pt-BR': 'piora com inspiracao',
    },
  },
}

const hpiTemplate = {
  en: `
    Patient presents with {% if location %}{{ location }}{% else %}chest pain{% endif %}{% if onset %} beginning {{ onset }}{% endif %}.
    {% if radiation %}Pain radiates to {{ radiation | list }}.{% endif %}
    {% assign painModifiers = exertional | compact_append: relievedByRest | compact_append: pleuritic %}
    {% if painModifiers %}Pain is {{ painModifiers | list }}.{% endif %}
    {% if associatedSymptoms %}Associated symptoms include {{ associatedSymptoms | list }}.{% endif %}
    {% if fever %}Patient reports fever{% if temperature %} with recorded temperature {{ temperature }}{% endif %}.{% endif %}
  `,
  'pt-BR': `
    Paciente refere {% if location %}{{ location }}{% else %}dor toracica{% endif %}{% if onset %} com inicio {{ onset }}{% endif %}.
    {% if radiation %}Dor irradia para {{ radiation | list }}.{% endif %}
    {% assign painModifiers = exertional | compact_append: relievedByRest | compact_append: pleuritic %}
    {% if painModifiers %}Dor e {{ painModifiers | list }}.{% endif %}
    {% if associatedSymptoms %}Sintomas associados incluem {{ associatedSymptoms | list }}.{% endif %}
    {% if fever %}Paciente refere febre{% if temperature %} com temperatura registrada de {{ temperature }}{% endif %}.{% endif %}
  `,
}

export const chestPainModule: ClinicalWorkflow = {
  id: 'chest-pain',
  title: {
    en: 'Chest Pain',
    'pt-BR': 'Dor toracica',
  },
  overview: {
    en: 'Capture structured history, generate the HPI in real time, and keep high-risk diagnoses visible during the initial evaluation.',
    'pt-BR': 'Colete a historia estruturada, gere a HMA em tempo real e mantenha diagnosticos de risco visiveis durante a avaliacao inicial.',
  },
  sections: [
    {
      id: 'pain-characteristics',
      title: {
        en: 'Pain characteristics',
        'pt-BR': 'Caracteristicas da dor',
      },
      description: {
        en: 'Define the core chest pain story before moving into risk and associated symptoms.',
        'pt-BR': 'Defina a historia central da dor toracica antes de avaliar risco e sintomas associados.',
      },
      fields: [onsetField, locationField, radiationField],
    },
    {
      id: 'triggers-relief',
      title: {
        en: 'Triggers and relief',
        'pt-BR': 'Desencadeantes e alivio',
      },
      fields: [exertionalField, relievedByRestField, pleuriticField],
    },
    {
      id: 'associated-symptoms',
      title: {
        en: 'Associated symptoms',
        'pt-BR': 'Sintomas associados',
      },
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
  hpiTemplate,
}
