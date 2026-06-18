<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'
import {
  isFieldVisible,
  type ClinicalWorkflow,
  type ModuleAnswers,
  type ModuleField,
  type TextField,
  type SelectField,
  type BooleanField,
  type MultiselectField,
} from '@/data/workflow'

defineProps<{
  module: ClinicalWorkflow
  answers: ModuleAnswers
}>()

const { t } = useI18n()

const getMultiselectValue = (answers: ModuleAnswers, key: string): string[] => {
  const value = answers[key]

  return Array.isArray(value) ? value : []
}

const updateText = (answers: ModuleAnswers, field: TextField | SelectField, event: Event): void => {
  answers[field.key] = (event.target as HTMLInputElement).value
}

const updateBoolean = (answers: ModuleAnswers, field: BooleanField, event: Event): void => {
  answers[field.key] = (event.target as HTMLInputElement).checked
}

const updateMultiselect = (answers: ModuleAnswers, field: MultiselectField, optionValue: string): void => {
  const currentValue = getMultiselectValue(answers, field.key)

  if (currentValue.includes(optionValue)) {
    answers[field.key] = currentValue.filter((value) => value !== optionValue)
    return
  }

  answers[field.key] = [...currentValue, optionValue]
}
</script>

<template>
  <form class="dynamic-form">
    <section v-for="section in module.sections" :key="section.id" class="form-section">
      <div class="section-heading">
        <p class="eyebrow">{{ t('form.eyebrow') }}</p>
        <h2>{{ section.title }}</h2>
        <p v-if="section.description" class="section-description">{{ section.description }}</p>
      </div>

      <div class="field-list">
        <fieldset
          v-for="field in section.fields"
          v-show="isFieldVisible(field, answers)"
          :key="field.key"
          class="field-control"
          :data-field-key="field.key"
        >
          <legend>
            {{ field.label }}
            <span v-if="field.required" aria-label="required">*</span>
          </legend>
          <p v-if="field.helperText" class="field-helper">{{ field.helperText }}</p>

          <input
            v-if="field.type === 'text'"
            class="text-input"
            type="text"
            :data-field-input="field.key"
            :placeholder="field.placeholder"
            :value="answers[field.key]"
            @input="updateText(answers, field, $event)"
          />

          <label v-else-if="field.type === 'boolean'" class="check-option single-check">
            <input
              type="checkbox"
              :data-field-input="field.key"
              :checked="answers[field.key] === true"
              @change="updateBoolean(answers, field, $event)"
            />
            <span>{{ field.trueNarrative ?? field.label }}</span>
          </label>

          <div v-else-if="field.type === 'multiselect'" class="option-grid">
            <label v-for="option in field.options" :key="option.value" class="check-option">
              <input
                type="checkbox"
                :data-field-input="field.key"
                :value="option.value"
                :checked="getMultiselectValue(answers, field.key).includes(option.value)"
                @change="updateMultiselect(answers, field, option.value)"
              />
              <span>{{ option.label }}</span>
            </label>
          </div>

          <select
            v-else-if="field.type === 'select'"
            class="text-input"
            :data-field-input="field.key"
            :value="answers[field.key]"
            @change="updateText(answers, field, $event)"
          >
            <option value="">{{ t('common.selectOption') }}</option>
            <option v-for="option in field.options" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </fieldset>
      </div>
    </section>
  </form>
</template>
