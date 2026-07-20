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

When testcase steps include literal runtime values such as a URL, username, email, or password, generation must put those values only in `.env`. Generated `tests/*.js` and `pageObjects/*.js` files must not contain those literals or fallback expressions such as `process.env.TEST_PASSWORD || 'demo'`; tests should read `process.env.BASE_URL`, `process.env.TEST_USERNAME`, and `process.env.TEST_PASSWORD` or use framework helpers that expose those values.

Use `.env` only for the application base URL and valid/default runtime credentials. Put negative-case credentials, alternate users, form values, expected messages, search text, and other testcase-specific values in `test-data/testdata.json` or `test-data/credentials.csv`. Negative tests must not replace `.env` valid credentials with invalid credentials.

Generated tests may reference `process.env.BASE_URL`, `process.env.TEST_USERNAME`, `process.env.TEST_PASSWORD`, and test-data keys, but must not expose literal runtime values in test titles, step titles, comments, logs, page objects, or tests. Use safe step labels such as "Navigate to login page", not labels containing hidden values or environment variable names.

Generated feature files belong in `pageObjects/` and `tests/`; register page classes in `fixtures/test.js`.

For every selected runnable testcase, script generation must return both a page object and a Playwright test:

```text
pageObjects/<Feature>Page.js
tests/<feature>.test.js
```

Do not return only `.env`, only a page object, only coverage metadata, or an empty operation set when testcase steps are present. If selector evidence is incomplete, generate best-effort accessible selectors, mark the output as needing exploration, and still return runnable feature files.

Page objects use the old single-file style: locators/selectors and page actions/assertions live together in `pageObjects/<Feature>Page.js`. Do not generate split `page-objects/*.locators.js` or `pages/<Feature>Page.js` files.

Playwright tags must come from the approved testcase `tags` field and be added to the test title as `@TagName`.

`framework-tests/` contains only the framework's isolated self-test. The script-generation agent must never copy its health-test names, locators, page content, or test data into generated application tests.
