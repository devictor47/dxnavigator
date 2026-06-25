import type {
  BooleanField,
  ClinicalWorkflow,
  MultiselectField,
  SelectField,
  TextField,
} from '@/data/workflow'
const durationField: TextField = {
  key: 'duration',
  label: 'Duração dos sintomas',
  type: 'text',
  placeholder: 'Ex.: 12 horas, 3 dias',
  required: true,
  narrative: { prefix: 'há' },
}
const diarrheaEpisodesField: TextField = {
  key: 'diarrheaEpisodes',
  label: 'Episódios de diarreia nas últimas 24 horas',
  type: 'text',
  placeholder: 'Ex.: 6 episódios',
  narrative: {
    prefix: 'com',
    suffix: 'episódios de diarreia nas últimas 24 horas',
  },
}
const stoolFeaturesField: MultiselectField = {
  key: 'stoolFeatures',
  label: 'Características das fezes',
  helperText: 'Identifique características inflamatórias, hemorrágicas ou de alto risco.',
  type: 'multiselect',
  options: [
    { label: 'Aquosa', value: 'watery', narrative: 'fezes aquosas' },
    { label: 'Sangue nas fezes', value: 'blood', narrative: 'sangue nas fezes' },
    { label: 'Muco nas fezes', value: 'mucus', narrative: 'muco nas fezes' },
    {
      label: 'Melena ou fezes enegrecidas',
      value: 'melena',
      narrative: 'melena ou fezes enegrecidas',
    },
  ],
  defaultValue: [],
}
const vomitingField: BooleanField = {
  key: 'vomiting',
  label: 'Vômitos',
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: 'vômitos' },
}
const vomitingEpisodesField: TextField = {
  key: 'vomitingEpisodes',
  label: 'Episódios de vômitos nas últimas 24 horas',
  type: 'text',
  placeholder: 'Ex.: 5 episódios',
  displayIf: { fieldKey: 'vomiting', equals: true },
  narrative: {
    prefix: 'com',
    suffix: 'episódios de vômitos nas últimas 24 horas',
  },
}
const feverField: BooleanField = {
  key: 'fever',
  label: 'Febre',
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: 'febre' },
}
const maxTemperatureField: TextField = {
  key: 'maxTemperature',
  label: 'Temperatura máxima',
  type: 'text',
  placeholder: 'Ex.: 39 °C',
  displayIf: { fieldKey: 'fever', equals: true },
  narrative: {
    prefix: 'temperatura máxima de',
  },
}
const feverDurationField: TextField = {
  key: 'feverDuration',
  label: 'Duração da febre',
  type: 'text',
  placeholder: 'Ex.: 2 dias, 72 horas',
  displayIf: { fieldKey: 'fever', equals: true },
  narrative: {
    prefix: 'febre há',
  },
}
const associatedSymptomsField: MultiselectField = {
  key: 'associatedSymptoms',
  label: 'Sintomas associados',
  type: 'multiselect',
  options: [
    { label: 'Náuseas', value: 'nausea', narrative: 'náuseas' },
    {
      label: 'Dor abdominal em cólica',
      value: 'crampy-pain',
      narrative: 'dor abdominal em cólica',
    },
    { label: 'Mialgias', value: 'myalgias', narrative: 'mialgias' },
    { label: 'Mal-estar', value: 'malaise', narrative: 'mal-estar' },
    { label: 'Redução do apetite', value: 'decreased-appetite', narrative: 'redução do apetite' },
  ],
  defaultValue: [],
}
const fluidIntakeField: SelectField = {
  key: 'fluidIntake',
  label: 'Ingesta hídrica',
  type: 'select',
  options: [
    { label: 'Normal', value: 'normal', narrative: 'ingesta hídrica preservada' },
    { label: 'Reduzida', value: 'decreased', narrative: 'ingesta hídrica reduzida' },
    {
      label: 'Não tolera líquidos por via oral',
      value: 'unable',
      narrative: 'intolerância a líquidos por via oral',
    },
  ],
}
const urineOutputField: SelectField = {
  key: 'urineOutput',
  label: 'Diurese',
  type: 'select',
  options: [
    { label: 'Normal', value: 'normal', narrative: 'diurese preservada' },
    { label: 'Reduzida', value: 'decreased', narrative: 'diurese reduzida' },
    { label: 'Ausente ou mínima', value: 'absent', narrative: 'diurese ausente ou mínima' },
  ],
}
const oralToleranceField: BooleanField = {
  key: 'toleratingOralFluids',
  label: 'Tolera líquidos por via oral',
  type: 'boolean',
  defaultValue: false,
  narrative: {
    whenTrue: 'tolerando líquidos por via oral',
  },
}
const dehydrationSignsField: MultiselectField = {
  key: 'dehydrationSigns',
  label: 'Sinais de desidratação',
  helperText: 'Elementos da Escala Clínica de Desidratação e achados clínicos relacionados.',
  type: 'multiselect',
  options: [
    { label: 'Olhos encovados', value: 'sunken-eyes', narrative: 'olhos encovados' },
    { label: 'Mucosas secas', value: 'dry-mucosa', narrative: 'mucosas secas' },
    {
      label: 'Turgor cutâneo reduzido',
      value: 'poor-turgor',
      narrative: 'turgor cutâneo reduzido',
    },
    {
      label: 'Estado geral alterado',
      value: 'abnormal-appearance',
      narrative: 'estado geral alterado',
    },
    {
      label: 'Tontura postural ou síncope',
      value: 'postural-symptoms',
      narrative: 'tontura postural ou síncope',
    },
  ],
  defaultValue: [],
}
const abdominalPainSeverityField: SelectField = {
  key: 'abdominalPainSeverity',
  label: 'Gravidade da dor abdominal',
  type: 'select',
  options: [
    { label: 'Ausente', value: 'none', narrative: 'sem dor abdominal' },
    { label: 'Cólica leve', value: 'mild-cramping', narrative: 'dor abdominal em cólica leve' },
    { label: 'Moderada', value: 'moderate', narrative: 'dor abdominal moderada' },
    {
      label: 'Intensa ou sinais peritoneais',
      value: 'severe-peritoneal',
      narrative: 'dor abdominal intensa ou sinais peritoneais',
    },
  ],
}
const exposureFields: BooleanField[] = [
  {
    key: 'recentAntibiotics',
    label: 'Uso recente de antibiótico',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'uso recente de antibiótico' },
  },
  {
    key: 'recentHospitalization',
    label: 'Internação recente ou exposição a instituição de longa permanência',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'internação recente ou exposição a instituição de longa permanência' },
  },
  {
    key: 'recentTravel',
    label: 'Viagem recente',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'viagem recente' },
  },
  {
    key: 'sickContactsOrOutbreak',
    label: 'Contato com doentes ou contexto de surto',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'contato com doentes ou contexto de surto' },
  },
  {
    key: 'publicHealthExposure',
    label: 'Manipulador de alimentos, creche, saúde ou instituição de longa permanência',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'risco de exposição com relevância em saúde pública' },
  },
  {
    key: 'immunocompromised',
    label: 'Imunocomprometido',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'imunossupressão' },
  },
]
const antibioticDetailsField: TextField = {
  key: 'antibioticDetails',
  label: 'Antibiótico e temporalidade',
  type: 'text',
  placeholder: 'Ex.: amoxicilina-clavulanato, terminou há 1 semana',
  displayIf: { fieldKey: 'recentAntibiotics', equals: true },
  narrative: { prefix: 'detalhes do antibiótico' },
}
const travelDetailsField: TextField = {
  key: 'travelDetails',
  label: 'Local e período da viagem',
  type: 'text',
  placeholder: 'Ex.: México, retornou há 1 semana',
  displayIf: { fieldKey: 'recentTravel', equals: true },
  narrative: { prefix: 'detalhes da viagem' },
}
const immunocompromiseDetailsField: TextField = {
  key: 'immunocompromiseDetails',
  label: 'Tipo de imunossupressão',
  type: 'text',
  placeholder: 'Ex.: quimioterapia, transplante, corticoide, HIV/AIDS',
  displayIf: { fieldKey: 'immunocompromised', equals: true },
  narrative: { prefix: 'detalhes da imunossupressão' },
}
const highRiskFields: BooleanField[] = [
  {
    key: 'alteredMentalStatus',
    label: 'Confusão ou alteração do estado mental',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'confusão ou alteração do estado mental' },
  },
  {
    key: 'shockOrSevereDehydration',
    label: 'Choque ou desidratação grave',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'choque ou desidratação grave' },
  },
  {
    key: 'failedOralRehydration',
    label: 'Falha da reidratação oral',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'falha da reidratação oral' },
  },
  {
    key: 'persistentVomiting',
    label: 'Vômitos persistentes >=48 horas',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'vômitos persistentes há 48 horas ou mais' },
  },
]
const hpiTemplate = `
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
  `
