import type {
  BooleanField,
  ClinicalWorkflow,
  MultiselectField,
  SelectField,
  TextField,
} from '@/data/workflow'

const durationField: TextField = {
  key: 'duration',
  label: { en: 'Symptom duration', 'pt-BR': 'Duração dos sintomas' },
  type: 'text',
  placeholder: { en: 'Example: 12 hours, 3 days', 'pt-BR': 'Ex.: 12 horas, 3 dias' },
  required: true,
  narrative: { prefix: { en: 'for', 'pt-BR': 'há' } },
}

const diarrheaEpisodesField: TextField = {
  key: 'diarrheaEpisodes',
  label: {
    en: 'Diarrhea episodes in the last 24 hours',
    'pt-BR': 'Episódios de diarreia nas últimas 24 horas',
  },
  type: 'text',
  placeholder: { en: 'Example: 6 episodes', 'pt-BR': 'Ex.: 6 episódios' },
  narrative: {
    prefix: { en: 'with', 'pt-BR': 'com' },
    suffix: { en: 'diarrhea episodes in the last 24 hours', 'pt-BR': 'episódios de diarreia nas últimas 24 horas' },
  },
}

const stoolFeaturesField: MultiselectField = {
  key: 'stoolFeatures',
  label: { en: 'Stool characteristics', 'pt-BR': 'Características das fezes' },
  helperText: {
    en: 'Identify inflammatory, bleeding, or high-risk stool patterns.',
    'pt-BR': 'Identifique características inflamatórias, hemorrágicas ou de alto risco.',
  },
  type: 'multiselect',
  options: [
    { label: { en: 'Watery', 'pt-BR': 'Aquosa' }, value: 'watery', narrative: { en: 'watery stools', 'pt-BR': 'fezes aquosas' } },
    { label: { en: 'Blood in stool', 'pt-BR': 'Sangue nas fezes' }, value: 'blood', narrative: { en: 'blood in stool', 'pt-BR': 'sangue nas fezes' } },
    { label: { en: 'Mucus in stool', 'pt-BR': 'Muco nas fezes' }, value: 'mucus', narrative: { en: 'mucus in stool', 'pt-BR': 'muco nas fezes' } },
    { label: { en: 'Melena or black stools', 'pt-BR': 'Melena ou fezes enegrecidas' }, value: 'melena', narrative: { en: 'melena or black stools', 'pt-BR': 'melena ou fezes enegrecidas' } },
  ],
  defaultValue: [],
}

const vomitingField: BooleanField = {
  key: 'vomiting',
  label: { en: 'Vomiting', 'pt-BR': 'Vômitos' },
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: { en: 'vomiting', 'pt-BR': 'vômitos' } },
}

const vomitingEpisodesField: TextField = {
  key: 'vomitingEpisodes',
  label: {
    en: 'Vomiting episodes in the last 24 hours',
    'pt-BR': 'Episódios de vômitos nas últimas 24 horas',
  },
  type: 'text',
  placeholder: { en: 'Example: 5 episodes', 'pt-BR': 'Ex.: 5 episódios' },
  displayIf: { fieldKey: 'vomiting', equals: true },
  narrative: {
    prefix: { en: 'with', 'pt-BR': 'com' },
    suffix: { en: 'vomiting episodes in the last 24 hours', 'pt-BR': 'episódios de vômitos nas últimas 24 horas' },
  },
}

const feverField: BooleanField = {
  key: 'fever',
  label: { en: 'Fever', 'pt-BR': 'Febre' },
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: { en: 'fever', 'pt-BR': 'febre' } },
}

const maxTemperatureField: TextField = {
  key: 'maxTemperature',
  label: { en: 'Maximum temperature', 'pt-BR': 'Temperatura máxima' },
  type: 'text',
  placeholder: { en: 'Example: 39 C', 'pt-BR': 'Ex.: 39 °C' },
  displayIf: { fieldKey: 'fever', equals: true },
  narrative: {
    prefix: { en: 'maximum temperature', 'pt-BR': 'temperatura máxima de' },
  },
}

const feverDurationField: TextField = {
  key: 'feverDuration',
  label: { en: 'Fever duration', 'pt-BR': 'Duração da febre' },
  type: 'text',
  placeholder: { en: 'Example: 2 days, 72 hours', 'pt-BR': 'Ex.: 2 dias, 72 horas' },
  displayIf: { fieldKey: 'fever', equals: true },
  narrative: {
    prefix: { en: 'fever duration', 'pt-BR': 'febre há' },
  },
}

