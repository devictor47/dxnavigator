import type {
  BooleanField,
  ClinicalWorkflow,
  MultiselectField,
  SelectField,
  TextField,
} from '@/data/workflow'
const ageField: TextField = {
  key: 'age',
  label: 'Idade',
  type: 'text',
  placeholder: 'Ex.: 35',
  narrative: { suffix: 'anos' },
}
const sexField: SelectField = {
  key: 'sex',
  label: 'Sexo',
  type: 'select',
  options: [
    { label: 'Feminino', value: 'female', narrative: 'sexo feminino' },
    { label: 'Masculino', value: 'male', narrative: 'sexo masculino' },
    { label: 'Outro / nao especificado', value: 'other' },
  ],
}
const onsetTimingField: SelectField = {
  key: 'onsetTiming',
  label: 'Inicio da dor',
  type: 'select',
  required: true,
  options: [
    { label: 'Subito, segundos a minutos', value: 'sudden', narrative: 'inicio subito' },
    { label: 'Rapido, minutos ate 1 hora', value: 'rapid', narrative: 'inicio rapido' },
    { label: 'Gradual, mais de 1 hora', value: 'gradual', narrative: 'inicio gradual' },
  ],
}
const timeToPeakField: SelectField = {
  key: 'timeToPeak',
  label: 'Tempo ate pico de intensidade',
  type: 'select',
  required: true,
  options: [
    {
      label: 'Menos de 1 minuto',
      value: 'less-than-1-minute',
      narrative: 'atingindo pico em menos de 1 minuto',
    },
    {
      label: '1 minuto a 1 hora',
      value: '1-minute-to-1-hour',
      narrative: 'atingindo pico em ate 1 hora',
    },
    {
      label: 'Mais de 1 hora',
      value: 'more-than-1-hour',
      narrative: 'atingindo pico em mais de 1 hora',
    },
  ],
}
const durationField: SelectField = {
  key: 'duration',
  label: 'Duracao da cefaleia atual',
  type: 'select',
  required: true,
  options: [
    {
      label: 'Menos de 4 horas',
      value: 'less-than-4-hours',
      narrative: 'com duracao menor que 4 horas',
    },
    { label: '4 a 24 horas', value: '4-to-24-hours', narrative: 'com duracao de 4 a 24 horas' },
    { label: '24 a 72 horas', value: '24-to-72-hours', narrative: 'com duracao de 24 a 72 horas' },
    {
      label: 'Mais de 72 horas',
      value: 'more-than-72-hours',
      narrative: 'com duracao maior que 72 horas',
    },
  ],
}
const locationField: SelectField = {
  key: 'location',
  label: 'Localizacao da dor',
  type: 'select',
  required: true,
  options: [
    { label: 'Unilateral', value: 'unilateral', narrative: 'cefaleia unilateral' },
    { label: 'Bilateral', value: 'bilateral', narrative: 'cefaleia bilateral' },
    { label: 'Occipital', value: 'occipital', narrative: 'cefaleia occipital' },
    { label: 'Frontal', value: 'frontal', narrative: 'cefaleia frontal' },
    { label: 'Periorbital', value: 'periorbital', narrative: 'cefaleia periorbital' },
    { label: 'Difusa', value: 'diffuse', narrative: 'cefaleia difusa' },
  ],
}
const qualityField: SelectField = {
  key: 'quality',
  label: 'Caracteristica da dor',
  type: 'select',
  required: true,
  options: [
    { label: 'Pulsatil / latejante', value: 'pulsating', narrative: 'carater pulsatil' },
    { label: 'Pressao / aperto', value: 'pressure', narrative: 'carater em pressao' },
    { label: 'Pontada / facada', value: 'sharp', narrative: 'carater em pontada' },
    { label: 'Queimacao', value: 'burning', narrative: 'carater em queimacao' },
    { label: 'Surda / dolorida', value: 'dull', narrative: 'carater surdo' },
  ],
}
const severityField: TextField = {
  key: 'severity',
  label: 'Intensidade da dor',
  type: 'text',
  placeholder: 'Ex.: 7/10',
  required: true,
  narrative: { prefix: 'intensidade' },
}
const activityAggravationField: BooleanField = {
  key: 'activityAggravation',
  label: 'Piora com atividade fisica rotineira',
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: 'piora com atividade fisica rotineira' },
}
const nauseaVomitingField: SelectField = {
  key: 'nauseaVomiting',
  label: 'Nausea ou vomitos',
  type: 'select',
  required: true,
  options: [
    { label: 'Nenhum', value: 'none', narrative: '' },
    { label: 'Apenas nausea', value: 'nausea', narrative: 'nausea' },
    { label: 'Vomitos', value: 'vomiting', narrative: 'vomitos' },
    { label: 'Nausea e vomitos', value: 'both', narrative: 'nausea e vomitos' },
  ],
}
const photoPhonoField: SelectField = {
  key: 'photoPhono',
  label: 'Fotofobia / fonofobia',
  type: 'select',
  required: true,
  options: [
    { label: 'Nenhuma', value: 'neither', narrative: '' },
    { label: 'Apenas fotofobia', value: 'photophobia', narrative: 'fotofobia' },
    { label: 'Apenas fonofobia', value: 'phonophobia', narrative: 'fonofobia' },
    { label: 'Fotofobia e fonofobia', value: 'both', narrative: 'fotofobia e fonofobia' },
  ],
}
const auraField: MultiselectField = {
  key: 'auraSymptoms',
  label: 'Sintomas de aura',
  type: 'multiselect',
  options: [
    { label: 'Aura visual', value: 'visual', narrative: 'aura visual' },
    { label: 'Aura sensitiva', value: 'sensory', narrative: 'aura sensitiva' },
    { label: 'Alteracao de fala', value: 'speech', narrative: 'alteracao de fala' },
    { label: 'Fraqueza motora', value: 'motor', narrative: 'fraqueza motora' },
  ],
  defaultValue: [],
}
const auraDurationField: SelectField = {
  key: 'auraDuration',
  label: 'Duracao da aura',
  helperText: 'Aura migranosa tipica dura 5 a 60 minutos.',
  type: 'select',
  options: [
    { label: 'Sem aura', value: 'none', narrative: '' },
    {
      label: 'Menos de 5 minutos',
      value: 'less-than-5-minutes',
      narrative: 'aura com duracao menor que 5 minutos',
    },
    {
      label: '5 a 60 minutos',
      value: '5-to-60-minutes',
      narrative: 'aura com duracao de 5 a 60 minutos',
    },
    {
      label: 'Mais de 60 minutos',
      value: 'more-than-60-minutes',
      narrative: 'aura com duracao maior que 60 minutos',
    },
  ],
}
const feverField: BooleanField = {
  key: 'feverSystemicSymptoms',
  label: 'Febre ou sintomas sistemicos',
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: 'febre ou sintomas sistemicos' },
}
const redFlagFields: BooleanField[] = [
  feverField,
  {
    key: 'neckStiffness',
    label: 'Rigidez de nuca ou meningismo',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'rigidez de nuca ou meningismo' },
  },
  {
    key: 'alteredMentalStatus',
    label: 'Alteracao de consciencia ou confusao',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'alteracao de consciencia ou confusao' },
  },
  {
    key: 'papilledema',
    label: 'Papiledema',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'papiledema' },
  },
  {
    key: 'painfulEyeAutonomic',
    label: 'Olho doloroso com sinais autonomicos',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'olho doloroso com sinais autonomicos' },
  },
  {
    key: 'ageOver50NewHeadache',
    label: 'Cefaleia nova apos 50 anos',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'cefaleia nova apos 50 anos' },
  },
  {
    key: 'historyOfCancer',
    label: 'Historia de cancer',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'historia de cancer' },
  },
  {
    key: 'valsalvaPrecipitated',
    label: 'Precipitada por tosse, espirro, exercicio ou Valsalva',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'precipitada por Valsalva ou esforco' },
  },
  {
    key: 'pregnancyPostpartum',
    label: 'Gestante ou puerperio',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'gestacao ou puerperio' },
  },
  {
    key: 'immunocompromised',
    label: 'Imunossupressao',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'imunossupressao' },
  },
]
const neurologicSymptomsField: MultiselectField = {
  key: 'neurologicSymptoms',
  label: 'Sintomas neurologicos',
  type: 'multiselect',
  required: true,
  options: [
    { label: 'Fraqueza', value: 'weakness', narrative: 'fraqueza' },
    { label: 'Dormencia', value: 'numbness', narrative: 'dormencia' },
    { label: 'Perda visual', value: 'vision-loss', narrative: 'perda visual' },
    { label: 'Diplopia', value: 'diplopia', narrative: 'diplopia' },
    { label: 'Ataxia', value: 'ataxia', narrative: 'ataxia' },
    { label: 'Crise convulsiva', value: 'seizure', narrative: 'crise convulsiva' },
  ],
  defaultValue: [],
}
const patternChangeField: SelectField = {
  key: 'patternChange',
  label: 'Padrao da cefaleia',
  type: 'select',
  required: true,
  options: [
    {
      label: 'Igual ao padrao habitual',
      value: 'same-as-usual',
      narrative: 'semelhante ao padrao habitual',
    },
    {
      label: 'Diferente do habitual',
      value: 'different',
      narrative: 'diferente do padrao habitual',
    },
    {
      label: 'Primeira cefaleia da vida',
      value: 'first-ever',
      narrative: 'primeiro episodio de cefaleia',
    },
    {
      label: 'Padrao progressivo ou em piora',
      value: 'progressive',
      narrative: 'padrao progressivo ou em piora',
    },
  ],
}
const recentTraumaField: SelectField = {
  key: 'recentTrauma',
  label: 'Trauma craniano recente',
  type: 'select',
  required: true,
  options: [
    { label: 'Nenhum', value: 'none', narrative: '' },
    {
      label: 'Nas ultimas 24 horas',
      value: 'within-24-hours',
      narrative: 'trauma craniano nas ultimas 24 horas',
    },
    {
      label: 'Na ultima semana',
      value: 'within-1-week',
      narrative: 'trauma craniano na ultima semana',
    },
    { label: 'No ultimo mes', value: 'within-1-month', narrative: 'trauma craniano no ultimo mes' },
  ],
}
const positionalComponentField: SelectField = {
  key: 'positionalComponent',
  label: 'Componente posicional',
  type: 'select',
  options: [
    { label: 'Nenhum', value: 'none', narrative: '' },
    { label: 'Piora deitado', value: 'worse-lying-down', narrative: 'piora ao deitar' },
    {
      label: 'Piora em pe ou sentado',
      value: 'worse-standing',
      narrative: 'piora em pe ou sentado',
    },
  ],
}
const currentMedicationsField: TextField = {
  key: 'currentMedications',
  label: 'Medicacoes atuais para cefaleia e frequencia',
  type: 'text',
  placeholder: 'Ex.: ibuprofeno 600 mg, 3 dias/mes',
  required: true,
  narrative: { prefix: 'uso atual de medicacao:' },
}
const newMedicationsField: TextField = {
  key: 'newMedications',
  label: 'Medicacoes iniciadas recentemente',
  type: 'text',
  placeholder: 'Ex.: anticoncepcional iniciado ha 2 semanas',
  narrative: { prefix: 'mudanca medicamentosa recente:' },
}
const headacheFrequencyField: TextField = {
  key: 'headacheFrequency',
  label: 'Frequencia da cefaleia',
  type: 'text',
  placeholder: 'Ex.: 4 dias/mes, diaria ha 3 meses',
  required: true,
  narrative: { prefix: 'frequencia da cefaleia' },
}
const acuteMedicationDaysField: TextField = {
  key: 'acuteMedicationDays',
  label: 'Dias de medicacao aguda por mes',
  type: 'text',
  placeholder: 'Ex.: triptano 8 dias/mes, AINE 18 dias/mes',
  narrative: { prefix: 'uso de medicacao aguda' },
}
const familyHistoryField: SelectField = {
  key: 'familyHistory',
  label: 'Historia familiar de enxaqueca',
  type: 'select',
  options: [
    { label: 'Sim', value: 'yes', narrative: 'historia familiar de enxaqueca' },
    { label: 'Nao', value: 'no', narrative: '' },
    {
      label: 'Desconhecida',
      value: 'unknown',
      narrative: 'historia familiar desconhecida para enxaqueca',
    },
  ],
}
const menstrualRelationshipField: SelectField = {
  key: 'menstrualRelationship',
  label: 'Relacao com menstruacao',
  type: 'select',
  options: [
    {
      label: 'Relacionada a menstruacao',
      value: 'related',
      narrative: 'padrao relacionado a menstruacao',
    },
    { label: 'Nao relacionada', value: 'not-related', narrative: '' },
    { label: 'Incerta', value: 'uncertain', narrative: 'relacao menstrual incerta' },
    { label: 'Nao se aplica', value: 'not-applicable', narrative: '' },
  ],
}
const triggersField: MultiselectField = {
  key: 'triggers',
  label: 'Gatilhos tipicos',
  type: 'multiselect',
  options: [
    { label: 'Estresse', value: 'stress', narrative: 'estresse' },
    { label: 'Privacao de sono', value: 'sleep-deprivation', narrative: 'privacao de sono' },
    { label: 'Alcool', value: 'alcohol', narrative: 'alcool' },
    { label: 'Alimentos especificos', value: 'foods', narrative: 'alimentos especificos' },
    { label: 'Mudancas climaticas', value: 'weather', narrative: 'mudancas climaticas' },
    { label: 'Luzes fortes', value: 'bright-lights', narrative: 'luzes fortes' },
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
  `
export const migraineModule: ClinicalWorkflow = {
  id: 'migraine',
  language: 'pt-BR',
  title: 'Enxaqueca',
  overview:
    'Avalia cefaleia buscando criterios de enxaqueca e rastreando rapidamente sinais de alerta SNNOOP10 para cefaleias secundarias.',
  sections: [
    {
      id: 'demographics',
      title: 'Contexto do paciente',
      fields: [ageField, sexField],
    },
    {
      id: 'core-headache-characteristics',
      title: 'Caracteristicas centrais da cefaleia',
      description:
        'Comece por inicio, pico de intensidade, duracao, localizacao, caracteristica, intensidade e efeito da atividade.',
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
      title: 'Sintomas associados a enxaqueca',
      fields: [nauseaVomitingField, photoPhonoField, auraField, auraDurationField],
    },
    {
      id: 'secondary-headache-screen',
      title: 'Triagem de cefaleia secundaria',
      description: 'Rastreie sinais imediatos e de alto risco para cefaleia secundaria.',
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
      title: 'Medicacoes e padrao da cefaleia',
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
      title: 'Cefaleia em trovoada ou inicio subitamente maximo',
      description:
        'Pico em segundos a minutos sugere risco de hemorragia subaracnoidea, trombose venosa, lesao de fossa posterior ou dissecao.',
    },
    {
      title: 'Febre, meningismo ou alteracao do estado mental',
      description:
        'Considere meningite bacteriana, encefalite, abscesso cerebral ou hemorragia subaracnoidea.',
    },
    {
      title: 'Papiledema ou sinais neurologicos focais',
      description:
        'Pode indicar hipertensao intracraniana, efeito de massa, AVC, trombose venosa ou infeccao do SNC.',
    },
    {
      title: 'Cefaleia nova apos 50 anos ou historia de cancer',
      description:
        'Rastreie arterite de celulas gigantes, neoplasia, doenca vascular ou metastase.',
    },
    {
      title: 'Gestacao, puerperio, imunossupressao, trauma, cefaleia posicional ou por Valsalva',
      description:
        'Esses contextos aumentam suspeita de causas secundarias como pre-eclampsia, trombose venosa, infeccao oportunista, hematoma subdural, disturbios de pressao liquórica ou lesoes de fossa posterior.',
    },
  ],
  differentials: [
    {
      title: 'Enxaqueca sem aura',
      description:
        'Cefaleia recorrente de 4 a 72 horas com ao menos duas caracteristicas tipicas e nausea/vomitos ou fotofobia/fonofobia.',
    },
    {
      title: 'Enxaqueca com aura',
      description:
        'Fenotipo migranoso com sintomas visuais, sensitivos, de fala ou motores reversiveis, geralmente de 5 a 60 minutos.',
    },
    {
      title: 'Cefaleia tensional',
      description:
        'Dor bilateral em pressao ou aperto, leve a moderada, sem piora por atividade e sem nausea proeminente.',
    },
    {
      title: 'Cefaleia em salvas',
      description:
        'Dor periorbital unilateral intensa de 15 a 180 minutos com sinais autonomicos ipsilaterais e inquietacao.',
    },
    {
      title: 'Hemorragia subaracnoidea',
      description:
        'Inicio em trovoada, pior cefaleia, gatilho por esforco, sincope, confusao, meningismo ou sintomas neurologicos.',
    },
    {
      title: 'Meningite ou encefalite',
      description: 'Febre, rigidez de nuca, fotofobia, alteracao mental, rash ou imunossupressao.',
    },
    {
      title: 'Arterite de celulas gigantes',
      description:
        'Cefaleia nova apos 50 anos, claudicacao mandibular, sintomas visuais, dor temporal ou sintomas de polimialgia.',
    },
    {
      title: 'Cefaleia por uso excessivo de medicacao',
      description:
        'Cefaleia em pelo menos 15 dias/mes com uso excessivo regular de medicacao aguda, em geral 10 a 15 ou mais dias/mes conforme a classe.',
    },
  ],
  workup: [
    {
      title: 'Sem exames de rotina para enxaqueca tipica',
      description:
        'Enxaqueca e diagnostico clinico quando o padrao e estavel e o exame neurologico e normal.',
    },
    {
      title: 'Exame neurologico e fundoscopico direcionado',
      description:
        'Avalie estado mental, nervos cranianos, forca, sensibilidade, coordenacao, marcha, meningismo e papiledema.',
    },
    {
      title: 'TC de cranio sem contraste quando houver sinais emergenciais',
      description:
        'Use em inicio em trovoada, alteracao de consciencia, deficit focal, papiledema, trauma agudo ou outra suspeita estrutural emergencial.',
    },
    {
      title: 'Puncao lombar apos TC negativa quando a suspeita persistir',
      description:
        'Considere para suspeita de hemorragia subaracnoidea ou infeccao do SNC quando a TC e negativa, mas a suspeita persiste.',
    },
    {
      title:
        'AngioTC ou RM para suspeitas vasculares, progressivas, cancer, posicional, Valsalva ou aura atipica',
      description:
        'Direcione a imagem para suspeita de dissecao, trombose venosa, lesao de fossa posterior, massa, disturbio de pressao intracraniana ou aura prolongada/motora.',
    },
    {
      title: 'VHS e PCR quando arterite de celulas gigantes for possivel',
      description:
        'Use em cefaleia nova apos 50 anos, especialmente com claudicacao mandibular, alteracoes visuais, dor temporal ou sintomas de polimialgia.',
    },
    {
      title: 'Teste de gravidez e pressao arterial quando relevante',
      description:
        'Cefaleia na gestacao e puerperio exige atencao a pre-eclampsia/eclampsia e trombose venosa cerebral.',
    },
  ],
  quickGuides: [
    {
      title: 'Enxaqueca tipica de baixo risco',
      description:
        'Use quando ha caracteristicas migranosas e a triagem de cefaleia secundaria e tranquilizadora.',
      criteria: [
        'Cefaleia recorrente semelhante, inicio gradual, duracao de 4 a 72 horas',
        'Dor unilateral ou pulsatil moderada-intensa, piora com atividade',
        'Nausea/vomitos ou fotofobia/fonofobia',
        'Sem sinais de alerta SNNOOP10 e exame neurologico normal',
      ],
      actions: [
        'Em geral, imagem de rotina nao e indicada',
        'Tratar precocemente com AINE, paracetamol, triptano ou combinacao conforme gravidade e contraindicacoes',
        'Revisar frequencia de medicacao aguda e orientar sobre risco de uso excessivo',
      ],
    },
    {
      title: 'Trovoada ou emergencia neurologica',
      description:
        'Use quando a apresentacao pode representar hemorragia, AVC, meningite, efeito de massa ou glaucoma agudo.',
      criteria: [
        'Inicio subitamente maximo, alteracao mental, crise convulsiva, deficit focal, papiledema, meningismo ou olho vermelho doloroso',
      ],
      actions: [
        'Escalonar com urgencia e obter investigacao emergencial direcionada',
        'Considerar TC, angioTC, puncao lombar, antibioticos, protocolo de AVC, oftalmologia, neurologia ou neurocirurgia conforme sindrome',
      ],
    },
    {
      title: 'Cefaleia nova ou diferente apos 50 anos',
      description:
        'Use quando idade ou mudanca de padrao sugere arterite de celulas gigantes, malignidade, doenca vascular ou lesao expansiva.',
      criteria: [
        'Cefaleia nova apos 50 anos, padrao diferente, curso progressivo, cancer, claudicacao mandibular ou sintomas visuais',
      ],
      actions: [
        'Considerar VHS/PCR e via de corticoide urgente se houver suspeita de arterite com sintomas visuais',
        'Considerar RM de encefalo ou outra imagem conforme causa secundaria suspeita',
      ],
    },
    {
      title: 'Uso excessivo de medicacao ou enxaqueca cronica',
      description:
        'Use quando cefaleias sao frequentes ou medicacoes agudas sao usadas repetidamente no mes.',
      criteria: [
        'Cefaleia em pelo menos 15 dias/mes, caracteristicas migranosas em pelo menos 8 dias/mes ou padrao de uso excessivo de medicacao aguda',
      ],
      actions: [
        'Orientar limite de medicacoes agudas e considerar profilaxia ou seguimento com neurologia',
        'Considerar observacao ou internacao se status migranosus, desidratacao, sintomas refratarios ou retirada supervisionada forem necessarios',
      ],
    },
  ],
  sourceFigures: [
    {
      title: 'Criterios SNNOOP10 para cefaleias secundarias',
      source: 'American Family Physician, 2022',
      sourceUrl: 'https://www.aafp.org/afp/2022/0900/acute-headache-adults',
      notes:
        'Figura de referencia revisada localmente para sintomas sistemicos, sinais neurologicos, inicio subito, idade avancada, mudanca de padrao, cefaleia posicional, gatilho por Valsalva, papiledema, gestacao, imunossupressao, cancer e trauma.',
    },
    {
      title: 'Avaliacao da cefaleia',
      source: 'American Family Physician, 2022',
      sourceUrl: 'https://www.aafp.org/afp/2022/0900/acute-headache-adults',
      notes:
        'Figura de referencia revisada localmente para triagem de cefaleia aguda, imagem orientada por sinais de alerta e manejo de cefaleias primarias tipicas.',
    },
    {
      title: 'Algoritmo diagnostico para apresentacao de cefaleia',
      source: 'Wiley Online Library',
      sourceUrl: 'https://onlinelibrary.wiley.com/doi/book/9781119539117',
      notes:
        'Algoritmo de referencia revisado localmente para ramificacao por sindromes de cefaleia e consideracoes de cefaleia secundaria.',
    },
    {
      title: 'Recomendacoes-chave para enxaqueca aguda',
      source: 'American Family Physician, 2025',
      sourceUrl: 'https://www.aafp.org/afp/2025/0400/acute-migraine-headache',
      notes:
        'Tabela de referencia revisada localmente para recomendacoes de tratamento agudo da enxaqueca e terapias a evitar.',
    },
    {
      title: 'Ausencia de dor em 2 horas em estudos de enxaqueca',
      source: 'New England Journal of Medicine',
      sourceUrl: 'https://www.nejm.org/doi/full/10.1056/NEJMra1915327',
      notes:
        'Figura de referencia revisada localmente para contexto comparativo de resposta a tratamentos agudos.',
    },
  ],
  presets: [
    {
      id: 'typical-low-risk-migraine',
      title: 'Enxaqueca tipica de baixo risco',
      description:
        'Enxaqueca episodica classica sem aura e sem sinais de alerta para cefaleia secundaria.',
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
      title: 'Enxaqueca com aura tipica',
      description: 'Fenotipo migranoso com aura visual dentro da janela usual de 5 a 60 minutos.',
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
      title: 'Cefaleia em trovoada de alto risco',
      description:
        'Inicio subitamente maximo com preocupacao neurologica ou de estado mental, exigindo escalonamento urgente.',
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
      title: 'Enxaqueca cronica / risco de uso excessivo',
      description: 'Cefaleias frequentes com alto uso de medicacao aguda e mudanca de padrao.',
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
