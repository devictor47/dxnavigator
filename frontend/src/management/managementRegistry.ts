import { defaultLocale, type Locale } from '@/i18n/locales'
import type { ManagementGuide, ManagementGuideCategory } from '@/management/types'

export const managementCategoryLabels: Record<Locale, Record<ManagementGuideCategory, string>> = {
  en: {
    metabolic: 'Metabolic',
    neurologic: 'Neurologic',
    cardiovascular: 'Cardiovascular',
    respiratory: 'Respiratory',
  },
  'pt-BR': {
    metabolic: 'Metabólico',
    neurologic: 'Neurológico',
    cardiovascular: 'Cardiovascular',
    respiratory: 'Respiratório',
  },
}

const dkaEn: ManagementGuide = {
  id: 'dka',
  language: 'en',
  title: 'Diabetic Ketoacidosis',
  description:
    'Stepwise emergency approach to DKA recognition, fluids, potassium, insulin, dextrose, monitoring, and transition.',
  category: 'metabolic',
  sections: [
    {
      title: 'Immediate Assessment',
      description: 'Stabilize first, then confirm the metabolic picture.',
      items: [
        {
          label: 'Assess airway, breathing, circulation, mental status, and shock.',
          detail: 'Severe DKA may present with dehydration, Kussmaul respirations, altered mental status, or circulatory collapse.',
          severity: 'critical',
        },
        {
          label: 'Place IV access and monitor vitals, cardiac rhythm, and urine output.',
          detail: 'Continuous reassessment matters because potassium and volume status can change quickly.',
        },
        {
          label: 'Look for precipitating cause.',
          detail: 'Common triggers include infection, missed insulin, myocardial infarction, stroke, pancreatitis, medications, pregnancy, or new diabetes.',
        },
      ],
    },
    {
      title: 'Confirm DKA',
      items: [
        {
          label: 'Check glucose, venous/arterial pH, bicarbonate, anion gap, ketones, electrolytes, BUN/creatinine, and osmolality when indicated.',
          detail: 'Beta-hydroxybutyrate is preferred when available.',
        },
        {
          label: 'Obtain ECG and evaluate potassium effect.',
          detail: 'Total body potassium is depleted even when serum potassium is normal or high.',
          severity: 'warning',
        },
        {
          label: 'Use clinical context for infection and ischemia workup.',
          detail: 'Cultures, chest imaging, urinalysis, troponin, lipase, or pregnancy testing depend on presentation.',
        },
      ],
    },
    {
      title: 'Fluids First',
      items: [
        {
          label: 'Start isotonic crystalloid promptly unless contraindicated.',
          detail: 'Initial resuscitation restores perfusion and begins lowering glucose before insulin.',
          severity: 'critical',
        },
        {
          label: 'Reassess sodium, osmolality, hemodynamics, renal function, and cardiac status.',
          detail: 'Fluid choice and rate should be individualized, especially in heart failure, kidney disease, older adults, or pregnancy.',
        },
      ],
    },
    {
      title: 'Potassium Gate',
      description: 'Potassium determines whether insulin can safely start.',
      items: [
        {
          label: 'If K < 3.3 mEq/L: hold insulin and replace potassium first.',
          detail: 'Starting insulin before potassium correction can precipitate life-threatening hypokalemia.',
          severity: 'critical',
        },
        {
          label: 'If K 3.3-5.2 mEq/L: give potassium with IV fluids while starting insulin.',
          detail: 'Target potassium is commonly kept in the normal range with frequent monitoring.',
          severity: 'warning',
        },
        {
          label: 'If K > 5.2 mEq/L: do not give potassium initially, but monitor closely.',
          detail: 'Serum potassium usually falls after insulin and volume resuscitation.',
        },
      ],
    },
    {
      title: 'Insulin',
      items: [
        {
          label: 'Start IV regular insulin after potassium is safe.',
          detail: 'Use local protocol for bolus/no bolus and infusion rate.',
          severity: 'critical',
        },
        {
          label: 'Aim for controlled glucose fall while closing the anion gap.',
          detail: 'The endpoint is resolution of ketoacidosis, not just normal glucose.',
        },
      ],
    },
    {
      title: 'Dextrose and Ongoing Fluids',
      items: [
        {
          label: 'Add dextrose when glucose falls to protocol threshold while continuing insulin.',
          detail: 'Dextrose allows insulin to continue clearing ketones without causing hypoglycemia.',
          severity: 'warning',
        },
        {
          label: 'Continue electrolyte replacement and frequent labs.',
          detail: 'Monitor glucose, potassium, bicarbonate, anion gap, renal function, and phosphate when clinically relevant.',
        },
      ],
    },
    {
      title: 'Transition',
      items: [
        {
          label: 'Transition only after ketoacidosis has resolved and the patient can eat.',
          detail: 'Ensure anion gap closure, clinical improvement, and a safe subcutaneous insulin plan.',
        },
        {
          label: 'Overlap IV insulin with subcutaneous basal insulin.',
          detail: 'Avoid rebound ketoacidosis by following local overlap timing.',
          severity: 'warning',
        },
      ],
    },
  ],
  pitfalls: [
    'Starting insulin when potassium is severely low.',
    'Stopping insulin because glucose normalized before the anion gap closed.',
    'Forgetting to add dextrose while continuing insulin.',
    'Missing the precipitating cause.',
    'Underestimating fluid risk in heart failure, kidney disease, older adults, or pregnancy.',
  ],
  sources: [
    {
      title: 'Endotext: Hyperglycemic Crises',
      url: 'https://www.ncbi.nlm.nih.gov/books/NBK279052/',
      note: 'Updated clinical review covering DKA diagnosis and management.',
    },
    {
      title: 'Hyperglycemic Crises in Adults With Diabetes: A Consensus Report. Diabetes Care. 2024.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/39052901/',
      note: 'International consensus report for adult hyperglycemic crises.',
    },
  ],
}

