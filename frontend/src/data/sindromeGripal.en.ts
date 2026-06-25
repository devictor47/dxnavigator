import type { BooleanField, ClinicalWorkflow, MultiselectField, TextField } from '@/data/workflow'
const durationField: TextField = {
  key: 'duration',
  label: 'Symptom duration',
  type: 'text',
  placeholder: 'Example: 2 days, since yesterday, 10 days',
  required: true,
}
const onsetPatternField: MultiselectField = {
  key: 'onsetPattern',
  label: 'Onset and progression',
  type: 'multiselect',
  options: [
    {
      label: 'Sudden onset',
      value: 'sudden-onset',
      narrative: 'sudden onset',
    },
    {
      label: 'Gradual onset',
      value: 'gradual-onset',
      narrative: 'gradual onset',
    },
    {
      label: 'Worsening after initial improvement',
      value: 'double-sickening',
      narrative: 'worsening after initial improvement',
    },
    {
      label: 'Persistent symptoms beyond one week',
      value: 'persistent-symptoms',
      narrative: 'persistent symptoms beyond one week',
    },
  ],
  defaultValue: [],
}
const feverField: BooleanField = {
  key: 'fever',
  label: 'Fever',
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: 'fever' },
}
const measuredTemperatureField: TextField = {
  key: 'measuredTemperature',
  label: 'Measured temperature',
  type: 'text',
  placeholder: 'Example: 38.5 C at home',
  displayIf: {
    fieldKey: 'fever',
    equals: true,
  },
}
const respiratorySymptomFields: BooleanField[] = [
  {
    key: 'dryCough',
    label: 'Dry cough',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'dry cough' },
  },
  {
    key: 'productiveCough',
    label: 'Productive cough',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'productive cough' },
  },
  {
    key: 'nasalCongestion',
    label: 'Nasal congestion',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'nasal congestion' },
  },
  {
    key: 'rhinorrhea',
    label: 'Runny nose',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'rhinorrhea' },
  },
  {
    key: 'soreThroat',
    label: 'Sore throat',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'sore throat' },
  },
  {
    key: 'dyspnea',
    label: 'Shortness of breath',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'shortness of breath' },
  },
  {
    key: 'earAche',
    label: 'Ear ache',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'ear ache' },
  },
]
const systemicSymptomFields: BooleanField[] = [
  {
    key: 'myalgia',
    label: 'Myalgia',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'myalgia' },
  },
  {
    key: 'headache',
    label: 'Headache',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'headache' },
  },
  {
    key: 'fatigue',
    label: 'Fatigue',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'fatigue' },
  },
  {
    key: 'chills',
    label: 'Chills',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'chills' },
  },
]
const giSymptomFields: BooleanField[] = [
  {
    key: 'nauseaVomiting',
    label: 'Nausea or vomiting',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'nausea or vomiting' },
  },
  {
    key: 'diarrhea',
    label: 'Diarrhea',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'diarrhea' },
  },
  {
    key: 'abdominalPain',
    label: 'Abdominal pain',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'abdominal pain' },
  },
]
const redFlagFields: BooleanField[] = [
  {
    key: 'hypoxemiaOrRespiratoryDistress',
    label: 'Hypoxemia or respiratory distress',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'hypoxemia or respiratory distress' },
  },
  {
    key: 'chestPain',
    label: 'Chest pain',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'chest pain' },
  },
  {
    key: 'alteredMentalStatus',
    label: 'Altered mental status',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'altered mental status' },
  },
  {
    key: 'severeHeadachePersistentFever',
    label: 'Severe headache with persistent fever',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'severe headache with persistent fever' },
  },
  {
    key: 'dehydration',
    label: 'Dehydration or decreased urine output',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'dehydration or decreased urine output' },
  },
  {
    key: 'hemoptysis',
    label: 'Hemoptysis',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'hemoptysis' },
  },
]
const riskFactorField: MultiselectField = {
  key: 'riskFactors',
  label: 'Risk factors for complications',
  type: 'multiselect',
  options: [
    { label: 'Age 65 years or older', value: 'older-adult', narrative: 'age 65 years or older' },
    { label: 'Pregnancy', value: 'pregnancy', narrative: 'pregnancy' },
    {
      label: 'Chronic pulmonary disease',
      value: 'pulmonary-disease',
      narrative: 'chronic pulmonary disease',
    },
    {
      label: 'Chronic cardiac disease',
      value: 'cardiac-disease',
      narrative: 'chronic cardiac disease',
    },
    { label: 'Diabetes', value: 'diabetes', narrative: 'diabetes' },
    { label: 'Immunosuppression', value: 'immunosuppression', narrative: 'immunosuppression' },
    {
      label: 'Neurologic disorder',
      value: 'neurologic-disorder',
      narrative: 'neurologic disorder',
    },
  ],
  defaultValue: [],
}
const rhinosinusitisFeatureFields: BooleanField[] = [
  {
    key: 'facialPain',
    label: 'Facial pain or sinus pressure',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'facial pain or sinus pressure' },
  },
  {
    key: 'purulentNasalDischarge',
    label: 'Purulent nasal discharge',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'purulent nasal discharge' },
  },
  {
    key: 'periorbitalSwellingOrDiplopia',
    label: 'Periorbital swelling or diplopia',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'periorbital swelling or diplopia' },
  },
]
const hpiTemplate = `
    Patient presents with influenza-like/upper respiratory symptoms{% if duration %} for {{ duration }}{% endif %}.
    {% assign respiratorySymptoms = fever | compact_append: dryCough | compact_append: productiveCough | compact_append: nasalCongestion | compact_append: rhinorrhea | compact_append: soreThroat | compact_append: dyspnea | compact_append: earAche %}
    {% if respiratorySymptoms %}Reported symptoms include {{ respiratorySymptoms | list: locale }}.{% endif %}
    {% assign systemicSymptoms = myalgia | compact_append: headache | compact_append: fatigue | compact_append: chills %}
    {% if systemicSymptoms %}Systemic symptoms include {{ systemicSymptoms | list: locale }}.{% endif %}
    {% assign giSymptoms = nauseaVomiting | compact_append: diarrhea | compact_append: abdominalPain %}
    {% if giSymptoms %}Gastrointestinal symptoms include {{ giSymptoms | list: locale }}.{% endif %}
    {% if onsetPattern %}Illness pattern includes {{ onsetPattern | list: locale }}.{% endif %}
    {% if measuredTemperature %}Measured temperature reported as {{ measuredTemperature }}.{% endif %}
    {% if riskFactors %}Risk factors for complications include {{ riskFactors | list: locale }}.{% endif %}
    {% assign warningSigns = hypoxemiaOrRespiratoryDistress | compact_append: chestPain | compact_append: alteredMentalStatus | compact_append: severeHeadachePersistentFever | compact_append: dehydration | compact_append: hemoptysis %}
    {% if warningSigns %}Warning signs reported: {{ warningSigns | list: locale }}.{% endif %}
    {% assign sinusFeatures = facialPain | compact_append: purulentNasalDischarge | compact_append: periorbitalSwellingOrDiplopia %}
    {% if sinusFeatures %}Rhinosinusitis-related features include {{ sinusFeatures | list: locale }}.{% endif %}
  `
