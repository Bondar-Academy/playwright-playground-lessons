# Playwright UI Testing Mastery - Lessons

Lesson code from the [**Playwright UI Testing Mastery**](https://bondaracademy.com/programs/playwright-ui-testing-mastery) program at Bondar Academy.

All tests run against the course test application: **https://playground.bondaracademy.com/**

## Getting Started

```bash
npm install
npx playwright install
npx playwright test
```

## Useful Commands

| Command | Description |
| --- | --- |
| `npx playwright test` | Run all tests (chromium, firefox, webkit) |
| `npx playwright test --project=chromium` | Run tests in a single browser |
| `npx playwright test --ui` | Run tests in UI mode |
| `npx playwright test --headed` | Run tests with a visible browser |
| `npx playwright show-report` | Open the last HTML report |

## Project Structure

```
tests/          # Lesson test specs
page-objects/   # Page Object Model classes + PageManager
helpers/        # Shared utilities (test step decorator)
playwright.config.ts
```