const dkaPt: ManagementGuide = {
  ...dkaEn,
  language: 'pt-BR',
  title: 'Cetoacidose Diabética',
  description:
    'Abordagem passo a passo para reconhecimento, fluidos, potássio, insulina, dextrose, monitorização e transição na CAD.',
  sections: [
    {
      title: 'Avaliação Imediata',
      description: 'Estabilize primeiro, depois confirme o quadro metabólico.',
      items: [
        {
          label: 'Avalie via aérea, respiração, circulação, estado mental e choque.',
          detail: 'CAD grave pode cursar com desidratação, respiração de Kussmaul, alteração do sensório ou colapso circulatório.',
          severity: 'critical',
        },
        {
          label: 'Obtenha acesso venoso e monitore sinais vitais, ritmo cardíaco e diurese.',
          detail: 'Reavaliação contínua é importante porque potássio e volemia podem mudar rapidamente.',
        },
        {
          label: 'Procure fator precipitante.',
          detail: 'Gatilhos comuns incluem infecção, omissão de insulina, infarto, AVC, pancreatite, medicamentos, gestação ou diabetes novo.',
        },
      ],
    },
    {
      title: 'Confirme CAD',
      items: [
        {
          label: 'Solicite glicose, pH venoso/arterial, bicarbonato, anion gap, cetonas, eletrólitos, ureia/creatinina e osmolalidade quando indicada.',
          detail: 'Beta-hidroxibutirato é preferível quando disponível.',
        },
        {
          label: 'Faça ECG e avalie efeito do potássio.',
          detail: 'O potássio corporal total está depletado mesmo quando o potássio sérico está normal ou alto.',
          severity: 'warning',
        },
        {
          label: 'Direcione investigação de infecção e isquemia pelo contexto clínico.',
          detail: 'Culturas, imagem de tórax, urina, troponina, lipase ou teste de gestação dependem da apresentação.',
        },
      ],
    },
    {
      title: 'Fluidos Primeiro',
      items: [
        {
          label: 'Inicie cristaloide isotônico prontamente, salvo contraindicação.',
          detail: 'A ressuscitação inicial restaura perfusão e começa a reduzir glicose antes da insulina.',
          severity: 'critical',
        },
        {
          label: 'Reavalie sódio, osmolalidade, hemodinâmica, função renal e condição cardíaca.',
          detail: 'Tipo e velocidade de fluido devem ser individualizados, especialmente em insuficiência cardíaca, doença renal, idosos ou gestação.',
        },
      ],
    },
    {
      title: 'Portão do Potássio',
      description: 'O potássio define se a insulina pode começar com segurança.',
      items: [
        {
          label: 'Se K < 3,3 mEq/L: segure insulina e reponha potássio primeiro.',
          detail: 'Iniciar insulina antes de corrigir potássio pode causar hipocalemia ameaçadora à vida.',
          severity: 'critical',
        },
        {
          label: 'Se K 3,3-5,2 mEq/L: reponha potássio com fluidos enquanto inicia insulina.',
          detail: 'O alvo costuma ser manter potássio na faixa normal com monitorização frequente.',
          severity: 'warning',
        },
        {
          label: 'Se K > 5,2 mEq/L: não dê potássio inicialmente, mas monitore de perto.',
          detail: 'O potássio sérico geralmente cai após insulina e ressuscitação volêmica.',
        },
      ],
    },
    {
      title: 'Insulina',
      items: [
        {
          label: 'Inicie insulina regular IV após potássio seguro.',
          detail: 'Use protocolo local para bolus ou sem bolus e velocidade de infusão.',
          severity: 'critical',
        },
        {
          label: 'Busque queda controlada da glicose enquanto fecha o anion gap.',
          detail: 'O objetivo é resolver a cetoacidose, não apenas normalizar glicose.',
        },
      ],
    },
    {
      title: 'Dextrose e Fluidos em Curso',
      items: [
        {
          label: 'Adicione dextrose quando a glicose cair ao limiar do protocolo, mantendo insulina.',
          detail: 'Dextrose permite continuar insulina para limpar cetonas sem causar hipoglicemia.',
          severity: 'warning',
        },
        {
          label: 'Continue reposição eletrolítica e exames frequentes.',
          detail: 'Monitore glicose, potássio, bicarbonato, anion gap, função renal e fósforo quando clinicamente relevante.',
        },
      ],
    },
    {
      title: 'Transição',
      items: [
        {
          label: 'Transicione apenas após resolução da cetoacidose e quando o paciente puder se alimentar.',
          detail: 'Garanta fechamento do anion gap, melhora clínica e plano seguro de insulina subcutânea.',
        },
        {
          label: 'Sobreponha insulina IV com insulina basal subcutânea.',
          detail: 'Evite recidiva de cetoacidose seguindo o tempo de sobreposição do protocolo local.',
          severity: 'warning',
        },
      ],
    },
  ],
  pitfalls: [
    'Iniciar insulina com potássio gravemente baixo.',
    'Suspender insulina porque a glicose normalizou antes do fechamento do anion gap.',
    'Esquecer de adicionar dextrose enquanto mantém insulina.',
    'Não procurar o fator precipitante.',
    'Subestimar risco de volume em insuficiência cardíaca, doença renal, idosos ou gestação.',
  ],
  sources: [
    {
      title: 'Endotext: Hyperglycemic Crises',
      url: 'https://www.ncbi.nlm.nih.gov/books/NBK279052/',
      note: 'Revisão clínica atualizada sobre diagnóstico e tratamento da CAD.',
    },
    {
      title: 'Hyperglycemic Crises in Adults With Diabetes: A Consensus Report. Diabetes Care. 2024.',
      url: 'https://pubmed.ncbi.nlm.nih.gov/39052901/',
      note: 'Relatório de consenso internacional sobre crises hiperglicêmicas em adultos.',
    },
  ],
}

const managementRegistry = {
  en: [dkaEn],
  'pt-BR': [dkaPt],
} satisfies Record<Locale, ManagementGuide[]>

export const getManagementGuides = (locale: Locale): ManagementGuide[] =>
  managementRegistry[locale] ?? managementRegistry[defaultLocale]

export const getManagementGuideById = (
  guideId: string | string[] | undefined,
  locale: Locale,
): ManagementGuide | undefined => {
  const selectedGuideId = Array.isArray(guideId) ? guideId[0] : guideId

  return getManagementGuides(locale).find((guide) => guide.id === selectedGuideId)
}

export const getManagementGuidesByCategory = (
  locale: Locale,
): Record<ManagementGuideCategory, ManagementGuide[]> => {
  return getManagementGuides(locale).reduce(
    (groupedGuides, guide) => {
      groupedGuides[guide.category].push(guide)

      return groupedGuides
    },
    {
      metabolic: [],
      neurologic: [],
      cardiovascular: [],
      respiratory: [],
    } as Record<ManagementGuideCategory, ManagementGuide[]>,
  )
}
