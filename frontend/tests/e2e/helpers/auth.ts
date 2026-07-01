import type { Page } from '@playwright/test'

export const forceEnglishLocale = async (page: Page): Promise<void> => {
  await page.addInitScript(() => {
    window.localStorage.setItem('dxnavigator-locale', 'en')
  })
}

export const createTestAccount = async (page: Page): Promise<{ email: string; password: string }> => {
  const timestamp = Date.now()
  const email = `e2e-${timestamp}-${Math.random().toString(36).slice(2)}@example.com`
  const password = '123123'

  await forceEnglishLocale(page)
  await page.goto('/auth/register')
  await page.getByLabel('Name').fill('E2E Clinician')
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: 'Create account' }).click()
  await page.waitForURL(/\/private/)

  return { email, password }
}
