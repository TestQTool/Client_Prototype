// INSTRUCTION: Add the following to your existing testFixtures/fixture.js

// Add this import at the top with other page imports:
import ForgotPasswordPage from '../pages/forgotPasswordPage.js';

// Add this fixture inside the test.extend({ ... }) block:
forgotPasswordPage: async ({ page }, use) => {
    await use(new ForgotPasswordPage(page));
},