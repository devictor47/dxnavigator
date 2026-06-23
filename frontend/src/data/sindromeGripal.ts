import type { BooleanField, ClinicalWorkflow, MultiselectField, TextField } from '@/data/workflow'

const durationField: TextField = {
  key: 'duration',
  label: {
    en: 'Symptom duration',
    'pt-BR': 'Duração dos sintomas',
  },
  type: 'text',
  placeholder: {
    en: 'Example: 2 days, since yesterday, 10 days',
    'pt-BR': 'Ex.: 2 dias, desde ontem, 10 dias',
  },
  required: true,
}

const onsetPatternField: MultiselectField = {
  key: 'onsetPattern',
  label: {
    en: 'Onset and progression',
    'pt-BR': 'Início e evolução',
  },
  type: 'multiselect',
  options: [
    {
      label: { en: 'Sudden onset', 'pt-BR': 'Início súbito' },
      value: 'sudden-onset',
      narrative: { en: 'sudden onset', 'pt-BR': 'início súbito' },
    },
    {
      label: { en: 'Gradual onset', 'pt-BR': 'Início gradual' },
      value: 'gradual-onset',
      narrative: { en: 'gradual onset', 'pt-BR': 'início gradual' },
    },
    {
      label: { en: 'Worsening after initial improvement', 'pt-BR': 'Piora após melhora inicial' },
      value: 'double-sickening',
      narrative: { en: 'worsening after initial improvement', 'pt-BR': 'piora após melhora inicial' },
    },
    {
      label: { en: 'Persistent symptoms beyond one week', 'pt-BR': 'Sintomas persistentes por mais de uma semana' },
      value: 'persistent-symptoms',
      narrative: { en: 'persistent symptoms beyond one week', 'pt-BR': 'sintomas persistentes por mais de uma semana' },
    },
  ],
  defaultValue: [],
}

const feverField: BooleanField = {
  key: 'fever',
  label: { en: 'Fever', 'pt-BR': 'Febre' },
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: { en: 'fever', 'pt-BR': 'febre' } },
}

const measuredTemperatureField: TextField = {
  key: 'measuredTemperature',
  label: {
    en: 'Measured temperature',
    'pt-BR': 'Temperatura medida',
  },
  type: 'text',
  placeholder: {
    en: 'Example: 38.5 C at home',
    'pt-BR': 'Ex.: 38,5 °C em casa',
  },
  displayIf: {
    fieldKey: 'fever',
    equals: true,
  },
}

const respiratorySymptomFields: BooleanField[] = [
  {
    key: 'dryCough',
    label: { en: 'Dry cough', 'pt-BR': 'Tosse seca' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'dry cough', 'pt-BR': 'tosse seca' } },
  },
  {
    key: 'productiveCough',
    label: { en: 'Productive cough', 'pt-BR': 'Tosse produtiva' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'productive cough', 'pt-BR': 'tosse produtiva' } },
  },
  {
    key: 'nasalCongestion',
    label: { en: 'Nasal congestion', 'pt-BR': 'Obstrução nasal' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'nasal congestion', 'pt-BR': 'obstrução nasal' } },
  },
  {
    key: 'rhinorrhea',
    label: { en: 'Runny nose', 'pt-BR': 'Coriza' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'rhinorrhea', 'pt-BR': 'coriza' } },
  },
  {
    key: 'soreThroat',
    label: { en: 'Sore throat', 'pt-BR': 'Dor de garganta' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'sore throat', 'pt-BR': 'dor de garganta' } },
  },
  {
    key: 'dyspnea',
    label: { en: 'Shortness of breath', 'pt-BR': 'Falta de ar' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'shortness of breath', 'pt-BR': 'falta de ar' } },
  },
  {
    key: 'earAche',
    label: { en: 'Ear ache', 'pt-BR': 'Dor de ouvido' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'ear ache', 'pt-BR': 'dor de ouvido' } },
  },
]

