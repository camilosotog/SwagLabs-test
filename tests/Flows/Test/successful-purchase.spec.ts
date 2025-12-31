import { expect } from "@playwright/test";
import { test } from "../Fixture/auth.fixture";
import { ProductPage } from "../Page/product.page";

test.describe('Flujo de compra exitosa de productos', () => {
  test('Compra exitosa', async ({ loginPage }) => {
    const productPage = new ProductPage(loginPage.page);
    const productsToAdd = ['Sauce Labs Bolt T-Shirt', 'Sauce Labs Bike Light'];

    await test.step('Iniciar sesión con standard_user', async () => {
      await loginPage.login('standard_user', 'secret_sauce');
      await expect(loginPage.page, 'No se inició sesión').toHaveURL(/inventory.html/);
    })

    await test.step('Verificar que la lista de productos se muestra', async () => {
      const productList = loginPage.page.locator('.inventory_list');
      await expect(productList, 'La lista de productos no se muestra').toBeVisible();
    })


    await test.step('Agregar 2 productos al carrito', async () => {
      await productPage.addProductToCartByName(productsToAdd);
      const cartCount = loginPage.page.locator('.shopping_cart_badge');
      await expect(cartCount, 'El contador del carrito no es correcto').toHaveText('2');
    })

    await test.step('Ir al carrito y validar productos agregados', async () => {
      await productPage.goToCart();
      for (const productName of productsToAdd) {
        const productInCart = loginPage.page.locator(`.cart_item:has-text("${productName}")`);
        await expect(productInCart, `El producto "${productName}" no se encuentra en el carrito`).toBeVisible();
      }
    })
    
    await test.step('Iniciar checkout', async () => {
      await productPage.proceedToCheckout();
      await expect(loginPage.page, 'No se navegó a la página de checkout').toHaveURL(/checkout-step-one.html/);
    })
    
    await test.step('Completar información de checkout', async () => {
      await productPage.completeCheckoutInformation('Juan', 'Pérez', '12345');
      await expect(loginPage.page, 'No se navegó a la página de overview').toHaveURL(/checkout-step-two.html/);
    })

    await test.step('Finalizar compra', async () => {
      await productPage.finishPurchase();
      await expect(loginPage.page, 'No se navegó a la página de confirmación').toHaveURL(/checkout-complete.html/);
    })

    await test.step('Validar mensaje de confirmación', async () => {
      const confirmationMessage = loginPage.page.locator('.complete-header');
      await expect(confirmationMessage, 'El mensaje de confirmación no es correcto').toHaveText('Thank you for your order!');
    })
        
  })
  
})