const associatedSymptomsField: MultiselectField = {
  key: 'associatedSymptoms',
  label: { en: 'Associated symptoms', 'pt-BR': 'Sintomas associados' },
  type: 'multiselect',
  options: [
    { label: { en: 'Nausea', 'pt-BR': 'Náuseas' }, value: 'nausea', narrative: { en: 'nausea', 'pt-BR': 'náuseas' } },
    { label: { en: 'Crampy abdominal pain', 'pt-BR': 'Dor abdominal em cólica' }, value: 'crampy-pain', narrative: { en: 'crampy abdominal pain', 'pt-BR': 'dor abdominal em cólica' } },
    { label: { en: 'Myalgias', 'pt-BR': 'Mialgias' }, value: 'myalgias', narrative: { en: 'myalgias', 'pt-BR': 'mialgias' } },
    { label: { en: 'Malaise', 'pt-BR': 'Mal-estar' }, value: 'malaise', narrative: { en: 'malaise', 'pt-BR': 'mal-estar' } },
    { label: { en: 'Decreased appetite', 'pt-BR': 'Redução do apetite' }, value: 'decreased-appetite', narrative: { en: 'decreased appetite', 'pt-BR': 'redução do apetite' } },
  ],
  defaultValue: [],
}

const fluidIntakeField: SelectField = {
  key: 'fluidIntake',
  label: { en: 'Fluid intake', 'pt-BR': 'Ingesta hídrica' },
  type: 'select',
  options: [
    { label: { en: 'Normal', 'pt-BR': 'Normal' }, value: 'normal', narrative: { en: 'normal fluid intake', 'pt-BR': 'ingesta hídrica preservada' } },
    { label: { en: 'Decreased', 'pt-BR': 'Reduzida' }, value: 'decreased', narrative: { en: 'decreased fluid intake', 'pt-BR': 'ingesta hídrica reduzida' } },
    { label: { en: 'Unable to tolerate oral fluids', 'pt-BR': 'Não tolera líquidos por via oral' }, value: 'unable', narrative: { en: 'inability to tolerate oral fluids', 'pt-BR': 'intolerância a líquidos por via oral' } },
  ],
}

const urineOutputField: SelectField = {
  key: 'urineOutput',
  label: { en: 'Urine output', 'pt-BR': 'Diurese' },
  type: 'select',
  options: [
    { label: { en: 'Normal', 'pt-BR': 'Normal' }, value: 'normal', narrative: { en: 'normal urine output', 'pt-BR': 'diurese preservada' } },
    { label: { en: 'Decreased', 'pt-BR': 'Reduzida' }, value: 'decreased', narrative: { en: 'decreased urine output', 'pt-BR': 'diurese reduzida' } },
    { label: { en: 'Absent or minimal', 'pt-BR': 'Ausente ou mínima' }, value: 'absent', narrative: { en: 'absent or minimal urine output', 'pt-BR': 'diurese ausente ou mínima' } },
  ],
}

const oralToleranceField: BooleanField = {
  key: 'toleratingOralFluids',
  label: { en: 'Tolerating oral fluids', 'pt-BR': 'Tolera líquidos por via oral' },
  type: 'boolean',
  defaultValue: false,
  narrative: {
    whenTrue: { en: 'tolerating oral fluids', 'pt-BR': 'tolerando líquidos por via oral' },
  },
}

const dehydrationSignsField: MultiselectField = {
  key: 'dehydrationSigns',
  label: { en: 'Dehydration signs', 'pt-BR': 'Sinais de desidratação' },
  helperText: {
    en: 'Clinical Dehydration Scale elements and related bedside findings.',
    'pt-BR': 'Elementos da Escala Clínica de Desidratação e achados clínicos relacionados.',
  },
  type: 'multiselect',
  options: [
    { label: { en: 'Sunken eyes', 'pt-BR': 'Olhos encovados' }, value: 'sunken-eyes', narrative: { en: 'sunken eyes', 'pt-BR': 'olhos encovados' } },
    { label: { en: 'Dry mucous membranes', 'pt-BR': 'Mucosas secas' }, value: 'dry-mucosa', narrative: { en: 'dry mucous membranes', 'pt-BR': 'mucosas secas' } },
    { label: { en: 'Decreased skin turgor', 'pt-BR': 'Turgor cutâneo reduzido' }, value: 'poor-turgor', narrative: { en: 'decreased skin turgor', 'pt-BR': 'turgor cutâneo reduzido' } },
    { label: { en: 'Abnormal general appearance', 'pt-BR': 'Estado geral alterado' }, value: 'abnormal-appearance', narrative: { en: 'abnormal general appearance', 'pt-BR': 'estado geral alterado' } },
    { label: { en: 'Postural dizziness or syncope', 'pt-BR': 'Tontura postural ou síncope' }, value: 'postural-symptoms', narrative: { en: 'postural dizziness or syncope', 'pt-BR': 'tontura postural ou síncope' } },
  ],
  defaultValue: [],
}

