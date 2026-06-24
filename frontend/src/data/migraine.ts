import type {
  BooleanField,
  ClinicalWorkflow,
  MultiselectField,
  SelectField,
  TextField,
} from '@/data/workflow'

const ageField: TextField = {
  key: 'age',
  label: { en: 'Age', 'pt-BR': 'Idade' },
  type: 'text',
  placeholder: { en: 'Example: 35 years', 'pt-BR': 'Ex.: 35 anos' },
  narrative: { suffix: { en: 'old', 'pt-BR': 'de idade' } },
}

const sexField: SelectField = {
  key: 'sex',
  label: { en: 'Sex', 'pt-BR': 'Sexo' },
  type: 'select',
  options: [
    { label: { en: 'Female', 'pt-BR': 'Feminino' }, value: 'female', narrative: { en: 'female patient', 'pt-BR': 'paciente do sexo feminino' } },
    { label: { en: 'Male', 'pt-BR': 'Masculino' }, value: 'male', narrative: { en: 'male patient', 'pt-BR': 'paciente do sexo masculino' } },
    { label: { en: 'Other / not specified', 'pt-BR': 'Outro / nao especificado' }, value: 'other', narrative: { en: 'patient', 'pt-BR': 'paciente' } },
  ],
}

const onsetTimingField: SelectField = {
  key: 'onsetTiming',
  label: { en: 'Onset timing', 'pt-BR': 'Inicio da dor' },
  type: 'select',
  required: true,
  options: [
    { label: { en: 'Sudden, seconds to minutes', 'pt-BR': 'Subito, segundos a minutos' }, value: 'sudden', narrative: { en: 'sudden-onset', 'pt-BR': 'inicio subito' } },
    { label: { en: 'Rapid, minutes to 1 hour', 'pt-BR': 'Rapido, minutos ate 1 hora' }, value: 'rapid', narrative: { en: 'rapid-onset', 'pt-BR': 'inicio rapido' } },
    { label: { en: 'Gradual, more than 1 hour', 'pt-BR': 'Gradual, mais de 1 hora' }, value: 'gradual', narrative: { en: 'gradual-onset', 'pt-BR': 'inicio gradual' } },
  ],
}

const timeToPeakField: SelectField = {
  key: 'timeToPeak',
  label: { en: 'Time to peak intensity', 'pt-BR': 'Tempo ate pico de intensidade' },
  type: 'select',
  required: true,
  options: [
    { label: { en: 'Less than 1 minute', 'pt-BR': 'Menos de 1 minuto' }, value: 'less-than-1-minute', narrative: { en: 'reaching peak intensity in less than 1 minute', 'pt-BR': 'atingindo pico em menos de 1 minuto' } },
    { label: { en: '1 minute to 1 hour', 'pt-BR': '1 minuto a 1 hora' }, value: '1-minute-to-1-hour', narrative: { en: 'reaching peak intensity within 1 hour', 'pt-BR': 'atingindo pico em ate 1 hora' } },
    { label: { en: 'More than 1 hour', 'pt-BR': 'Mais de 1 hora' }, value: 'more-than-1-hour', narrative: { en: 'reaching peak intensity over more than 1 hour', 'pt-BR': 'atingindo pico em mais de 1 hora' } },
  ],
}

const durationField: SelectField = {
  key: 'duration',
  label: { en: 'Duration of current headache', 'pt-BR': 'Duracao da cefaleia atual' },
  type: 'select',
  required: true,
  options: [
    { label: { en: 'Less than 4 hours', 'pt-BR': 'Menos de 4 horas' }, value: 'less-than-4-hours', narrative: { en: 'lasting less than 4 hours', 'pt-BR': 'com duracao menor que 4 horas' } },
    { label: { en: '4 to 24 hours', 'pt-BR': '4 a 24 horas' }, value: '4-to-24-hours', narrative: { en: 'lasting 4 to 24 hours', 'pt-BR': 'com duracao de 4 a 24 horas' } },
    { label: { en: '24 to 72 hours', 'pt-BR': '24 a 72 horas' }, value: '24-to-72-hours', narrative: { en: 'lasting 24 to 72 hours', 'pt-BR': 'com duracao de 24 a 72 horas' } },
    { label: { en: 'More than 72 hours', 'pt-BR': 'Mais de 72 horas' }, value: 'more-than-72-hours', narrative: { en: 'lasting more than 72 hours', 'pt-BR': 'com duracao maior que 72 horas' } },
  ],
}

const locationField: SelectField = {
  key: 'location',
  label: { en: 'Pain location', 'pt-BR': 'Localizacao da dor' },
  type: 'select',
  required: true,
  options: [
    { label: { en: 'Unilateral', 'pt-BR': 'Unilateral' }, value: 'unilateral', narrative: { en: 'unilateral headache', 'pt-BR': 'cefaleia unilateral' } },
    { label: { en: 'Bilateral', 'pt-BR': 'Bilateral' }, value: 'bilateral', narrative: { en: 'bilateral headache', 'pt-BR': 'cefaleia bilateral' } },
    { label: { en: 'Occipital', 'pt-BR': 'Occipital' }, value: 'occipital', narrative: { en: 'occipital headache', 'pt-BR': 'cefaleia occipital' } },
    { label: { en: 'Frontal', 'pt-BR': 'Frontal' }, value: 'frontal', narrative: { en: 'frontal headache', 'pt-BR': 'cefaleia frontal' } },
    { label: { en: 'Periorbital', 'pt-BR': 'Periorbital' }, value: 'periorbital', narrative: { en: 'periorbital headache', 'pt-BR': 'cefaleia periorbital' } },
    { label: { en: 'Diffuse', 'pt-BR': 'Difusa' }, value: 'diffuse', narrative: { en: 'diffuse headache', 'pt-BR': 'cefaleia difusa' } },
  ],
}

