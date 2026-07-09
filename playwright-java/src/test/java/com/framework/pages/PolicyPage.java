package com.framework.pages;

import com.microsoft.playwright.Page;

public class PolicyPage {
    private final Page page;

    // Locators
    private static final String CUSTOMER_NAME_INPUT = "input[name='customerName'], input#customerName, input[placeholder*='Customer'], input[placeholder*='customer']";
    private static final String SUBMIT_BUTTON = "button[type='submit'], button:has-text('Submit')";
    private static final String VALIDATION_ERROR_MESSAGE = ".error-message, .validation-error, span.error, .field-error, .input-error";

    public PolicyPage(Page page) {
        this.page = page;
    }

    public void leaveCustomerNameEmpty() {
        // Intentionally leave the customer name field empty
        page.fill(CUSTOMER_NAME_INPUT, "");
    }

    public void fillOtherMandatoryFields() {
        // Fill other mandatory fields with valid data
        // This is a placeholder - actual fields would depend on the application
        // Example fields that might exist:
        // page.fill("input[name='policyNumber']", "POL123456");
        // page.fill("input[name='effectiveDate']", "2024-01-01");
    }

    public void clickSubmitButton() {
        page.click(SUBMIT_BUTTON);
    }

    public boolean isValidationErrorDisplayed() {
        return page.locator(VALIDATION_ERROR_MESSAGE).isVisible();
    }

    public String getValidationErrorMessage() {
        return page.locator(VALIDATION_ERROR_MESSAGE).first().textContent();
    }

    public boolean isCustomerNameErrorDisplayed() {
        // Check if error message specifically mentions customer name
        String errorText = getValidationErrorMessage().toLowerCase();
        return errorText.contains("customer") || errorText.contains("name") || errorText.contains("required");
    }
}