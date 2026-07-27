import { test } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigation-page'

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/')
})

test('Navigate to form layouts page', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
})