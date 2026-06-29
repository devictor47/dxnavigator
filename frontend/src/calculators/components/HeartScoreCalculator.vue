<script setup lang="ts">
import { computed, ref } from 'vue'

import type { HeartScoreCalculatorDefinition } from '@/calculators/calculatorRegistry'

const props = defineProps<{
  calculator: HeartScoreCalculatorDefinition
}>()

type HeartScoreKey = (typeof props.calculator.content.components)[number]['key']
type HeartScoreValues = Record<HeartScoreKey, number>

const scores = ref<HeartScoreValues>({
  history: 0,
  ecg: 0,
  age: 0,
  riskFactors: 0,
  troponin: 0,
})

const totalScore = computed(
  () => scores.value.history + scores.value.ecg + scores.value.age + scores.value.riskFactors + scores.value.troponin,
)

const riskGroup = computed(() => {
  if (totalScore.value <= 3) {
    return props.calculator.content.riskGroups.low
  }

  if (totalScore.value <= 6) {
    return props.calculator.content.riskGroups.moderate
  }

  return props.calculator.content.riskGroups.high
})

const scoreRows = computed(() =>
  props.calculator.content.components.map((component) => [component.label, scores.value[component.key]]),
)
</script>

<template>
  <div class="calculator-layout">
    <section class="calculator-form" aria-label="HEART Score inputs">
      <fieldset
        v-for="component in calculator.content.components"
        :key="component.key"
        class="calculator-fieldset"
      >
        <legend>{{ component.label }}</legend>
        <label v-for="option in component.options" :key="option.label" class="radio-option">
          <input v-model.number="scores[component.key]" type="radio" :value="option.value" />
          <span>
            <strong>{{ option.label }}</strong>
            <small>{{ option.description }}</small>
          </span>
        </label>
      </fieldset>
    </section>

    <aside class="calculator-result-card" aria-label="HEART Score result">
      <p class="eyebrow">{{ calculator.content.resultLabel }}</p>
      <strong class="calculator-score">{{ totalScore }}</strong>
      <h2>{{ riskGroup.label }}</h2>
      <p>{{ riskGroup.description }}</p>

      <dl class="calculator-score-breakdown">
        <div v-for="[label, score] in scoreRows" :key="label">
          <dt>{{ label }}</dt>
          <dd>{{ score }}</dd>
        </div>
      </dl>

      <p class="section-description">
        {{ calculator.content.limitation }}
      </p>
    </aside>
  </div>
</template>
