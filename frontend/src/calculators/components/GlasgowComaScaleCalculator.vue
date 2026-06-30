<script setup lang="ts">
import { computed, ref } from 'vue'

import type { GlasgowComaScaleCalculatorDefinition } from '@/calculators/calculatorRegistry'

const props = defineProps<{
  calculator: GlasgowComaScaleCalculatorDefinition
}>()

type GcsKey = (typeof props.calculator.content.components)[number]['key']
type GcsValues = Record<GcsKey, number>

const scores = ref<GcsValues>({
  eye: 4,
  verbal: 5,
  motor: 6,
})

const totalScore = computed(() => scores.value.eye + scores.value.verbal + scores.value.motor)

const riskGroup = computed(() => {
  return props.calculator.content.riskGroups.find((group) => {
    const meetsMinimum = totalScore.value >= group.min
    const meetsMaximum = group.max === undefined || totalScore.value <= group.max

    return meetsMinimum && meetsMaximum
  }) ?? props.calculator.content.riskGroups[0]!
})

const scoreRows = computed(() =>
  props.calculator.content.components.map((component) => [component.label, scores.value[component.key]]),
)
</script>

<template>
  <div class="calculator-layout">
    <section class="calculator-form" :aria-label="calculator.content.inputLabel">
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

    <aside class="calculator-result-card" :aria-label="calculator.content.resultLabel">
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
