import { chestPainModule as chestPainModuleEn } from '@/data/chestPain.en'
import { chestPainModule as chestPainModulePt } from '@/data/chestPain.pt'
import { gastroenterocolitisModule as gastroenterocolitisModuleEn } from '@/data/gastroenterocolitis.en'
import { gastroenterocolitisModule as gastroenterocolitisModulePt } from '@/data/gastroenterocolitis.pt'
import { migraineModule as migraineModuleEn } from '@/data/migraine.en'
import { migraineModule as migraineModulePt } from '@/data/migraine.pt'
import { sindromeGripalModule as sindromeGripalModuleEn } from '@/data/sindromeGripal.en'
import { sindromeGripalModule as sindromeGripalModulePt } from '@/data/sindromeGripal.pt'
import { utiModule as utiModuleEn } from '@/data/uti.en'
import { utiModule as utiModulePt } from '@/data/uti.pt'
import type { ClinicalWorkflow } from '@/data/workflow'
import { defaultLocale, type Locale } from '@/i18n/locales'

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
      en: chestPainModuleEn,
      'pt-BR': chestPainModulePt,
    },
  },
  {
    localKey: 'uti',
    icon: 'uti',
    workflows: {
      en: utiModuleEn,
      'pt-BR': utiModulePt,
    },
  },
  {
    localKey: 'gastroenterocolitis',
    icon: 'gastroenterocolitis',
    workflows: {
      en: gastroenterocolitisModuleEn,
      'pt-BR': gastroenterocolitisModulePt,
    },
  },
  {
    localKey: 'migraine',
    icon: 'migraine',
    workflows: {
      en: migraineModuleEn,
      'pt-BR': migraineModulePt,
    },
  },
  {
    localKey: 'sindrome-gripal',
    icon: 'sindrome-gripal',
    workflows: {
      en: sindromeGripalModuleEn,
      'pt-BR': sindromeGripalModulePt,
    },
  },
] satisfies BundledWorkflowEntry[]

export const getClinicalModules = (locale: Locale): ClinicalWorkflow[] =>
  bundledWorkflowEntries.map((entry) => entry.workflows[locale] ?? entry.workflows[defaultLocale])

export const defaultClinicalWorkflow = bundledWorkflowEntries[0]!.workflows[defaultLocale]

export const getClinicalModuleById = (
  moduleId: string | string[] | undefined,
  locale: Locale,
): ClinicalWorkflow => {
  const normalizedModuleId = Array.isArray(moduleId) ? moduleId[0] : moduleId
  const entry =
    bundledWorkflowEntries.find((workflowEntry) => workflowEntry.localKey === normalizedModuleId) ??
    bundledWorkflowEntries[0]!

  return entry.workflows[locale] ?? entry.workflows[defaultLocale]
}
