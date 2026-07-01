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
  placeholder: 'Example: 35',
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
const onsetTimingField: SelectField = {
  key: 'onsetTiming',
  label: 'Onset timing',
  type: 'select',
  required: true,
  options: [
    { label: 'Sudden, seconds to minutes', value: 'sudden', narrative: 'sudden-onset' },
    { label: 'Rapid, minutes to 1 hour', value: 'rapid', narrative: 'rapid-onset' },
    { label: 'Gradual, more than 1 hour', value: 'gradual', narrative: 'gradual-onset' },
  ],
}
const timeToPeakField: SelectField = {
  key: 'timeToPeak',
  label: 'Time to peak intensity',
  type: 'select',
  required: true,
  options: [
    {
      label: 'Less than 1 minute',
      value: 'less-than-1-minute',
      narrative: 'reaching peak intensity in less than 1 minute',
    },
    {
      label: '1 minute to 1 hour',
      value: '1-minute-to-1-hour',
      narrative: 'reaching peak intensity within 1 hour',
    },
    {
      label: 'More than 1 hour',
      value: 'more-than-1-hour',
      narrative: 'reaching peak intensity over more than 1 hour',
    },
  ],
}
const durationField: SelectField = {
  key: 'duration',
  label: 'Duration of current headache',
  type: 'select',
  required: true,
  options: [
    {
      label: 'Less than 4 hours',
      value: 'less-than-4-hours',
      narrative: 'lasting less than 4 hours',
    },
    { label: '4 to 24 hours', value: '4-to-24-hours', narrative: 'lasting 4 to 24 hours' },
    { label: '24 to 72 hours', value: '24-to-72-hours', narrative: 'lasting 24 to 72 hours' },
    {
      label: 'More than 72 hours',
      value: 'more-than-72-hours',
      narrative: 'lasting more than 72 hours',
    },
  ],
}
const locationField: SelectField = {
  key: 'location',
  label: 'Pain location',
  type: 'select',
  required: true,
  options: [
    { label: 'Unilateral', value: 'unilateral', narrative: 'unilateral headache' },
    { label: 'Bilateral', value: 'bilateral', narrative: 'bilateral headache' },
    { label: 'Occipital', value: 'occipital', narrative: 'occipital headache' },
    { label: 'Frontal', value: 'frontal', narrative: 'frontal headache' },
    { label: 'Periorbital', value: 'periorbital', narrative: 'periorbital headache' },
    { label: 'Diffuse', value: 'diffuse', narrative: 'diffuse headache' },
  ],
}
const qualityField: SelectField = {
  key: 'quality',
  label: 'Pain quality',
  type: 'select',
  required: true,
  options: [
    { label: 'Pulsating / throbbing', value: 'pulsating', narrative: 'pulsating quality' },
    { label: 'Pressure / squeezing', value: 'pressure', narrative: 'pressure-like quality' },
    { label: 'Sharp / stabbing', value: 'sharp', narrative: 'sharp quality' },
    { label: 'Burning', value: 'burning', narrative: 'burning quality' },
    { label: 'Dull / aching', value: 'dull', narrative: 'dull aching quality' },
  ],
}
const severityField: TextField = {
  key: 'severity',
  label: 'Pain severity',
  type: 'text',
  placeholder: 'Example: 7/10',
  required: true,
  narrative: { prefix: 'severity' },
}
const activityAggravationField: BooleanField = {
  key: 'activityAggravation',
  label: 'Aggravated by routine physical activity',
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: 'aggravated by routine physical activity' },
}
const nauseaVomitingField: SelectField = {
  key: 'nauseaVomiting',
  label: 'Nausea or vomiting',
  type: 'select',
  required: true,
  options: [
    { label: 'None', value: 'none', narrative: '' },
    { label: 'Nausea only', value: 'nausea', narrative: 'nausea' },
    { label: 'Vomiting', value: 'vomiting', narrative: 'vomiting' },
    { label: 'Both nausea and vomiting', value: 'both', narrative: 'nausea and vomiting' },
  ],
}
const photoPhonoField: SelectField = {
  key: 'photoPhono',
  label: 'Photophobia / phonophobia',
  type: 'select',
  required: true,
  options: [
    { label: 'Neither', value: 'neither', narrative: '' },
    { label: 'Photophobia only', value: 'photophobia', narrative: 'photophobia' },
    { label: 'Phonophobia only', value: 'phonophobia', narrative: 'phonophobia' },
    {
      label: 'Both photophobia and phonophobia',
      value: 'both',
      narrative: 'photophobia and phonophobia',
    },
  ],
}
const auraField: MultiselectField = {
  key: 'auraSymptoms',
  label: 'Aura symptoms',
  type: 'multiselect',
  options: [
    { label: 'Visual aura', value: 'visual', narrative: 'visual aura' },
    { label: 'Sensory aura', value: 'sensory', narrative: 'sensory aura' },
    { label: 'Speech disturbance', value: 'speech', narrative: 'speech disturbance' },
    { label: 'Motor weakness', value: 'motor', narrative: 'motor weakness' },
  ],
  defaultValue: [],
}
const auraDurationField: SelectField = {
  key: 'auraDuration',
  label: 'Aura duration',
  helperText: 'Typical migraine aura lasts 5 to 60 minutes.',
  type: 'select',
  options: [
    { label: 'No aura', value: 'none', narrative: '' },
    {
      label: 'Less than 5 minutes',
      value: 'less-than-5-minutes',
      narrative: 'aura lasting less than 5 minutes',
    },
    {
      label: '5 to 60 minutes',
      value: '5-to-60-minutes',
      narrative: 'aura lasting 5 to 60 minutes',
    },
    {
      label: 'More than 60 minutes',
      value: 'more-than-60-minutes',
      narrative: 'aura lasting more than 60 minutes',
    },
  ],
}
const feverField: BooleanField = {
  key: 'feverSystemicSymptoms',
  label: 'Fever or systemic symptoms',
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: 'fever or systemic symptoms' },
}
const redFlagFields: BooleanField[] = [
  feverField,
  {
    key: 'neckStiffness',
    label: 'Neck stiffness or meningismus',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'neck stiffness or meningismus' },
  },
  {
    key: 'alteredMentalStatus',
    label: 'Altered consciousness or confusion',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'altered consciousness or confusion' },
  },
  {
    key: 'papilledema',
    label: 'Papilledema',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'papilledema' },
  },
  {
    key: 'painfulEyeAutonomic',
    label: 'Painful eye with autonomic features',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'painful eye with autonomic features' },
  },
  {
    key: 'ageOver50NewHeadache',
    label: 'New headache after age 50',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'new headache after age 50' },
  },
  {
    key: 'historyOfCancer',
    label: 'History of cancer',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'history of cancer' },
  },
  {
    key: 'valsalvaPrecipitated',
    label: 'Precipitated by cough, sneeze, exercise, or Valsalva',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'precipitated by Valsalva or exertion' },
  },
  {
    key: 'pregnancyPostpartum',
    label: 'Pregnant or postpartum',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'pregnancy or postpartum status' },
  },
  {
    key: 'immunocompromised',
    label: 'Immunocompromised',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'immunocompromised status' },
  },
]
const neurologicSymptomsField: MultiselectField = {
  key: 'neurologicSymptoms',
  label: 'Neurologic symptoms',
  type: 'multiselect',
  required: true,
  options: [
    { label: 'Weakness', value: 'weakness', narrative: 'weakness' },
    { label: 'Numbness', value: 'numbness', narrative: 'numbness' },
    { label: 'Vision loss', value: 'vision-loss', narrative: 'vision loss' },
    { label: 'Diplopia', value: 'diplopia', narrative: 'diplopia' },
    { label: 'Ataxia', value: 'ataxia', narrative: 'ataxia' },
    { label: 'Seizure', value: 'seizure', narrative: 'seizure' },
  ],
  defaultValue: [],
}
const patternChangeField: SelectField = {
  key: 'patternChange',
  label: 'Headache pattern',
  type: 'select',
  required: true,
  options: [
    {
      label: 'Same as usual headache pattern',
      value: 'same-as-usual',
      narrative: 'similar to the usual headache pattern',
    },
    {
      label: 'Different from usual headaches',
      value: 'different',
      narrative: 'different from the usual headache pattern',
    },
    { label: 'First headache ever', value: 'first-ever', narrative: 'first headache episode' },
    {
      label: 'Progressive or worsening pattern',
      value: 'progressive',
      narrative: 'progressive or worsening headache pattern',
    },
  ],
}
const recentTraumaField: SelectField = {
  key: 'recentTrauma',
  label: 'Recent head trauma',
  type: 'select',
  required: true,
  options: [
    { label: 'None', value: 'none', narrative: '' },
    {
      label: 'Within 24 hours',
      value: 'within-24-hours',
      narrative: 'head trauma within 24 hours',
    },
    { label: 'Within 1 week', value: 'within-1-week', narrative: 'head trauma within 1 week' },
    { label: 'Within 1 month', value: 'within-1-month', narrative: 'head trauma within 1 month' },
  ],
}
const positionalComponentField: SelectField = {
  key: 'positionalComponent',
  label: 'Positional component',
  type: 'select',
  options: [
    { label: 'None', value: 'none', narrative: '' },
    { label: 'Worse lying down', value: 'worse-lying-down', narrative: 'worse lying down' },
    {
      label: 'Worse standing or sitting',
      value: 'worse-standing',
      narrative: 'worse standing or sitting',
    },
  ],
}
const currentMedicationsField: TextField = {
  key: 'currentMedications',
  label: 'Current headache medications and frequency',
  type: 'text',
  placeholder: 'Example: ibuprofen 600 mg, 3 days/month',
  required: true,
  narrative: { prefix: 'current medication use:' },
}
const newMedicationsField: TextField = {
  key: 'newMedications',
  label: 'New medications started recently',
  type: 'text',
  placeholder: 'Example: oral contraceptive started 2 weeks ago',
  narrative: { prefix: 'recent medication change:' },
}
const headacheFrequencyField: TextField = {
  key: 'headacheFrequency',
  label: 'Headache frequency',
  type: 'text',
  placeholder: 'Example: 4 days/month, daily for 3 months',
  required: true,
  narrative: { prefix: 'headache frequency' },
}
const acuteMedicationDaysField: TextField = {
  key: 'acuteMedicationDays',
  label: 'Acute medication days per month',
  type: 'text',
  placeholder: 'Example: triptan 8 days/month, NSAID 18 days/month',
  narrative: { prefix: 'acute medication use' },
}
const familyHistoryField: SelectField = {
  key: 'familyHistory',
  label: 'Family history of migraine',
  type: 'select',
  options: [
    { label: 'Yes', value: 'yes', narrative: 'family history of migraine' },
    { label: 'No', value: 'no', narrative: '' },
    { label: 'Unknown', value: 'unknown', narrative: 'unknown family history of migraine' },
  ],
}
const menstrualRelationshipField: SelectField = {
  key: 'menstrualRelationship',
  label: 'Menstrual relationship',
  type: 'select',
  options: [
    { label: 'Related to menses', value: 'related', narrative: 'menstrually related pattern' },
    { label: 'Not related', value: 'not-related', narrative: '' },
    { label: 'Uncertain', value: 'uncertain', narrative: 'uncertain menstrual relationship' },
    { label: 'Not applicable', value: 'not-applicable', narrative: '' },
  ],
}
const triggersField: MultiselectField = {
  key: 'triggers',
  label: 'Typical triggers',
  type: 'multiselect',
  options: [
    { label: 'Stress', value: 'stress', narrative: 'stress' },
    { label: 'Sleep deprivation', value: 'sleep-deprivation', narrative: 'sleep deprivation' },
    { label: 'Alcohol', value: 'alcohol', narrative: 'alcohol' },
    { label: 'Certain foods', value: 'foods', narrative: 'certain foods' },
    { label: 'Weather changes', value: 'weather', narrative: 'weather changes' },
    { label: 'Bright lights', value: 'bright-lights', narrative: 'bright lights' },
  ],
  defaultValue: [],
}
const hpiTemplate = `
    {% assign painFeatures = quality | compact_append: severity | compact_append: activityAggravation %}
    {% assign associated = nauseaVomiting | compact_append: photoPhono %}
    {% assign redFlags = feverSystemicSymptoms | compact_append: neckStiffness | compact_append: alteredMentalStatus | compact_append: papilledema | compact_append: painfulEyeAutonomic | compact_append: ageOver50NewHeadache | compact_append: historyOfCancer | compact_append: valsalvaPrecipitated | compact_append: pregnancyPostpartum | compact_append: immunocompromised %}
    {% assign context = positionalComponent | compact_append: recentTrauma %}
    {% assign meds = currentMedications | compact_append: newMedications | compact_append: acuteMedicationDays %}
    {% assign migraineContext = headacheFrequency | compact_append: familyHistory | compact_append: menstrualRelationship %}

    {% if sex %}{{ sex | capitalize }}{% else %}Patient{% endif %}{% if age %}, {{ age }}{% endif %}, presents
    with {% if location %}{{ location }}{% else %}headache{% endif %}{% if onsetTiming %} with {{ onsetTiming }}{% endif %}{% if timeToPeak %}, {{ timeToPeak }}{% endif %}{% if duration %}, {{ duration }}{% endif %}.
    {% if painFeatures %}Pain features include {{ painFeatures | list: locale }}.{% endif %}
    {% if associated %}Associated symptoms include {{ associated | list: locale }}.{% endif %}
    {% if auraSymptoms %}Aura symptoms include {{ auraSymptoms | list: locale }}{% if auraDuration %}, {{ auraDuration }}{% endif %}.{% endif %}
    {% if patternChange %}Pattern is {{ patternChange }}.{% endif %}
    {% if neurologicSymptoms %}Neurologic symptoms include {{ neurologicSymptoms | list: locale }}.{% endif %}
    {% if redFlags %}Red flag features include {{ redFlags | list: locale }}.{% endif %}
    {% if context %}Additional context includes {{ context | list: locale }}.{% endif %}
    {% if meds %}Medication history includes {{ meds | list: locale }}.{% endif %}
    {% if migraineContext %}Migraine history includes {{ migraineContext | list: locale }}.{% endif %}
    {% if triggers %}Reported triggers include {{ triggers | list: locale }}.{% endif %}
  `
