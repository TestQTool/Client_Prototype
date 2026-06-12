// UPDATE REQUIRED: Add these lines to existing testFixtures/fixture.js

// Add import at the top:
import ForgotPasswordPage from '../pages/forgotPasswordPage.js';

// Add fixture inside test.extend({...}):
forgotPasswordPage: async ({ page }, use) => {
    await use(new ForgotPasswordPage(page));
},