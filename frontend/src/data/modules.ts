import { chestPainModule } from '@/data/chestPain'
import { gastroenterocolitisModule } from '@/data/gastroenterocolitis'
import { migraineModule } from '@/data/migraine'
import { sindromeGripalModule } from '@/data/sindromeGripal'
import { utiModule } from '@/data/uti'
import type { ClinicalWorkflow } from '@/data/workflow'

export const clinicalModules = [
  chestPainModule,
  utiModule,
  gastroenterocolitisModule,
  migraineModule,
  sindromeGripalModule,
] satisfies ClinicalWorkflow[]

export const defaultClinicalWorkflow = chestPainModule

export const getClinicalModuleById = (
  moduleId: string | string[] | undefined,
): ClinicalWorkflow => {
  const normalizedModuleId = Array.isArray(moduleId) ? moduleId[0] : moduleId

  return clinicalModules.find((module) => module.id === normalizedModuleId) ?? defaultClinicalWorkflow
}
