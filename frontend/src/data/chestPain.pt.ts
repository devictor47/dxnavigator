import {
  type BooleanField,
  type ClinicalWorkflow,
  type MultiselectField,
  type TextField,
} from '@/data/workflow'
const onsetField: TextField = {
  key: 'onset',
  label: 'Início e duração',
  type: 'text',
  placeholder: 'Ex.: iniciou há 2 horas, intermitente há 3 dias',
  required: true,
}
const locationField: TextField = {
  key: 'location',
  label: 'Localização ou característica',
  type: 'text',
  placeholder: 'Ex.: pressão retroesternal',
}
const radiationField: MultiselectField = {
  key: 'radiation',
  label: 'Irradiação',
  type: 'multiselect',
  helperText: 'Selecione todos os locais descritos pelo paciente.',
  options: [
    {
      label: 'Braço esquerdo',
      value: 'left-arm',
      narrative: 'braço esquerdo',
    },
    {
      label: 'Mandíbula',
      value: 'jaw',
      narrative: 'mandíbula',
    },
    {
      label: 'Dorso',
      value: 'back',
      narrative: 'dorso',
    },
    {
      label: 'Epigástrio',
      value: 'epigastrium',
      narrative: 'epigástrio',
    },
  ],
  defaultValue: [],
}
const associatedSymptomsField: MultiselectField = {
  key: 'associatedSymptoms',
  label: 'Sintomas associados',
  type: 'multiselect',
  options: [
    {
      label: 'Dispneia',
      value: 'dyspnea',
      narrative: 'dispneia',
    },
    {
      label: 'Diaforese',
      value: 'diaphoresis',
      narrative: 'diaforese',
    },
    {
      label: 'Nausea',
      value: 'nausea',
      narrative: 'nausea',
    },
    {
      label: 'Palpitacoes',
      value: 'palpitations',
      narrative: 'palpitacoes',
    },
    {
      label: 'Sincope',
      value: 'syncope',
      narrative: 'sincope',
    },
  ],
  defaultValue: [],
}
const feverField: BooleanField = {
  key: 'fever',
  label: 'Febre?',
  type: 'boolean',
  defaultValue: false,
  narrative: {
    whenTrue: 'febre',
  },
}
const temperatureField: TextField = {
  key: 'temperature',
  label: 'Registro de temperatura',
  type: 'text',
  placeholder: 'Ex.: 38,5 C em casa',
  displayIf: {
    fieldKey: 'fever',
    equals: true,
  },
}
const exertionalField: BooleanField = {
  key: 'exertional',
  label: 'Desencadeada por esforco',
  type: 'boolean',
  defaultValue: false,
  narrative: {
    whenTrue: 'desencadeada por esforco',
  },
}
const relievedByRestField: BooleanField = {
  key: 'relievedByRest',
  label: 'Melhora com repouso',
  type: 'boolean',
  defaultValue: false,
  narrative: {
    whenTrue: 'aliviada por repouso',
  },
}
const pleuriticField: BooleanField = {
  key: 'pleuritic',
  label: 'Componente pleuritico',
  type: 'boolean',
  defaultValue: false,
  narrative: {
    whenTrue: 'piora com inspiracao',
  },
}
const hpiTemplate = `
    Paciente refere {% if location %}{{ location }}{% else %}dor torácica{% endif %}{% if onset %} com início {{ onset }}{% endif %}.
    {% if radiation %}Dor irradia para {{ radiation | list: locale }}.{% endif %}
    {% assign painModifiers = exertional | compact_append: relievedByRest | compact_append: pleuritic %}
    {% if painModifiers %}Dor e {{ painModifiers | list: locale }}.{% endif %}
    {% if associatedSymptoms %}Sintomas associados incluem {{ associatedSymptoms | list: locale }}.{% endif %}
    {% if fever %}Paciente refere febre{% if temperature %} com temperatura registrada de {{ temperature }}{% endif %}.{% endif %}
  `
export const chestPainModule: ClinicalWorkflow = {
  id: 'chest-pain',
  language: 'pt-BR',
  title: 'Dor toracica',
  overview:
    'Colete a historia estruturada, gere a HMA em tempo real e mantenha diagnosticos de risco visiveis durante a avaliacao inicial.',
  sections: [
    {
      id: 'pain-characteristics',
      title: 'Caracteristicas da dor',
      description:
        'Defina a historia central da dor toracica antes de avaliar risco e sintomas associados.',
      fields: [onsetField, locationField, radiationField],
    },
    {
      id: 'triggers-relief',
      title: 'Desencadeantes e alivio',
      fields: [exertionalField, relievedByRestField, pleuriticField],
    },
    {
      id: 'associated-symptoms',
      title: 'Sintomas associados',
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