export const migraineModule: ClinicalWorkflow = {
  id: 'migraine',
  language: 'en',
  title: 'Migraine',
  overview:
    'Evaluate headache for migraine-defining features while rapidly screening for SNNOOP10 secondary headache red flags.',
  sections: [
    {
      id: 'demographics',
      title: 'Patient context',
      fields: [ageField, sexField],
    },
    {
      id: 'core-headache-characteristics',
      title: 'Core headache characteristics',
      description:
        'Start with timing, peak intensity, duration, location, quality, severity, and activity effect.',
      fields: [
        onsetTimingField,
        timeToPeakField,
        durationField,
        locationField,
        qualityField,
        severityField,
        activityAggravationField,
      ],
    },
    {
      id: 'migraine-associated-symptoms',
      title: 'Migraine-associated symptoms',
      fields: [nauseaVomitingField, photoPhonoField, auraField, auraDurationField],
    },
    {
      id: 'secondary-headache-screen',
      title: 'Secondary headache screen',
      description: 'Screen for immediate and high-risk secondary headache features.',
      fields: [
        patternChangeField,
        recentTraumaField,
        neurologicSymptomsField,
        ...redFlagFields,
        positionalComponentField,
      ],
    },
    {
      id: 'medication-and-pattern',
      title: 'Medication and headache pattern',
      fields: [
        currentMedicationsField,
        acuteMedicationDaysField,
        newMedicationsField,
        headacheFrequencyField,
        familyHistoryField,
        menstrualRelationshipField,
        triggersField,
      ],
    },
  ],
  redFlags: [
    {
      title: 'Thunderclap or sudden maximal onset',
      description:
        'Peak intensity within seconds to minutes raises concern for subarachnoid hemorrhage, venous thrombosis, posterior fossa mass, or dissection.',
    },
    {
      title: 'Fever, meningismus, or altered mental status',
      description:
        'Consider bacterial meningitis, encephalitis, brain abscess, or subarachnoid hemorrhage.',
    },
    {
      title: 'Papilledema or focal neurologic signs',
      description:
        'May indicate elevated intracranial pressure, mass effect, stroke, venous thrombosis, or CNS infection.',
    },
    {
      title: 'New headache after age 50 or cancer history',
      description: 'Screen for giant cell arteritis, neoplasm, vascular disease, or metastasis.',
    },
    {
      title:
        'Pregnancy, postpartum, immunocompromise, trauma, positional or Valsalva-triggered headache',
      description:
        'These contexts increase concern for secondary causes such as preeclampsia, venous thrombosis, opportunistic infection, subdural hematoma, CSF pressure disorders, or posterior fossa lesions.',
    },
  ],
  differentials: [
    {
      title: 'Migraine without aura',
      description:
        'Recurrent 4-72 hour headache with at least two typical pain features and nausea/vomiting or photophobia/phonophobia.',
    },
    {
      title: 'Migraine with aura',
      description:
        'Migraine phenotype plus reversible visual, sensory, speech, or motor symptoms, typically lasting 5 to 60 minutes.',
    },
    {
      title: 'Tension-type headache',
      description:
        'Bilateral pressing or tightening pain, mild to moderate intensity, not aggravated by activity, without prominent nausea.',
    },
    {
      title: 'Cluster headache',
      description:
        'Severe unilateral periorbital pain lasting 15 to 180 minutes with ipsilateral autonomic features and restlessness.',
    },
    {
      title: 'Subarachnoid hemorrhage',
      description:
        'Thunderclap onset, worst headache, exertional trigger, syncope, confusion, meningismus, or neurologic symptoms.',
    },
    {
      title: 'Meningitis or encephalitis',
      description:
        'Fever, neck stiffness, photophobia, altered mental status, rash, or immunocompromise.',
    },
    {
      title: 'Giant cell arteritis',
      description:
        'New headache after age 50, jaw claudication, vision symptoms, temporal tenderness, or polymyalgia symptoms.',
    },
    {
      title: 'Medication overuse headache',
      description:
        'Headache at least 15 days/month with regular acute medication overuse, commonly 10 to 15 or more days/month depending on medication class.',
    },
  ],
  workup: [
    {
      title: 'No routine testing for typical migraine',
      description:
        'Migraine is a clinical diagnosis when the pattern is stable and neurologic examination is normal.',
    },
    {
      title: 'Focused neurologic and fundoscopic examination',
      description:
        'Assess mental status, cranial nerves, strength, sensation, coordination, gait, meningismus, and papilledema.',
    },
    {
      title: 'Non-contrast head CT when emergent red flags are present',
      description:
        'Use for thunderclap onset, altered consciousness, focal neurologic deficit, papilledema, acute trauma, or other emergent structural concern.',
    },
    {
      title: 'Lumbar puncture after negative CT when suspicion remains',
      description:
        'Consider for suspected subarachnoid hemorrhage or CNS infection when CT is negative but clinical concern remains.',
    },
    {
      title:
        'CTA or MRI for vascular, progressive, cancer, positional, Valsalva, or atypical aura concerns',
      description:
        'Tailor imaging to suspected dissection, venous thrombosis, posterior fossa lesion, mass, intracranial pressure disorder, or prolonged/motor aura.',
    },
    {
      title: 'ESR and CRP when giant cell arteritis is possible',
      description:
        'Use for new headache after age 50, especially with jaw claudication, vision changes, temporal tenderness, or polymyalgia symptoms.',
    },
    {
      title: 'Pregnancy testing and blood pressure assessment when relevant',
      description:
        'Pregnancy and postpartum headache require attention to preeclampsia/eclampsia and cerebral venous thrombosis.',
    },
  ],
  quickGuides: [
    {
      title: 'Typical low-risk migraine',
      description:
        'Use when migraine features are present and the secondary headache screen is reassuring.',
      criteria: [
        'Recurrent similar headache, gradual onset, duration 4 to 72 hours',
        'Unilateral or pulsating moderate-severe pain, worse with activity',
        'Nausea/vomiting or photophobia/phonophobia',
        'No SNNOOP10 red flags and normal neurologic examination',
      ],
      actions: [
        'No routine imaging is usually indicated',
        'Treat early with NSAID, acetaminophen, triptan, or combination based on severity and contraindications',
        'Review acute medication frequency and counsel on medication overuse risk',
      ],
    },
    {
      title: 'Thunderclap or neurologic emergency',
      description:
        'Use when the presentation could represent hemorrhage, stroke, meningitis, mass effect, or acute glaucoma.',
      criteria: [
        'Sudden maximal onset, altered mental status, seizure, focal deficit, papilledema, meningismus, or painful red eye',
      ],
      actions: [
        'Escalate urgently and obtain targeted emergent workup',
        'Consider CT head, CTA, lumbar puncture, antibiotics, stroke pathway, ophthalmology, neurology, or neurosurgery depending on syndrome',
      ],
    },
    {
      title: 'New or changed headache after age 50',
      description:
        'Use when age or pattern change raises concern for giant cell arteritis, malignancy, vascular disease, or mass lesion.',
      criteria: [
        'New headache after age 50, different pattern, progressive course, cancer history, jaw claudication, or visual symptoms',
      ],
      actions: [
        'Consider ESR/CRP and urgent steroid pathway if giant cell arteritis with vision symptoms is suspected',
        'Consider MRI brain or other imaging based on suspected secondary cause',
      ],
    },
    {
      title: 'Medication overuse or chronic migraine',
      description:
        'Use when headaches are frequent or acute medications are used repeatedly each month.',
      criteria: [
        'Headache at least 15 days/month, migraine features at least 8 days/month, or acute medication overuse pattern',
      ],
      actions: [
        'Counsel on limiting acute medications and consider preventive therapy or neurology follow-up',
        'Consider observation or admission if status migrainosus, dehydration, refractory symptoms, or supervised withdrawal is needed',
      ],
    },
  ],
  sourceFigures: [
    {
      title: 'SNNOOP10 mnemonic criteria for secondary headaches',
      source: 'American Family Physician, 2022',
      sourceUrl: 'https://www.aafp.org/afp/2022/0900/acute-headache-adults',
      notes:
        'Source figure reviewed locally for systemic symptoms, neurologic signs, sudden onset, older age, pattern change, positional headache, Valsalva trigger, papilledema, pregnancy, immunocompromise, cancer, and trauma red flags.',
    },
    {
      title: 'Evaluation of headache',
      source: 'American Family Physician, 2022',
      sourceUrl: 'https://www.aafp.org/afp/2022/0900/acute-headache-adults',
      notes:
        'Source figure reviewed locally for acute headache triage, red flag-based imaging, and typical primary headache management.',
    },
    {
      title: 'Diagnostic algorithm for the presentation of headache',
      source: 'Wiley Online Library',
      sourceUrl: 'https://onlinelibrary.wiley.com/doi/book/9781119539117',
      notes:
        'Source algorithm reviewed locally for headache syndrome branching and secondary headache considerations.',
    },
    {
      title: 'Key recommendations for acute migraine headache',
      source: 'American Family Physician, 2025',
      sourceUrl: 'https://www.aafp.org/afp/2025/0400/acute-migraine-headache',
      notes:
        'Source table reviewed locally for acute migraine treatment recommendations and therapies to avoid.',
    },
    {
      title: 'Freedom from pain at 2 hours in migraine trials',
      source: 'New England Journal of Medicine',
      sourceUrl: 'https://www.nejm.org/doi/full/10.1056/NEJMra1915327',
      notes: 'Source figure reviewed locally for comparative acute treatment response context.',
    },
  ],
  presets: [
    {
      id: 'typical-low-risk-migraine',
      title: 'Typical low-risk migraine',
      description: 'Classic episodic migraine without aura and no secondary headache red flags.',
      answers: {
        sex: 'female',
        onsetTiming: 'gradual',
        timeToPeak: 'more-than-1-hour',
        duration: '4-to-24-hours',
        location: 'unilateral',
        quality: 'pulsating',
        severity: '7/10',
        activityAggravation: true,
        nauseaVomiting: 'nausea',
        photoPhono: 'both',
        auraSymptoms: [],
        auraDuration: 'none',
        patternChange: 'same-as-usual',
        recentTrauma: 'none',
        neurologicSymptoms: [],
        feverSystemicSymptoms: false,
        neckStiffness: false,
        alteredMentalStatus: false,
        papilledema: false,
        painfulEyeAutonomic: false,
        ageOver50NewHeadache: false,
        historyOfCancer: false,
        valsalvaPrecipitated: false,
        pregnancyPostpartum: false,
        immunocompromised: false,
        positionalComponent: 'none',
        currentMedications: 'ibuprofen 2-3 days/month',
        acuteMedicationDays: '2-3 days/month',
        headacheFrequency: '4 days/month',
        familyHistory: 'yes',
        menstrualRelationship: 'not-related',
        triggers: ['stress', 'sleep-deprivation'],
      },
    },
    {
      id: 'migraine-with-aura',
      title: 'Migraine with typical aura',
      description:
        'Migraine phenotype with visual aura lasting within the usual 5 to 60 minute window.',
      answers: {
        sex: 'female',
        onsetTiming: 'gradual',
        timeToPeak: 'more-than-1-hour',
        duration: '4-to-24-hours',
        location: 'unilateral',
        quality: 'pulsating',
        severity: '8/10',
        activityAggravation: true,
        nauseaVomiting: 'nausea',
        photoPhono: 'both',
        auraSymptoms: ['visual'],
        auraDuration: '5-to-60-minutes',
        patternChange: 'same-as-usual',
        recentTrauma: 'none',
        neurologicSymptoms: [],
        feverSystemicSymptoms: false,
        neckStiffness: false,
        alteredMentalStatus: false,
        papilledema: false,
        painfulEyeAutonomic: false,
        ageOver50NewHeadache: false,
        historyOfCancer: false,
        valsalvaPrecipitated: false,
        pregnancyPostpartum: false,
        immunocompromised: false,
        positionalComponent: 'none',
        currentMedications: 'sumatriptan used intermittently',
        acuteMedicationDays: '4 days/month',
        headacheFrequency: '6 days/month',
        triggers: ['bright-lights', 'sleep-deprivation'],
      },
    },
    {
      id: 'high-risk-thunderclap',
      title: 'High-risk thunderclap headache',
      description:
        'Sudden maximal onset with neurologic or mental status concern requiring urgent escalation.',
      answers: {
        sex: 'female',
        onsetTiming: 'sudden',
        timeToPeak: 'less-than-1-minute',
        duration: 'less-than-4-hours',
        location: 'diffuse',
        quality: 'sharp',
        severity: '10/10',
        activityAggravation: false,
        nauseaVomiting: 'vomiting',
        photoPhono: 'photophobia',
        auraSymptoms: [],
        patternChange: 'first-ever',
        recentTrauma: 'none',
        neurologicSymptoms: ['vision-loss'],
        feverSystemicSymptoms: false,
        neckStiffness: true,
        alteredMentalStatus: true,
        papilledema: false,
        painfulEyeAutonomic: false,
        ageOver50NewHeadache: true,
        historyOfCancer: false,
        valsalvaPrecipitated: true,
        pregnancyPostpartum: false,
        immunocompromised: false,
        positionalComponent: 'none',
        currentMedications: 'no prior effective migraine medication',
        headacheFrequency: 'first severe headache of this pattern',
      },
    },
    {
      id: 'chronic-medication-overuse',
      title: 'Chronic migraine / medication overuse risk',
      description: 'Frequent headaches with high acute medication use and changed pattern.',
      answers: {
        sex: 'female',
        onsetTiming: 'gradual',
        timeToPeak: 'more-than-1-hour',
        duration: 'more-than-72-hours',
        location: 'bilateral',
        quality: 'pressure',
        severity: '6/10',
        activityAggravation: true,
        nauseaVomiting: 'nausea',
        photoPhono: 'photophobia',
        auraSymptoms: [],
        auraDuration: 'none',
        patternChange: 'progressive',
        recentTrauma: 'none',
        neurologicSymptoms: [],
        feverSystemicSymptoms: false,
        neckStiffness: false,
        alteredMentalStatus: false,
        papilledema: false,
        painfulEyeAutonomic: false,
        ageOver50NewHeadache: false,
        historyOfCancer: false,
        valsalvaPrecipitated: false,
        pregnancyPostpartum: false,
        immunocompromised: false,
        positionalComponent: 'none',
        currentMedications: 'ibuprofen most days and triptan weekly',
        acuteMedicationDays: 'NSAID 18 days/month, triptan 6 days/month',
        headacheFrequency: '20 days/month for more than 3 months',
        familyHistory: 'yes',
        triggers: ['stress'],
      },
    },
  ],
  hpiTemplate,
}
