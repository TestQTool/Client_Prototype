package com.framework.pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.AriaRole;

public class LoginPage {
    private final Page page;

    // Locators
    private static final String USERNAME_INPUT = "input[name='username']";
    private static final String PASSWORD_INPUT = "input[name='password']";
    private static final String LOGIN_BUTTON = "button[type='submit']";

    public LoginPage(Page page) {
        this.page = page;
    }

    public void navigateToLoginPage(String url) {
        page.navigate(url);
    }

    public void enterCredentials(String username, String password) {
        page.fill(USERNAME_INPUT, username);
        page.fill(PASSWORD_INPUT, password);
    }

    public void clickLoginButton() {
        page.click(LOGIN_BUTTON);
    }

    public void login(String url, String username, String password) {
        navigateToLoginPage(url);
        enterCredentials(username, password);
        clickLoginButton();
    }
}