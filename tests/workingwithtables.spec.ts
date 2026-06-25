import { test, expect } from '@playwright/test';

test('test web table', async ({ page }) => {

    await page.goto('https://cosmocode.io/automation-practice-webtable/',
       { waitUntil: 'domcontentloaded' }
  );
    console.log('Status:', response?.status());
    console.log('URL final:', page.url());
 
     await page.screenshot({ path: 'test-results/debug-tabla.png', fullPage: true });

   // const tableContainer = page.locator("xpath=//table[@id='countries']")
    const tableContainer = page.locator('#countries');

    await expect(tableContainer).toBeVisible({ timeout: 10000 });
    const rows = tableContainer.locator('tbody tr');
    const count = await rows.count();

    console.log(`Cantidad de filas: ${count}`);


   // await tableContainer.waitFor({ state: 'visible' });

   // const rows = tableContainer.locator('tbody tr')
   // const count = await rows.count()

    console.log('Cantidad de filas:', count)

    /*
    // busque dentro de ese contenedor un elemento
    const rows = tableContainer.locator("tr")
    const rowCount = await rows.count() //cuenta cuantas filas hay

    // for recorre desde 0 hasta la cantidad de filas
    for(let i=0; i < rowCount; i++) {
       const row = rows.nth(i) //agarra una fila por posicion
       const text = await row.textContent()

       console.log(text) //obtiene el texto de esa fila

    }
       
      const rows = await tableContainer.locator("tr")
      const count = await rows.count()

      
      for(let i=0; i < count; i++)
      {
        const row = await rows.nth(i)
        console.log(row.textContent())
      }
      */
     //vamos a sacar la informacion de los td
     const row1 = rows.nth(0) // para agarrar un elemento por posicion se usa nth y se coloca 1 pq el 0 es el check
     const countryName = await row1.locator('td').nth(2).innerText()
     const countryCapital = await row1.locator('td').nth(3).innerText()
     const countryCurrency = await row1.locator('td').nth(4).innerText()

     console.log(countryName, countryCapital, countryCurrency)

    });

    /* Armando los elementos de la tabla en un array para luego hacer las aserciones correspondientes. 
    element container: //table[@id='countries']
    .//tr -> filas

    table[@id='countries']//tr[2]//td[1] -> check
    table[@id='countries']//tr[2]//td[2] -> country 
    table[@id='countries']//tr[2]//td[3] -> capital
    table[@id='countries']//tr[2]//td[4] -> currency
    table[@id='countries']//tr[2]//td[5] -> primary language

     */