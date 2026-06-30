<script setup lang="ts">
import { computed, ref } from 'vue'

import type { ChecklistScoreCalculatorDefinition } from '@/calculators/calculatorRegistry'

const props = defineProps<{
  calculator: ChecklistScoreCalculatorDefinition
}>()

type CriterionKey = (typeof props.calculator.content.criteria)[number]['key']
type CriterionValues = Record<CriterionKey, boolean>
type RiskGroup = (typeof props.calculator.content.riskGroups)[number]

const answers = ref<CriterionValues>(
  props.calculator.content.criteria.reduce((initialAnswers, criterion) => {
    initialAnswers[criterion.key] = false

    return initialAnswers
  }, {} as CriterionValues),
)

const selectedCriteria = computed(() =>
  props.calculator.content.criteria.filter((criterion) => answers.value[criterion.key]),
)

const totalScore = computed(() =>
  selectedCriteria.value.reduce((total, criterion) => total + criterion.points, 0),
)

const riskGroup = computed<RiskGroup>(() => {
  const matchingRiskGroup = props.calculator.content.riskGroups.find((group) => {
    const meetsMinimum = totalScore.value >= group.min
    const meetsMaximum = group.max === undefined || totalScore.value <= group.max

    return meetsMinimum && meetsMaximum
  })

  return matchingRiskGroup ?? props.calculator.content.riskGroups[0]!
})
</script>

<template>
  <div class="calculator-layout">
    <section class="calculator-form" :aria-label="calculator.content.inputLabel">
      <fieldset class="calculator-fieldset">
        <legend>{{ calculator.content.criteriaLabel }}</legend>

        <label
          v-for="criterion in calculator.content.criteria"
          :key="criterion.key"
          class="calculator-choice-option"
        >
          <input v-model="answers[criterion.key]" type="checkbox" />
          <span>
            <strong>{{ criterion.label }}</strong>
            <small v-if="criterion.description">{{ criterion.description }}</small>
          </span>
          <span class="score-pill">{{ criterion.points > 0 ? '+' : '' }}{{ criterion.points }}</span>
        </label>
      </fieldset>
    </section>

    <aside class="calculator-result-card" :aria-label="calculator.content.resultLabel">
      <p class="eyebrow">{{ calculator.content.resultLabel }}</p>
      <strong class="calculator-score">{{ totalScore }}</strong>
      <h2>{{ riskGroup.label }}</h2>
      <p>{{ riskGroup.description }}</p>

      <dl class="calculator-score-breakdown">
        <div>
          <dt>{{ calculator.content.selectedCriteriaLabel }}</dt>
          <dd>{{ selectedCriteria.length }}</dd>
        </div>
      </dl>

      <p class="section-description">
        {{ calculator.content.limitation }}
      </p>
    </aside>
  </div>
</template>
