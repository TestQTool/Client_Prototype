# Playwright JavaScript Hybrid Framework

Runnable static framework for tests generated only from approved test cases.

## Commands

```bash
npm install
npm run install:browsers
npm run validate
npm run test:list
npm test
npm run test:framework
```

Application tests read `BASE_URL` and secrets from the environment. Do not commit `.env` files or real credentials.

Runtime values belong in `.env`:

```env
BASE_URL=
HEADLESS=true
TEST_ROLE=
TEST_USERNAME=
TEST_PASSWORD=
```

Generated tests and page classes must read these values through `process.env`, `config/environment.js`, or `utils/secrets.js`. Do not hardcode URLs, usernames, or passwords in generated JavaScript files.

Generated feature files belong in `pageObjects/` and `tests/`; register page classes in `fixtures/test.js`.

Page objects use the old single-file style: locators/selectors and page actions/assertions live together in `pageObjects/<Feature>Page.js`. Do not generate split `page-objects/*.locators.js` or `pages/<Feature>Page.js` files.

Playwright tags must come from the approved testcase `tags` field and be added to the test title as `@TagName`.

`framework-tests/` contains only the framework's isolated self-test. The script-generation agent must never copy its health-test names, locators, page content, or test data into generated application tests.