const abdominalPainSeverityField: SelectField = {
  key: 'abdominalPainSeverity',
  label: { en: 'Abdominal pain severity', 'pt-BR': 'Gravidade da dor abdominal' },
  type: 'select',
  options: [
    { label: { en: 'None', 'pt-BR': 'Ausente' }, value: 'none', narrative: { en: 'no abdominal pain', 'pt-BR': 'sem dor abdominal' } },
    { label: { en: 'Mild cramping', 'pt-BR': 'Cólica leve' }, value: 'mild-cramping', narrative: { en: 'mild cramping abdominal pain', 'pt-BR': 'dor abdominal em cólica leve' } },
    { label: { en: 'Moderate', 'pt-BR': 'Moderada' }, value: 'moderate', narrative: { en: 'moderate abdominal pain', 'pt-BR': 'dor abdominal moderada' } },
    { label: { en: 'Severe or peritoneal signs', 'pt-BR': 'Intensa ou sinais peritoneais' }, value: 'severe-peritoneal', narrative: { en: 'severe abdominal pain or peritoneal signs', 'pt-BR': 'dor abdominal intensa ou sinais peritoneais' } },
  ],
}

const exposureFields: BooleanField[] = [
  {
    key: 'recentAntibiotics',
    label: { en: 'Recent antibiotic use', 'pt-BR': 'Uso recente de antibiótico' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'recent antibiotic use', 'pt-BR': 'uso recente de antibiótico' } },
  },
  {
    key: 'recentHospitalization',
    label: { en: 'Recent hospitalization or nursing home exposure', 'pt-BR': 'Internação recente ou exposição a instituição de longa permanência' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'recent hospitalization or nursing home exposure', 'pt-BR': 'internação recente ou exposição a instituição de longa permanência' } },
  },
  {
    key: 'recentTravel',
    label: { en: 'Recent travel', 'pt-BR': 'Viagem recente' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'recent travel', 'pt-BR': 'viagem recente' } },
  },
  {
    key: 'sickContactsOrOutbreak',
    label: { en: 'Sick contacts or outbreak setting', 'pt-BR': 'Contato com doentes ou contexto de surto' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'sick contacts or outbreak setting', 'pt-BR': 'contato com doentes ou contexto de surto' } },
  },
  {
    key: 'publicHealthExposure',
    label: { en: 'Food handler, daycare, healthcare, or nursing home exposure', 'pt-BR': 'Manipulador de alimentos, creche, saúde ou instituição de longa permanência' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'public health exposure risk', 'pt-BR': 'risco de exposição com relevância em saúde pública' } },
  },
  {
    key: 'immunocompromised',
    label: { en: 'Immunocompromised', 'pt-BR': 'Imunocomprometido' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'immunocompromised status', 'pt-BR': 'imunossupressão' } },
  },
]

const antibioticDetailsField: TextField = {
  key: 'antibioticDetails',
  label: { en: 'Antibiotic and timing', 'pt-BR': 'Antibiótico e temporalidade' },
  type: 'text',
  placeholder: { en: 'Example: amoxicillin-clavulanate, finished 1 week ago', 'pt-BR': 'Ex.: amoxicilina-clavulanato, terminou há 1 semana' },
  displayIf: { fieldKey: 'recentAntibiotics', equals: true },
  narrative: { prefix: { en: 'antibiotic details', 'pt-BR': 'detalhes do antibiótico' } },
}

const travelDetailsField: TextField = {
  key: 'travelDetails',
  label: { en: 'Travel location and timing', 'pt-BR': 'Local e período da viagem' },
  type: 'text',
  placeholder: { en: 'Example: Mexico, returned 1 week ago', 'pt-BR': 'Ex.: México, retornou há 1 semana' },
  displayIf: { fieldKey: 'recentTravel', equals: true },
  narrative: { prefix: { en: 'travel details', 'pt-BR': 'detalhes da viagem' } },
}

const immunocompromiseDetailsField: TextField = {
  key: 'immunocompromiseDetails',
  label: { en: 'Type of immunocompromise', 'pt-BR': 'Tipo de imunossupressão' },
  type: 'text',
  placeholder: { en: 'Example: chemotherapy, transplant, steroids, HIV/AIDS', 'pt-BR': 'Ex.: quimioterapia, transplante, corticoide, HIV/AIDS' },
  displayIf: { fieldKey: 'immunocompromised', equals: true },
  narrative: { prefix: { en: 'immunocompromise details', 'pt-BR': 'detalhes da imunossupressão' } },
}

