import type { BooleanField, ClinicalWorkflow, MultiselectField, TextField } from '@/data/workflow'
const durationField: TextField = {
  key: 'duration',
  label: 'Duração dos sintomas',
  type: 'text',
  placeholder: 'Ex.: 2 dias, desde ontem, 10 dias',
  required: true,
}
const onsetPatternField: MultiselectField = {
  key: 'onsetPattern',
  label: 'Início e evolução',
  type: 'multiselect',
  options: [
    {
      label: 'Início súbito',
      value: 'sudden-onset',
      narrative: 'início súbito',
    },
    {
      label: 'Início gradual',
      value: 'gradual-onset',
      narrative: 'início gradual',
    },
    {
      label: 'Piora após melhora inicial',
      value: 'double-sickening',
      narrative: 'piora após melhora inicial',
    },
    {
      label: 'Sintomas persistentes por mais de uma semana',
      value: 'persistent-symptoms',
      narrative: 'sintomas persistentes por mais de uma semana',
    },
  ],
  defaultValue: [],
}
const feverField: BooleanField = {
  key: 'fever',
  label: 'Febre',
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: 'febre' },
}
const measuredTemperatureField: TextField = {
  key: 'measuredTemperature',
  label: 'Temperatura medida',
  type: 'text',
  placeholder: 'Ex.: 38,5 °C em casa',
  displayIf: {
    fieldKey: 'fever',
    equals: true,
  },
}
const respiratorySymptomFields: BooleanField[] = [
  {
    key: 'dryCough',
    label: 'Tosse seca',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'tosse seca' },
  },
  {
    key: 'productiveCough',
    label: 'Tosse produtiva',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'tosse produtiva' },
  },
  {
    key: 'nasalCongestion',
    label: 'Obstrução nasal',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'obstrução nasal' },
  },
  {
    key: 'rhinorrhea',
    label: 'Coriza',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'coriza' },
  },
  {
    key: 'soreThroat',
    label: 'Dor de garganta',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'dor de garganta' },
  },
  {
    key: 'dyspnea',
    label: 'Falta de ar',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'falta de ar' },
  },
  {
    key: 'earAche',
    label: 'Dor de ouvido',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'dor de ouvido' },
  },
]
const systemicSymptomFields: BooleanField[] = [
  {
    key: 'myalgia',
    label: 'Mialgia',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'mialgia' },
  },
  {
    key: 'headache',
    label: 'Cefaleia',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'cefaleia' },
  },
  {
    key: 'fatigue',
    label: 'Fadiga',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'fadiga' },
  },
  {
    key: 'chills',
    label: 'Calafrios',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'calafrios' },
  },
]
const giSymptomFields: BooleanField[] = [
  {
    key: 'nauseaVomiting',
    label: 'Náuseas ou vômitos',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'náuseas ou vômitos' },
  },
  {
    key: 'diarrhea',
    label: 'Diarreia',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'diarreia' },
  },
  {
    key: 'abdominalPain',
    label: 'Dor abdominal',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'dor abdominal' },
  },
]
const redFlagFields: BooleanField[] = [
  {
    key: 'hypoxemiaOrRespiratoryDistress',
    label: 'Hipoxemia ou desconforto respiratório',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'hipoxemia ou desconforto respiratório' },
  },
  {
    key: 'chestPain',
    label: 'Dor torácica',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'dor torácica' },
  },
  {
    key: 'alteredMentalStatus',
    label: 'Alteração do estado mental',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'alteração do estado mental' },
  },
  {
    key: 'severeHeadachePersistentFever',
    label: 'Cefaleia intensa com febre persistente',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'cefaleia intensa com febre persistente' },
  },
  {
    key: 'dehydration',
    label: 'Desidratação ou redução da diurese',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'desidratação ou redução da diurese' },
  },
  {
    key: 'hemoptysis',
    label: 'Hemoptise',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'hemoptise' },
  },
]
const riskFactorField: MultiselectField = {
  key: 'riskFactors',
  label: 'Fatores de risco para complicações',
  type: 'multiselect',
  options: [
    {
      label: 'Idade maior ou igual a 65 anos',
      value: 'older-adult',
      narrative: 'idade maior ou igual a 65 anos',
    },
    { label: 'Gestação', value: 'pregnancy', narrative: 'gestação' },
    {
      label: 'Doença pulmonar crônica',
      value: 'pulmonary-disease',
      narrative: 'doença pulmonar crônica',
    },
    {
      label: 'Doença cardíaca crônica',
      value: 'cardiac-disease',
      narrative: 'doença cardíaca crônica',
    },
    { label: 'Diabetes', value: 'diabetes', narrative: 'diabetes' },
    { label: 'Imunossupressão', value: 'immunosuppression', narrative: 'imunossupressão' },
    { label: 'Doença neurológica', value: 'neurologic-disorder', narrative: 'doença neurológica' },
  ],
  defaultValue: [],
}
const rhinosinusitisFeatureFields: BooleanField[] = [
  {
    key: 'facialPain',
    label: 'Dor facial ou pressão nos seios da face',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'dor facial ou pressão nos seios da face' },
  },
  {
    key: 'purulentNasalDischarge',
    label: 'Secreção nasal purulenta',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'secreção nasal purulenta' },
  },
  {
    key: 'periorbitalSwellingOrDiplopia',
    label: 'Edema periorbitário ou diplopia',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'edema periorbitário ou diplopia' },
  },
]
const hpiTemplate = `
    Paciente apresenta sintomas compatíveis com síndrome gripal/IVAS{% if duration %} há {{ duration }}{% endif %}.
    {% assign respiratorySymptoms = fever | compact_append: dryCough | compact_append: productiveCough | compact_append: nasalCongestion | compact_append: rhinorrhea | compact_append: soreThroat | compact_append: dyspnea | compact_append: earAche %}
    {% if respiratorySymptoms %}Sintomas referidos incluem {{ respiratorySymptoms | list: locale }}.{% endif %}
    {% assign systemicSymptoms = myalgia | compact_append: headache | compact_append: fatigue | compact_append: chills %}
    {% if systemicSymptoms %}Sintomas sistêmicos incluem {{ systemicSymptoms | list: locale }}.{% endif %}
    {% assign giSymptoms = nauseaVomiting | compact_append: diarrhea | compact_append: abdominalPain %}
    {% if giSymptoms %}Sintomas gastrointestinais incluem {{ giSymptoms | list: locale }}.{% endif %}
    {% if onsetPattern %}Padrão de evolução inclui {{ onsetPattern | list: locale }}.{% endif %}
    {% if measuredTemperature %}Temperatura aferida referida: {{ measuredTemperature }}.{% endif %}
    {% if riskFactors %}Fatores de risco para complicações incluem {{ riskFactors | list: locale }}.{% endif %}
    {% assign warningSigns = hypoxemiaOrRespiratoryDistress | compact_append: chestPain | compact_append: alteredMentalStatus | compact_append: severeHeadachePersistentFever | compact_append: dehydration | compact_append: hemoptysis %}
    {% if warningSigns %}Sinais de alerta referidos: {{ warningSigns | list: locale }}.{% endif %}
    {% assign sinusFeatures = facialPain | compact_append: purulentNasalDischarge | compact_append: periorbitalSwellingOrDiplopia %}
    {% if sinusFeatures %}Achados relacionados à rinossinusite incluem {{ sinusFeatures | list: locale }}.{% endif %}
  `
