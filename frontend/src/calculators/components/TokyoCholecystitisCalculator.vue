<script setup lang="ts">
import { computed, ref } from 'vue'

import type { TokyoCholecystitisCalculatorDefinition } from '@/calculators/calculatorRegistry'

const props = defineProps<{
  calculator: TokyoCholecystitisCalculatorDefinition
}>()

type CriterionKey =
  | (typeof props.calculator.content.localCriteria)[number]['key']
  | (typeof props.calculator.content.systemicCriteria)[number]['key']
  | (typeof props.calculator.content.imagingCriteria)[number]['key']
  | (typeof props.calculator.content.gradeTwoCriteria)[number]['key']
  | (typeof props.calculator.content.gradeThreeCriteria)[number]['key']

const answers = ref<Record<CriterionKey, boolean>>(
  [
    ...props.calculator.content.localCriteria,
    ...props.calculator.content.systemicCriteria,
    ...props.calculator.content.imagingCriteria,
    ...props.calculator.content.gradeTwoCriteria,
    ...props.calculator.content.gradeThreeCriteria,
  ].reduce((initialAnswers, criterion) => {
    initialAnswers[criterion.key] = false

    return initialAnswers
  }, {} as Record<CriterionKey, boolean>),
)

const hasAnySelected = (criteria: Array<{ key: CriterionKey }>): boolean =>
  criteria.some((criterion) => answers.value[criterion.key])

const hasLocalCriterion = computed(() => hasAnySelected(props.calculator.content.localCriteria))
const hasSystemicCriterion = computed(() => hasAnySelected(props.calculator.content.systemicCriteria))
const hasImagingCriterion = computed(() => hasAnySelected(props.calculator.content.imagingCriteria))
const hasGradeTwoCriterion = computed(() => hasAnySelected(props.calculator.content.gradeTwoCriteria))
const hasGradeThreeCriterion = computed(() => hasAnySelected(props.calculator.content.gradeThreeCriteria))

const diagnosticResult = computed(() => {
  if (hasLocalCriterion.value && hasSystemicCriterion.value && hasImagingCriterion.value) {
    return props.calculator.content.diagnosis.definite
  }

  if (hasLocalCriterion.value && hasSystemicCriterion.value) {
    return props.calculator.content.diagnosis.suspected
  }

  return props.calculator.content.diagnosis.notMet
})

const severityResult = computed(() => {
  if (hasGradeThreeCriterion.value) {
    return props.calculator.content.severity.gradeThree
  }

  if (hasGradeTwoCriterion.value) {
    return props.calculator.content.severity.gradeTwo
  }

  return props.calculator.content.severity.gradeOne
})

const renderCriteria = (criteria: Array<{ key: CriterionKey; label: string; description: string }>) => criteria
</script>

<template>
  <div class="calculator-layout">
    <section class="calculator-form" :aria-label="calculator.content.inputLabel">
      <fieldset class="calculator-fieldset">
        <legend>{{ calculator.content.localLabel }}</legend>
        <label
          v-for="criterion in renderCriteria(calculator.content.localCriteria)"
          :key="criterion.key"
          class="calculator-choice-option two-column"
        >
          <input v-model="answers[criterion.key]" type="checkbox" />
          <span>
            <strong>{{ criterion.label }}</strong>
            <small>{{ criterion.description }}</small>
          </span>
        </label>
      </fieldset>

      <fieldset class="calculator-fieldset">
        <legend>{{ calculator.content.systemicLabel }}</legend>
        <label
          v-for="criterion in renderCriteria(calculator.content.systemicCriteria)"
          :key="criterion.key"
          class="calculator-choice-option two-column"
        >
          <input v-model="answers[criterion.key]" type="checkbox" />
          <span>
            <strong>{{ criterion.label }}</strong>
            <small>{{ criterion.description }}</small>
          </span>
        </label>
      </fieldset>

      <fieldset class="calculator-fieldset">
        <legend>{{ calculator.content.imagingLabel }}</legend>
        <label
          v-for="criterion in renderCriteria(calculator.content.imagingCriteria)"
          :key="criterion.key"
          class="calculator-choice-option two-column"
        >
          <input v-model="answers[criterion.key]" type="checkbox" />
          <span>
            <strong>{{ criterion.label }}</strong>
            <small>{{ criterion.description }}</small>
          </span>
        </label>
      </fieldset>

      <fieldset class="calculator-fieldset">
        <legend>{{ calculator.content.gradeTwoLabel }}</legend>
        <label
          v-for="criterion in renderCriteria(calculator.content.gradeTwoCriteria)"
          :key="criterion.key"
          class="calculator-choice-option two-column"
        >
          <input v-model="answers[criterion.key]" type="checkbox" />
          <span>
            <strong>{{ criterion.label }}</strong>
            <small>{{ criterion.description }}</small>
          </span>
        </label>
      </fieldset>

      <fieldset class="calculator-fieldset">
        <legend>{{ calculator.content.gradeThreeLabel }}</legend>
        <label
          v-for="criterion in renderCriteria(calculator.content.gradeThreeCriteria)"
          :key="criterion.key"
          class="calculator-choice-option two-column"
        >
          <input v-model="answers[criterion.key]" type="checkbox" />
          <span>
            <strong>{{ criterion.label }}</strong>
            <small>{{ criterion.description }}</small>
          </span>
        </label>
      </fieldset>
    </section>

    <aside class="calculator-result-card" :aria-label="calculator.content.resultLabel">
      <p class="eyebrow">{{ calculator.content.resultLabel }}</p>
      <strong class="calculator-score compact">{{ diagnosticResult.shortLabel }}</strong>
      <h2>{{ diagnosticResult.label }}</h2>
      <p>{{ diagnosticResult.description }}</p>

      <dl class="calculator-score-breakdown">
        <div>
          <dt>{{ calculator.content.severityLabel }}</dt>
          <dd>{{ severityResult.label }}</dd>
        </div>
      </dl>

      <p>{{ severityResult.description }}</p>

      <p class="section-description">
        {{ calculator.content.limitation }}
      </p>
    </aside>
  </div>
</template>