const highRiskFields: BooleanField[] = [
  {
    key: 'alteredMentalStatus',
    label: { en: 'Altered mental status or confusion', 'pt-BR': 'Confusão ou alteração do estado mental' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'altered mental status or confusion', 'pt-BR': 'confusão ou alteração do estado mental' } },
  },
  {
    key: 'shockOrSevereDehydration',
    label: { en: 'Shock or severe dehydration', 'pt-BR': 'Choque ou desidratação grave' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'shock or severe dehydration', 'pt-BR': 'choque ou desidratação grave' } },
  },
  {
    key: 'failedOralRehydration',
    label: { en: 'Failure of oral rehydration', 'pt-BR': 'Falha da reidratação oral' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'failure of oral rehydration', 'pt-BR': 'falha da reidratação oral' } },
  },
  {
    key: 'persistentVomiting',
    label: { en: 'Persistent vomiting >=48 hours', 'pt-BR': 'Vômitos persistentes >=48 horas' },
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: { en: 'persistent vomiting for 48 hours or more', 'pt-BR': 'vômitos persistentes há 48 horas ou mais' } },
  },
]

const hpiTemplate = {
  en: `
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
  `,
  'pt-BR': `
    Paciente apresenta sintomas compatíveis com gastroenterocolite aguda{% if duration %} {{ duration }}{% endif %}.
    {% assign stoolAndFrequency = stoolFeatures | compact_append: diarrheaEpisodes %}
    {% if stoolAndFrequency %}Padrão da diarreia inclui {{ stoolAndFrequency | list: locale }}.{% endif %}
    {% assign emesis = vomiting | compact_append: vomitingEpisodes %}
    {% if emesis %}Vômitos incluem {{ emesis | list: locale }}.{% endif %}
    {% assign feverDetails = fever | compact_append: maxTemperature | compact_append: feverDuration %}
    {% if feverDetails %}Dados de febre incluem {{ feverDetails | list: locale }}.{% endif %}
    {% if associatedSymptoms %}Sintomas associados incluem {{ associatedSymptoms | list: locale }}.{% endif %}
    {% assign hydration = fluidIntake | compact_append: urineOutput | compact_append: toleratingOralFluids %}
    {% if hydration %}Estado de hidratação caracterizado por {{ hydration | list: locale }}.{% endif %}
    {% if dehydrationSigns %}Sinais de desidratação incluem {{ dehydrationSigns | list: locale }}.{% endif %}
    {% if abdominalPainSeverity %}Dor abdominal descrita como {{ abdominalPainSeverity }}.{% endif %}
    {% assign exposures = recentAntibiotics | compact_append: recentHospitalization | compact_append: recentTravel | compact_append: sickContactsOrOutbreak | compact_append: publicHealthExposure | compact_append: immunocompromised %}
    {% if exposures %}Fatores de risco identificados incluem {{ exposures | list: locale }}.{% endif %}
    {% assign details = antibioticDetails | compact_append: travelDetails | compact_append: immunocompromiseDetails %}
    {% if details %}Detalhes adicionais: {{ details | list: locale }}.{% endif %}
    {% assign warningSigns = alteredMentalStatus | compact_append: shockOrSevereDehydration | compact_append: failedOralRehydration | compact_append: persistentVomiting %}
    {% if warningSigns %}Sinais de alerta incluem {{ warningSigns | list: locale }}.{% endif %}
  `,
}