const systemicSymptomFields: BooleanField[] = [
  {
    key: 'myalgia',
    label: { en: 'Myalgia', 'pt-BR': 'Mialgia' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'myalgia', 'pt-BR': 'mialgia' } },
  },
  {
    key: 'headache',
    label: { en: 'Headache', 'pt-BR': 'Cefaleia' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'headache', 'pt-BR': 'cefaleia' } },
  },
  {
    key: 'fatigue',
    label: { en: 'Fatigue', 'pt-BR': 'Fadiga' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'fatigue', 'pt-BR': 'fadiga' } },
  },
  {
    key: 'chills',
    label: { en: 'Chills', 'pt-BR': 'Calafrios' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'chills', 'pt-BR': 'calafrios' } },
  },
]

const giSymptomFields: BooleanField[] = [
  {
    key: 'nauseaVomiting',
    label: { en: 'Nausea or vomiting', 'pt-BR': 'Náuseas ou vômitos' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'nausea or vomiting', 'pt-BR': 'náuseas ou vômitos' } },
  },
  {
    key: 'diarrhea',
    label: { en: 'Diarrhea', 'pt-BR': 'Diarreia' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'diarrhea', 'pt-BR': 'diarreia' } },
  },
  {
    key: 'abdominalPain',
    label: { en: 'Abdominal pain', 'pt-BR': 'Dor abdominal' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'abdominal pain', 'pt-BR': 'dor abdominal' } },
  },
]

const redFlagFields: BooleanField[] = [
  {
    key: 'hypoxemiaOrRespiratoryDistress',
    label: { en: 'Hypoxemia or respiratory distress', 'pt-BR': 'Hipoxemia ou desconforto respiratório' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'hypoxemia or respiratory distress', 'pt-BR': 'hipoxemia ou desconforto respiratório' } },
  },
  {
    key: 'chestPain',
    label: { en: 'Chest pain', 'pt-BR': 'Dor torácica' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'chest pain', 'pt-BR': 'dor torácica' } },
  },
  {
    key: 'alteredMentalStatus',
    label: { en: 'Altered mental status', 'pt-BR': 'Alteração do estado mental' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'altered mental status', 'pt-BR': 'alteração do estado mental' } },
  },
  {
    key: 'severeHeadachePersistentFever',
    label: { en: 'Severe headache with persistent fever', 'pt-BR': 'Cefaleia intensa com febre persistente' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'severe headache with persistent fever', 'pt-BR': 'cefaleia intensa com febre persistente' } },
  },
  {
    key: 'dehydration',
    label: { en: 'Dehydration or decreased urine output', 'pt-BR': 'Desidratação ou redução da diurese' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'dehydration or decreased urine output', 'pt-BR': 'desidratação ou redução da diurese' } },
  },
  {
    key: 'hemoptysis',
    label: { en: 'Hemoptysis', 'pt-BR': 'Hemoptise' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'hemoptysis', 'pt-BR': 'hemoptise' } },
  },
]

const riskFactorField: MultiselectField = {
  key: 'riskFactors',
  label: { en: 'Risk factors for complications', 'pt-BR': 'Fatores de risco para complicações' },
  type: 'multiselect',
  options: [
    { label: { en: 'Age 65 years or older', 'pt-BR': 'Idade igual ou maior que 65 anos' }, value: 'older-adult', narrative: { en: 'age 65 years or older', 'pt-BR': 'idade igual ou maior que 65 anos' } },
    { label: { en: 'Pregnancy', 'pt-BR': 'Gestação' }, value: 'pregnancy', narrative: { en: 'pregnancy', 'pt-BR': 'gestação' } },
    { label: { en: 'Chronic pulmonary disease', 'pt-BR': 'Doença pulmonar crônica' }, value: 'pulmonary-disease', narrative: { en: 'chronic pulmonary disease', 'pt-BR': 'doença pulmonar crônica' } },
    { label: { en: 'Chronic cardiac disease', 'pt-BR': 'Doença cardíaca crônica' }, value: 'cardiac-disease', narrative: { en: 'chronic cardiac disease', 'pt-BR': 'doença cardíaca crônica' } },
    { label: { en: 'Diabetes', 'pt-BR': 'Diabetes' }, value: 'diabetes', narrative: { en: 'diabetes', 'pt-BR': 'diabetes' } },
    { label: { en: 'Immunosuppression', 'pt-BR': 'Imunossupressão' }, value: 'immunosuppression', narrative: { en: 'immunosuppression', 'pt-BR': 'imunossupressão' } },
    { label: { en: 'Neurologic disorder', 'pt-BR': 'Doença neurológica' }, value: 'neurologic-disorder', narrative: { en: 'neurologic disorder', 'pt-BR': 'doença neurológica' } },
  ],
  defaultValue: [],
}

