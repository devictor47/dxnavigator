<script setup lang="ts">
import { computed, ref } from 'vue'

import type { WellsDvtCalculatorDefinition } from '@/calculators/calculatorRegistry'

const props = defineProps<{
  calculator: WellsDvtCalculatorDefinition
}>()

type WellsDvtKey = (typeof props.calculator.content.criteria)[number]['key']
type WellsDvtValues = Record<WellsDvtKey, boolean>

const answers = ref<WellsDvtValues>(
  props.calculator.content.criteria.reduce((initialAnswers, criterion) => {
    initialAnswers[criterion.key] = false

    return initialAnswers
  }, {} as WellsDvtValues),
)

const selectedCriteria = computed(() =>
  props.calculator.content.criteria.filter((criterion) => answers.value[criterion.key]),
)

const totalScore = computed(() =>
  selectedCriteria.value.reduce((total, criterion) => total + criterion.points, 0),
)

const riskGroup = computed(() => {
  if (totalScore.value <= 0) {
    return props.calculator.content.riskGroups.unlikely
  }

  if (totalScore.value <= 2) {
    return props.calculator.content.riskGroups.moderate
  }

  return props.calculator.content.riskGroups.likely
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
