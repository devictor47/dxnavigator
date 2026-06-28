import type { ClinicalWorkflow } from '@/data/workflow'
import type { Locale } from '@/i18n/locales'
import { chestPainModule as chestPainEn } from './chestPain.en'
import { chestPainModule as chestPainPt } from './chestPain.pt'
import { gastroenterocolitisModule as gastroenterocolitisEn } from './gastroenterocolitis.en'
import { gastroenterocolitisModule as gastroenterocolitisPt } from './gastroenterocolitis.pt'
import { migraineModule as migraineEn } from './migraine.en'
import { migraineModule as migrainePt } from './migraine.pt'
import { sindromeGripalModule as sindromeGripalEn } from './sindromeGripal.en'
import { sindromeGripalModule as sindromeGripalPt } from './sindromeGripal.pt'
import { utiModule as utiEn } from './uti.en'
import { utiModule as utiPt } from './uti.pt'

type BundledWorkflowEntry = {
  localKey: string
  icon: string
  workflows: Record<Locale, ClinicalWorkflow>
}

export const bundledWorkflowEntries = [
  {
    localKey: 'chest-pain',
    icon: 'chest-pain',
    workflows: {
      en: chestPainEn,
      'pt-BR': chestPainPt,
    },
  },
  {
    localKey: 'uti',
    icon: 'uti',
    workflows: {
      en: utiEn,
      'pt-BR': utiPt,
    },
  },
  {
    localKey: 'gastroenterocolitis',
    icon: 'gastroenterocolitis',
    workflows: {
      en: gastroenterocolitisEn,
      'pt-BR': gastroenterocolitisPt,
    },
  },
  {
    localKey: 'migraine',
    icon: 'migraine',
    workflows: {
      en: migraineEn,
      'pt-BR': migrainePt,
    },
  },
  {
    localKey: 'sindrome-gripal',
    icon: 'sindrome-gripal',
    workflows: {
      en: sindromeGripalEn,
      'pt-BR': sindromeGripalPt,
    },
  },
] satisfies BundledWorkflowEntry[]

export const getClinicalModules = (locale: Locale): ClinicalWorkflow[] =>
  bundledWorkflowEntries.map((entry) => entry.workflows[locale])

export const defaultClinicalWorkflow: ClinicalWorkflow = chestPainEn

export const getClinicalModuleById = (
  moduleId: string | string[] | undefined,
  locale: Locale,
): ClinicalWorkflow => {
  const selectedModuleId = Array.isArray(moduleId) ? moduleId[0] : moduleId
  const entry = bundledWorkflowEntries.find(
    (workflowEntry) => workflowEntry.localKey === selectedModuleId,
  )

  if (!entry) {
    return defaultClinicalWorkflow
  }

  return entry.workflows[locale]
}
