import { check } from 'k6';
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      vus: 5,
      iterations: 10,
      maxDuration: '30s',
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

  const title = await page.title();
  
  const expectTitle = 'QuickPizza';
  check(title, {
    'El titulo es correcto': (t) => t === expectTitle,
  })
  await page.close();
  
}