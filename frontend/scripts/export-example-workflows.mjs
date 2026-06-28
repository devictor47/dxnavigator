import { createJiti } from 'jiti'

const jiti = createJiti(import.meta.url)

const { chestPainModule: chestPainEn } = jiti('../src/data/chestPain.en.ts')
const { chestPainModule: chestPainPt } = jiti('../src/data/chestPain.pt.ts')
const { gastroenterocolitisModule: gastroenterocolitisEn } = jiti(
  '../src/data/gastroenterocolitis.en.ts',
)
const { gastroenterocolitisModule: gastroenterocolitisPt } = jiti(
  '../src/data/gastroenterocolitis.pt.ts',
)
const { migraineModule: migraineEn } = jiti('../src/data/migraine.en.ts')
const { migraineModule: migrainePt } = jiti('../src/data/migraine.pt.ts')
const { sindromeGripalModule: sindromeGripalEn } = jiti('../src/data/sindromeGripal.en.ts')
const { sindromeGripalModule: sindromeGripalPt } = jiti('../src/data/sindromeGripal.pt.ts')
const { utiModule: utiEn } = jiti('../src/data/uti.en.ts')
const { utiModule: utiPt } = jiti('../src/data/uti.pt.ts')

const workflowGroups = [
  [chestPainEn, chestPainPt],
  [utiEn, utiPt],
  [gastroenterocolitisEn, gastroenterocolitisPt],
  [migraineEn, migrainePt],
  [sindromeGripalEn, sindromeGripalPt],
]

const examples = workflowGroups.flatMap((workflows, displayOrder) =>
  workflows.map((workflow) => ({
    key: `${workflow.id}-${workflow.language}`,
    title: workflow.title,
    description: workflow.description ?? workflow.overview,
    slug: workflow.slug ?? workflow.id,
    language: workflow.language,
    displayOrder,
    definition: workflow,
  })),
)

process.stdout.write(`${JSON.stringify(examples, null, 2)}\n`)
