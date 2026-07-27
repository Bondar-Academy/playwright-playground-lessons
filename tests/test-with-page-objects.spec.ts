import { test } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigation-page'
import { FormLayoutsPage } from '../page-objects/form-layouts-page'

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/')
})

test('Navigate to form layouts page', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datePickerPage()
    await navigateTo.toasterPage()
    await navigateTo.smartTablePage()
})

test('Parametrized page object methods', async({page}) => {
    const navigateTo = new NavigationPage(page)
    const formLayoutsPage = new FormLayoutsPage(page)
    await navigateTo.formLayoutsPage()
    await formLayoutsPage.submitUsingTheGridForm('artem@test.com', 'Welcome', 'Option 2')
    await formLayoutsPage.submitInlineForm('Artem Bondar', 'artem@test.com', false)
})