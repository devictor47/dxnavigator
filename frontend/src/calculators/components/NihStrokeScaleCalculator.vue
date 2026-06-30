<script setup lang="ts">
import { computed, ref } from 'vue'

import type { NihStrokeScaleCalculatorDefinition } from '@/calculators/calculatorRegistry'

const props = defineProps<{
  calculator: NihStrokeScaleCalculatorDefinition
}>()

type NihssKey = (typeof props.calculator.content.components)[number]['key']
type NihssValues = Record<NihssKey, number>

const scores = ref<NihssValues>(
  props.calculator.content.components.reduce((initialScores, component) => {
    initialScores[component.key] = component.defaultValue

    return initialScores
  }, {} as NihssValues),
)

const totalScore = computed(() =>
  props.calculator.content.components.reduce((total, component) => {
    return total + (scores.value[component.key] ?? 0)
  }, 0),
)

const severityGroup = computed(() => {
  return props.calculator.content.severityGroups.find((group) => {
    const meetsMinimum = totalScore.value >= group.min
    const meetsMaximum = group.max === undefined || totalScore.value <= group.max

    return meetsMinimum && meetsMaximum
  }) ?? props.calculator.content.severityGroups[0]!
})

const scoreRows = computed(() =>
  props.calculator.content.components.map((component) => [component.label, scores.value[component.key] ?? 0]),
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
        <p v-if="component.description" class="section-description">
          {{ component.description }}
        </p>

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
      <h2>{{ severityGroup.label }}</h2>
      <p>{{ severityGroup.description }}</p>

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
