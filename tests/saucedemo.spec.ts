import { test, expect } from '@playwright/test';
import { LoginPage } from './pageobjects/LoginPage';

test('purchase an item', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click(); 
 

//declaro una variable y le pongo all para que me devuelva una lista de elementos
const itemsContainer = await page.locator('#inventory_container .inventory_item').all()

//para encontrar un elemento dentro de lista, usamos una funcion de JavaScript llamada Math.floor, para calcular un numero aleatorio entre 0 y el largo de la lista 
const randomIndex = Math.floor(Math.random() * itemsContainer.length)

//console.log(`Random index: ${randomIndex}`)

//le digo que me de un item random de la lista de contenedor 
const randomItem = itemsContainer[randomIndex]

//de ese elemento random que capture, voy a sacar las propiedades
const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText()
const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()
const expectedName = await randomItem.locator('.inventory_item_name').innerText()

//usamos las comillas invertidas para mostrar el resultado de las variables en la consola, es una forma de concatenar texto con variables
console.log(`Price: ${expectedPrice}, Name: ${expectedName}, Description: ${expectedDescription}`)

//hago click en el boton de agregar al carrito del item random que capture
await randomItem.getByRole('button', { name: 'Add to cart' }).click();

//hago click en el carrito para ir a la pagina del carrito. Usando un locator para encontrar el elemento del carrito

await page.locator('a.shopping_cart_link').click()

//await page.pause();

//hacemos una asercion para verificar que el boton de checkout esta visible, lo que indica que el item se agrego al carrito y se redirigio a la pagina del carrito.
await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible()


// se tiene que hacer la comparacion entre el item que se agrego al carrito y el item que se muestra en el carrito, para verificar que se agrego el item correcto al carrito. 
// Para eso, se capturan las propiedades del item que se muestra en el carrito y se comparan con las propiedades del item random que se capturo al principio del test.

const ActualName = await page.locator('.inventory_item_name').innerText()
const ActualDescription = await page.locator('.inventory_item_desc').innerText()
const ActualPrice = await page.locator('.inventory_item_price').innerText()

//hacemos las aserciones para comparar las propiedades del item random con las propiedades del item que se muestra en el carrito.
expect(ActualName).toEqual(expectedName)
expect(ActualDescription).toEqual(expectedDescription)
expect(ActualPrice).toEqual(expectedPrice)

await page.getByRole('button', { name: 'Checkout' }).click();

//Cuando se hace click en el boton de checkout, se redirige a una pagina donde se deben completar los datos del usuario para finalizar la compra.
await page.getByRole('textbox', { name: 'First Name'}).fill('Goku');
await page.getByRole('textbox', { name: 'Last Name'}).fill('Sayayin');
await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('12345');

await page.getByRole('button', { name: 'Continue' }).click();
await page.getByRole('button', { name: 'Finish' }).click();

//hacer las validaciones, capturar, leer y comparar usando los expect de los campos first name, last name, zip code con los datos que se ingresaron al principio del test, para verificar
//  que se muestran correctamente en la pagina de confirmacion de compra.

const actualFirstName = await page.locator('.first-name').innerText()
const actualLastName = await page.locator('.last-name').innerText()
const actualZipCode = await page.locator('.postal-code').innerText()
expect(actualFirstName).toEqual('Goku')
expect(actualLastName).toEqual('Sayayin')
expect(actualZipCode).toEqual('12345')

await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible()

//await page.pause();

} );

