import { test as base, expect} from '@playwright/test';
import { ProductPage } from '../pages/product_page.ts';
import { BasketPage } from '../pages/basket_page.ts';

const test = base.extend<{
    productPage: ProductPage;
    basketPage: BasketPage;
}>({
    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    },
    basketPage: async ({ page }, use) => {
        const basketPage = new BasketPage(page);
        await use(basketPage);
    }
});

export { test, expect};