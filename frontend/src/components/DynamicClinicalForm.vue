<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'
import {
  isFieldVisible,
  type BooleanField,
  type ModuleAnswerValue,
  type MultiselectField,
  type SelectField,
  type TextField,
  type WorkflowSession,
} from '@/data/workflow'
import { resolveText, type TranslatableText } from '@/i18n/locales'

defineProps<{
  session: WorkflowSession
}>()

const { locale, t } = useI18n()

const text = (value: TranslatableText): string => resolveText(value, locale.value)

const optionalText = (value?: TranslatableText): string => {
  return value ? text(value) : ''
}

const getMultiselectValue = (value: ModuleAnswerValue | undefined): string[] => {
  return Array.isArray(value) ? value : []
}

const updateText = (
  session: WorkflowSession,
  field: TextField | SelectField,
  event: Event,
): void => {
  session.setAnswer(field.key, (event.target as HTMLInputElement).value)
}

const updateBoolean = (session: WorkflowSession, field: BooleanField, event: Event): void => {
  session.setAnswer(field.key, (event.target as HTMLInputElement).checked)
}

const updateMultiselect = (
  session: WorkflowSession,
  field: MultiselectField,
  optionValue: string,
): void => {
  const currentValue = getMultiselectValue(session.getAnswer(field.key))

  if (currentValue.includes(optionValue)) {
    session.setAnswer(field.key, currentValue.filter((value) => value !== optionValue))
    return
  }

  session.setAnswer(field.key, [...currentValue, optionValue])
}
</script>

<template>
  <form class="dynamic-form">
    <section v-for="section in session.workflow.sections" :key="section.id" class="form-section">
      <div class="section-heading">
        <h2>{{ text(section.title) }}</h2>
        <p v-if="optionalText(section.description)" class="section-description">
          {{ optionalText(section.description) }}
        </p>
      </div>

      <div class="field-list">
        <fieldset
          v-for="field in section.fields"
          v-show="isFieldVisible(field, session.answers)"
          :key="field.key"
          class="field-control"
          :data-field-key="field.key"
        >
          <legend :class="{ 'visually-hidden': field.type === 'boolean' }">
            {{ text(field.label) }}
            <span v-if="field.required" aria-label="required">*</span>
          </legend>
          <p v-if="optionalText(field.helperText)" class="field-helper">
            {{ optionalText(field.helperText) }}
          </p>

          <input
            v-if="field.type === 'text'"
            class="text-input"
            type="text"
            :data-field-input="field.key"
            :placeholder="optionalText(field.placeholder)"
            :value="session.getAnswer(field.key)"
            @input="updateText(session, field, $event)"
          />

          <label v-else-if="field.type === 'boolean'" class="check-option single-check">
            <input
              type="checkbox"
              :data-field-input="field.key"
              :checked="session.getAnswer(field.key) === true"
              @change="updateBoolean(session, field, $event)"
            />
            <span>{{ text(field.label) }}</span>
          </label>

          <div v-else-if="field.type === 'multiselect'" class="option-grid">
            <label v-for="option in field.options" :key="option.value" class="check-option">
              <input
                type="checkbox"
                :data-field-input="field.key"
                :value="option.value"
                :checked="getMultiselectValue(session.getAnswer(field.key)).includes(option.value)"
                @change="updateMultiselect(session, field, option.value)"
              />
              <span>{{ text(option.label) }}</span>
            </label>
          </div>

          <select
            v-else-if="field.type === 'select'"
            class="text-input"
            :data-field-input="field.key"
            :value="session.getAnswer(field.key)"
            @change="updateText(session, field, $event)"
          >
            <option value="">{{ t('common.selectOption') }}</option>
            <option v-for="option in field.options" :key="option.value" :value="option.value">
              {{ text(option.label) }}
            </option>
          </select>
        </fieldset>
      </div>
    </section>
  </form>
</template>