const rhinosinusitisFeatureFields: BooleanField[] = [
  {
    key: 'facialPain',
    label: { en: 'Facial pain or sinus pressure', 'pt-BR': 'Dor facial ou pressão em seios da face' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'facial pain or sinus pressure', 'pt-BR': 'dor facial ou pressão em seios da face' } },
  },
  {
    key: 'purulentNasalDischarge',
    label: { en: 'Purulent nasal discharge', 'pt-BR': 'Secreção nasal purulenta' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'purulent nasal discharge', 'pt-BR': 'secreção nasal purulenta' } },
  },
  {
    key: 'periorbitalSwellingOrDiplopia',
    label: { en: 'Periorbital swelling or diplopia', 'pt-BR': 'Edema periorbitário ou diplopia' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'periorbital swelling or diplopia', 'pt-BR': 'edema periorbitário ou diplopia' } },
  },
]

const hpiTemplate = {
  en: `
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
  `,
  'pt-BR': `
    Paciente apresenta sintomas compatíveis com síndrome gripal/IVAS{% if duration %} há {{ duration }}{% endif %}.
    {% assign respiratorySymptoms = fever | compact_append: dryCough | compact_append: productiveCough | compact_append: nasalCongestion | compact_append: rhinorrhea | compact_append: soreThroat | compact_append: dyspnea | compact_append: earAche %}
    {% if respiratorySymptoms %}Sintomas referidos incluem {{ respiratorySymptoms | list: locale }}.{% endif %}
    {% assign systemicSymptoms = myalgia | compact_append: headache | compact_append: fatigue | compact_append: chills %}
    {% if systemicSymptoms %}Sintomas sistêmicos incluem {{ systemicSymptoms | list: locale }}.{% endif %}
    {% assign giSymptoms = nauseaVomiting | compact_append: diarrhea | compact_append: abdominalPain %}
    {% if giSymptoms %}Sintomas gastrointestinais incluem {{ giSymptoms | list: locale }}.{% endif %}
    {% if onsetPattern %}Padrão de evolução inclui {{ onsetPattern | list: locale }}.{% endif %}
    {% if measuredTemperature %}Temperatura medida referida: {{ measuredTemperature }}.{% endif %}
    {% if riskFactors %}Fatores de risco para complicações incluem {{ riskFactors | list: locale }}.{% endif %}
    {% assign warningSigns = hypoxemiaOrRespiratoryDistress | compact_append: chestPain | compact_append: alteredMentalStatus | compact_append: severeHeadachePersistentFever | compact_append: dehydration | compact_append: hemoptysis %}
    {% if warningSigns %}Sinais de alerta referidos: {{ warningSigns | list: locale }}.{% endif %}
    {% assign sinusFeatures = facialPain | compact_append: purulentNasalDischarge | compact_append: periorbitalSwellingOrDiplopia %}
    {% if sinusFeatures %}Achados relacionados a rinossinusite incluem {{ sinusFeatures | list: locale }}.{% endif %}
  `,
}

