class WebActions {
    constructor(page) {
        this.page = page;
    }

    async navigateTo(url) {
        await this.page.goto(url);
    }

    async clickElement(selector) {
        await this.page.locator(selector).click();
    }

    async fillElement(selector, text) {
        await this.page.locator(selector).fill(text);
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async waitForNetworkIdle() {
        await this.page.waitForLoadState('networkidle');
    }

    async isVisible(selector) {
        try {
            return await this.page.locator(selector).isVisible();
        } catch (error) {
            return false;
        }
    }

    async verifyText(selector, expectedText) {
        const element = this.page.locator(selector);
        const actualText = await element.textContent();
        return actualText.trim() === expectedText;
    }

    async verifyContainsText(selector, expectedText) {
        const element = this.page.locator(selector);
        const actualText = await element.textContent();
        return actualText.includes(expectedText);
    }

    async getCurrentUrl() {
        return this.page.url();
    }

    async getElementCount(selector) {
        return await this.page.locator(selector).count();
    }

    async wait(milliseconds) {
        await this.page.waitForTimeout(milliseconds);
    }
}

export default WebActions;

