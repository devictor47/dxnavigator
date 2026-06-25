import type {
  BooleanField,
  ClinicalWorkflow,
  MultiselectField,
  SelectField,
  TextField,
} from '@/data/workflow'
const durationField: TextField = {
  key: 'duration',
  label: 'Symptom duration',
  type: 'text',
  placeholder: 'Example: 12 hours, 3 days',
  required: true,
  narrative: { prefix: 'for' },
}
const diarrheaEpisodesField: TextField = {
  key: 'diarrheaEpisodes',
  label: 'Diarrhea episodes in the last 24 hours',
  type: 'text',
  placeholder: 'Example: 6 episodes',
  narrative: {
    prefix: 'with',
    suffix: 'diarrhea episodes in the last 24 hours',
  },
}
const stoolFeaturesField: MultiselectField = {
  key: 'stoolFeatures',
  label: 'Stool characteristics',
  helperText: 'Identify inflammatory, bleeding, or high-risk stool patterns.',
  type: 'multiselect',
  options: [
    { label: 'Watery', value: 'watery', narrative: 'watery stools' },
    { label: 'Blood in stool', value: 'blood', narrative: 'blood in stool' },
    { label: 'Mucus in stool', value: 'mucus', narrative: 'mucus in stool' },
    { label: 'Melena or black stools', value: 'melena', narrative: 'melena or black stools' },
  ],
  defaultValue: [],
}
const vomitingField: BooleanField = {
  key: 'vomiting',
  label: 'Vomiting',
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: 'vomiting' },
}
const vomitingEpisodesField: TextField = {
  key: 'vomitingEpisodes',
  label: 'Vomiting episodes in the last 24 hours',
  type: 'text',
  placeholder: 'Example: 5 episodes',
  displayIf: { fieldKey: 'vomiting', equals: true },
  narrative: {
    prefix: 'with',
    suffix: 'vomiting episodes in the last 24 hours',
  },
}
const feverField: BooleanField = {
  key: 'fever',
  label: 'Fever',
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: 'fever' },
}
const maxTemperatureField: TextField = {
  key: 'maxTemperature',
  label: 'Maximum temperature',
  type: 'text',
  placeholder: 'Example: 39 C',
  displayIf: { fieldKey: 'fever', equals: true },
  narrative: {
    prefix: 'maximum temperature',
  },
}
const feverDurationField: TextField = {
  key: 'feverDuration',
  label: 'Fever duration',
  type: 'text',
  placeholder: 'Example: 2 days, 72 hours',
  displayIf: { fieldKey: 'fever', equals: true },
  narrative: {
    prefix: 'fever duration',
  },
}
const associatedSymptomsField: MultiselectField = {
  key: 'associatedSymptoms',
  label: 'Associated symptoms',
  type: 'multiselect',
  options: [
    { label: 'Nausea', value: 'nausea', narrative: 'nausea' },
    { label: 'Crampy abdominal pain', value: 'crampy-pain', narrative: 'crampy abdominal pain' },
    { label: 'Myalgias', value: 'myalgias', narrative: 'myalgias' },
    { label: 'Malaise', value: 'malaise', narrative: 'malaise' },
    { label: 'Decreased appetite', value: 'decreased-appetite', narrative: 'decreased appetite' },
  ],
  defaultValue: [],
}
const fluidIntakeField: SelectField = {
  key: 'fluidIntake',
  label: 'Fluid intake',
  type: 'select',
  options: [
    { label: 'Normal', value: 'normal', narrative: 'normal fluid intake' },
    { label: 'Decreased', value: 'decreased', narrative: 'decreased fluid intake' },
    {
      label: 'Unable to tolerate oral fluids',
      value: 'unable',
      narrative: 'inability to tolerate oral fluids',
    },
  ],
}
const urineOutputField: SelectField = {
  key: 'urineOutput',
  label: 'Urine output',
  type: 'select',
  options: [
    { label: 'Normal', value: 'normal', narrative: 'normal urine output' },
    { label: 'Decreased', value: 'decreased', narrative: 'decreased urine output' },
    { label: 'Absent or minimal', value: 'absent', narrative: 'absent or minimal urine output' },
  ],
}
const oralToleranceField: BooleanField = {
  key: 'toleratingOralFluids',
  label: 'Tolerating oral fluids',
  type: 'boolean',
  defaultValue: false,
  narrative: {
    whenTrue: 'tolerating oral fluids',
  },
}
const dehydrationSignsField: MultiselectField = {
  key: 'dehydrationSigns',
  label: 'Dehydration signs',
  helperText: 'Clinical Dehydration Scale elements and related bedside findings.',
  type: 'multiselect',
  options: [
    { label: 'Sunken eyes', value: 'sunken-eyes', narrative: 'sunken eyes' },
    { label: 'Dry mucous membranes', value: 'dry-mucosa', narrative: 'dry mucous membranes' },
    { label: 'Decreased skin turgor', value: 'poor-turgor', narrative: 'decreased skin turgor' },
    {
      label: 'Abnormal general appearance',
      value: 'abnormal-appearance',
      narrative: 'abnormal general appearance',
    },
    {
      label: 'Postural dizziness or syncope',
      value: 'postural-symptoms',
      narrative: 'postural dizziness or syncope',
    },
  ],
  defaultValue: [],
}
const abdominalPainSeverityField: SelectField = {
  key: 'abdominalPainSeverity',
  label: 'Abdominal pain severity',
  type: 'select',
  options: [
    { label: 'None', value: 'none', narrative: 'no abdominal pain' },
    { label: 'Mild cramping', value: 'mild-cramping', narrative: 'mild cramping abdominal pain' },
    { label: 'Moderate', value: 'moderate', narrative: 'moderate abdominal pain' },
    {
      label: 'Severe or peritoneal signs',
      value: 'severe-peritoneal',
      narrative: 'severe abdominal pain or peritoneal signs',
    },
  ],
}
const exposureFields: BooleanField[] = [
  {
    key: 'recentAntibiotics',
    label: 'Recent antibiotic use',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'recent antibiotic use' },
  },
  {
    key: 'recentHospitalization',
    label: 'Recent hospitalization or nursing home exposure',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'recent hospitalization or nursing home exposure' },
  },
  {
    key: 'recentTravel',
    label: 'Recent travel',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'recent travel' },
  },
  {
    key: 'sickContactsOrOutbreak',
    label: 'Sick contacts or outbreak setting',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'sick contacts or outbreak setting' },
  },
  {
    key: 'publicHealthExposure',
    label: 'Food handler, daycare, healthcare, or nursing home exposure',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'public health exposure risk' },
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
  key: 'antibioticDetails',
  label: 'Antibiotic and timing',
  type: 'text',
  placeholder: 'Example: amoxicillin-clavulanate, finished 1 week ago',
  displayIf: { fieldKey: 'recentAntibiotics', equals: true },
  narrative: { prefix: 'antibiotic details' },
}
const travelDetailsField: TextField = {
  key: 'travelDetails',
  label: 'Travel location and timing',
  type: 'text',
  placeholder: 'Example: Mexico, returned 1 week ago',
  displayIf: { fieldKey: 'recentTravel', equals: true },
  narrative: { prefix: 'travel details' },
}
const immunocompromiseDetailsField: TextField = {
  key: 'immunocompromiseDetails',
  label: 'Type of immunocompromise',
  type: 'text',
  placeholder: 'Example: chemotherapy, transplant, steroids, HIV/AIDS',
  displayIf: { fieldKey: 'immunocompromised', equals: true },
  narrative: { prefix: 'immunocompromise details' },
}
const highRiskFields: BooleanField[] = [
  {
    key: 'alteredMentalStatus',
    label: 'Altered mental status or confusion',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'altered mental status or confusion' },
  },
  {
    key: 'shockOrSevereDehydration',
    label: 'Shock or severe dehydration',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'shock or severe dehydration' },
  },
  {
    key: 'failedOralRehydration',
    label: 'Failure of oral rehydration',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'failure of oral rehydration' },
  },
  {
    key: 'persistentVomiting',
    label: 'Persistent vomiting >=48 hours',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'persistent vomiting for 48 hours or more' },
  },
]
const hpiTemplate = `
    Patient presents with acute gastroenterocolitis symptoms{% if duration %} {{ duration }}{% endif %}.
    {% assign stoolAndFrequency = stoolFeatures | compact_append: diarrheaEpisodes %}
    {% if stoolAndFrequency %}Diarrhea pattern includes {{ stoolAndFrequency | list: locale }}.{% endif %}
    {% assign emesis = vomiting | compact_append: vomitingEpisodes %}
    {% if emesis %}Vomiting features include {{ emesis | list: locale }}.{% endif %}
    {% assign feverDetails = fever | compact_append: maxTemperature | compact_append: feverDuration %}
    {% if feverDetails %}Fever features include {{ feverDetails | list: locale }}.{% endif %}
    {% if associatedSymptoms %}Associated symptoms include {{ associatedSymptoms | list: locale }}.{% endif %}
    {% assign hydration = fluidIntake | compact_append: urineOutput | compact_append: toleratingOralFluids %}
    {% if hydration %}Hydration history includes {{ hydration | list: locale }}.{% endif %}
    {% if dehydrationSigns %}Exam/history dehydration markers include {{ dehydrationSigns | list: locale }}.{% endif %}
    {% if abdominalPainSeverity %}Abdominal pain is described as {{ abdominalPainSeverity }}.{% endif %}
    {% assign exposures = recentAntibiotics | compact_append: recentHospitalization | compact_append: recentTravel | compact_append: sickContactsOrOutbreak | compact_append: publicHealthExposure | compact_append: immunocompromised %}
    {% if exposures %}Relevant risk context includes {{ exposures | list: locale }}.{% endif %}
    {% assign details = antibioticDetails | compact_append: travelDetails | compact_append: immunocompromiseDetails %}
    {% if details %}Additional details: {{ details | list: locale }}.{% endif %}
    {% assign warningSigns = alteredMentalStatus | compact_append: shockOrSevereDehydration | compact_append: failedOralRehydration | compact_append: persistentVomiting %}
    {% if warningSigns %}Warning signs include {{ warningSigns | list: locale }}.{% endif %}
  `