export const sindromeGripalModule: ClinicalWorkflow = {
  id: 'sindrome-gripal',
  language: 'en',
  title: 'Influenza-like illness / URI',
  overview:
    'Structure the initial evaluation of influenza-like illness and upper respiratory symptoms, including warning signs, risk context, and rhinosinusitis clues.',
  sections: [
    {
      id: 'illness-course',
      title: 'Illness course',
      description:
        'Clarify duration, onset, and progression before deciding whether this is likely uncomplicated viral illness or a complication pattern.',
      fields: [durationField, onsetPatternField],
    },
    {
      id: 'respiratory-symptoms',
      title: 'Respiratory symptoms',
      fields: [feverField, measuredTemperatureField, ...respiratorySymptomFields],
    },
    {
      id: 'systemic-and-gi-symptoms',
      title: 'Systemic and GI symptoms',
      fields: [...systemicSymptomFields, ...giSymptomFields],
    },
    {
      id: 'risk-context',
      title: 'Risk context',
      fields: [riskFactorField],
    },
    {
      id: 'red-flag-screen',
      title: 'Red flag screen',
      description:
        'Positive findings here should lower the threshold for urgent evaluation or broader workup.',
      fields: redFlagFields,
    },
    {
      id: 'rhinosinusitis-clues',
      title: 'Rhinosinusitis clues',
      description:
        'Use when nasal symptoms raise concern for acute bacterial rhinosinusitis or orbital complication.',
      fields: rhinosinusitisFeatureFields,
    },
  ],
  redFlags: [
    {
      title: 'Respiratory distress or hypoxemia',
      description:
        'Dyspnea, tachypnea, low oxygen saturation, cyanosis, or increased work of breathing require escalation.',
    },
    {
      title: 'Neurologic warning signs',
      description:
        'Altered mental status, seizures, focal deficits, ataxia, or severe headache with persistent fever suggest serious complications.',
    },
    {
      title: 'Chest pain or cardiac symptoms',
      description:
        'Consider myocarditis, pericarditis, ischemia, pneumonia, or other complications when chest pain or palpitations occur.',
    },
    {
      title: 'Dehydration or inability to tolerate oral intake',
      description:
        'Persistent vomiting, poor intake, decreased urine output, or signs of poor perfusion require closer assessment.',
    },
    {
      title: 'Orbital complication concern',
      description:
        'Periorbital swelling, diplopia, painful eye movements, or visual symptoms warrant urgent evaluation.',
    },
  ],
  differentials: [
    {
      title: 'Uncomplicated viral URI',
      description:
        'Common cold or viral upper respiratory infection with normal vital signs and no red flags.',
    },
    {
      title: 'Influenza',
      description:
        'Fever, myalgia, headache, chills, abrupt onset, exposure history, seasonality, or outbreak context.',
    },
    {
      title: 'COVID-19 or other respiratory virus',
      description:
        'Consider based on local circulation, exposure, vaccination status, and testing availability.',
    },
    {
      title: 'Community-acquired pneumonia',
      description:
        'Cough with fever, dyspnea, abnormal lung exam, hypoxemia, pleuritic pain, or systemic illness.',
    },
    {
      title: 'Acute bacterial rhinosinusitis',
      description:
        'Persistent symptoms, double-sickening, or severe fever with purulent discharge and facial pain.',
    },
    {
      title: 'Streptococcal pharyngitis',
      description:
        'Sore throat with fever, tonsillar exudate, tender anterior cervical nodes, and absence of cough.',
    },
    {
      title: 'Asthma or COPD exacerbation',
      description:
        'Wheezing, dyspnea, increased rescue inhaler use, or known obstructive lung disease.',
    },
  ],
  workup: [
    {
      title: 'No routine testing when uncomplicated',
      description:
        'For normal vital signs, reassuring exam, and no red flags, diagnosis is usually clinical with symptomatic care.',
    },
    {
      title: 'Targeted viral testing when it changes management',
      description:
        'Consider influenza/COVID testing for high-risk patients, severe illness, outbreaks, infection control, or treatment decisions.',
    },
    {
      title: 'Chest X-ray if pneumonia is suspected',
      description:
        'Use when dyspnea, hypoxemia, focal lung findings, pleuritic pain, or systemic illness raises concern.',
    },
    {
      title: 'Labs based on severity',
      description:
        'CBC, metabolic panel, CK, cultures, or other tests may be appropriate for sepsis concern, dehydration, myositis, or severe disease.',
    },
    {
      title: 'Rhinosinusitis complication evaluation',
      description:
        'Urgent evaluation is appropriate for orbital signs, severe toxicity, neurologic findings, or failure to improve as expected.',
    },
  ],
  quickGuides: [
    {
      title: 'Uncomplicated viral URI',
      description:
        'Use when symptoms and exam fit a self-limited upper respiratory infection without warning signs.',
      criteria: [
        'Normal vital signs and reassuring respiratory exam',
        'No dyspnea, hypoxemia, chest pain, neurologic signs, or dehydration',
        'Symptoms within expected viral timeframe',
      ],
      actions: [
        'No routine testing is usually needed',
        'Provide symptomatic care and return precautions',
        'Avoid antibiotics when bacterial complication is not suspected',
      ],
    },
    {
      title: 'Influenza-like illness',
      description:
        'Use when abrupt systemic symptoms, fever, myalgia, seasonality, or exposure raise influenza concern.',
      criteria: [
        'Fever or chills with cough, sore throat, myalgia, headache, or fatigue',
        'High-risk patient, severe illness, outbreak, or result would change management',
      ],
      actions: [
        'Consider targeted influenza/COVID testing when results affect management',
        'Escalate evaluation if warning signs are present',
      ],
    },
    {
      title: 'Acute bacterial rhinosinusitis concern',
      description:
        'Use when nasal/sinus symptoms follow a complication pattern rather than an uncomplicated viral course.',
      criteria: [
        'Symptoms persist beyond one week without improvement',
        'Worsening after initial improvement',
        'Severe fever with purulent nasal discharge or facial pain for several days',
      ],
      actions: [
        'Consider bacterial rhinosinusitis pathway and follow-up plan',
        'Urgent evaluation if periorbital swelling, diplopia, or visual symptoms occur',
      ],
    },
  ],
  sourceFigures: [
    {
      title: 'Acute rhinosinusitis evaluation and treatment flowchart',
      source: 'American Family Physician, 2025',
      sourceUrl: 'https://www.aafp.org/afp/2025/0100/acute-rhinosinusitis',
      citation:
        'Butler FM, Hernandez DR. Acute Rhinosinusitis: Rapid Evidence Review. American Family Physician. 2025;111(1):47-53.',
      notes:
        'Source figure reviewed locally for criteria around monitoring, double-sickening, persistent symptoms, severe symptoms, and orbital warning signs. Image is not bundled in the public app.',
    },
  ],
  presets: [
    {
      id: 'uncomplicated-uri',
      title: 'Uncomplicated URI',
      description: 'Common viral upper respiratory presentation without warning signs.',
      answers: {
        fever: false,
        dryCough: false,
        productiveCough: false,
        nasalCongestion: true,
        rhinorrhea: true,
        soreThroat: true,
        dyspnea: false,
        earAche: false,
        myalgia: false,
        headache: false,
        fatigue: false,
        chills: false,
        nauseaVomiting: false,
        diarrhea: false,
        abdominalPain: false,
        riskFactors: [],
        hypoxemiaOrRespiratoryDistress: false,
        chestPain: false,
        alteredMentalStatus: false,
        severeHeadachePersistentFever: false,
        dehydration: false,
        hemoptysis: false,
        facialPain: false,
        purulentNasalDischarge: false,
        periorbitalSwellingOrDiplopia: false,
      },
    },
    {
      id: 'influenza-like-illness',
      title: 'Influenza-like illness',
      description: 'Abrupt systemic symptoms with fever and cough, without severe warning signs.',
      answers: {
        onsetPattern: ['sudden-onset'],
        fever: true,
        dryCough: true,
        productiveCough: false,
        nasalCongestion: false,
        rhinorrhea: false,
        soreThroat: true,
        dyspnea: false,
        earAche: false,
        myalgia: true,
        headache: true,
        fatigue: true,
        chills: true,
        nauseaVomiting: false,
        diarrhea: false,
        abdominalPain: false,
        hypoxemiaOrRespiratoryDistress: false,
        chestPain: false,
        alteredMentalStatus: false,
        severeHeadachePersistentFever: false,
        dehydration: false,
        hemoptysis: false,
      },
    },
    {
      id: 'rhinosinusitis-concern',
      title: 'Rhinosinusitis concern',
      description: 'Persistent or worsening nasal symptoms with sinus features.',
      answers: {
        onsetPattern: ['double-sickening', 'persistent-symptoms'],
        fever: true,
        dryCough: false,
        productiveCough: false,
        nasalCongestion: true,
        rhinorrhea: true,
        soreThroat: false,
        dyspnea: false,
        earAche: false,
        myalgia: false,
        headache: true,
        fatigue: false,
        chills: false,
        nauseaVomiting: false,
        diarrhea: false,
        abdominalPain: false,
        hypoxemiaOrRespiratoryDistress: false,
        chestPain: false,
        alteredMentalStatus: false,
        severeHeadachePersistentFever: false,
        dehydration: false,
        hemoptysis: false,
        facialPain: true,
        purulentNasalDischarge: true,
        periorbitalSwellingOrDiplopia: false,
      },
    },
  ],
  hpiTemplate,
}
