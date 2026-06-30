<script setup lang="ts">
import { computed, ref } from 'vue'

import type { InfusionDoseConverterDefinition } from '@/calculators/calculatorRegistry'

const props = defineProps<{
  calculator: InfusionDoseConverterDefinition
}>()

type ConversionMode = 'rateToDose' | 'doseToRate'

const mode = ref<ConversionMode>('rateToDose')
const infusionRate = ref<number | null>(null)
const targetDose = ref<number | null>(null)
const weight = ref<number | null>(null)
const totalVolume = ref<number | null>(null)
const medicationAmount = ref<number | null>(null)
const medicationUnit = ref<'mcg' | 'mg'>('mg')

const medicationAmountInMcg = computed(() => {
  if (!medicationAmount.value || medicationAmount.value <= 0) {
    return null
  }

  return medicationUnit.value === 'mg' ? medicationAmount.value * 1000 : medicationAmount.value
})

const concentration = computed(() => {
  if (!medicationAmountInMcg.value || !totalVolume.value || totalVolume.value <= 0) {
    return null
  }

  return medicationAmountInMcg.value / totalVolume.value
})

const calculatedDose = computed(() => {
  if (
    mode.value !== 'rateToDose' ||
    !infusionRate.value ||
    infusionRate.value <= 0 ||
    !weight.value ||
    weight.value <= 0 ||
    !concentration.value
  ) {
    return null
  }

  return (infusionRate.value * concentration.value) / weight.value / 60
})

const calculatedRate = computed(() => {
  if (
    mode.value !== 'doseToRate' ||
    !targetDose.value ||
    targetDose.value <= 0 ||
    !weight.value ||
    weight.value <= 0 ||
    !concentration.value
  ) {
    return null
  }

  return (targetDose.value * weight.value * 60) / concentration.value
})

const deliveredAmountPerHour = computed(() => {
  const activeRate = mode.value === 'rateToDose' ? infusionRate.value : calculatedRate.value

  if (!activeRate || activeRate <= 0 || !concentration.value) {
    return null
  }

  return activeRate * concentration.value
})

const primaryResult = computed(() => {
  if (mode.value === 'rateToDose') {
    return {
      label: props.calculator.content.doseResultLabel,
      value: calculatedDose.value,
      unit: 'mcg/kg/min',
    }
  }

  return {
    label: props.calculator.content.rateResultLabel,
    value: calculatedRate.value,
    unit: 'mL/h',
  }
})

const formatNumber = (value: number | null, maximumFractionDigits = 3): string => {
  if (value === null) {
    return props.calculator.content.emptyValue
  }

  return new Intl.NumberFormat(props.calculator.language, {
    maximumFractionDigits,
  }).format(value)
}
</script>

<template>
  <div class="calculator-layout">
    <section class="calculator-form" :aria-label="calculator.content.inputLabel">
      <fieldset class="calculator-fieldset">
        <legend>{{ calculator.content.modeLabel }}</legend>

        <div class="calculator-mode-toggle" role="group" :aria-label="calculator.content.modeLabel">
          <button
            type="button"
            class="calculator-mode-button"
            :class="{ selected: mode === 'rateToDose' }"
            @click="mode = 'rateToDose'"
          >
            {{ calculator.content.rateToDoseLabel }}
          </button>
          <button
            type="button"
            class="calculator-mode-button"
            :class="{ selected: mode === 'doseToRate' }"
            @click="mode = 'doseToRate'"
          >
            {{ calculator.content.doseToRateLabel }}
          </button>
        </div>
      </fieldset>

      <fieldset class="calculator-fieldset calculator-input-grid">
        <legend>{{ calculator.content.infusionLabel }}</legend>

        <label v-if="mode === 'rateToDose'" class="calculator-number-field">
          <span>{{ calculator.content.infusionRateLabel }}</span>
          <input v-model.number="infusionRate" class="text-input" type="number" min="0" step="0.01" />
        </label>

        <label v-else class="calculator-number-field">
          <span>{{ calculator.content.targetDoseLabel }}</span>
          <input v-model.number="targetDose" class="text-input" type="number" min="0" step="0.001" />
        </label>

        <label class="calculator-number-field">
          <span>{{ calculator.content.weightLabel }}</span>
          <input v-model.number="weight" class="text-input" type="number" min="0" step="0.1" />
        </label>
      </fieldset>

      <fieldset class="calculator-fieldset calculator-input-grid">
        <legend>{{ calculator.content.solutionLabel }}</legend>

        <label class="calculator-number-field">
          <span>{{ calculator.content.medicationAmountLabel }}</span>
          <input v-model.number="medicationAmount" class="text-input" type="number" min="0" step="0.01" />
        </label>

        <label class="calculator-number-field">
          <span>{{ calculator.content.medicationUnitLabel }}</span>
          <select v-model="medicationUnit" class="text-input">
            <option value="mg">mg</option>
            <option value="mcg">mcg</option>
          </select>
        </label>

        <label class="calculator-number-field">
          <span>{{ calculator.content.totalVolumeLabel }}</span>
          <input v-model.number="totalVolume" class="text-input" type="number" min="0" step="0.1" />
        </label>
      </fieldset>
    </section>

    <aside class="calculator-result-card" :aria-label="calculator.content.resultLabel">
      <p class="eyebrow">{{ calculator.content.resultLabel }}</p>
      <strong class="calculator-score compact">{{ formatNumber(primaryResult.value) }}</strong>
      <h2>{{ primaryResult.label }}</h2>
      <p>{{ primaryResult.unit }}</p>

      <dl class="calculator-score-breakdown">
        <div>
          <dt>{{ calculator.content.concentrationLabel }}</dt>
          <dd>{{ formatNumber(concentration) }} mcg/mL</dd>
        </div>
        <div>
          <dt>{{ calculator.content.deliveredAmountLabel }}</dt>
          <dd>{{ formatNumber(deliveredAmountPerHour) }} mcg/h</dd>
        </div>
      </dl>

      <p class="section-description">
        {{ calculator.content.limitation }}
      </p>
    </aside>
  </div>
</template>