const qualityField: SelectField = {
  key: 'quality',
  label: { en: 'Pain quality', 'pt-BR': 'Caracteristica da dor' },
  type: 'select',
  required: true,
  options: [
    { label: { en: 'Pulsating / throbbing', 'pt-BR': 'Pulsatil / latejante' }, value: 'pulsating', narrative: { en: 'pulsating quality', 'pt-BR': 'carater pulsatil' } },
    { label: { en: 'Pressure / squeezing', 'pt-BR': 'Pressao / aperto' }, value: 'pressure', narrative: { en: 'pressure-like quality', 'pt-BR': 'carater em pressao' } },
    { label: { en: 'Sharp / stabbing', 'pt-BR': 'Pontada / facada' }, value: 'sharp', narrative: { en: 'sharp quality', 'pt-BR': 'carater em pontada' } },
    { label: { en: 'Burning', 'pt-BR': 'Queimacao' }, value: 'burning', narrative: { en: 'burning quality', 'pt-BR': 'carater em queimacao' } },
    { label: { en: 'Dull / aching', 'pt-BR': 'Surda / dolorida' }, value: 'dull', narrative: { en: 'dull aching quality', 'pt-BR': 'carater surdo' } },
  ],
}

const severityField: TextField = {
  key: 'severity',
  label: { en: 'Pain severity', 'pt-BR': 'Intensidade da dor' },
  type: 'text',
  placeholder: { en: 'Example: 7/10', 'pt-BR': 'Ex.: 7/10' },
  required: true,
  narrative: { prefix: { en: 'severity', 'pt-BR': 'intensidade' } },
}

const activityAggravationField: BooleanField = {
  key: 'activityAggravation',
  label: { en: 'Aggravated by routine physical activity', 'pt-BR': 'Piora com atividade fisica rotineira' },
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: { en: 'aggravated by routine physical activity', 'pt-BR': 'piora com atividade fisica rotineira' } },
}

const nauseaVomitingField: SelectField = {
  key: 'nauseaVomiting',
  label: { en: 'Nausea or vomiting', 'pt-BR': 'Nausea ou vomitos' },
  type: 'select',
  required: true,
  options: [
    { label: { en: 'None', 'pt-BR': 'Nenhum' }, value: 'none', narrative: { en: '', 'pt-BR': '' } },
    { label: { en: 'Nausea only', 'pt-BR': 'Apenas nausea' }, value: 'nausea', narrative: { en: 'nausea', 'pt-BR': 'nausea' } },
    { label: { en: 'Vomiting', 'pt-BR': 'Vomitos' }, value: 'vomiting', narrative: { en: 'vomiting', 'pt-BR': 'vomitos' } },
    { label: { en: 'Both nausea and vomiting', 'pt-BR': 'Nausea e vomitos' }, value: 'both', narrative: { en: 'nausea and vomiting', 'pt-BR': 'nausea e vomitos' } },
  ],
}

const photoPhonoField: SelectField = {
  key: 'photoPhono',
  label: { en: 'Photophobia / phonophobia', 'pt-BR': 'Fotofobia / fonofobia' },
  type: 'select',
  required: true,
  options: [
    { label: { en: 'Neither', 'pt-BR': 'Nenhuma' }, value: 'neither', narrative: { en: '', 'pt-BR': '' } },
    { label: { en: 'Photophobia only', 'pt-BR': 'Apenas fotofobia' }, value: 'photophobia', narrative: { en: 'photophobia', 'pt-BR': 'fotofobia' } },
    { label: { en: 'Phonophobia only', 'pt-BR': 'Apenas fonofobia' }, value: 'phonophobia', narrative: { en: 'phonophobia', 'pt-BR': 'fonofobia' } },
    { label: { en: 'Both photophobia and phonophobia', 'pt-BR': 'Fotofobia e fonofobia' }, value: 'both', narrative: { en: 'photophobia and phonophobia', 'pt-BR': 'fotofobia e fonofobia' } },
  ],
}

const auraField: MultiselectField = {
  key: 'auraSymptoms',
  label: { en: 'Aura symptoms', 'pt-BR': 'Sintomas de aura' },
  type: 'multiselect',
  options: [
    { label: { en: 'Visual aura', 'pt-BR': 'Aura visual' }, value: 'visual', narrative: { en: 'visual aura', 'pt-BR': 'aura visual' } },
    { label: { en: 'Sensory aura', 'pt-BR': 'Aura sensitiva' }, value: 'sensory', narrative: { en: 'sensory aura', 'pt-BR': 'aura sensitiva' } },
    { label: { en: 'Speech disturbance', 'pt-BR': 'Alteracao de fala' }, value: 'speech', narrative: { en: 'speech disturbance', 'pt-BR': 'alteracao de fala' } },
    { label: { en: 'Motor weakness', 'pt-BR': 'Fraqueza motora' }, value: 'motor', narrative: { en: 'motor weakness', 'pt-BR': 'fraqueza motora' } },
  ],
  defaultValue: [],
}

const auraDurationField: SelectField = {
  key: 'auraDuration',
  label: { en: 'Aura duration', 'pt-BR': 'Duracao da aura' },
  helperText: { en: 'Typical migraine aura lasts 5 to 60 minutes.', 'pt-BR': 'Aura migranosa tipica dura 5 a 60 minutos.' },
  type: 'select',
  options: [
    { label: { en: 'No aura', 'pt-BR': 'Sem aura' }, value: 'none', narrative: { en: '', 'pt-BR': '' } },
    { label: { en: 'Less than 5 minutes', 'pt-BR': 'Menos de 5 minutos' }, value: 'less-than-5-minutes', narrative: { en: 'aura lasting less than 5 minutes', 'pt-BR': 'aura com duracao menor que 5 minutos' } },
    { label: { en: '5 to 60 minutes', 'pt-BR': '5 a 60 minutos' }, value: '5-to-60-minutes', narrative: { en: 'aura lasting 5 to 60 minutes', 'pt-BR': 'aura com duracao de 5 a 60 minutos' } },
    { label: { en: 'More than 60 minutes', 'pt-BR': 'Mais de 60 minutos' }, value: 'more-than-60-minutes', narrative: { en: 'aura lasting more than 60 minutes', 'pt-BR': 'aura com duracao maior que 60 minutos' } },
  ],
}