export const sindromeGripalModule: ClinicalWorkflow = {
  id: 'sindrome-gripal',
  title: {
    en: 'Influenza-like illness / URI',
    'pt-BR': 'Síndrome gripal / IVAS',
  },
  overview: {
    en: 'Structure the initial evaluation of influenza-like illness and upper respiratory symptoms, including warning signs, risk context, and rhinosinusitis clues.',
    'pt-BR': 'Estruture a avaliação inicial de síndrome gripal e sintomas de vias aéreas superiores, incluindo sinais de alerta, contexto de risco e pistas de rinossinusite.',
  },
  sections: [
    {
      id: 'illness-course',
      title: { en: 'Illness course', 'pt-BR': 'Curso da doença' },
      description: {
        en: 'Clarify duration, onset, and progression before deciding whether this is likely uncomplicated viral illness or a complication pattern.',
        'pt-BR': 'Defina duração, início e evolução antes de decidir se o quadro sugere doença viral não complicada ou padrão de complicação.',
      },
      fields: [durationField, onsetPatternField],
    },
    {
      id: 'respiratory-symptoms',
      title: { en: 'Respiratory symptoms', 'pt-BR': 'Sintomas respiratórios' },
      fields: [feverField, measuredTemperatureField, ...respiratorySymptomFields],
    },
    {
      id: 'systemic-and-gi-symptoms',
      title: { en: 'Systemic and GI symptoms', 'pt-BR': 'Sintomas sistêmicos e gastrointestinais' },
      fields: [...systemicSymptomFields, ...giSymptomFields],
    },
    {
      id: 'risk-context',
      title: { en: 'Risk context', 'pt-BR': 'Contexto de risco' },
      fields: [riskFactorField],
    },
    {
      id: 'red-flag-screen',
      title: { en: 'Red flag screen', 'pt-BR': 'Triagem de sinais de alerta' },
      description: {
        en: 'Positive findings here should lower the threshold for urgent evaluation or broader workup.',
        'pt-BR': 'Achados positivos aqui devem reduzir o limiar para avaliação urgente ou investigação ampliada.',
      },
      fields: redFlagFields,
    },
    {
      id: 'rhinosinusitis-clues',
      title: { en: 'Rhinosinusitis clues', 'pt-BR': 'Pistas de rinossinusite' },
      description: {
        en: 'Use when nasal symptoms raise concern for acute bacterial rhinosinusitis or orbital complication.',
        'pt-BR': 'Use quando sintomas nasais levantam suspeita de rinossinusite bacteriana aguda ou complicação orbitária.',
      },
      fields: rhinosinusitisFeatureFields,
    },
  ],
  redFlags: [
    {
      title: { en: 'Respiratory distress or hypoxemia', 'pt-BR': 'Desconforto respiratório ou hipoxemia' },
      description: {
        en: 'Dyspnea, tachypnea, low oxygen saturation, cyanosis, or increased work of breathing require escalation.',
        'pt-BR': 'Dispneia, taquipneia, baixa saturação, cianose ou aumento do esforço respiratório exigem escalonamento.',
      },
    },
    {
      title: { en: 'Neurologic warning signs', 'pt-BR': 'Sinais neurológicos de alerta' },
      description: {
        en: 'Altered mental status, seizures, focal deficits, ataxia, or severe headache with persistent fever suggest serious complications.',
        'pt-BR': 'Alteração do estado mental, convulsões, déficits focais, ataxia ou cefaleia intensa com febre persistente sugerem complicações graves.',
      },
    },
    {
      title: { en: 'Chest pain or cardiac symptoms', 'pt-BR': 'Dor torácica ou sintomas cardíacos' },
      description: {
        en: 'Consider myocarditis, pericarditis, ischemia, pneumonia, or other complications when chest pain or palpitations occur.',
        'pt-BR': 'Considere miocardite, pericardite, isquemia, pneumonia ou outras complicações quando houver dor torácica ou palpitações.',
      },
    },
    {
      title: { en: 'Dehydration or inability to tolerate oral intake', 'pt-BR': 'Desidratação ou intolerância à via oral' },
      description: {
        en: 'Persistent vomiting, poor intake, decreased urine output, or signs of poor perfusion require closer assessment.',
        'pt-BR': 'Vômitos persistentes, baixa ingesta, redução da diurese ou sinais de má perfusão exigem avaliação mais próxima.',
      },
    },
    {
      title: { en: 'Orbital complication concern', 'pt-BR': 'Suspeita de complicação orbitária' },
      description: {
        en: 'Periorbital swelling, diplopia, painful eye movements, or visual symptoms warrant urgent evaluation.',
        'pt-BR': 'Edema periorbitário, diplopia, dor à movimentação ocular ou sintomas visuais indicam avaliação urgente.',
      },
    },
  ],
  differentials: [
    {
      title: { en: 'Uncomplicated viral URI', 'pt-BR': 'IVAS viral não complicada' },
      description: {
        en: 'Common cold or viral upper respiratory infection with normal vital signs and no red flags.',
        'pt-BR': 'Resfriado comum ou infecção viral de vias aéreas superiores com sinais vitais normais e sem sinais de alerta.',
      },
    },
    {
      title: { en: 'Influenza', 'pt-BR': 'Influenza' },
      description: {
        en: 'Fever, myalgia, headache, chills, abrupt onset, exposure history, seasonality, or outbreak context.',
        'pt-BR': 'Febre, mialgia, cefaleia, calafrios, início abrupto, contato epidemiológico, sazonalidade ou contexto de surto.',
      },
    },
    {
      title: { en: 'COVID-19 or other respiratory virus', 'pt-BR': 'COVID-19 ou outro vírus respiratório' },
      description: {
        en: 'Consider based on local circulation, exposure, vaccination status, and testing availability.',
        'pt-BR': 'Considere conforme circulação local, exposição, vacinação e disponibilidade de testagem.',
      },
    },
    {
      title: { en: 'Community-acquired pneumonia', 'pt-BR': 'Pneumonia adquirida na comunidade' },
      description: {
        en: 'Cough with fever, dyspnea, abnormal lung exam, hypoxemia, pleuritic pain, or systemic illness.',
        'pt-BR': 'Tosse com febre, dispneia, alteração pulmonar ao exame, hipoxemia, dor pleurítica ou doença sistêmica.',
      },
    },
    {
      title: { en: 'Acute bacterial rhinosinusitis', 'pt-BR': 'Rinossinusite bacteriana aguda' },
      description: {
        en: 'Persistent symptoms, double-sickening, or severe fever with purulent discharge and facial pain.',
        'pt-BR': 'Sintomas persistentes, piora após melhora inicial ou febre intensa com secreção purulenta e dor facial.',
      },
    },
    {
      title: { en: 'Streptococcal pharyngitis', 'pt-BR': 'Faringoamigdalite estreptocócica' },
      description: {
        en: 'Sore throat with fever, tonsillar exudate, tender anterior cervical nodes, and absence of cough.',
        'pt-BR': 'Dor de garganta com febre, exsudato tonsilar, linfonodos cervicais anteriores dolorosos e ausência de tosse.',
      },
    },
    {
      title: { en: 'Asthma or COPD exacerbation', 'pt-BR': 'Exacerbação de asma ou DPOC' },
      description: {
        en: 'Wheezing, dyspnea, increased rescue inhaler use, or known obstructive lung disease.',
        'pt-BR': 'Sibilância, dispneia, aumento do uso de medicação de resgate ou doença pulmonar obstrutiva conhecida.',
      },
    },
  ],
  workup: [
    {
      title: { en: 'No routine testing when uncomplicated', 'pt-BR': 'Sem exames de rotina quando não complicado' },
      description: {
        en: 'For normal vital signs, reassuring exam, and no red flags, diagnosis is usually clinical with symptomatic care.',
        'pt-BR': 'Com sinais vitais normais, exame tranquilizador e sem sinais de alerta, o diagnóstico costuma ser clínico com manejo sintomático.',
      },
    },
    {
      title: { en: 'Targeted viral testing when it changes management', 'pt-BR': 'Testagem viral direcionada quando muda a conduta' },
      description: {
        en: 'Consider influenza/COVID testing for high-risk patients, severe illness, outbreaks, infection control, or treatment decisions.',
        'pt-BR': 'Considere teste para influenza/COVID em pacientes de risco, doença grave, surtos, controle de infecção ou decisão terapêutica.',
      },
    },
    {
      title: { en: 'Chest X-ray if pneumonia is suspected', 'pt-BR': 'Radiografia de tórax se houver suspeita de pneumonia' },
      description: {
        en: 'Use when dyspnea, hypoxemia, focal lung findings, pleuritic pain, or systemic illness raises concern.',
        'pt-BR': 'Use quando dispneia, hipoxemia, achados pulmonares focais, dor pleurítica ou doença sistêmica levantarem suspeita.',
      },
    },
    {
      title: { en: 'Labs based on severity', 'pt-BR': 'Exames laboratoriais conforme gravidade' },
      description: {
        en: 'CBC, metabolic panel, CK, cultures, or other tests may be appropriate for sepsis concern, dehydration, myositis, or severe disease.',
        'pt-BR': 'Hemograma, eletrólitos/função renal, CK, culturas ou outros exames podem ser apropriados em suspeita de sepse, desidratação, miosite ou doença grave.',
      },
    },
    {
      title: { en: 'Rhinosinusitis complication evaluation', 'pt-BR': 'Avaliação de complicações da rinossinusite' },
      description: {
        en: 'Urgent evaluation is appropriate for orbital signs, severe toxicity, neurologic findings, or failure to improve as expected.',
        'pt-BR': 'Avaliação urgente é apropriada em sinais orbitários, toxicidade importante, achados neurológicos ou ausência de melhora esperada.',
      },
    },
  ],
  quickGuides: [
    {
      title: { en: 'Uncomplicated viral URI', 'pt-BR': 'IVAS viral não complicada' },
      description: {
        en: 'Use when symptoms and exam fit a self-limited upper respiratory infection without warning signs.',
        'pt-BR': 'Use quando sintomas e exame sugerem infecção de vias aéreas superiores autolimitada, sem sinais de alerta.',
      },
      criteria: [
        { en: 'Normal vital signs and reassuring respiratory exam', 'pt-BR': 'Sinais vitais normais e exame respiratório tranquilizador' },
        { en: 'No dyspnea, hypoxemia, chest pain, neurologic signs, or dehydration', 'pt-BR': 'Sem dispneia, hipoxemia, dor torácica, sinais neurológicos ou desidratação' },
        { en: 'Symptoms within expected viral timeframe', 'pt-BR': 'Sintomas dentro do tempo esperado para quadro viral' },
      ],
      actions: [
        { en: 'No routine testing is usually needed', 'pt-BR': 'Em geral, não são necessários exames de rotina' },
        { en: 'Provide symptomatic care and return precautions', 'pt-BR': 'Orientar tratamento sintomático e sinais de retorno' },
        { en: 'Avoid antibiotics when bacterial complication is not suspected', 'pt-BR': 'Evitar antibióticos quando não houver suspeita de complicação bacteriana' },
      ],
    },
    {
      title: { en: 'Influenza-like illness', 'pt-BR': 'Síndrome gripal / suspeita de influenza' },
      description: {
        en: 'Use when abrupt systemic symptoms, fever, myalgia, seasonality, or exposure raise influenza concern.',
        'pt-BR': 'Use quando início abrupto, sintomas sistêmicos, febre, mialgia, sazonalidade ou exposição levantam suspeita de influenza.',
      },
      criteria: [
        { en: 'Fever or chills with cough, sore throat, myalgia, headache, or fatigue', 'pt-BR': 'Febre ou calafrios com tosse, dor de garganta, mialgia, cefaleia ou fadiga' },
        { en: 'High-risk patient, severe illness, outbreak, or result would change management', 'pt-BR': 'Paciente de risco, doença grave, surto ou resultado mudaria conduta' },
      ],
      actions: [
        { en: 'Consider targeted influenza/COVID testing when results affect management', 'pt-BR': 'Considerar testagem direcionada para influenza/COVID quando o resultado muda a conduta' },
        { en: 'Escalate evaluation if warning signs are present', 'pt-BR': 'Ampliar avaliação se houver sinais de alerta' },
      ],
    },
    {
      title: { en: 'Acute bacterial rhinosinusitis concern', 'pt-BR': 'Suspeita de rinossinusite bacteriana aguda' },
      description: {
        en: 'Use when nasal/sinus symptoms follow a complication pattern rather than an uncomplicated viral course.',
        'pt-BR': 'Use quando sintomas nasais/sinusais seguem padrão de complicação, e não curso viral não complicado.',
      },
      criteria: [
        { en: 'Symptoms persist beyond one week without improvement', 'pt-BR': 'Sintomas persistem por mais de uma semana sem melhora' },
        { en: 'Worsening after initial improvement', 'pt-BR': 'Piora após melhora inicial' },
        { en: 'Severe fever with purulent nasal discharge or facial pain for several days', 'pt-BR': 'Febre intensa com secreção nasal purulenta ou dor facial por vários dias' },
      ],
      actions: [
        { en: 'Consider bacterial rhinosinusitis pathway and follow-up plan', 'pt-BR': 'Considerar via de rinossinusite bacteriana e plano de reavaliação' },
        { en: 'Urgent evaluation if periorbital swelling, diplopia, or visual symptoms occur', 'pt-BR': 'Avaliação urgente se houver edema periorbitário, diplopia ou sintomas visuais' },
      ],
    },
  ],
  sourceFigures: [
    {
      title: {
        en: 'Acute rhinosinusitis evaluation and treatment flowchart',
        'pt-BR': 'Fluxograma de avaliação e tratamento da rinossinusite aguda',
      },
      source: {
        en: 'American Family Physician, 2025',
        'pt-BR': 'American Family Physician, 2025',
      },
      sourceUrl: 'https://www.aafp.org/afp/2025/0100/acute-rhinosinusitis',
      citation: {
        en: 'Butler FM, Hernandez DR. Acute Rhinosinusitis: Rapid Evidence Review. American Family Physician. 2025;111(1):47-53.',
        'pt-BR': 'Butler FM, Hernandez DR. Acute Rhinosinusitis: Rapid Evidence Review. American Family Physician. 2025;111(1):47-53.',
      },
      notes: {
        en: 'Source figure reviewed locally for criteria around monitoring, double-sickening, persistent symptoms, severe symptoms, and orbital warning signs. Image is not bundled in the public app.',
        'pt-BR': 'Figura-fonte revisada localmente para critérios de observação, piora após melhora inicial, sintomas persistentes, sintomas graves e sinais orbitários. A imagem não está incluída no app público.',
      },
    },
  ],
  presets: [
    {
      id: 'uncomplicated-uri',
      title: { en: 'Uncomplicated URI', 'pt-BR': 'IVAS não complicada' },
      description: {
        en: 'Common viral upper respiratory presentation without warning signs.',
        'pt-BR': 'Quadro viral comum de vias aéreas superiores sem sinais de alerta.',
      },
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
      title: { en: 'Influenza-like illness', 'pt-BR': 'Síndrome gripal' },
      description: {
        en: 'Abrupt systemic symptoms with fever and cough, without severe warning signs.',
        'pt-BR': 'Sintomas sistêmicos abruptos com febre e tosse, sem sinais graves de alerta.',
      },
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
      title: { en: 'Rhinosinusitis concern', 'pt-BR': 'Suspeita de rinossinusite' },
      description: {
        en: 'Persistent or worsening nasal symptoms with sinus features.',
        'pt-BR': 'Sintomas nasais persistentes ou em piora com achados sinusais.',
      },
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
