import { Page } from "@playwright/test";

export class ProductPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    popup = () => this.page.locator('#f2-add-to-cart-modal');

    async goto(urlSuffix: string) {
        await this.page.goto(`https://www.f2medicalsupplies.com/${urlSuffix}`);
    }

    async addToBasket()
    {
        await this.page.getByRole("button", { name: "Add to basket" }).click();
        await this.popup().waitFor({ state: 'visible', timeout: 5000 });
    }
};