const feverField: BooleanField = {
  key: 'feverSystemicSymptoms',
  label: { en: 'Fever or systemic symptoms', 'pt-BR': 'Febre ou sintomas sistemicos' },
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: { en: 'fever or systemic symptoms', 'pt-BR': 'febre ou sintomas sistemicos' } },
}

const redFlagFields: BooleanField[] = [
  feverField,
  {
    key: 'neckStiffness',
    label: { en: 'Neck stiffness or meningismus', 'pt-BR': 'Rigidez de nuca ou meningismo' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'neck stiffness or meningismus', 'pt-BR': 'rigidez de nuca ou meningismo' } },
  },
  {
    key: 'alteredMentalStatus',
    label: { en: 'Altered consciousness or confusion', 'pt-BR': 'Alteracao de consciencia ou confusao' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'altered consciousness or confusion', 'pt-BR': 'alteracao de consciencia ou confusao' } },
  },
  {
    key: 'papilledema',
    label: { en: 'Papilledema', 'pt-BR': 'Papiledema' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'papilledema', 'pt-BR': 'papiledema' } },
  },
  {
    key: 'painfulEyeAutonomic',
    label: { en: 'Painful eye with autonomic features', 'pt-BR': 'Olho doloroso com sinais autonomicos' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'painful eye with autonomic features', 'pt-BR': 'olho doloroso com sinais autonomicos' } },
  },
  {
    key: 'ageOver50NewHeadache',
    label: { en: 'New headache after age 50', 'pt-BR': 'Cefaleia nova apos 50 anos' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'new headache after age 50', 'pt-BR': 'cefaleia nova apos 50 anos' } },
  },
  {
    key: 'historyOfCancer',
    label: { en: 'History of cancer', 'pt-BR': 'Historia de cancer' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'history of cancer', 'pt-BR': 'historia de cancer' } },
  },
  {
    key: 'valsalvaPrecipitated',
    label: { en: 'Precipitated by cough, sneeze, exercise, or Valsalva', 'pt-BR': 'Precipitada por tosse, espirro, exercicio ou Valsalva' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'precipitated by Valsalva or exertion', 'pt-BR': 'precipitada por Valsalva ou esforco' } },
  },
  {
    key: 'pregnancyPostpartum',
    label: { en: 'Pregnant or postpartum', 'pt-BR': 'Gestante ou puerperio' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'pregnancy or postpartum status', 'pt-BR': 'gestacao ou puerperio' } },
  },
  {
    key: 'immunocompromised',
    label: { en: 'Immunocompromised', 'pt-BR': 'Imunossupressao' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'immunocompromised status', 'pt-BR': 'imunossupressao' } },
  },
]

const neurologicSymptomsField: MultiselectField = {
  key: 'neurologicSymptoms',
  label: { en: 'Neurologic symptoms', 'pt-BR': 'Sintomas neurologicos' },
  type: 'multiselect',
  required: true,
  options: [
    { label: { en: 'Weakness', 'pt-BR': 'Fraqueza' }, value: 'weakness', narrative: { en: 'weakness', 'pt-BR': 'fraqueza' } },
    { label: { en: 'Numbness', 'pt-BR': 'Dormencia' }, value: 'numbness', narrative: { en: 'numbness', 'pt-BR': 'dormencia' } },
    { label: { en: 'Vision loss', 'pt-BR': 'Perda visual' }, value: 'vision-loss', narrative: { en: 'vision loss', 'pt-BR': 'perda visual' } },
    { label: { en: 'Diplopia', 'pt-BR': 'Diplopia' }, value: 'diplopia', narrative: { en: 'diplopia', 'pt-BR': 'diplopia' } },
    { label: { en: 'Ataxia', 'pt-BR': 'Ataxia' }, value: 'ataxia', narrative: { en: 'ataxia', 'pt-BR': 'ataxia' } },
    { label: { en: 'Seizure', 'pt-BR': 'Crise convulsiva' }, value: 'seizure', narrative: { en: 'seizure', 'pt-BR': 'crise convulsiva' } },
  ],
  defaultValue: [],
}

const patternChangeField: SelectField = {
  key: 'patternChange',
  label: { en: 'Headache pattern', 'pt-BR': 'Padrao da cefaleia' },
  type: 'select',
  required: true,
  options: [
    { label: { en: 'Same as usual headache pattern', 'pt-BR': 'Igual ao padrao habitual' }, value: 'same-as-usual', narrative: { en: 'similar to the usual headache pattern', 'pt-BR': 'semelhante ao padrao habitual' } },
    { label: { en: 'Different from usual headaches', 'pt-BR': 'Diferente do habitual' }, value: 'different', narrative: { en: 'different from the usual headache pattern', 'pt-BR': 'diferente do padrao habitual' } },
    { label: { en: 'First headache ever', 'pt-BR': 'Primeira cefaleia da vida' }, value: 'first-ever', narrative: { en: 'first headache episode', 'pt-BR': 'primeiro episodio de cefaleia' } },
    { label: { en: 'Progressive or worsening pattern', 'pt-BR': 'Padrao progressivo ou em piora' }, value: 'progressive', narrative: { en: 'progressive or worsening headache pattern', 'pt-BR': 'padrao progressivo ou em piora' } },
  ],
}

const recentTraumaField: SelectField = {
  key: 'recentTrauma',
  label: { en: 'Recent head trauma', 'pt-BR': 'Trauma craniano recente' },
  type: 'select',
  required: true,
  options: [
    { label: { en: 'None', 'pt-BR': 'Nenhum' }, value: 'none', narrative: { en: '', 'pt-BR': '' } },
    { label: { en: 'Within 24 hours', 'pt-BR': 'Nas ultimas 24 horas' }, value: 'within-24-hours', narrative: { en: 'head trauma within 24 hours', 'pt-BR': 'trauma craniano nas ultimas 24 horas' } },
    { label: { en: 'Within 1 week', 'pt-BR': 'Na ultima semana' }, value: 'within-1-week', narrative: { en: 'head trauma within 1 week', 'pt-BR': 'trauma craniano na ultima semana' } },
    { label: { en: 'Within 1 month', 'pt-BR': 'No ultimo mes' }, value: 'within-1-month', narrative: { en: 'head trauma within 1 month', 'pt-BR': 'trauma craniano no ultimo mes' } },
  ],
}