export const gastroenterocolitisModule: ClinicalWorkflow = {
  id: 'gastroenterocolitis',
  title: {
    en: 'Acute Gastroenterocolitis',
    'pt-BR': 'Gastroenterocolite Aguda',
  },
  overview: {
    en: 'Structure acute diarrhea and vomiting evaluation around duration, stool character, hydration, invasive features, exposures, testing indications, and disposition.',
    'pt-BR': 'Estruture a avaliação da diarreia e dos vômitos agudos com foco na duração, características das fezes, estado de hidratação, sinais de invasão, fatores de exposição, indicações de exames e definição da conduta.',
  },
  sections: [
    {
      id: 'initial-characterization',
      title: { en: 'Initial characterization', 'pt-BR': 'Caracterização inicial' },
      description: {
        en: 'Start with duration, stool pattern, frequency, vomiting, and fever to determine acuity and inflammatory risk.',
        'pt-BR': 'Comece pela duração dos sintomas, padrão das fezes, frequência das evacuações, presença de vômitos e febre para definir a gravidade e o risco de doença inflamatória ou invasiva.',
      },
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
      title: { en: 'Hydration and abdominal severity', 'pt-BR': 'Hidratação e gravidade abdominal' },
      description: {
        en: 'Assess oral tolerance, urine output, dehydration signs, and abdominal pain severity before deciding disposition.',
        'pt-BR': 'Avalie a tolerância à ingestão oral, a diurese, os sinais de desidratação e a gravidade da dor abdominal antes de definir a conduta e o destino do paciente.',
      },
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
      title: { en: 'Exposure and host risk', 'pt-BR': 'Exposição e fatores de risco do paciente' },
      description: {
        en: 'Look for C. difficile risk, travel-associated illness, outbreak context, and immunocompromise.',
        'pt-BR': 'Investigue fatores de risco para C. difficile, doenças associadas a viagens, contextos de surto e condições de imunossupressão.',
      },
      fields: [
        ...exposureFields,
        antibioticDetailsField,
        travelDetailsField,
        immunocompromiseDetailsField,
      ],
    },
    {
      id: 'red-flag-screen',
      title: { en: 'Red flag screen', 'pt-BR': 'Triagem de sinais de alerta' },
      description: {
        en: 'Positive findings here should lower the threshold for stool studies, IV hydration, observation, admission, or emergency escalation.',
        'pt-BR': 'Achados positivos aqui devem reduzir o limiar para exames de fezes, hidratação venosa, observação, internação ou escalonamento emergencial.',
      },
      fields: highRiskFields,
    },
  ],
  redFlags: [
    {
      title: { en: 'Shock or severe dehydration', 'pt-BR': 'Choque ou desidratação grave' },
      description: {
        en: 'Hemodynamic instability, severe dehydration, syncope, or postural hypotension requires urgent rehydration and possible admission.',
        'pt-BR': 'Instabilidade hemodinâmica, desidratação grave, síncope ou hipotensão postural exige reidratação urgente e possível internação.',
      },
    },
    {
      title: { en: 'Altered mental status', 'pt-BR': 'Alteração do estado mental' },
      description: {
        en: 'May reflect severe dehydration, sepsis, or electrolyte abnormality.',
        'pt-BR': 'Pode refletir desidratação grave, sepse ou distúrbio eletrolítico.',
      },
    },
    {
      title: { en: 'Bloody or mucoid diarrhea', 'pt-BR': 'Diarreia com sangue ou muco' },
      description: {
        en: 'Suggests inflammatory or invasive diarrhea and raises concern for STEC, Shigella, IBD, or ischemic colitis.',
        'pt-BR': 'Sugere diarreia inflamatória ou invasiva e aumenta a suspeita de STEC, Shigella, DII ou colite isquêmica.',
      },
    },
    {
      title: { en: 'Persistent high fever', 'pt-BR': 'Febre alta persistente' },
      description: {
        en: 'Fever around 38.5 C or higher, especially persistent, suggests invasive bacterial disease or systemic infection.',
        'pt-BR': 'Febre em torno de 38,5 °C ou mais, especialmente persistente, sugere doença bacteriana invasiva ou infecção sistêmica.',
      },
    },
    {
      title: { en: 'Severe abdominal pain or peritoneal signs', 'pt-BR': 'Dor abdominal intensa ou sinais peritoneais' },
      description: {
        en: 'Consider appendicitis, ischemic colitis, perforation, obstruction, toxic megacolon, or other surgical pathology.',
        'pt-BR': 'Considere apendicite, colite isquêmica, perfuração, obstrução, megacólon tóxico ou outra patologia cirúrgica.',
      },
    },
    {
      title: { en: 'Immunocompromised host with diarrhea', 'pt-BR': 'Imunossupressão com diarreia' },
      description: {
        en: 'Raises risk for opportunistic pathogens and severe or invasive disease.',
        'pt-BR': 'Aumenta risco de patógenos oportunistas e doença grave ou invasiva.',
      },
    },
  ],
  differentials: [
    {
      title: { en: 'Viral gastroenteritis', 'pt-BR': 'Gastroenterite viral' },
      description: {
        en: 'Watery diarrhea, vomiting, sick contacts or outbreak setting, and self-limited course.',
        'pt-BR': 'Diarreia aquosa, vômitos, contato com doentes ou contexto de surto e evolução autolimitada.',
      },
    },
    {
      title: { en: 'Food toxin-mediated illness', 'pt-BR': 'Intoxicação alimentar por toxina pré-formada' },
      description: {
        en: 'Abrupt vomiting-predominant illness after shared food exposure with rapid resolution.',
        'pt-BR': 'Quadro abrupto predominante por vômitos após alimento compartilhado, com resolução rápida.',
      },
    },
    {
      title: { en: 'Invasive bacterial diarrhea', 'pt-BR': 'Diarreia bacteriana invasiva' },
      description: {
        en: 'Bloody or mucoid stools, fever, severe symptoms, travel, or outbreak context.',
        'pt-BR': 'Sangue ou muco nas fezes, febre, sintomas graves, viagem ou contexto de surto.',
      },
    },
    {
      title: { en: 'C. difficile infection', 'pt-BR': 'Infecção por C. difficile' },
      description: {
        en: 'Recent antibiotics, recent hospitalization, nursing home exposure, or healthcare-associated diarrhea.',
        'pt-BR': 'Uso recente de antibiótico, internação recente, instituição de longa permanência ou diarreia associada a serviços de saúde.',
      },
    },
    {
      title: { en: 'Hemolytic uremic syndrome', 'pt-BR': 'Síndrome hemolítico-urêmica' },
      description: {
        en: 'Bloody diarrhea with STEC concern, anemia, thrombocytopenia, acute kidney injury, or decreased urine output.',
        'pt-BR': 'Diarreia sanguinolenta com suspeita de STEC, anemia, plaquetopenia, lesão renal aguda ou redução da diurese.',
      },
    },
    {
      title: { en: 'Surgical abdomen or ischemic colitis', 'pt-BR': 'Abdome cirúrgico ou colite isquêmica' },
      description: {
        en: 'Severe localized pain, peritoneal signs, older age, ileus, or sudden bloody diarrhea with vascular risk.',
        'pt-BR': 'Dor localizada intensa, sinais peritoneais, idade avançada, íleo ou diarreia sanguinolenta súbita com risco vascular.',
      },
    },
    {
      title: { en: 'Parasitic infection', 'pt-BR': 'Infecção parasitária' },
      description: {
        en: 'Persistent symptoms beyond 7 days, travel, immunocompromise, or exposure risk.',
        'pt-BR': 'Sintomas persistentes por mais de 7 dias, viagem, imunossupressão ou exposição de risco.',
      },
    },
  ],
  workup: [
    {
      title: { en: 'Hydration assessment', 'pt-BR': 'Avaliação de hidratação' },
      description: {
        en: 'Assess general appearance, eyes, mucous membranes, skin turgor, urine output, vital signs, and orthostasis when relevant.',
        'pt-BR': 'Avalie estado geral, olhos, mucosas, turgor cutâneo, diurese, sinais vitais e ortostatismo quando relevante.',
      },
    },
    {
      title: { en: 'Stool PCR or culture when indicated', 'pt-BR': 'PCR ou cultura de fezes quando indicado' },
      description: {
        en: 'Most useful with bloody or mucoid stool, persistent fever, severe illness, immunocompromise, outbreak concern, recent travel, antibiotics, hospitalization, or duration >7 days.',
        'pt-BR': 'Mais útil com sangue ou muco nas fezes, febre persistente, doença grave, imunossupressão, surto, viagem recente, antibióticos, internação ou duração >7 dias.',
      },
    },
    {
      title: { en: 'Shiga toxin or STEC testing', 'pt-BR': 'Pesquisa de toxina Shiga ou STEC' },
      description: {
        en: 'Consider for bloody diarrhea, especially without fever, to monitor for HUS and avoid inappropriate antibiotics.',
        'pt-BR': 'Considere em diarreia sanguinolenta, especialmente sem febre, para monitorar SHU e evitar antibiótico inadequado.',
      },
    },
    {
      title: { en: 'C. difficile testing', 'pt-BR': 'Teste para C. difficile' },
      description: {
        en: 'Use with recent antibiotics, recent hospitalization, nursing home exposure, or healthcare-associated diarrhea.',
        'pt-BR': 'Use com antibiótico recente, internação recente, instituição de longa permanência ou diarreia associada a serviços de saúde.',
      },
    },
    {
      title: { en: 'BMP and CBC based on severity', 'pt-BR': 'Hemograma, eletrólitos e função renal conforme a gravidade' },
      description: {
        en: 'Use for moderate-to-severe dehydration, altered mental status, older age, comorbidities, suspected sepsis, HUS concern, or need for IV fluids.',
        'pt-BR': 'Use em desidratação moderada a grave, alteração mental, idosos, comorbidades, suspeita de sepse, SHU ou necessidade de hidratação venosa.',
      },
    },
    {
      title: { en: 'Abdominal imaging when surgical concern exists', 'pt-BR': 'Imagem abdominal quando houver suspeita cirúrgica' },
      description: {
        en: 'Consider with severe localized pain, peritoneal signs, suspected obstruction, toxic megacolon, ischemia, or worsening trajectory.',
        'pt-BR': 'Considere com dor localizada intensa, sinais peritoneais, suspeita de obstrução, megacólon tóxico, isquemia ou piora evolutiva.',
      },
    },
  ],
  quickGuides: [
    {
      title: { en: 'Mild watery diarrhea', 'pt-BR': 'Diarreia aquosa leve' },
      description: {
        en: 'Typical outpatient pathway when hydration is reassuring and no high-risk features are present.',
        'pt-BR': 'Apresentação típica de manejo ambulatorial quando o estado de hidratação é satisfatório e não há sinais de alto risco.',
      },
      criteria: [
        { en: 'Watery diarrhea without blood or mucus', 'pt-BR': 'Diarreia aquosa sem sangue ou muco' },
        { en: 'No persistent high fever, severe pain, sepsis signs, or immunocompromise', 'pt-BR': 'Sem febre alta persistente, dor intensa, sinais de sepse ou imunossupressão' },
        { en: 'Tolerating oral hydration with no or mild dehydration', 'pt-BR': 'Tolera hidratação oral, sem desidratação ou com desidratação leve' },
      ],
      actions: [
        { en: 'Prioritize oral rehydration and symptom control', 'pt-BR': 'Priorizar reidratação oral e controle sintomático' },
        { en: 'No routine stool testing is usually needed', 'pt-BR': 'Em geral, não é necessário exame de fezes de rotina' },
        { en: 'Provide return precautions for dehydration, blood, fever, or worsening pain', 'pt-BR': 'Orientar retorno por desidratação, sangue, febre ou piora da dor' },
      ],
    },
    {
      title: { en: 'Inflammatory or invasive diarrhea concern', 'pt-BR': 'Suspeita de diarreia inflamatória ou invasiva' },
      description: {
        en: 'Use when stool features or systemic findings suggest invasive pathogens or complications.',
        'pt-BR': 'Use quando características das fezes ou manifestações sistêmicas sugerem patógenos invasivos ou complicações.',
      },
      criteria: [
        { en: 'Bloody or mucoid stool', 'pt-BR': 'Sangue ou muco nas fezes' },
        { en: 'Persistent high fever or severe illness', 'pt-BR': 'Febre alta persistente ou doença grave' },
        { en: 'Severe abdominal pain or systemic toxicity', 'pt-BR': 'Dor abdominal intensa ou toxicidade sistêmica' },
      ],
      actions: [
        { en: 'Consider stool PCR or culture', 'pt-BR': 'Considerar PCR ou cultura de fezes' },
        { en: 'Consider Shiga toxin/STEC testing when bloody diarrhea is present', 'pt-BR': 'Considerar toxina Shiga/STEC quando houver diarreia sanguinolenta' },
        { en: 'Escalate if peritoneal signs, sepsis, or severe dehydration are present', 'pt-BR': 'Escalonar se houver sinais peritoneais, sepse ou desidratação grave' },
      ],
    },
    {
      title: { en: 'C. difficile testing pathway', 'pt-BR': 'Via de investigação para C. difficile' },
      description: {
        en: 'Use when diarrhea occurs after antibiotic or healthcare exposure.',
        'pt-BR': 'Use quando a diarreia ocorre após antibiótico ou exposição a serviços de saúde.',
      },
      criteria: [
        { en: 'Recent antibiotic use', 'pt-BR': 'Uso recente de antibiótico' },
        { en: 'Recent hospitalization or nursing home exposure', 'pt-BR': 'Internação recente ou exposição a instituição de longa permanência' },
        { en: 'Healthcare-associated diarrhea', 'pt-BR': 'Diarreia associada a serviços de saúde' },
      ],
      actions: [
        { en: 'Consider C. difficile testing', 'pt-BR': 'Considerar teste para C. difficile' },
        { en: 'Assess severity, renal function, leukocytosis, and hydration status', 'pt-BR': 'Avaliar gravidade, função renal, leucocitose e hidratação' },
      ],
    },
    {
      title: { en: 'Observation or admission concern', 'pt-BR': 'Considerar observação ou internação' },
      description: {
        en: 'Use when dehydration, vomiting, host risk, or systemic illness makes outpatient care unsafe.',
        'pt-BR': 'Use quando desidratação, vômitos, fatores de risco do paciente ou doença sistêmica tornam o manejo ambulatorial inseguro.',
      },
      criteria: [
        { en: 'Moderate-to-severe dehydration or failed oral rehydration', 'pt-BR': 'Desidratação moderada a grave ou falha da reidratação oral' },
        { en: 'Persistent vomiting preventing oral intake', 'pt-BR': 'Vômitos persistentes impedindo ingesta oral' },
        { en: 'Altered mental status, AKI/electrolyte concern, immunocompromise, or suspected HUS', 'pt-BR': 'Alteração mental, suspeita de LRA/distúrbio eletrolítico, imunossupressão ou suspeita de SHU' },
      ],
      actions: [
        { en: 'Consider IV hydration, labs, reassessment, observation, or admission', 'pt-BR': 'Considerar hidratação venosa, exames, reavaliação, observação ou internação' },
        { en: 'Escalate urgently for shock, sepsis, toxic megacolon, perforation, or surgical abdomen', 'pt-BR': 'Escalonar com urgência em choque, sepse, megacólon tóxico, perfuração ou abdome cirúrgico' },
      ],
    },
  ],
  sourceFigures: [
    {
      title: {
        en: 'Evaluation and management of acute diarrhea',
        'pt-BR': 'Avaliação e manejo da diarreia aguda',
      },
      source: {
        en: 'American Family Physician, 2022',
        'pt-BR': 'American Family Physician, 2022',
      },
      sourceUrl: 'https://www.aafp.org/afp/2022/0700/acute-diarrhea',
      citation: {
        en: 'Meisenheimer ES, Epstein C, Thiel D. Acute Diarrhea in Adults. American Family Physician. 2022;106(1):72-80.',
        'pt-BR': 'Meisenheimer ES, Epstein C, Thiel D. Acute Diarrhea in Adults. American Family Physician. 2022;106(1):72-80.',
      },
      notes: {
        en: 'Source figure reviewed locally for dehydration-first management, testing triggers, travel pathway, outbreak risk, and STEC caution.',
        'pt-BR': 'Figura de referência revisada localmente para manejo baseado inicialmente na hidratação, gatilhos para exames, avaliação de viajantes, risco de surtos e cautela com STEC.',
      },
    },
    {
      title: {
        en: 'Diagnostic approach to acute diarrhea',
        'pt-BR': 'Abordagem diagnóstica da diarreia aguda',
      },
      source: {
        en: "Yamada's Textbook of Gastroenterology, 7th edition, 2022",
        'pt-BR': "Yamada's Textbook of Gastroenterology, 7ª edição, 2022",
      },
      sourceUrl: 'https://onlinelibrary.wiley.com/doi/10.1002/9781119600206.ch34',
      citation: {
        en: "Hecht GA, Trieu JA. Approach to the patient with diarrhea. Yamada's Textbook of Gastroenterology. 7th ed. 2022.",
        'pt-BR': "Hecht GA, Trieu JA. Approach to the patient with diarrhea. Yamada's Textbook of Gastroenterology. 7ª ed. 2022.",
      },
      notes: {
        en: 'Source algorithm reviewed locally for watery versus bloody diarrhea branching, C. difficile risk, persistent diarrhea, and immunocompromised pathways.',
        'pt-BR': 'Algoritmo de referência revisado localmente para diferenciação entre diarreia aquosa e sanguinolenta, risco de C. difficile, diarreia persistente e manejo de pacientes imunossuprimidos.',
      },
    },
  ],
  presets: [
    {
      id: 'mild-watery-diarrhea',
      title: { en: 'Mild watery diarrhea', 'pt-BR': 'Diarreia aquosa leve' },
      description: {
        en: 'Reassuring outpatient pattern with oral tolerance and no high-risk features.',
        'pt-BR': 'Padrão ambulatorial tranquilizador com tolerância oral e sem sinais de alto risco.',
      },
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
      title: { en: 'Inflammatory diarrhea concern', 'pt-BR': 'Suspeita de diarreia inflamatória' },
      description: {
        en: 'Bloody or mucoid stool with fever or severe abdominal pain.',
        'pt-BR': 'Sangue ou muco nas fezes com febre ou dor abdominal intensa.',
      },
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
      title: { en: 'Dehydration or ORT failure', 'pt-BR': 'Desidratação ou falha de TRO' },
      description: {
        en: 'Vomiting, poor intake, decreased urine output, or dehydration signs.',
        'pt-BR': 'Vômitos, baixa ingesta, diurese reduzida ou sinais de desidratação.',
      },
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
      title: { en: 'C. difficile risk', 'pt-BR': 'Risco de C. difficile' },
      description: {
        en: 'Diarrhea after antibiotics, hospitalization, or nursing home exposure.',
        'pt-BR': 'Diarreia após antibiótico, internação ou instituição de longa permanência.',
      },
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