export const gastroenterocolitisModule: ClinicalWorkflow = {
  id: 'gastroenterocolitis',
  language: 'en',
  title: 'Acute Gastroenterocolitis',
  overview:
    'Structure acute diarrhea and vomiting evaluation around duration, stool character, hydration, invasive features, exposures, testing indications, and disposition.',
  sections: [
    {
      id: 'initial-characterization',
      title: 'Initial characterization',
      description:
        'Start with duration, stool pattern, frequency, vomiting, and fever to determine acuity and inflammatory risk.',
      fields: [
        durationField,
        diarrheaEpisodesField,
        stoolFeaturesField,
        vomitingField,
        vomitingEpisodesField,
        feverField,
        maxTemperatureField,
        feverDurationField,
        associatedSymptomsField,
      ],
    },
    {
      id: 'hydration-and-abdomen',
      title: 'Hydration and abdominal severity',
      description:
        'Assess oral tolerance, urine output, dehydration signs, and abdominal pain severity before deciding disposition.',
      fields: [
        fluidIntakeField,
        urineOutputField,
        oralToleranceField,
        dehydrationSignsField,
        abdominalPainSeverityField,
      ],
    },
    {
      id: 'exposure-and-risk',
      title: 'Exposure and host risk',
      description:
        'Look for C. difficile risk, travel-associated illness, outbreak context, and immunocompromise.',
      fields: [
        ...exposureFields,
        antibioticDetailsField,
        travelDetailsField,
        immunocompromiseDetailsField,
      ],
    },
    {
      id: 'red-flag-screen',
      title: 'Red flag screen',
      description:
        'Positive findings here should lower the threshold for stool studies, IV hydration, observation, admission, or emergency escalation.',
      fields: highRiskFields,
    },
  ],
  redFlags: [
    {
      title: 'Shock or severe dehydration',
      description:
        'Hemodynamic instability, severe dehydration, syncope, or postural hypotension requires urgent rehydration and possible admission.',
    },
    {
      title: 'Altered mental status',
      description: 'May reflect severe dehydration, sepsis, or electrolyte abnormality.',
    },
    {
      title: 'Bloody or mucoid diarrhea',
      description:
        'Suggests inflammatory or invasive diarrhea and raises concern for STEC, Shigella, IBD, or ischemic colitis.',
    },
    {
      title: 'Persistent high fever',
      description:
        'Fever around 38.5 C or higher, especially persistent, suggests invasive bacterial disease or systemic infection.',
    },
    {
      title: 'Severe abdominal pain or peritoneal signs',
      description:
        'Consider appendicitis, ischemic colitis, perforation, obstruction, toxic megacolon, or other surgical pathology.',
    },
    {
      title: 'Immunocompromised host with diarrhea',
      description: 'Raises risk for opportunistic pathogens and severe or invasive disease.',
    },
  ],
  differentials: [
    {
      title: 'Viral gastroenteritis',
      description:
        'Watery diarrhea, vomiting, sick contacts or outbreak setting, and self-limited course.',
    },
    {
      title: 'Food toxin-mediated illness',
      description:
        'Abrupt vomiting-predominant illness after shared food exposure with rapid resolution.',
    },
    {
      title: 'Invasive bacterial diarrhea',
      description: 'Bloody or mucoid stools, fever, severe symptoms, travel, or outbreak context.',
    },
    {
      title: 'C. difficile infection',
      description:
        'Recent antibiotics, recent hospitalization, nursing home exposure, or healthcare-associated diarrhea.',
    },
    {
      title: 'Hemolytic uremic syndrome',
      description:
        'Bloody diarrhea with STEC concern, anemia, thrombocytopenia, acute kidney injury, or decreased urine output.',
    },
    {
      title: 'Surgical abdomen or ischemic colitis',
      description:
        'Severe localized pain, peritoneal signs, older age, ileus, or sudden bloody diarrhea with vascular risk.',
    },
    {
      title: 'Parasitic infection',
      description: 'Persistent symptoms beyond 7 days, travel, immunocompromise, or exposure risk.',
    },
  ],
  workup: [
    {
      title: 'Hydration assessment',
      description:
        'Assess general appearance, eyes, mucous membranes, skin turgor, urine output, vital signs, and orthostasis when relevant.',
    },
    {
      title: 'Stool PCR or culture when indicated',
      description:
        'Most useful with bloody or mucoid stool, persistent fever, severe illness, immunocompromise, outbreak concern, recent travel, antibiotics, hospitalization, or duration >7 days.',
    },
    {
      title: 'Shiga toxin or STEC testing',
      description:
        'Consider for bloody diarrhea, especially without fever, to monitor for HUS and avoid inappropriate antibiotics.',
    },
    {
      title: 'C. difficile testing',
      description:
        'Use with recent antibiotics, recent hospitalization, nursing home exposure, or healthcare-associated diarrhea.',
    },
    {
      title: 'BMP and CBC based on severity',
      description:
        'Use for moderate-to-severe dehydration, altered mental status, older age, comorbidities, suspected sepsis, HUS concern, or need for IV fluids.',
    },
    {
      title: 'Abdominal imaging when surgical concern exists',
      description:
        'Consider with severe localized pain, peritoneal signs, suspected obstruction, toxic megacolon, ischemia, or worsening trajectory.',
    },
  ],
  quickGuides: [
    {
      title: 'Mild watery diarrhea',
      description:
        'Typical outpatient pathway when hydration is reassuring and no high-risk features are present.',
      criteria: [
        'Watery diarrhea without blood or mucus',
        'No persistent high fever, severe pain, sepsis signs, or immunocompromise',
        'Tolerating oral hydration with no or mild dehydration',
      ],
      actions: [
        'Prioritize oral rehydration and symptom control',
        'No routine stool testing is usually needed',
        'Provide return precautions for dehydration, blood, fever, or worsening pain',
      ],
    },
    {
      title: 'Inflammatory or invasive diarrhea concern',
      description:
        'Use when stool features or systemic findings suggest invasive pathogens or complications.',
      criteria: [
        'Bloody or mucoid stool',
        'Persistent high fever or severe illness',
        'Severe abdominal pain or systemic toxicity',
      ],
      actions: [
        'Consider stool PCR or culture',
        'Consider Shiga toxin/STEC testing when bloody diarrhea is present',
        'Escalate if peritoneal signs, sepsis, or severe dehydration are present',
      ],
    },
    {
      title: 'C. difficile testing pathway',
      description: 'Use when diarrhea occurs after antibiotic or healthcare exposure.',
      criteria: [
        'Recent antibiotic use',
        'Recent hospitalization or nursing home exposure',
        'Healthcare-associated diarrhea',
      ],
      actions: [
        'Consider C. difficile testing',
        'Assess severity, renal function, leukocytosis, and hydration status',
      ],
    },
    {
      title: 'Observation or admission concern',
      description:
        'Use when dehydration, vomiting, host risk, or systemic illness makes outpatient care unsafe.',
      criteria: [
        'Moderate-to-severe dehydration or failed oral rehydration',
        'Persistent vomiting preventing oral intake',
        'Altered mental status, AKI/electrolyte concern, immunocompromise, or suspected HUS',
      ],
      actions: [
        'Consider IV hydration, labs, reassessment, observation, or admission',
        'Escalate urgently for shock, sepsis, toxic megacolon, perforation, or surgical abdomen',
      ],
    },
  ],
  sourceFigures: [
    {
      title: 'Evaluation and management of acute diarrhea',
      source: 'American Family Physician, 2022',
      sourceUrl: 'https://www.aafp.org/afp/2022/0700/acute-diarrhea',
      citation:
        'Meisenheimer ES, Epstein C, Thiel D. Acute Diarrhea in Adults. American Family Physician. 2022;106(1):72-80.',
      notes:
        'Source figure reviewed locally for dehydration-first management, testing triggers, travel pathway, outbreak risk, and STEC caution.',
    },
    {
      title: 'Diagnostic approach to acute diarrhea',
      source: "Yamada's Textbook of Gastroenterology, 7th edition, 2022",
      sourceUrl: 'https://onlinelibrary.wiley.com/doi/10.1002/9781119600206.ch34',
      citation:
        "Hecht GA, Trieu JA. Approach to the patient with diarrhea. Yamada's Textbook of Gastroenterology. 7th ed. 2022.",
      notes:
        'Source algorithm reviewed locally for watery versus bloody diarrhea branching, C. difficile risk, persistent diarrhea, and immunocompromised pathways.',
    },
  ],
  presets: [
    {
      id: 'mild-watery-diarrhea',
      title: 'Mild watery diarrhea',
      description: 'Reassuring outpatient pattern with oral tolerance and no high-risk features.',
      answers: {
        stoolFeatures: ['watery'],
        vomiting: false,
        fever: false,
        fluidIntake: 'normal',
        urineOutput: 'normal',
        toleratingOralFluids: true,
        dehydrationSigns: [],
        abdominalPainSeverity: 'mild-cramping',
        recentAntibiotics: false,
        recentHospitalization: false,
        recentTravel: false,
        sickContactsOrOutbreak: false,
        publicHealthExposure: false,
        immunocompromised: false,
        alteredMentalStatus: false,
        shockOrSevereDehydration: false,
        failedOralRehydration: false,
        persistentVomiting: false,
      },
    },
    {
      id: 'inflammatory-diarrhea',
      title: 'Inflammatory diarrhea concern',
      description: 'Bloody or mucoid stool with fever or severe abdominal pain.',
      answers: {
        stoolFeatures: ['blood', 'mucus'],
        vomiting: false,
        fever: true,
        associatedSymptoms: ['crampy-pain', 'malaise'],
        fluidIntake: 'decreased',
        urineOutput: 'decreased',
        toleratingOralFluids: false,
        abdominalPainSeverity: 'severe-peritoneal',
        alteredMentalStatus: false,
        shockOrSevereDehydration: false,
        failedOralRehydration: false,
        persistentVomiting: false,
      },
    },
    {
      id: 'dehydration-ort-failure',
      title: 'Dehydration or ORT failure',
      description: 'Vomiting, poor intake, decreased urine output, or dehydration signs.',
      answers: {
        vomiting: true,
        fluidIntake: 'unable',
        urineOutput: 'decreased',
        toleratingOralFluids: false,
        dehydrationSigns: ['dry-mucosa', 'sunken-eyes', 'postural-symptoms'],
        abdominalPainSeverity: 'mild-cramping',
        failedOralRehydration: true,
        persistentVomiting: true,
        shockOrSevereDehydration: false,
        alteredMentalStatus: false,
      },
    },
    {
      id: 'c-difficile-risk',
      title: 'C. difficile risk',
      description: 'Diarrhea after antibiotics, hospitalization, or nursing home exposure.',
      answers: {
        stoolFeatures: ['watery'],
        recentAntibiotics: true,
        recentHospitalization: true,
        fever: false,
        fluidIntake: 'decreased',
        urineOutput: 'normal',
        immunocompromised: false,
        alteredMentalStatus: false,
        shockOrSevereDehydration: false,
      },
    },
  ],
  hpiTemplate,
}
