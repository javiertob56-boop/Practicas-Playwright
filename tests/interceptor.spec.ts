import { test, expect } from '@playwright/test';
import { LoginPage } from './pageobjects/LoginPage';

test('purchase an item 3', async ({ page }) => {

    // para saber todas las url que son enviadas al servidor
    await page.on("request", req => {
        console.log(req.url())
    })
     // le paso la url de las imagenes que no quiero mostrar al cargar la pagina web
    /*
     await page.route("https://www.saucedemo.com/static/media/sauce-backpack-1200x1500.0a0b85a385945026062b.jpg",(route) => route.abort())
    await page.route("https://www.saucedemo.com/static/media/sauce-pullover-1200x1500.51d7ffaf301e698772c8.jpg",(route) => route.abort())
    */
    // para no estar abortando imagenes una por una, se puede usar una expresión regular
    await page.route("**/*.{png,jpg,jpeg,svg}", (route)=> route.abort());

    await page.goto('https://www.saucedemo.com/');

    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click(); 

    await page.screenshot({ path:'login.png', fullPage:true})   
  });

  test('interceptor test', async ({ page }) => {

  await page.route(
    "https://demoqa.com/BookStore/v1/Books", 
    (route) => {
        route.fulfill({ 
            status: 200,
            headers:{
                'Content-Type': 'aplication/json'

            },
            body: `
            { 
               "books": [
                  {
                    "isbn": "9781449325862",
                    "title": "El libro de Javier que nunca escribió",
                    "subTitle": "A Working Introduction",
                    "author": "Richard E. Silverman",
                    "publish_date": "2020-06-04T08:48:39.000Z",
                    "publisher": "O'Reilly Media",
                    "pages": 162,
                    "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
                    "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"

                    }

               ]

             }
            `
        })

    }

  );
  await page.goto('https://demoqa.com/books')

  await page.pause()
  await page.screenshot({ path:'books.png', fullPage:true})
  });