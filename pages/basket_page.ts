import { Page } from "@playwright/test";

export class BasketPage {
    private page: Page;
    private url: string;

    constructor(page: Page) {
        this.page = page;
        this.url = "https://www.f2medicalsupplies.com/cart";
    }

    net_subtotal = () => this.page.locator(".cart-subtotal");
    net_subtotal_value = () => this.net_subtotal().locator('.woocommerce-Price-amount');
    subtotal_after_savings = () => this.page.locator(".cart-subtotal-after-discount");
    subtotal_after_savings_value = () => this.subtotal_after_savings().locator('td');

    async goto() {
        await this.page.goto(this.url);
    }

    async getNetSubtotal()
    {
        await this.net_subtotal().waitFor({ state: "visible", timeout: 5000 });
        return await this.net_subtotal_value().innerText();
    }
    async getSubtotalAfterDiscount()
    {
        await this.subtotal_after_savings().waitFor({ state: "visible", timeout: 5000 });
        return await this.subtotal_after_savings_value().innerText();
    }
};
