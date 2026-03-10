import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';

// Can be used in different scenarios until cart page 
test('Verify user adding products to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goTo();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.verifyLoginSuccess();

  const numberOfProductsToAdd = 2;

  // Add Product To Cart
  for (let i = 0; i < numberOfProductsToAdd; i++) {
    await page.click(`button:has-text("Add to cart") >> nth=${i}`);
    console.log(`Product ${i + 1} added to cart`);
  }

  // Cart Icon Counter
  const badgeText = await page.locator('.shopping_cart_badge').innerText();
  expect(Number(badgeText)).toBe(numberOfProductsToAdd);

  console.log(`Cart shows ${badgeText} product(s)`);

  // Navigate to Cart
  await page.click('.shopping_cart_link');
  console.log('Navigated to Cart page');

  // Verify product in cart
  const cartItemCount = await page.locator('.cart_item').count();
  expect(cartItemCount).toBeGreaterThan(0); 
  console.log(`[Passed]: Expected Value: ${numberOfProductsToAdd}, Actual Result: Cart has ${cartItemCount} product(s)`);

});