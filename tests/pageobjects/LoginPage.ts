import { Locator, Page } from '@playwright/test';

//creo una clase para representar la pagina de login, con el objetivo de encapsular toda la logica relacionada con el login en un solo lugar, y asi poder reutilizarla en diferentes tests sin tener que repetir el codigo de login en cada test. Esto es parte del patron de diseño Page Object Model (POM), que es una buena practica para organizar el codigo de tests de manera mas mantenible y escalable.
export class LoginPage {

    private readonly usernameTextbox: Locator
    private readonly passwordTextbox: Locator
    private readonly loginButton: Locator

    constructor(page: Page) {
        
        this.usernameTextbox = page.getByRole('textbox', { name: 'Username' })
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' })
        this.loginButton = page.getByRole('button', { name: 'Login' })

        }
//interactuamos con los elementos de la pagina de login, llenando los campos de username y password, y haciendo click en el boton de login. Este metodo se puede reutilizar en cualquier test que necesite hacer login, simplemente creando una instancia de la clase LoginPage y llamando al metodo login con las credenciales deseadas.
async fillUsername(username:string) {
    await this.usernameTextbox.fill(username)
}

async fillPassword(password:string) {
    await this.passwordTextbox.fill('password') 
    }

async clickOnLogin() {
        await this.loginButton.click()
    }   

    //meter el login en un solo metodo, para que sea mas facil de usar en los tests, y asi no tener que llamar a cada metodo por separado cada vez que queramos hacer login. 
    // Este metodo recibe las credenciales como parametros, lo que lo hace mas flexible y reutilizable.
async loginWithCredentials(username:string, password:string) {
    await this.fillUsername(username)
    await this.fillPassword(password)
    await this.clickOnLogin()   
  }
}