export const sindromeGripalModule: ClinicalWorkflow = {
  id: 'sindrome-gripal',
  language: 'pt-BR',
  title: 'Síndrome gripal / IVAS',
  overview:
    'Estruture a avaliação inicial da síndrome gripal e dos sintomas de vias aéreas superiores, incluindo sinais de alerta, contexto de risco e pistas de rinossinusite.',
  sections: [
    {
      id: 'illness-course',
      title: 'Curso da doença',
      description:
        'Defina duração, início e evolução antes de decidir se o quadro sugere doença viral não complicada ou padrão de complicação.',
      fields: [durationField, onsetPatternField],
    },
    {
      id: 'respiratory-symptoms',
      title: 'Sintomas respiratórios',
      fields: [feverField, measuredTemperatureField, ...respiratorySymptomFields],
    },
    {
      id: 'systemic-and-gi-symptoms',
      title: 'Sintomas sistêmicos e gastrointestinais',
      fields: [...systemicSymptomFields, ...giSymptomFields],
    },
    {
      id: 'risk-context',
      title: 'Fatores de risco',
      fields: [riskFactorField],
    },
    {
      id: 'red-flag-screen',
      title: 'Triagem de sinais de alerta',
      description:
        'Achados positivos aqui devem reduzir o limiar para avaliação urgente ou investigação ampliada.',
      fields: redFlagFields,
    },
    {
      id: 'rhinosinusitis-clues',
      title: 'Pistas de rinossinusite',
      description:
        'Use quando sintomas nasais levantarem suspeita de rinossinusite bacteriana aguda ou complicação orbitária.',
      fields: rhinosinusitisFeatureFields,
    },
  ],
  redFlags: [
    {
      title: 'Desconforto respiratório ou hipoxemia',
      description:
        'Dispneia, taquipneia, baixa saturação, cianose ou aumento do esforço respiratório exigem escalonamento da avaliação.',
    },
    {
      title: 'Sinais neurológicos de alerta',
      description:
        'Alteração do estado mental, convulsões, déficits focais, ataxia ou cefaleia intensa com febre persistente sugerem complicações graves.',
    },
    {
      title: 'Dor torácica ou sintomas cardíacos',
      description:
        'Considere miocardite, pericardite, isquemia, pneumonia ou outras complicações quando houver dor torácica ou palpitações.',
    },
    {
      title: 'Desidratação ou intolerância à via oral',
      description:
        'Vômitos persistentes, baixa ingestão, redução da diurese ou sinais de má perfusão exigem avaliação mais próxima.',
    },
    {
      title: 'Suspeita de complicação orbitária',
      description:
        'Edema periorbitário, diplopia, dor à movimentação ocular ou sintomas visuais indicam necessidade de avaliação urgente.',
    },
  ],
  differentials: [
    {
      title: 'IVAS viral não complicada',
      description:
        'Resfriado comum ou infecção viral de vias aéreas superiores, com sinais vitais normais e sem sinais de alerta.',
    },
    {
      title: 'Influenza',
      description:
        'Febre, mialgia, cefaleia, calafrios, início abrupto, contato epidemiológico, sazonalidade ou contexto de surto.',
    },
    {
      title: 'COVID-19 ou outro vírus respiratório',
      description:
        'Considere conforme circulação local, exposição, status vacinal e disponibilidade de testagem.',
    },
    {
      title: 'Pneumonia adquirida na comunidade',
      description:
        'Tosse com febre, dispneia, alteração pulmonar ao exame físico, hipoxemia, dor pleurítica ou sinais sistêmicos.',
    },
    {
      title: 'Rinossinusite bacteriana aguda',
      description:
        'Sintomas persistentes, piora após melhora inicial ou febre alta com secreção purulenta e dor facial.',
    },
    {
      title: 'Faringoamigdalite estreptocócica',
      description:
        'Dor de garganta com febre, exsudato tonsilar, linfonodos cervicais anteriores dolorosos e ausência de tosse.',
    },
    {
      title: 'Exacerbação de asma ou DPOC',
      description:
        'Sibilância, dispneia, aumento do uso de medicação de resgate ou doença pulmonar obstrutiva conhecida.',
    },
  ],
  workup: [
    {
      title: 'Sem exames de rotina quando não complicado',
      description:
        'Com sinais vitais normais, exame físico tranquilizador e ausência de sinais de alerta, o diagnóstico costuma ser clínico, com manejo sintomático.',
    },
    {
      title: 'Testagem viral direcionada quando muda a conduta',
      description:
        'Considere testagem para influenza/COVID em pacientes de risco, doença grave, surtos, controle de infecção ou quando o resultado mudar a conduta.',
    },
    {
      title: 'Radiografia de tórax se houver suspeita de pneumonia',
      description:
        'Use quando dispneia, hipoxemia, achados pulmonares focais, dor pleurítica ou sinais sistêmicos levantarem suspeita.',
    },
    {
      title: 'Exames laboratoriais conforme gravidade',
      description:
        'Hemograma, eletrólitos, função renal, CK, culturas ou outros exames podem ser apropriados em caso de suspeita de sepse, desidratação, miosite ou doença grave.',
    },
    {
      title: 'Avaliação de complicações da rinossinusite',
      description:
        'Avaliação urgente é apropriada diante de sinais orbitários, toxicidade importante, achados neurológicos ou ausência de melhora conforme esperado.',
    },
  ],
  quickGuides: [
    {
      title: 'IVAS viral não complicada',
      description:
        'Use quando sintomas e exame sugerirem infecção de vias aéreas superiores autolimitada, sem sinais de alerta.',
      criteria: [
        'Sinais vitais normais e exame respiratório tranquilizador',
        'Sem dispneia, hipoxemia, dor torácica, sinais neurológicos ou desidratação',
        'Sintomas dentro do tempo esperado para quadro viral',
      ],
      actions: [
        'Em geral, não são necessários exames de rotina',
        'Orientar tratamento sintomático e sinais de retorno',
        'Evitar antibióticos quando não houver suspeita de complicação bacteriana',
      ],
    },
    {
      title: 'Síndrome gripal / suspeita de influenza',
      description:
        'Use quando início abrupto, sintomas sistêmicos, febre, mialgia, sazonalidade ou exposição levantarem suspeita de influenza.',
      criteria: [
        'Febre ou calafrios com tosse, dor de garganta, mialgia, cefaleia ou fadiga',
        'Paciente de risco, doença grave, surto ou resultado capaz de mudar a conduta',
      ],
      actions: [
        'Considerar testagem direcionada para influenza/COVID quando o resultado muda a conduta',
        'Ampliar avaliação se houver sinais de alerta',
      ],
    },
    {
      title: 'Suspeita de rinossinusite bacteriana aguda',
      description:
        'Use quando sintomas nasais/sinusais seguirem padrão de complicação, e não curso viral não complicado.',
      criteria: [
        'Sintomas persistem por mais de uma semana sem melhora',
        'Piora após melhora inicial',
        'Febre intensa com secreção nasal purulenta ou dor facial por vários dias',
      ],
      actions: [
        'Considerar via de rinossinusite bacteriana e plano de reavaliação',
        'Indicar avaliação urgente se houver edema periorbitário, diplopia ou sintomas visuais',
      ],
    },
  ],
  sourceFigures: [
    {
      title: 'Fluxograma de avaliação e tratamento da rinossinusite aguda',
      source: 'American Family Physician, 2025',
      sourceUrl: 'https://www.aafp.org/afp/2025/0100/acute-rhinosinusitis',
      citation:
        'Butler FM, Hernandez DR. Acute Rhinosinusitis: Rapid Evidence Review. American Family Physician. 2025;111(1):47-53.',
      notes:
        'Figura de referência revisada localmente para critérios de observação, piora após melhora inicial, sintomas persistentes, sintomas graves e sinais orbitários. A imagem não está incluída no app público.',
    },
  ],
  presets: [
    {
      id: 'uncomplicated-uri',
      title: 'IVAS não complicada',
      description: 'Quadro viral comum de vias aéreas superiores sem sinais de alerta.',
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
      title: 'Síndrome gripal',
      description:
        'Sintomas sistêmicos de início abrupto, com febre e tosse, sem sinais graves de alerta.',
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
      title: 'Suspeita de rinossinusite',
      description: 'Sintomas nasais persistentes ou em piora, com achados sinusais.',
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
