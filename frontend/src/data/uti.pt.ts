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
  placeholder: 'Ex.: 28',
  narrative: { suffix: 'anos' },
}
const sexField: SelectField = {
  key: 'sex',
  label: 'Sexo',
  type: 'select',
  options: [
    { label: 'Feminino', value: 'female', narrative: 'sexo feminino' },
    { label: 'Masculino', value: 'male', narrative: 'sexo masculino' },
    { label: 'Outro / não especificado', value: 'other' },
  ],
}
const durationField: TextField = {
  key: 'duration',
  label: 'Duração dos sintomas',
  type: 'text',
  placeholder: 'Ex.: 2 dias, começou hoje pela manhã',
  required: true,
  narrative: { prefix: 'há' },
}
const pregnancyStatusField: SelectField = {
  key: 'pregnancyStatus',
  label: 'Estado gestacional',
  type: 'select',
  options: [
    { label: 'Não gestante', value: 'not-pregnant', narrative: 'não gestante' },
    { label: 'Gestante', value: 'pregnant', narrative: 'gestação' },
    { label: 'Desconhecido', value: 'unknown', narrative: 'estado gestacional desconhecido' },
    { label: 'Não se aplica', value: 'not-applicable', narrative: 'gestação não aplicável' },
  ],
}
const feverField: BooleanField = {
  key: 'fever',
  label: 'Febre',
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: 'febre' },
}
const temperatureField: TextField = {
  key: 'temperature',
  label: 'Temperatura',
  type: 'text',
  placeholder: 'Ex.: 38,9 °C',
  displayIf: { fieldKey: 'fever', equals: true },
  narrative: { prefix: 'temperatura de' },
}
const redFlagFields: BooleanField[] = [
  {
    key: 'flankPain',
    label: 'Dor lombar/em flanco ou punho-percussão positiva',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'dor lombar/em flanco ou punho-percussão positiva' },
  },
  {
    key: 'nauseaVomiting',
    label: 'Náuseas ou vômitos',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'náuseas ou vômitos' },
  },
]
const systemicSymptomsField: MultiselectField = {
  key: 'systemicSymptoms',
  label: 'Sinais sistêmicos',
  type: 'multiselect',
  options: [
    { label: 'Calafrios ou tremores', value: 'rigors', narrative: 'calafrios ou tremores' },
    {
      label: 'Instabilidade hemodinâmica',
      value: 'hemodynamic-instability',
      narrative: 'instabilidade hemodinâmica',
    },
    {
      label: 'Alteração do estado mental',
      value: 'altered-mental-status',
      narrative: 'alteração do estado mental',
    },
    {
      label: 'Fadiga ou mal-estar importante',
      value: 'malaise',
      narrative: 'fadiga ou mal-estar importante',
    },
  ],
  defaultValue: [],
}
const obstructionSymptomsField: MultiselectField = {
  key: 'obstructionSymptoms',
  label: 'Sintomas de obstrução urinária',
  type: 'multiselect',
  options: [
    {
      label: 'Incapacidade de urinar',
      value: 'unable-to-void',
      narrative: 'incapacidade de urinar',
    },
    {
      label: 'Retenção urinária importante',
      value: 'severe-retention',
      narrative: 'retenção urinária importante',
    },
  ],
  defaultValue: [],
}
const cystitisSymptomFields: BooleanField[] = [
  {
    key: 'dysuria',
    label: 'Disúria',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'disúria' },
  },
  {
    key: 'frequency',
    label: 'Polaciúria',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'polaciúria' },
  },
  {
    key: 'urgency',
    label: 'Urgência urinária',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'urgência urinária' },
  },
  {
    key: 'suprapubicPain',
    label: 'Dor suprapúbica',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'dor suprapúbica' },
  },
  {
    key: 'hematuria',
    label: 'Hematúria',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'hematúria' },
  },
  {
    key: 'nocturia',
    label: 'Noctúria',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'noctúria' },
  },
]
const alternativeDiagnosisFields: BooleanField[] = [
  {
    key: 'vaginalDischarge',
    label: 'Corrimento ou irritação vaginal',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'corrimento ou irritação vaginal' },
  },
  {
    key: 'genitalLesions',
    label: 'Lesões genitais, rash ou suspeita de IST',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'lesões genitais, rash ou suspeita de IST' },
  },
  {
    key: 'diarrhea',
    label: 'Diarreia',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'diarreia' },
  },
  {
    key: 'respiratorySymptoms',
    label: 'Tosse ou sintomas respiratórios',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'tosse ou sintomas respiratórios' },
  },
]
const resistanceRiskFields: BooleanField[] = [
  {
    key: 'recentUti',
    label: 'ITU nos últimos 3 meses',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'ITU recente' },
  },
  {
    key: 'recentAntibiotics',
    label: 'Uso de antibiótico nos últimos 3 meses',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'uso recente de antibiótico' },
  },
  {
    key: 'resistantOrganismHistory',
    label: 'História de microrganismo urinário resistente',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'história de microrganismo urinário resistente' },
  },
  {
    key: 'diabetes',
    label: 'Diabetes',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'diabetes' },
  },
  {
    key: 'immunocompromised',
    label: 'Imunossupressão',
    type: 'boolean',
    defaultValue: false,
    narrative: { whenTrue: 'imunossupressão' },
  },
]
const antibioticDetailsField: TextField = {
  key: 'recentAntibioticName',
  label: 'Detalhes do antibiótico recente',
  type: 'text',
  placeholder: 'Ex.: TMP-SMX há 6 semanas',
  displayIf: { fieldKey: 'recentAntibiotics', equals: true },
  narrative: { prefix: 'antibiótico recente' },
}
const resistantOrganismDetailsField: TextField = {
  key: 'resistantOrganismName',
  label: 'Detalhes do microrganismo resistente',
  type: 'text',
  placeholder: 'Ex.: E. coli ESBL',
  displayIf: { fieldKey: 'resistantOrganismHistory', equals: true },
  narrative: { prefix: 'histórico de microrganismo resistente' },
}
const immunocompromiseDetailsField: TextField = {
  key: 'immunocompromiseDetails',
  label: 'Tipo de imunossupressão',
  type: 'text',
  placeholder: 'Ex.: quimioterapia, transplante, corticoide',
  displayIf: { fieldKey: 'immunocompromised', equals: true },
  narrative: { prefix: 'detalhes da imunossupressão' },
}
const catheterField: SelectField = {
  key: 'urinaryCatheter',
  label: 'Cateter vesical',
  type: 'select',
  options: [
    { label: 'Nenhum', value: 'none', narrative: 'sem cateter vesical' },
    { label: 'Sonda vesical de demora', value: 'indwelling', narrative: 'sonda vesical de demora' },
    {
      label: 'Cateterismo intermitente',
      value: 'intermittent',
      narrative: 'cateterismo intermitente',
    },
    {
      label: 'Cistostomia / cateter suprapúbico',
      value: 'suprapubic',
      narrative: 'cistostomia / cateter suprapúbico',
    },
    {
      label: 'Removido nas últimas 48 horas',
      value: 'recently-removed',
      narrative: 'cateter removido nas últimas 48 horas',
    },
  ],
  defaultValue: 'none',
}
const urologicAbnormalityField: BooleanField = {
  key: 'urologicAbnormality',
  label: 'Anormalidade urológica conhecida ou procedimento recente',
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: 'anormalidade urológica conhecida ou procedimento recente' },
}
const urologicDetailsField: TextField = {
  key: 'urologicDetails',
  label: 'Detalhes urológicos',
  type: 'text',
  placeholder: 'Ex.: stent, cálculo, cistoscopia recente',
  displayIf: { fieldKey: 'urologicAbnormality', equals: true },
  narrative: { prefix: 'detalhes urológicos' },
}
const prostateSymptomsField: BooleanField = {
  key: 'prostateSymptoms',
  label: 'Sintomas perineais ou prostáticos',
  type: 'boolean',
  defaultValue: false,
  narrative: { whenTrue: 'sintomas perineais ou prostáticos' },
}
const oralToleranceField: BooleanField = {
  key: 'oralTolerance',
  label: 'Tolera ingestão oral',
  type: 'boolean',
  narrative: { whenTrue: 'tolerando ingestão oral' },
}
const hpiTemplate = `
    {% assign demographics = age | compact_append: sex %}
    Paciente{% if demographics %} {{ demographics | list: locale }}{% endif %}{% if duration %} apresenta sintomas urinários {{ duration }}{% else %} apresenta sintomas urinários{% endif %}.
    {% assign cystitisSymptoms = dysuria | compact_append: frequency | compact_append: urgency | compact_append: suprapubicPain | compact_append: hematuria | compact_append: nocturia %}
    {% if cystitisSymptoms %}Sintomas urinários baixos incluem {{ cystitisSymptoms | list: locale }}.{% endif %}
    {% assign upperTract = fever | compact_append: temperature | compact_append: flankPain | compact_append: nauseaVomiting | compact_append: systemicSymptoms %}
    {% if upperTract %}Achados sistêmicos ou sugestivos de acometimento de trato urinário alto incluem {{ upperTract | list: locale }}.{% endif %}
    {% if obstructionSymptoms %}Sintomas de obstrução urinária incluem {{ obstructionSymptoms | list: locale }}.{% endif %}
    {% assign alternatives = vaginalDischarge | compact_append: genitalLesions | compact_append: diarrhea | compact_append: respiratorySymptoms %}
    {% if alternatives %}Achados que sugerem diagnóstico alternativo incluem {{ alternatives | list: locale }}.{% endif %}
    {% assign riskContext = pregnancyStatus | compact_append: recentUti | compact_append: recentAntibiotics | compact_append: resistantOrganismHistory | compact_append: diabetes | compact_append: immunocompromised | compact_append: urinaryCatheter | compact_append: urologicAbnormality | compact_append: prostateSymptoms | compact_append: oralTolerance %}
    {% if riskContext %}Fatores de risco e elementos para definição de conduta incluem {{ riskContext | list: locale }}.{% endif %}
    {% assign details = recentAntibioticName | compact_append: resistantOrganismName | compact_append: immunocompromiseDetails | compact_append: urologicDetails %}
    {% if details %}Detalhes adicionais: {{ details | list: locale }}.{% endif %}
  `