const positionalComponentField: SelectField = {
  key: 'positionalComponent',
  label: { en: 'Positional component', 'pt-BR': 'Componente posicional' },
  type: 'select',
  options: [
    { label: { en: 'None', 'pt-BR': 'Nenhum' }, value: 'none', narrative: { en: '', 'pt-BR': '' } },
    { label: { en: 'Worse lying down', 'pt-BR': 'Piora deitado' }, value: 'worse-lying-down', narrative: { en: 'worse lying down', 'pt-BR': 'piora ao deitar' } },
    { label: { en: 'Worse standing or sitting', 'pt-BR': 'Piora em pe ou sentado' }, value: 'worse-standing', narrative: { en: 'worse standing or sitting', 'pt-BR': 'piora em pe ou sentado' } },
  ],
}

const currentMedicationsField: TextField = {
  key: 'currentMedications',
  label: { en: 'Current headache medications and frequency', 'pt-BR': 'Medicacoes atuais para cefaleia e frequencia' },
  type: 'text',
  placeholder: { en: 'Example: ibuprofen 600 mg, 3 days/month', 'pt-BR': 'Ex.: ibuprofeno 600 mg, 3 dias/mes' },
  required: true,
  narrative: { prefix: { en: 'current medication use:', 'pt-BR': 'uso atual de medicacao:' } },
}

const newMedicationsField: TextField = {
  key: 'newMedications',
  label: { en: 'New medications started recently', 'pt-BR': 'Medicacoes iniciadas recentemente' },
  type: 'text',
  placeholder: { en: 'Example: oral contraceptive started 2 weeks ago', 'pt-BR': 'Ex.: anticoncepcional iniciado ha 2 semanas' },
  narrative: { prefix: { en: 'recent medication change:', 'pt-BR': 'mudanca medicamentosa recente:' } },
}

const headacheFrequencyField: TextField = {
  key: 'headacheFrequency',
  label: { en: 'Headache frequency', 'pt-BR': 'Frequencia da cefaleia' },
  type: 'text',
  placeholder: { en: 'Example: 4 days/month, daily for 3 months', 'pt-BR': 'Ex.: 4 dias/mes, diaria ha 3 meses' },
  required: true,
  narrative: { prefix: { en: 'headache frequency', 'pt-BR': 'frequencia da cefaleia' } },
}

const acuteMedicationDaysField: TextField = {
  key: 'acuteMedicationDays',
  label: { en: 'Acute medication days per month', 'pt-BR': 'Dias de medicacao aguda por mes' },
  type: 'text',
  placeholder: { en: 'Example: triptan 8 days/month, NSAID 18 days/month', 'pt-BR': 'Ex.: triptano 8 dias/mes, AINE 18 dias/mes' },
  narrative: { prefix: { en: 'acute medication use', 'pt-BR': 'uso de medicacao aguda' } },
}

const familyHistoryField: SelectField = {
  key: 'familyHistory',
  label: { en: 'Family history of migraine', 'pt-BR': 'Historia familiar de enxaqueca' },
  type: 'select',
  options: [
    { label: { en: 'Yes', 'pt-BR': 'Sim' }, value: 'yes', narrative: { en: 'family history of migraine', 'pt-BR': 'historia familiar de enxaqueca' } },
    { label: { en: 'No', 'pt-BR': 'Nao' }, value: 'no', narrative: { en: '', 'pt-BR': '' } },
    { label: { en: 'Unknown', 'pt-BR': 'Desconhecida' }, value: 'unknown', narrative: { en: 'unknown family history of migraine', 'pt-BR': 'historia familiar desconhecida para enxaqueca' } },
  ],
}

const menstrualRelationshipField: SelectField = {
  key: 'menstrualRelationship',
  label: { en: 'Menstrual relationship', 'pt-BR': 'Relacao com menstruacao' },
  type: 'select',
  options: [
    { label: { en: 'Related to menses', 'pt-BR': 'Relacionada a menstruacao' }, value: 'related', narrative: { en: 'menstrually related pattern', 'pt-BR': 'padrao relacionado a menstruacao' } },
    { label: { en: 'Not related', 'pt-BR': 'Nao relacionada' }, value: 'not-related', narrative: { en: '', 'pt-BR': '' } },
    { label: { en: 'Uncertain', 'pt-BR': 'Incerta' }, value: 'uncertain', narrative: { en: 'uncertain menstrual relationship', 'pt-BR': 'relacao menstrual incerta' } },
    { label: { en: 'Not applicable', 'pt-BR': 'Nao se aplica' }, value: 'not-applicable', narrative: { en: '', 'pt-BR': '' } },
  ],
}

const triggersField: MultiselectField = {
  key: 'triggers',
  label: { en: 'Typical triggers', 'pt-BR': 'Gatilhos tipicos' },
  type: 'multiselect',
  options: [
    { label: { en: 'Stress', 'pt-BR': 'Estresse' }, value: 'stress', narrative: { en: 'stress', 'pt-BR': 'estresse' } },
    { label: { en: 'Sleep deprivation', 'pt-BR': 'Privacao de sono' }, value: 'sleep-deprivation', narrative: { en: 'sleep deprivation', 'pt-BR': 'privacao de sono' } },
    { label: { en: 'Alcohol', 'pt-BR': 'Alcool' }, value: 'alcohol', narrative: { en: 'alcohol', 'pt-BR': 'alcool' } },
    { label: { en: 'Certain foods', 'pt-BR': 'Alimentos especificos' }, value: 'foods', narrative: { en: 'certain foods', 'pt-BR': 'alimentos especificos' } },
    { label: { en: 'Weather changes', 'pt-BR': 'Mudancas climaticas' }, value: 'weather', narrative: { en: 'weather changes', 'pt-BR': 'mudancas climaticas' } },
    { label: { en: 'Bright lights', 'pt-BR': 'Luzes fortes' }, value: 'bright-lights', narrative: { en: 'bright lights', 'pt-BR': 'luzes fortes' } },
  ],
  defaultValue: [],
}

