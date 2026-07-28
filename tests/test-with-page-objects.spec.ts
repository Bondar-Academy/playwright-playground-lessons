import { test } from '@playwright/test'
import { PageManager } from '../page-objects/page-manager'

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/')
})

test('Navigate to form layouts page', async ({ page }) => {
    const pom = new PageManager(page)
    await pom.navigateTo.formLayoutsPage()
    await pom.navigateTo.datePickerPage()
    await pom.navigateTo.toasterPage()
    await pom.navigateTo.smartTablePage()
})

test('Parametrized page object methods', async({page}) => {
    const pom = new PageManager(page)
    await pom.navigateTo.formLayoutsPage()
    await pom.formLayoutsPage.submitUsingTheGridForm('artem@test.com', 'Welcome', 'Option 2')
    await pom.formLayoutsPage.submitInlineForm('Artem Bondar', 'artem@test.com', false)
    await pom.navigateTo.datePickerPage()
    await pom.datepickerPage.selectCommonDatepickerDateFromToday(5)
    await pom.datepickerPage.selectDatePickerWithRangeFromToday(7, 20)
    await pom.navigateTo.smartTablePage()
})