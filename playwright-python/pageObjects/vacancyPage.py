from playwright.sync_api import Page

class VacancyPage:
    def __init__(self, page: Page):
        self.page = page
        self.recruitment_menu = page.locator("text=Recruitment")
        self.vacancies_submenu = page.locator("text=Vacancies")
        self.add_button = page.locator("button:has-text('Add')")
        self.job_title_dropdown = page.locator("label:has-text('Job Title') >> .. >> .oxd-select-text")
        self.vacancy_name_input = page.locator("label:has-text('Vacancy Name') >> .. >> input")
        self.hiring_manager_dropdown = page.locator("label:has-text('Hiring Manager') >> .. >> input")
        self.number_of_positions_input = page.locator("label:has-text('Number of Positions') >> .. >> input")
        self.save_button = page.locator("button[type='submit']:has-text('Save')")
        self.validation_error = page.locator(".oxd-input-field-error-message, .oxd-text--span")

    def navigate_to_vacancies(self):
        self.recruitment_menu.click()
        self.vacancies_submenu.click()

    def click_add_vacancy(self):
        self.add_button.click()

    def select_job_title(self, job_title: str):
        self.job_title_dropdown.click()
        self.page.locator(f"text={job_title}").first.click()

    def enter_vacancy_name(self, vacancy_name: str):
        self.vacancy_name_input.fill(vacancy_name)

    def enter_number_of_positions(self, positions: str):
        self.number_of_positions_input.fill(positions)

    def leave_hiring_manager_empty(self):
        # Explicitly ensuring hiring manager is not selected
        pass

    def click_save(self):
        self.save_button.click()

    def get_validation_error(self) -> str:
        return self.validation_error.first.text_content()

    def is_validation_error_displayed(self) -> bool:
        return self.validation_error.first.is_visible()
