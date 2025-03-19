import { test, expect } from "../fixtures/discount_fixtures";
import { discountCases } from "../test_data/discountCases";
import products from "../test_data/product_data.json";


test.describe("Single items correctly apply discount", () => {
  discountCases.forEach(({ productPrice, expectedDiscount, productKey }) => {
    test(`£${productPrice} item applies ${expectedDiscount}`, async ({ productPage, basketPage }) => {
      const productSuffix = products.items[productKey];

      await productPage.goto(productSuffix);
      await productPage.addToBasket();

      await basketPage.goto();

      const netSubtotal = await basketPage.getNetSubtotal();
      expect(parseFloat(netSubtotal.replace("£", ""))).toBeCloseTo(productPrice, 2);
      
      const discountVal = parseFloat(expectedDiscount.toString().replace("%", "")); // Ensure string before replacing
      const discountMultiplier = (100 - discountVal) / 100;
      
      const afterDiscountText = await basketPage.getSubtotalAfterDiscount();
      const afterDiscount = parseFloat(afterDiscountText.replace(/[^\d.]/g, "")); // Remove symbols like £, €
      
      const expectedValue = parseFloat((productPrice * discountMultiplier).toFixed(2));
      
      expect(afterDiscount).toBeCloseTo(expectedValue, 2);
    });
  });
});