export const utiModule: ClinicalWorkflow = {
  id: 'uti',
  language: 'pt-BR',
  title: 'ITU',
  overview:
    'Faça a triagem dos sintomas urinários com base em sinais de alerta, padrão clássico de cistite, diagnósticos alternativos, risco de resistência e fatores de ITU complicada.',
  sections: [
    {
      id: 'patient-context',
      title: 'Contexto do paciente',
      fields: [ageField, sexField, durationField, pregnancyStatusField],
    },
    {
      id: 'red-flag-screen',
      title: 'Triagem de sinais de alerta',
      description:
        'Achados positivos aqui afastam uma triagem simples de ITU e podem exigir avaliação presencial no mesmo dia ou atendimento de emergência.',
      fields: [
        feverField,
        temperatureField,
        ...redFlagFields,
        systemicSymptomsField,
        obstructionSymptomsField,
        oralToleranceField,
      ],
    },
    {
      id: 'core-cystitis-symptoms',
      title: 'Sintomas centrais de cistite',
      fields: cystitisSymptomFields,
    },
    {
      id: 'alternative-diagnosis-screen',
      title: 'Triagem de diagnóstico alternativo',
      fields: alternativeDiagnosisFields,
    },
    {
      id: 'resistance-and-complication-risk',
      title: 'Risco de resistência e ITU complicada',
      fields: [
        ...resistanceRiskFields,
        antibioticDetailsField,
        resistantOrganismDetailsField,
        immunocompromiseDetailsField,
      ],
    },
    {
      id: 'urologic-history',
      title: 'História urológica',
      fields: [
        catheterField,
        urologicAbnormalityField,
        urologicDetailsField,
        prostateSymptomsField,
      ],
    },
  ],
  redFlags: [
    {
      title: 'Febre, dor em flanco ou punho-percussão positiva',
      description:
        'Aumenta a suspeita de pielonefrite ou infecção complicada de trato urinário alto.',
    },
    {
      title: 'Calafrios intensos, instabilidade hemodinâmica ou alteração mental',
      description: 'Sugere possível urosepse e necessidade de escalonamento urgente da avaliação.',
    },
    {
      title: 'Sintomas de obstrução urinária',
      description:
        'Incapacidade de urinar ou retenção importante pode exigir descompressão urgente ou avaliação urológica.',
    },
    {
      title: 'Gestação',
      description: 'Exige cultura e estratégia terapêutica ajustada ao risco materno-fetal.',
    },
    {
      title: 'Cateter, imunossupressão ou alteração urológica',
      description:
        'Define contexto de ITU complicada ou de maior risco e reduz o limiar para cultura e investigação ampliada.',
    },
  ],
  differentials: [
    {
      title: 'Cistite aguda não complicada',
      description:
        'Disúria, polaciúria, urgência urinária e desconforto suprapúbico, sem febre, dor em flanco ou corrimento vaginal.',
    },
    {
      title: 'Pielonefrite',
      description:
        'Febre, calafrios, dor em flanco, punho-percussão positiva, náuseas, vômitos ou sinais sistêmicos.',
    },
    {
      title: 'Urosepse',
      description:
        'Calafrios intensos, instabilidade hemodinâmica, alteração do estado mental, má perfusão ou toxicidade sistêmica.',
    },
    {
      title: 'Uretrite ou IST',
      description:
        'Disúria com secreção, lesões genitais, rash, exposição sexual de risco ou urina sem achados compatíveis.',
    },
    {
      title: 'Vaginite',
      description: 'Corrimento vaginal, prurido, odor, dispareunia ou disúria externa.',
    },
    {
      title: 'Nefrolitíase ou obstrução',
      description:
        'Dor em flanco em cólica, hematúria, retenção urinária importante, incapacidade de urinar ou risco de uropatia obstrutiva.',
    },
    {
      title: 'Prostatite',
      description:
        'Paciente masculino com dor pélvica ou perineal, sintomas obstrutivos, febre ou próstata dolorosa.',
    },
  ],
  workup: [
    {
      title: 'EAS quando a apresentação não for cistite clássica de baixo risco',
      description:
        'Útil em homens, sintomas atípicos, suspeita de diagnóstico alternativo, risco de resistência ou sinais de infecção complicada.',
    },
    {
      title: 'Urocultura com antibiograma quando indicada',
      description:
        'Obter em homens, idade ≥65 anos, ITU recorrente, uso recente de antibiótico, falha terapêutica, resistência prévia, gestação, imunossupressão, cateter ou suspeita de pielonefrite.',
    },
    {
      title: 'Teste de gravidez quando relevante',
      description:
        'Gestação altera a estratificação de risco, o limiar para cultura e a escolha do antibiótico.',
    },
    {
      title: 'Testes para IST/vaginite quando indicado',
      description:
        'Considere quando houver corrimento, lesões genitais, irritação, sintomas pélvicos, exposição sexual de risco ou disúria atípica.',
    },
    {
      title: 'Hemograma, eletrólitos, função renal, hemoculturas e imagem em doença de alto risco',
      description:
        'Use quando houver suspeita de pielonefrite, sepse, obstrução, LRA, doença grave, imunossupressão ou ausência de melhora.',
    },
  ],
  quickGuides: [
    {
      title: 'Cistite clássica de baixo risco',
      description:
        'Via típica para mulher adulta não gestante, com sintomas clássicos e sem sinais de alerta.',
      criteria: [
        'Disúria, polaciúria, urgência ou dor suprapúbica',
        'Sem febre, dor em flanco, náuseas/vômitos, sinais sistêmicos ou sintomas de obstrução',
        'Sem corrimento vaginal e sem fatores de risco para resistência ou ITU complicada',
      ],
      actions: [
        'Tratamento empírico pode ser apropriado sem exame de urina',
        'Orientar retorno em caso de febre, dor em flanco, piora dos sintomas ou intolerância oral',
      ],
    },
    {
      title: 'Cultura recomendada antes do antibiótico',
      description:
        'Use quando houver risco de resistência, contexto de ITU complicada ou apresentação fora do perfil de baixo risco.',
      criteria: [
        'Homem, idade ≥65 anos, ITU recorrente, uso recente de antibiótico ou resistência prévia',
        'Gestação, imunossupressão, cateter, alteração urológica ou suspeita de pielonefrite',
      ],
      actions: [
        'Obter EAS e urocultura, ou cultura reflexa, quando possível',
        'Documentar o motivo da cultura e o plano de ajuste conforme antibiograma',
      ],
    },
    {
      title: 'Avaliação no mesmo dia / escalonamento',
      description:
        'Use quando os sintomas sugerirem pielonefrite, obstrução, sepse ou outro diagnóstico.',
      criteria: [
        'Febre, dor em flanco/punho-percussão positiva, náuseas/vômitos, calafrios intensos, instabilidade hemodinâmica ou alteração mental',
        'Incapacidade de urinar, retenção importante ou suspeita de obstrução',
      ],
      actions: [
        'Organizar avaliação presencial no mesmo dia ou atendimento de emergência conforme a gravidade',
        'Considerar exames, culturas, terapia intravenosa, imagem ou avaliação urológica quando indicado',
      ],
    },
    {
      title: 'Diagnóstico alternativo provável',
      description: 'Use quando os sintomas afastarem cistite simples isolada.',
      criteria: [
        'Corrimento vaginal, lesões genitais, suspeita de IST, diarreia, sintomas respiratórios ou hematúria sem sintomas de cistite',
      ],
      actions: [
        'Avaliar vaginite, uretrite/IST, gastroenterite, infecção respiratória, cálculo urinário ou outras causas',
      ],
    },
  ],
  sourceFigures: [
    {
      title: 'Algoritmo de triagem de ITU em mulheres adultas não gestantes',
      source: 'JAMA Network Open, 2026',
      sourceUrl: 'https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2844483',
      citation:
        'Meddings J, Chrouser K, Fowler KE, et al. Ann Arbor Guide to Triaging Adults With Suspected Urinary Tract Infection for in-Person and Telehealth Settings. JAMA Network Open. 2026;9(1):e2556135.',
      notes:
        'Algoritmo de referência revisado localmente para elegibilidade de tratamento empírico, gatilhos de exame de urina, triagem de diagnóstico alternativo e critérios de avaliação no mesmo dia.',
    },
    {
      title: 'Recomendações-chave para ITU não complicada',
      source: 'American Family Physician, 2024',
      sourceUrl: 'https://www.aafp.org/afp/2024/0200/acute-uncomplicated-utis-adults',
      citation:
        'Kurotschka PK, Gágyor I, Ebell MH. Acute Uncomplicated UTIs in Adults: Rapid Evidence Review. American Family Physician. 2024;109(2):167-174.',
      notes:
        'Tabela de referência revisada localmente para diagnóstico clínico de ITU não complicada, indicações de cultura, antibióticos de primeira linha, hidratação e estratégia de antibiótico postergado.',
    },
  ],
  presets: [
    {
      id: 'low-risk-classic-cystitis',
      title: 'Cistite clássica de baixo risco',
      description:
        'Mulher jovem, não gestante, com sintomas urinários baixos clássicos e sem sinais de alerta.',
      answers: {
        sex: 'female',
        pregnancyStatus: 'not-pregnant',
        fever: false,
        flankPain: false,
        nauseaVomiting: false,
        systemicSymptoms: [],
        obstructionSymptoms: [],
        dysuria: true,
        frequency: true,
        urgency: true,
        suprapubicPain: true,
        vaginalDischarge: false,
        genitalLesions: false,
        recentUti: false,
        recentAntibiotics: false,
        resistantOrganismHistory: false,
        diabetes: false,
        immunocompromised: false,
        urinaryCatheter: 'none',
        urologicAbnormality: false,
        oralTolerance: true,
      },
    },
    {
      id: 'culture-needed-risk-factors',
      title: 'Cultura indicada: risco de resistência',
      description:
        'Sintomas clássicos com ITU recente, uso recente de antibiótico, diabetes ou outro contexto de resistência.',
      answers: {
        sex: 'female',
        pregnancyStatus: 'not-pregnant',
        fever: false,
        flankPain: false,
        nauseaVomiting: false,
        systemicSymptoms: [],
        obstructionSymptoms: [],
        dysuria: true,
        frequency: true,
        urgency: true,
        suprapubicPain: true,
        vaginalDischarge: false,
        recentUti: true,
        recentAntibiotics: true,
        recentAntibioticName: 'TMP-SMX 6 weeks ago',
        resistantOrganismHistory: false,
        diabetes: true,
        immunocompromised: false,
        urinaryCatheter: 'none',
        urologicAbnormality: false,
        oralTolerance: true,
      },
    },
    {
      id: 'pyelonephritis-high-risk',
      title: 'Pielonefrite / alto risco',
      description: 'Febre e dor em flanco, com sintomas sistêmicos ou baixa tolerância oral.',
      answers: {
        sex: 'female',
        pregnancyStatus: 'not-pregnant',
        fever: true,
        temperature: '38.9 C',
        flankPain: true,
        nauseaVomiting: true,
        systemicSymptoms: ['rigors'],
        obstructionSymptoms: [],
        dysuria: true,
        frequency: true,
        urgency: false,
        suprapubicPain: false,
        vaginalDischarge: false,
        recentUti: false,
        recentAntibiotics: false,
        resistantOrganismHistory: false,
        diabetes: true,
        immunocompromised: false,
        urinaryCatheter: 'none',
        urologicAbnormality: false,
        oralTolerance: false,
      },
    },
    {
      id: 'alternative-diagnosis-screen-positive',
      title: 'Triagem positiva para diagnóstico alternativo',
      description: 'Disúria com sintomas vaginais/genitais ou sintomas não urinários.',
      answers: {
        sex: 'female',
        pregnancyStatus: 'unknown',
        fever: false,
        flankPain: false,
        dysuria: true,
        frequency: false,
        urgency: false,
        suprapubicPain: false,
        vaginalDischarge: true,
        genitalLesions: true,
        diarrhea: false,
        respiratorySymptoms: false,
      },
    },
  ],
  hpiTemplate,
}
