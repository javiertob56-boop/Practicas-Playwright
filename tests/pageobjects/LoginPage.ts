import { Locator, Page,expect} from '@playwright/test';

//creo una clase para representar la pagina de login, con el objetivo de encapsular toda la logica relacionada con el login en un solo lugar, y asi poder reutilizarla en diferentes tests sin tener que repetir el codigo de login en cada test. Esto es parte del patron de diseño Page Object Model (POM), que es una buena practica para organizar el codigo de tests de manera mas mantenible y escalable.
export class LoginPage {
  //ocultamos los detalles de implementacion de la clase, para que el test que use esta
  //  clase no tenga que preocuparse por esos detalles, y pueda enfocarse en la logica del test en si. Esto se logra usando el modificador de acceso "private" en las propiedades y metodos de la clase que no deben ser accesibles desde fuera de la clase. De esta manera, solo se expone una interfaz publica para interactuar con la clase, y se ocultan los detalles de implementacion que no son relevantes para el test.

    private readonly usernameTextbox: Locator
    private readonly passwordTextbox: Locator
    private readonly loginButton: Locator
    private readonly shoppingCartIcon: Locator    
    private readonly PayButton: Locator

    //creamos un constructor para inicializar los locators de los elementos de la pagina de login, y asi poder usarlos en los metodos de la clase para interactuar con esos elementos. 
    // El constructor recibe una instancia de Page, que es el objeto principal de Playwright.
    //Localizacion de los elementos de la pagina de login.
    constructor(page: Page) { 
        this.usernameTextbox = page.getByRole('textbox', { name: 'Username' })
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' })
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.shoppingCartIcon = page.locator("xpath=//a[contains(@class, 'shopping_cart_link')]")
        this.PayButton = page.getByRole('button', { name: 'Finish' })
                     
     }

    //interaccion con los elementos de la pagina de login, usando los locators que se inicializaron en el constructor.
        async fillUsername(username: string){
            await this.usernameTextbox.fill(username);
        }

        async fillPassword(password: string) {
            await this.passwordTextbox.fill(password);
        }

        async clickOnLogin() {
            await this.loginButton.click();
        }
        //meter la funcionalidad login en una sola funcion, para que el test que use esta clase pueda hacer el login con una sola linea de codigo, y asi mejorar la legibilidad del test. Esto se logra creando un metodo llamado "login" que recibe el username y password como parametros, y dentro de ese metodo se llama a los metodos "fillUsername", "fillPassword" y "clickOnLogin" para realizar el proceso de login completo.
        async loginWithCredentials(username: string, password: string) {
            await this.fillUsername(username);
            await this.fillPassword(password);
            await this.clickOnLogin();
        }

        async checkSuccessfulLogin() {
            await expect(this.shoppingCartIcon).toBeVisible()

        }

        async checkSuccessfullPaymentInfo() {
            await this.PayButton.click()

       }
    
}
