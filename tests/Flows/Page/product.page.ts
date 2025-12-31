import { Page } from "@playwright/test";

export class ProductPage {
  constructor(public page: Page) {}

  async addProductToCartByName(productNames: string[]) {
    for (const productName of productNames) {
      const productLocator = this.page.locator(`.inventory_item:has-text("${productName}")`);
      await productLocator.locator('button').click();
    }
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async proceedToCheckout() {
    await this.page.locator('#checkout').click();
  }

  async completeCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator('#first-name').fill(firstName);
    await this.page.locator('#last-name').fill(lastName);
    await this.page.locator('#postal-code').fill(postalCode);
    await this.page.locator('#continue').click();
  }

  async finishPurchase() {
    await this.page.locator('#finish').click();
  }
}