const hpiTemplate = {
  en: `
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
  `,
  'pt-BR': `
    {% assign painFeatures = quality | compact_append: severity | compact_append: activityAggravation %}
    {% assign associated = nauseaVomiting | compact_append: photoPhono %}
    {% assign redFlags = feverSystemicSymptoms | compact_append: neckStiffness | compact_append: alteredMentalStatus | compact_append: papilledema | compact_append: painfulEyeAutonomic | compact_append: ageOver50NewHeadache | compact_append: historyOfCancer | compact_append: valsalvaPrecipitated | compact_append: pregnancyPostpartum | compact_append: immunocompromised %}
    {% assign context = positionalComponent | compact_append: recentTrauma %}
    {% assign meds = currentMedications | compact_append: newMedications | compact_append: acuteMedicationDays %}
    {% assign migraineContext = headacheFrequency | compact_append: familyHistory | compact_append: menstrualRelationship %}

    {% if sex %}{{ sex | capitalize }}{% else %}Paciente{% endif %}{% if age %}, {{ age }}{% endif %}, refere
    {% if location %}{{ location }}{% else %}cefaleia{% endif %}{% if onsetTiming %} com {{ onsetTiming }}{% endif %}{% if timeToPeak %}, {{ timeToPeak }}{% endif %}{% if duration %}, {{ duration }}{% endif %}.
    {% if painFeatures %}Caracteristicas da dor incluem {{ painFeatures | list: locale }}.{% endif %}
    {% if associated %}Sintomas associados incluem {{ associated | list: locale }}.{% endif %}
    {% if auraSymptoms %}Sintomas de aura incluem {{ auraSymptoms | list: locale }}{% if auraDuration %}, {{ auraDuration }}{% endif %}.{% endif %}
    {% if patternChange %}Padrao {{ patternChange }}.{% endif %}
    {% if neurologicSymptoms %}Sintomas neurologicos incluem {{ neurologicSymptoms | list: locale }}.{% endif %}
    {% if redFlags %}Sinais de alerta incluem {{ redFlags | list: locale }}.{% endif %}
    {% if context %}Contexto adicional inclui {{ context | list: locale }}.{% endif %}
    {% if meds %}Historia medicamentosa inclui {{ meds | list: locale }}.{% endif %}
    {% if migraineContext %}Historia de enxaqueca inclui {{ migraineContext | list: locale }}.{% endif %}
    {% if triggers %}Gatilhos relatados incluem {{ triggers | list: locale }}.{% endif %}
  `,
}

