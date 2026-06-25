/*
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
/*
test('test', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.ar/');

  await page.locator('input[id=\"cb1-edit\"]').fill('Iphone')

  //await page.keyboard.press('Enter')
  await searchBox.press('Enter')

  await expect(page.locator('//ol[contains(@class, \'ui-search-layout\')]')).toBeVisible()

  //await page.pause()

  const titles = await page.locator('//ol[contains(@class, \'ui-search-layout\')]//li/h2').allInnerTexts()
  
  console.log('the total number of result is:', titles.length)

  for(let title of titles) {
      console.log('the title is: ', title)
  }

});

test('buscar iPhone en Mercado Libre', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.ar/', {
    waitUntil: 'domcontentloaded',
  });

  const searchBox = page.locator('#cb1-edit');

  await expect(searchBox).toBeVisible();

  await searchBox.fill('iPhone');
  await searchBox.press('Enter');

  await page.waitForLoadState('domcontentloaded');

  console.log('URL final:', page.url());
  console.log('Título:', await page.title());

  await page.screenshot({
    path: 'test-results/mercadolibre.png',
    fullPage: true,
  });

  const resultados = page.locator('ol.ui-search-layout');

  await expect(resultados).toBeVisible({ timeout: 15000 });
});
test('test locators', async ({ page }) => {

  await page.goto('https://www.mercadolibre.com.ar/');
 // await page.getByRole('link', { name: 'Mis compras' }).click()
 await page.getByRole('link', { name: 'Ingresá', exact: true }).click()

 // await page.pause()
  

});
*/