import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly title: Locator;
  readonly cartBadge: Locator;
  constructor(private readonly page: Page) {
    this.title = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }
  async expectLoaded() { await expect(this.title).toHaveText('Products'); }
  async addToCart(productName: string) {
    await this.page.locator('.inventory_item').filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' }).click();
  }
  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.page.locator('[data-test="product-sort-container"]').selectOption(option);
  }
  async prices(): Promise<number[]> {
    const texts = await this.page.locator('.inventory_item_price').allTextContents();
    return texts.map(t => Number(t.replace('$', '')));
  }
}
