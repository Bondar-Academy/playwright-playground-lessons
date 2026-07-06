import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/')
})

test.describe('Form Layouts page', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Input fields', async({page}) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 500})

        //extract the value
        const inputValue = await usingTheGridEmailInput.inputValue()

        //assertions
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
        await expect(usingTheGridEmailInput).toHaveValue(/test.com/)

    })

    test('radio buttons', async({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})

        await usingTheGridForm.getByLabel('Option 1').check({force: true})
        await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true})

        const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()
        expect(radioStatus).toBeTruthy()

        await expect(usingTheGridForm.getByRole('radio', {name: "Option 2"})).toBeChecked()
        await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).not.toBeChecked()
    })
})

test('checkboxes', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true})

    const allBoxes = page.getByRole('checkbox')
    for(const box of await allBoxes.all()){
        await box.check({force: true})
        await expect(box).toBeChecked()
    }
})

test('Lists and dropdowns', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    //standard dropdown
    await page.locator('.form-group', {hasText: 'Toast type:'}).getByRole('combobox').selectOption('info')
    await expect(page.getByRole('combobox')).toHaveValue('info')

    //custom dropdowns
    await page.locator('.form-group', {hasText: 'Position:'}).locator('nb-select').click()
    //option1
    //await page.getByRole('list').getByText('bottom-end').click()
    //option2
    await page.locator('nb-option', {hasText: "bottom-end"}).click()
    await expect(page.locator('.form-group', {hasText: 'Position:'}).locator('nb-select')).toHaveText('bottom-end')

    //looping through the list
    const positionDropDownField = page.locator('.form-group', {hasText: 'Position:'}).locator('nb-select')
    await positionDropDownField.click()
    const allListValues = await page.locator('nb-option').allTextContents()
    for (const listValue of allListValues){
        await page.locator('nb-option', {hasText: listValue}).click()
        await expect(positionDropDownField).toHaveText(listValue)
        await positionDropDownField.click()
    }
})

test('tooltips', async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    await page.getByRole('button', {name: 'Top'}).hover()
    await expect(page.getByRole('tooltip')).toHaveText('This is a tooltip')
})

test('dialog box', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.locator('tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()
    await expect(page.locator('tr', {hasText: 'mdo@gmail.com'})).not.toBeVisible()
})

test('web tables', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //1 how to select row by any visible text
    const tableRowByEmail = page.getByRole('row', {name: 'twitter@outlook.com'})
    await tableRowByEmail.locator('.nb-edit').click()
    await tableRowByEmail.getByPlaceholder('Age').fill('35')
    await tableRowByEmail.locator('.nb-checkmark').click()
    await expect(tableRowByEmail.locator('td').last()).toHaveText('35')

    //2 get row by a spcific column value
    const tableRowById = page.getByRole('row').filter({has: page.getByRole('cell').nth(1).getByText('10')})
    await tableRowById.locator('.nb-edit').click()
    await page.locator('tbody').getByPlaceholder('E-mail').fill('test@test.com')
    await page.locator('tbody').locator('.nb-checkmark').click()
    await expect(tableRowById.locator('td').nth(5)).toHaveText('test@test.com')
})