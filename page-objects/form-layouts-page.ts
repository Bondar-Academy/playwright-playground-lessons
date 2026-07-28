import { Page } from '@playwright/test'
import { step } from '../helpers/test-step-decorator'

export class FormLayoutsPage {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }
    @step
    async submitUsingTheGridForm(email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', { hasText: "Using the Grid" })
        await usingTheGridForm.getByRole('textbox', { name: "Email" }).fill(email)
        await usingTheGridForm.getByRole('textbox', { name: "Password" }).fill(password)
        await usingTheGridForm.getByLabel(optionText).check({ force: true })
        await usingTheGridForm.getByRole('button', { name: "Sign in" }).click()
    }

    /**
     * This method submits inline form with user full name, email and remember me checkbox can be selected
     * @param fullName - Valid test user full name (First and last name)
     * @param email - Valid test user email
     * @param rememberMeCheckbox - Pass `true` to select Remember Me checkbox
     */
    @step
    async submitInlineForm(fullName: string, email: string, rememberMeCheckbox: boolean) {
        const inlineForm = this.page.locator('nb-card', { hasText: "Inline form" })
        await inlineForm.getByRole('textbox', { name: "Jane Doe" }).fill(fullName)
        await inlineForm.getByRole('textbox', { name: "Email" }).fill(email)
        if (rememberMeCheckbox) {
            await inlineForm.getByRole('checkbox').check({ force: true })
        }
        await inlineForm.getByRole('button', { name: "Submit" }).click()
    }

}