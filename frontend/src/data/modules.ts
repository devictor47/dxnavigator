import type { ClinicalWorkflow } from '@/data/workflow'
import type { Locale } from '@/i18n/locales'

type BundledWorkflowEntry = {
  localKey: string
  icon: string
  workflows: Record<Locale, ClinicalWorkflow>
}

export const bundledWorkflowEntries = [] satisfies BundledWorkflowEntry[]

export const getClinicalModules = (_locale: Locale): ClinicalWorkflow[] => []

export const defaultClinicalWorkflow: ClinicalWorkflow | null = null

export const getClinicalModuleById = (
  _moduleId: string | string[] | undefined,
  _locale: Locale,
): ClinicalWorkflow => {
  throw new Error('Bundled workflow lookup is disabled. Load workflows from the backend instead.')
}