export const migraineModule: ClinicalWorkflow = {
  id: 'migraine',
  title: { en: 'Migraine', 'pt-BR': 'Enxaqueca' },
  overview: {
    en: 'Evaluate headache for migraine-defining features while rapidly screening for SNNOOP10 secondary headache red flags.',
    'pt-BR': 'Avalia cefaleia buscando criterios de enxaqueca e rastreando rapidamente sinais de alerta SNNOOP10 para cefaleias secundarias.',
  },
  sections: [
    {
      id: 'demographics',
      title: { en: 'Patient context', 'pt-BR': 'Contexto do paciente' },
      fields: [ageField, sexField],
    },
    {
      id: 'core-headache-characteristics',
      title: { en: 'Core headache characteristics', 'pt-BR': 'Caracteristicas centrais da cefaleia' },
      description: {
        en: 'Start with timing, peak intensity, duration, location, quality, severity, and activity effect.',
        'pt-BR': 'Comece por inicio, pico de intensidade, duracao, localizacao, caracteristica, intensidade e efeito da atividade.',
      },
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
      title: { en: 'Migraine-associated symptoms', 'pt-BR': 'Sintomas associados a enxaqueca' },
      fields: [nauseaVomitingField, photoPhonoField, auraField, auraDurationField],
    },
    {
      id: 'secondary-headache-screen',
      title: { en: 'Secondary headache screen', 'pt-BR': 'Triagem de cefaleia secundaria' },
      description: {
        en: 'Screen for immediate and high-risk secondary headache features.',
        'pt-BR': 'Rastreie sinais imediatos e de alto risco para cefaleia secundaria.',
      },
      fields: [patternChangeField, recentTraumaField, neurologicSymptomsField, ...redFlagFields, positionalComponentField],
    },
    {
      id: 'medication-and-pattern',
      title: { en: 'Medication and headache pattern', 'pt-BR': 'Medicacoes e padrao da cefaleia' },
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
      title: { en: 'Thunderclap or sudden maximal onset', 'pt-BR': 'Cefaleia em trovoada ou inicio subitamente maximo' },
      description: {
        en: 'Peak intensity within seconds to minutes raises concern for subarachnoid hemorrhage, venous thrombosis, posterior fossa mass, or dissection.',
        'pt-BR': 'Pico em segundos a minutos sugere risco de hemorragia subaracnoidea, trombose venosa, lesao de fossa posterior ou dissecao.',
      },
    },
    {
      title: { en: 'Fever, meningismus, or altered mental status', 'pt-BR': 'Febre, meningismo ou alteracao do estado mental' },
      description: {
        en: 'Consider bacterial meningitis, encephalitis, brain abscess, or subarachnoid hemorrhage.',
        'pt-BR': 'Considere meningite bacteriana, encefalite, abscesso cerebral ou hemorragia subaracnoidea.',
      },
    },
    {
      title: { en: 'Papilledema or focal neurologic signs', 'pt-BR': 'Papiledema ou sinais neurologicos focais' },
      description: {
        en: 'May indicate elevated intracranial pressure, mass effect, stroke, venous thrombosis, or CNS infection.',
        'pt-BR': 'Pode indicar hipertensao intracraniana, efeito de massa, AVC, trombose venosa ou infeccao do SNC.',
      },
    },
    {
      title: { en: 'New headache after age 50 or cancer history', 'pt-BR': 'Cefaleia nova apos 50 anos ou historia de cancer' },
      description: {
        en: 'Screen for giant cell arteritis, neoplasm, vascular disease, or metastasis.',
        'pt-BR': 'Rastreie arterite de celulas gigantes, neoplasia, doenca vascular ou metastase.',
      },
    },
    {
      title: { en: 'Pregnancy, postpartum, immunocompromise, trauma, positional or Valsalva-triggered headache', 'pt-BR': 'Gestacao, puerperio, imunossupressao, trauma, cefaleia posicional ou por Valsalva' },
      description: {
        en: 'These contexts increase concern for secondary causes such as preeclampsia, venous thrombosis, opportunistic infection, subdural hematoma, CSF pressure disorders, or posterior fossa lesions.',
        'pt-BR': 'Esses contextos aumentam suspeita de causas secundarias como pre-eclampsia, trombose venosa, infeccao oportunista, hematoma subdural, disturbios de pressao liquórica ou lesoes de fossa posterior.',
      },
    },
  ],
  differentials: [
    {
      title: { en: 'Migraine without aura', 'pt-BR': 'Enxaqueca sem aura' },
      description: {
        en: 'Recurrent 4-72 hour headache with at least two typical pain features and nausea/vomiting or photophobia/phonophobia.',
        'pt-BR': 'Cefaleia recorrente de 4 a 72 horas com ao menos duas caracteristicas tipicas e nausea/vomitos ou fotofobia/fonofobia.',
      },
    },
    {
      title: { en: 'Migraine with aura', 'pt-BR': 'Enxaqueca com aura' },
      description: {
        en: 'Migraine phenotype plus reversible visual, sensory, speech, or motor symptoms, typically lasting 5 to 60 minutes.',
        'pt-BR': 'Fenotipo migranoso com sintomas visuais, sensitivos, de fala ou motores reversiveis, geralmente de 5 a 60 minutos.',
      },
    },
    {
      title: { en: 'Tension-type headache', 'pt-BR': 'Cefaleia tensional' },
      description: {
        en: 'Bilateral pressing or tightening pain, mild to moderate intensity, not aggravated by activity, without prominent nausea.',
        'pt-BR': 'Dor bilateral em pressao ou aperto, leve a moderada, sem piora por atividade e sem nausea proeminente.',
      },
    },
    {
      title: { en: 'Cluster headache', 'pt-BR': 'Cefaleia em salvas' },
      description: {
        en: 'Severe unilateral periorbital pain lasting 15 to 180 minutes with ipsilateral autonomic features and restlessness.',
        'pt-BR': 'Dor periorbital unilateral intensa de 15 a 180 minutos com sinais autonomicos ipsilaterais e inquietacao.',
      },
    },
    {
      title: { en: 'Subarachnoid hemorrhage', 'pt-BR': 'Hemorragia subaracnoidea' },
      description: {
        en: 'Thunderclap onset, worst headache, exertional trigger, syncope, confusion, meningismus, or neurologic symptoms.',
        'pt-BR': 'Inicio em trovoada, pior cefaleia, gatilho por esforco, sincope, confusao, meningismo ou sintomas neurologicos.',
      },
    },
    {
      title: { en: 'Meningitis or encephalitis', 'pt-BR': 'Meningite ou encefalite' },
      description: {
        en: 'Fever, neck stiffness, photophobia, altered mental status, rash, or immunocompromise.',
        'pt-BR': 'Febre, rigidez de nuca, fotofobia, alteracao mental, rash ou imunossupressao.',
      },
    },
    {
      title: { en: 'Giant cell arteritis', 'pt-BR': 'Arterite de celulas gigantes' },
      description: {
        en: 'New headache after age 50, jaw claudication, vision symptoms, temporal tenderness, or polymyalgia symptoms.',
        'pt-BR': 'Cefaleia nova apos 50 anos, claudicacao mandibular, sintomas visuais, dor temporal ou sintomas de polimialgia.',
      },
    },
    {
      title: { en: 'Medication overuse headache', 'pt-BR': 'Cefaleia por uso excessivo de medicacao' },
      description: {
        en: 'Headache at least 15 days/month with regular acute medication overuse, commonly 10 to 15 or more days/month depending on medication class.',
        'pt-BR': 'Cefaleia em pelo menos 15 dias/mes com uso excessivo regular de medicacao aguda, em geral 10 a 15 ou mais dias/mes conforme a classe.',
      },
    },
  ],
  workup: [
    {
      title: { en: 'No routine testing for typical migraine', 'pt-BR': 'Sem exames de rotina para enxaqueca tipica' },
      description: {
        en: 'Migraine is a clinical diagnosis when the pattern is stable and neurologic examination is normal.',
        'pt-BR': 'Enxaqueca e diagnostico clinico quando o padrao e estavel e o exame neurologico e normal.',
      },
    },
    {
      title: { en: 'Focused neurologic and fundoscopic examination', 'pt-BR': 'Exame neurologico e fundoscopico direcionado' },
      description: {
        en: 'Assess mental status, cranial nerves, strength, sensation, coordination, gait, meningismus, and papilledema.',
        'pt-BR': 'Avalie estado mental, nervos cranianos, forca, sensibilidade, coordenacao, marcha, meningismo e papiledema.',
      },
    },
    {
      title: { en: 'Non-contrast head CT when emergent red flags are present', 'pt-BR': 'TC de cranio sem contraste quando houver sinais emergenciais' },
      description: {
        en: 'Use for thunderclap onset, altered consciousness, focal neurologic deficit, papilledema, acute trauma, or other emergent structural concern.',
        'pt-BR': 'Use em inicio em trovoada, alteracao de consciencia, deficit focal, papiledema, trauma agudo ou outra suspeita estrutural emergencial.',
      },
    },
    {
      title: { en: 'Lumbar puncture after negative CT when suspicion remains', 'pt-BR': 'Puncao lombar apos TC negativa quando a suspeita persistir' },
      description: {
        en: 'Consider for suspected subarachnoid hemorrhage or CNS infection when CT is negative but clinical concern remains.',
        'pt-BR': 'Considere para suspeita de hemorragia subaracnoidea ou infeccao do SNC quando a TC e negativa, mas a suspeita persiste.',
      },
    },
    {
      title: { en: 'CTA or MRI for vascular, progressive, cancer, positional, Valsalva, or atypical aura concerns', 'pt-BR': 'AngioTC ou RM para suspeitas vasculares, progressivas, cancer, posicional, Valsalva ou aura atipica' },
      description: {
        en: 'Tailor imaging to suspected dissection, venous thrombosis, posterior fossa lesion, mass, intracranial pressure disorder, or prolonged/motor aura.',
        'pt-BR': 'Direcione a imagem para suspeita de dissecao, trombose venosa, lesao de fossa posterior, massa, disturbio de pressao intracraniana ou aura prolongada/motora.',
      },
    },
    {
      title: { en: 'ESR and CRP when giant cell arteritis is possible', 'pt-BR': 'VHS e PCR quando arterite de celulas gigantes for possivel' },
      description: {
        en: 'Use for new headache after age 50, especially with jaw claudication, vision changes, temporal tenderness, or polymyalgia symptoms.',
        'pt-BR': 'Use em cefaleia nova apos 50 anos, especialmente com claudicacao mandibular, alteracoes visuais, dor temporal ou sintomas de polimialgia.',
      },
    },
    {
      title: { en: 'Pregnancy testing and blood pressure assessment when relevant', 'pt-BR': 'Teste de gravidez e pressao arterial quando relevante' },
      description: {
        en: 'Pregnancy and postpartum headache require attention to preeclampsia/eclampsia and cerebral venous thrombosis.',
        'pt-BR': 'Cefaleia na gestacao e puerperio exige atencao a pre-eclampsia/eclampsia e trombose venosa cerebral.',
      },
    },
  ],
  quickGuides: [
    {
      title: { en: 'Typical low-risk migraine', 'pt-BR': 'Enxaqueca tipica de baixo risco' },
      description: {
        en: 'Use when migraine features are present and the secondary headache screen is reassuring.',
        'pt-BR': 'Use quando ha caracteristicas migranosas e a triagem de cefaleia secundaria e tranquilizadora.',
      },
      criteria: [
        { en: 'Recurrent similar headache, gradual onset, duration 4 to 72 hours', 'pt-BR': 'Cefaleia recorrente semelhante, inicio gradual, duracao de 4 a 72 horas' },
        { en: 'Unilateral or pulsating moderate-severe pain, worse with activity', 'pt-BR': 'Dor unilateral ou pulsatil moderada-intensa, piora com atividade' },
        { en: 'Nausea/vomiting or photophobia/phonophobia', 'pt-BR': 'Nausea/vomitos ou fotofobia/fonofobia' },
        { en: 'No SNNOOP10 red flags and normal neurologic examination', 'pt-BR': 'Sem sinais de alerta SNNOOP10 e exame neurologico normal' },
      ],
      actions: [
        { en: 'No routine imaging is usually indicated', 'pt-BR': 'Em geral, imagem de rotina nao e indicada' },
        { en: 'Treat early with NSAID, acetaminophen, triptan, or combination based on severity and contraindications', 'pt-BR': 'Tratar precocemente com AINE, paracetamol, triptano ou combinacao conforme gravidade e contraindicacoes' },
        { en: 'Review acute medication frequency and counsel on medication overuse risk', 'pt-BR': 'Revisar frequencia de medicacao aguda e orientar sobre risco de uso excessivo' },
      ],
    },
    {
      title: { en: 'Thunderclap or neurologic emergency', 'pt-BR': 'Trovoada ou emergencia neurologica' },
      description: {
        en: 'Use when the presentation could represent hemorrhage, stroke, meningitis, mass effect, or acute glaucoma.',
        'pt-BR': 'Use quando a apresentacao pode representar hemorragia, AVC, meningite, efeito de massa ou glaucoma agudo.',
      },
      criteria: [
        { en: 'Sudden maximal onset, altered mental status, seizure, focal deficit, papilledema, meningismus, or painful red eye', 'pt-BR': 'Inicio subitamente maximo, alteracao mental, crise convulsiva, deficit focal, papiledema, meningismo ou olho vermelho doloroso' },
      ],
      actions: [
        { en: 'Escalate urgently and obtain targeted emergent workup', 'pt-BR': 'Escalonar com urgencia e obter investigacao emergencial direcionada' },
        { en: 'Consider CT head, CTA, lumbar puncture, antibiotics, stroke pathway, ophthalmology, neurology, or neurosurgery depending on syndrome', 'pt-BR': 'Considerar TC, angioTC, puncao lombar, antibioticos, protocolo de AVC, oftalmologia, neurologia ou neurocirurgia conforme sindrome' },
      ],
    },
    {
      title: { en: 'New or changed headache after age 50', 'pt-BR': 'Cefaleia nova ou diferente apos 50 anos' },
      description: {
        en: 'Use when age or pattern change raises concern for giant cell arteritis, malignancy, vascular disease, or mass lesion.',
        'pt-BR': 'Use quando idade ou mudanca de padrao sugere arterite de celulas gigantes, malignidade, doenca vascular ou lesao expansiva.',
      },
      criteria: [
        { en: 'New headache after age 50, different pattern, progressive course, cancer history, jaw claudication, or visual symptoms', 'pt-BR': 'Cefaleia nova apos 50 anos, padrao diferente, curso progressivo, cancer, claudicacao mandibular ou sintomas visuais' },
      ],
      actions: [
        { en: 'Consider ESR/CRP and urgent steroid pathway if giant cell arteritis with vision symptoms is suspected', 'pt-BR': 'Considerar VHS/PCR e via de corticoide urgente se houver suspeita de arterite com sintomas visuais' },
        { en: 'Consider MRI brain or other imaging based on suspected secondary cause', 'pt-BR': 'Considerar RM de encefalo ou outra imagem conforme causa secundaria suspeita' },
      ],
    },
    {
      title: { en: 'Medication overuse or chronic migraine', 'pt-BR': 'Uso excessivo de medicacao ou enxaqueca cronica' },
      description: {
        en: 'Use when headaches are frequent or acute medications are used repeatedly each month.',
        'pt-BR': 'Use quando cefaleias sao frequentes ou medicacoes agudas sao usadas repetidamente no mes.',
      },
      criteria: [
        { en: 'Headache at least 15 days/month, migraine features at least 8 days/month, or acute medication overuse pattern', 'pt-BR': 'Cefaleia em pelo menos 15 dias/mes, caracteristicas migranosas em pelo menos 8 dias/mes ou padrao de uso excessivo de medicacao aguda' },
      ],
      actions: [
        { en: 'Counsel on limiting acute medications and consider preventive therapy or neurology follow-up', 'pt-BR': 'Orientar limite de medicacoes agudas e considerar profilaxia ou seguimento com neurologia' },
        { en: 'Consider observation or admission if status migrainosus, dehydration, refractory symptoms, or supervised withdrawal is needed', 'pt-BR': 'Considerar observacao ou internacao se status migranosus, desidratacao, sintomas refratarios ou retirada supervisionada forem necessarios' },
      ],
    },
  ],
  sourceFigures: [
    {
      title: { en: 'SNNOOP10 mnemonic criteria for secondary headaches', 'pt-BR': 'Criterios SNNOOP10 para cefaleias secundarias' },
      source: { en: 'American Family Physician, 2022', 'pt-BR': 'American Family Physician, 2022' },
      sourceUrl: 'https://www.aafp.org/afp/2022/0900/acute-headache-adults',
      notes: {
        en: 'Source figure reviewed locally for systemic symptoms, neurologic signs, sudden onset, older age, pattern change, positional headache, Valsalva trigger, papilledema, pregnancy, immunocompromise, cancer, and trauma red flags.',
        'pt-BR': 'Figura de referencia revisada localmente para sintomas sistemicos, sinais neurologicos, inicio subito, idade avancada, mudanca de padrao, cefaleia posicional, gatilho por Valsalva, papiledema, gestacao, imunossupressao, cancer e trauma.',
      },
    },
    {
      title: { en: 'Evaluation of headache', 'pt-BR': 'Avaliacao da cefaleia' },
      source: { en: 'American Family Physician, 2022', 'pt-BR': 'American Family Physician, 2022' },
      sourceUrl: 'https://www.aafp.org/afp/2022/0900/acute-headache-adults',
      notes: {
        en: 'Source figure reviewed locally for acute headache triage, red flag-based imaging, and typical primary headache management.',
        'pt-BR': 'Figura de referencia revisada localmente para triagem de cefaleia aguda, imagem orientada por sinais de alerta e manejo de cefaleias primarias tipicas.',
      },
    },
    {
      title: { en: 'Diagnostic algorithm for the presentation of headache', 'pt-BR': 'Algoritmo diagnostico para apresentacao de cefaleia' },
      source: { en: 'Wiley Online Library', 'pt-BR': 'Wiley Online Library' },
      sourceUrl: 'https://onlinelibrary.wiley.com/doi/book/9781119539117',
      notes: {
        en: 'Source algorithm reviewed locally for headache syndrome branching and secondary headache considerations.',
        'pt-BR': 'Algoritmo de referencia revisado localmente para ramificacao por sindromes de cefaleia e consideracoes de cefaleia secundaria.',
      },
    },
    {
      title: { en: 'Key recommendations for acute migraine headache', 'pt-BR': 'Recomendacoes-chave para enxaqueca aguda' },
      source: { en: 'American Family Physician, 2025', 'pt-BR': 'American Family Physician, 2025' },
      sourceUrl: 'https://www.aafp.org/afp/2025/0400/acute-migraine-headache',
      notes: {
        en: 'Source table reviewed locally for acute migraine treatment recommendations and therapies to avoid.',
        'pt-BR': 'Tabela de referencia revisada localmente para recomendacoes de tratamento agudo da enxaqueca e terapias a evitar.',
      },
    },
    {
      title: { en: 'Freedom from pain at 2 hours in migraine trials', 'pt-BR': 'Ausencia de dor em 2 horas em estudos de enxaqueca' },
      source: { en: 'New England Journal of Medicine', 'pt-BR': 'New England Journal of Medicine' },
      sourceUrl: 'https://www.nejm.org/doi/full/10.1056/NEJMra1915327',
      notes: {
        en: 'Source figure reviewed locally for comparative acute treatment response context.',
        'pt-BR': 'Figura de referencia revisada localmente para contexto comparativo de resposta a tratamentos agudos.',
      },
    },
  ],
  presets: [
    {
      id: 'typical-low-risk-migraine',
      title: { en: 'Typical low-risk migraine', 'pt-BR': 'Enxaqueca tipica de baixo risco' },
      description: {
        en: 'Classic episodic migraine without aura and no secondary headache red flags.',
        'pt-BR': 'Enxaqueca episodica classica sem aura e sem sinais de alerta para cefaleia secundaria.',
      },
      answers: {
        age: '35 years',
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
      title: { en: 'Migraine with typical aura', 'pt-BR': 'Enxaqueca com aura tipica' },
      description: {
        en: 'Migraine phenotype with visual aura lasting within the usual 5 to 60 minute window.',
        'pt-BR': 'Fenotipo migranoso com aura visual dentro da janela usual de 5 a 60 minutos.',
      },
      answers: {
        age: '29 years',
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
      title: { en: 'High-risk thunderclap headache', 'pt-BR': 'Cefaleia em trovoada de alto risco' },
      description: {
        en: 'Sudden maximal onset with neurologic or mental status concern requiring urgent escalation.',
        'pt-BR': 'Inicio subitamente maximo com preocupacao neurologica ou de estado mental, exigindo escalonamento urgente.',
      },
      answers: {
        age: '52 years',
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
      title: { en: 'Chronic migraine / medication overuse risk', 'pt-BR': 'Enxaqueca cronica / risco de uso excessivo' },
      description: {
        en: 'Frequent headaches with high acute medication use and changed pattern.',
        'pt-BR': 'Cefaleias frequentes com alto uso de medicacao aguda e mudanca de padrao.',
      },
      answers: {
        age: '48 years',
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
