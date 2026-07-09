from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class PolicyCreationPage:
    """Page Object for Policy Creation functionality"""

    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)

    # Locators
    CUSTOMER_NAME_INPUT = (By.ID, "customerName")
    CUSTOMER_EMAIL_INPUT = (By.ID, "customerEmail")
    CUSTOMER_PHONE_INPUT = (By.ID, "customerPhone")
    PREMIUM_AMOUNT_INPUT = (By.ID, "premiumAmount")
    SUBMIT_BUTTON = (By.XPATH, "//button[@type='submit']")
    PREMIUM_AMOUNT_ERROR = (By.XPATH, "//span[@class='error-message' or contains(@class, 'validation-error')]")
    PREMIUM_AMOUNT_VALIDATION_ERROR = (By.XPATH, "//span[contains(text(), 'numeric') or contains(text(), 'number')]")

    def enter_customer_name(self, name):
        """Enter customer name"""
        name_field = self.wait.until(
            EC.visibility_of_element_located(self.CUSTOMER_NAME_INPUT)
        )
        name_field.clear()
        name_field.send_keys(name)

    def enter_customer_email(self, email):
        """Enter customer email"""
        email_field = self.wait.until(
            EC.visibility_of_element_located(self.CUSTOMER_EMAIL_INPUT)
        )
        email_field.clear()
        email_field.send_keys(email)

    def enter_customer_phone(self, phone):
        """Enter customer phone"""
        phone_field = self.wait.until(
            EC.visibility_of_element_located(self.CUSTOMER_PHONE_INPUT)
        )
        phone_field.clear()
        phone_field.send_keys(phone)

    def enter_premium_amount(self, amount):
        """Enter premium amount"""
        premium_field = self.wait.until(
            EC.visibility_of_element_located(self.PREMIUM_AMOUNT_INPUT)
        )
        premium_field.clear()
        premium_field.send_keys(amount)

    def click_submit(self):
        """Click submit button"""
        submit_btn = self.wait.until(
            EC.element_to_be_clickable(self.SUBMIT_BUTTON)
        )
        submit_btn.click()

    def get_premium_amount_error_message(self):
        """Get the error message for premium amount field"""
        try:
            error_element = self.wait.until(
                EC.visibility_of_element_located(self.PREMIUM_AMOUNT_ERROR)
            )
            return error_element.text
        except:
            return None

    def is_validation_error_displayed(self):
        """Check if validation error is displayed for premium amount"""
        try:
            error_element = self.wait.until(
                EC.visibility_of_element_located(self.PREMIUM_AMOUNT_ERROR)
            )
            return error_element.is_displayed()
        except:
            return False

    def get_premium_amount_field_validation_state(self):
        """Get the validation state of premium amount field"""
        try:
            premium_field = self.driver.find_element(*self.PREMIUM_AMOUNT_INPUT)
            return premium_field.get_attribute("aria-invalid") == "true" or \
                   "invalid" in premium_field.get_attribute("class")
        except:
            return False
