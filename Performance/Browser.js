import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      vus: 1,
      iterations: 1,
      options: {
        browser: {
          type: 'chromium',
        }
      }
    }
  },
  thresholds: {
    checks: ['rate == 1.0'], // Todas las verificaciones deben pasar
  }
}

// e2e test
export default async function () {
  const page = await browser.newPage();
  await page.goto('https://test.k6.io/');

  console.log(await page.title());
  await page.close();
  
}