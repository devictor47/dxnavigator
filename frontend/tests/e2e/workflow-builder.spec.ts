import { expect, test } from '@playwright/test'

import { createTestAccount } from './helpers/auth'

test('creates, previews, and saves a simple workflow', async ({ page }) => {
  await createTestAccount(page)

  await page.goto('/private/builder')

  await page.getByTestId('workflow-title-input').fill('E2E Sore Throat')
  await expect(page.getByTestId('workflow-id-input')).toHaveValue('e2e-sore-throat')
  await expect(page.getByTestId('workflow-slug-input')).toHaveValue('e2e-sore-throat')

  await page.getByTestId('workflow-description-input').fill('A tiny workflow created by E2E.')
  await page.getByTestId('workflow-overview-input').fill('Collects sore throat basics.')

  await page.getByTestId('new-section-title-input').fill('History')
  await page.getByTestId('add-section-button').click()
  await expect(page.getByTestId('new-field-label-input')).toBeVisible()

  await page.getByTestId('new-field-label-input').fill('Symptom duration')
  await expect(page.getByTestId('new-field-key-input')).toHaveValue('symptomDuration')
  await page.getByTestId('add-field-button').click()

  await page.getByTestId('new-field-label-input').fill('Fever')
  await page.getByTestId('new-field-type-select').selectOption('boolean')
  await page.getByTestId('add-field-button').click()

  const feverField = page.getByTestId('builder-field-row').nth(1)
  await expect(feverField.getByRole('textbox').first()).toHaveValue('Fever')
  await feverField.getByLabel('Narrative when checked').fill('fever')

  await page.getByTestId('hpi-template-input').fill(
    'Patient presents with sore throat{% if symptomDuration %} for {{ symptomDuration }}{% endif %}.{% if fever %} Associated symptom: {{ fever }}.{% endif %}',
  )

  await page.getByRole('tab', { name: 'Preview' }).click()
  await expect(page.getByRole('heading', { name: 'E2E Sore Throat' })).toBeVisible()
  await expect(page.getByRole('group', { name: 'Symptom duration' })).toBeVisible()
  await expect(page.getByRole('group', { name: 'Fever' })).toBeVisible()

  await page.getByRole('tab', { name: 'Edit' }).click()
  await page.getByTestId('save-workflow-button').click()
  await expect(page.getByText('Workflow saved')).toBeVisible()
})