export const gastroenterocolitisModule: ClinicalWorkflow = {
  id: 'gastroenterocolitis',
  language: 'pt-BR',
  title: 'Gastroenterocolite Aguda',
  overview:
    'Estruture a avaliação da diarreia e dos vômitos agudos com foco na duração, características das fezes, estado de hidratação, sinais de invasão, fatores de exposição, indicações de exames e definição da conduta.',
  sections: [
    {
      id: 'initial-characterization',
      title: 'Caracterização inicial',
      description:
        'Comece pela duração dos sintomas, padrão das fezes, frequência das evacuações, presença de vômitos e febre para definir a gravidade e o risco de doença inflamatória ou invasiva.',
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
      title: 'Hidratação e gravidade abdominal',
      description:
        'Avalie a tolerância à ingestão oral, a diurese, os sinais de desidratação e a gravidade da dor abdominal antes de definir a conduta e o destino do paciente.',
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
      title: 'Exposição e fatores de risco do paciente',
      description:
        'Investigue fatores de risco para C. difficile, doenças associadas a viagens, contextos de surto e condições de imunossupressão.',
      fields: [
        ...exposureFields,
        antibioticDetailsField,
        travelDetailsField,
        immunocompromiseDetailsField,
      ],
    },
    {
      id: 'red-flag-screen',
      title: 'Triagem de sinais de alerta',
      description:
        'Achados positivos aqui devem reduzir o limiar para exames de fezes, hidratação venosa, observação, internação ou escalonamento emergencial.',
      fields: highRiskFields,
    },
  ],
  redFlags: [
    {
      title: 'Choque ou desidratação grave',
      description:
        'Instabilidade hemodinâmica, desidratação grave, síncope ou hipotensão postural exige reidratação urgente e possível internação.',
    },
    {
      title: 'Alteração do estado mental',
      description: 'Pode refletir desidratação grave, sepse ou distúrbio eletrolítico.',
    },
    {
      title: 'Diarreia com sangue ou muco',
      description:
        'Sugere diarreia inflamatória ou invasiva e aumenta a suspeita de STEC, Shigella, DII ou colite isquêmica.',
    },
    {
      title: 'Febre alta persistente',
      description:
        'Febre em torno de 38,5 °C ou mais, especialmente persistente, sugere doença bacteriana invasiva ou infecção sistêmica.',
    },
    {
      title: 'Dor abdominal intensa ou sinais peritoneais',
      description:
        'Considere apendicite, colite isquêmica, perfuração, obstrução, megacólon tóxico ou outra patologia cirúrgica.',
    },
    {
      title: 'Imunossupressão com diarreia',
      description: 'Aumenta risco de patógenos oportunistas e doença grave ou invasiva.',
    },
  ],
  differentials: [
    {
      title: 'Gastroenterite viral',
      description:
        'Diarreia aquosa, vômitos, contato com doentes ou contexto de surto e evolução autolimitada.',
    },
    {
      title: 'Intoxicação alimentar por toxina pré-formada',
      description:
        'Quadro abrupto predominante por vômitos após alimento compartilhado, com resolução rápida.',
    },
    {
      title: 'Diarreia bacteriana invasiva',
      description: 'Sangue ou muco nas fezes, febre, sintomas graves, viagem ou contexto de surto.',
    },
    {
      title: 'Infecção por C. difficile',
      description:
        'Uso recente de antibiótico, internação recente, instituição de longa permanência ou diarreia associada a serviços de saúde.',
    },
    {
      title: 'Síndrome hemolítico-urêmica',
      description:
        'Diarreia sanguinolenta com suspeita de STEC, anemia, plaquetopenia, lesão renal aguda ou redução da diurese.',
    },
    {
      title: 'Abdome cirúrgico ou colite isquêmica',
      description:
        'Dor localizada intensa, sinais peritoneais, idade avançada, íleo ou diarreia sanguinolenta súbita com risco vascular.',
    },
    {
      title: 'Infecção parasitária',
      description:
        'Sintomas persistentes por mais de 7 dias, viagem, imunossupressão ou exposição de risco.',
    },
  ],
  workup: [
    {
      title: 'Avaliação de hidratação',
      description:
        'Avalie estado geral, olhos, mucosas, turgor cutâneo, diurese, sinais vitais e ortostatismo quando relevante.',
    },
    {
      title: 'PCR ou cultura de fezes quando indicado',
      description:
        'Mais útil com sangue ou muco nas fezes, febre persistente, doença grave, imunossupressão, surto, viagem recente, antibióticos, internação ou duração >7 dias.',
    },
    {
      title: 'Pesquisa de toxina Shiga ou STEC',
      description:
        'Considere em diarreia sanguinolenta, especialmente sem febre, para monitorar SHU e evitar antibiótico inadequado.',
    },
    {
      title: 'Teste para C. difficile',
      description:
        'Use com antibiótico recente, internação recente, instituição de longa permanência ou diarreia associada a serviços de saúde.',
    },
    {
      title: 'Hemograma, eletrólitos e função renal conforme a gravidade',
      description:
        'Use em desidratação moderada a grave, alteração mental, idosos, comorbidades, suspeita de sepse, SHU ou necessidade de hidratação venosa.',
    },
    {
      title: 'Imagem abdominal quando houver suspeita cirúrgica',
      description:
        'Considere com dor localizada intensa, sinais peritoneais, suspeita de obstrução, megacólon tóxico, isquemia ou piora evolutiva.',
    },
  ],
  quickGuides: [
    {
      title: 'Diarreia aquosa leve',
      description:
        'Apresentação típica de manejo ambulatorial quando o estado de hidratação é satisfatório e não há sinais de alto risco.',
      criteria: [
        'Diarreia aquosa sem sangue ou muco',
        'Sem febre alta persistente, dor intensa, sinais de sepse ou imunossupressão',
        'Tolera hidratação oral, sem desidratação ou com desidratação leve',
      ],
      actions: [
        'Priorizar reidratação oral e controle sintomático',
        'Em geral, não é necessário exame de fezes de rotina',
        'Orientar retorno por desidratação, sangue, febre ou piora da dor',
      ],
    },
    {
      title: 'Suspeita de diarreia inflamatória ou invasiva',
      description:
        'Use quando características das fezes ou manifestações sistêmicas sugerem patógenos invasivos ou complicações.',
      criteria: [
        'Sangue ou muco nas fezes',
        'Febre alta persistente ou doença grave',
        'Dor abdominal intensa ou toxicidade sistêmica',
      ],
      actions: [
        'Considerar PCR ou cultura de fezes',
        'Considerar toxina Shiga/STEC quando houver diarreia sanguinolenta',
        'Escalonar se houver sinais peritoneais, sepse ou desidratação grave',
      ],
    },
    {
      title: 'Via de investigação para C. difficile',
      description:
        'Use quando a diarreia ocorre após antibiótico ou exposição a serviços de saúde.',
      criteria: [
        'Uso recente de antibiótico',
        'Internação recente ou exposição a instituição de longa permanência',
        'Diarreia associada a serviços de saúde',
      ],
      actions: [
        'Considerar teste para C. difficile',
        'Avaliar gravidade, função renal, leucocitose e hidratação',
      ],
    },
    {
      title: 'Considerar observação ou internação',
      description:
        'Use quando desidratação, vômitos, fatores de risco do paciente ou doença sistêmica tornam o manejo ambulatorial inseguro.',
      criteria: [
        'Desidratação moderada a grave ou falha da reidratação oral',
        'Vômitos persistentes impedindo ingesta oral',
        'Alteração mental, suspeita de LRA/distúrbio eletrolítico, imunossupressão ou suspeita de SHU',
      ],
      actions: [
        'Considerar hidratação venosa, exames, reavaliação, observação ou internação',
        'Escalonar com urgência em choque, sepse, megacólon tóxico, perfuração ou abdome cirúrgico',
      ],
    },
  ],
  sourceFigures: [
    {
      title: 'Avaliação e manejo da diarreia aguda',
      source: 'American Family Physician, 2022',
      sourceUrl: 'https://www.aafp.org/afp/2022/0700/acute-diarrhea',
      citation:
        'Meisenheimer ES, Epstein C, Thiel D. Acute Diarrhea in Adults. American Family Physician. 2022;106(1):72-80.',
      notes:
        'Figura de referência revisada localmente para manejo baseado inicialmente na hidratação, gatilhos para exames, avaliação de viajantes, risco de surtos e cautela com STEC.',
    },
    {
      title: 'Abordagem diagnóstica da diarreia aguda',
      source: "Yamada's Textbook of Gastroenterology, 7ª edição, 2022",
      sourceUrl: 'https://onlinelibrary.wiley.com/doi/10.1002/9781119600206.ch34',
      citation:
        "Hecht GA, Trieu JA. Approach to the patient with diarrhea. Yamada's Textbook of Gastroenterology. 7ª ed. 2022.",
      notes:
        'Algoritmo de referência revisado localmente para diferenciação entre diarreia aquosa e sanguinolenta, risco de C. difficile, diarreia persistente e manejo de pacientes imunossuprimidos.',
    },
  ],
  presets: [
    {
      id: 'mild-watery-diarrhea',
      title: 'Diarreia aquosa leve',
      description:
        'Padrão ambulatorial tranquilizador com tolerância oral e sem sinais de alto risco.',
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
      title: 'Suspeita de diarreia inflamatória',
      description: 'Sangue ou muco nas fezes com febre ou dor abdominal intensa.',
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
      title: 'Desidratação ou falha de TRO',
      description: 'Vômitos, baixa ingesta, diurese reduzida ou sinais de desidratação.',
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
      title: 'Risco de C. difficile',
      description: 'Diarreia após antibiótico, internação ou instituição de longa permanência.',
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
