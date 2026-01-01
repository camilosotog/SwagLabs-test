import { check, sleep } from 'k6';
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
          launchOptions: {
            headless: false,
            slowMo: '500ms',
            args: ['--window-size=1920,1080', '--start-maximized'],
          }
        }
      }
    }
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
  
  sleep(5); // Ver la página por 5 segundos
  
  await page.close();
  
}