import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';

test('User can complete checkout process', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goTo();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.verifyLoginSuccess();

  // Add Product To Cart
  const numberOfProductsToAdd = 2;
  for (let i = 0; i < numberOfProductsToAdd; i++) {
    await page.click(`button:has-text("Add to cart") >> nth=${i}`);
    console.log(`Product ${i + 1} added to cart`);
  }

  // Navigate to Cart 
  await page.click('.shopping_cart_link');
  console.log('Navigated to Cart page');

  // Verify Cart items
  const cartItemCount = await page.locator('.cart_item').count();
  expect(cartItemCount).toBe(numberOfProductsToAdd);
  console.log(`[Passed]: Expected Value: ${numberOfProductsToAdd}, Actual Result: Cart has ${cartItemCount} product(s)`);

  //  Proceed to Checkout
  await page.click('button:has-text("Checkout")');
  console.log('Navigated to Checkout page');

  // Fill in Checkout Form
  await page.fill('#first-name', 'Test');
  await page.fill('#last-name', 'User');
  await page.fill('#postal-code', '1770');
  console.log('Checkout form filled');

  await page.click('input[type="submit"], button:has-text("Continue")');
  console.log('Navigated to Checkout Overview page');

  // Verify Checkout Overview
  const overviewItems = await page.locator('.cart_item').count();
  expect(overviewItems).toBe(numberOfProductsToAdd);
  console.log(`[Passed]: Expected Value: ${cartItemCount}, Actual Result: Overview shows ${overviewItems} item(s)`);

  const totalPrice = await page.locator('.summary_total_label').innerText();
  console.log(`Total price displayed: ${totalPrice}`);

  // Finish Checkout
  await page.click('button:has-text("Finish")');
  console.log('Clicked Finish');

  // Verify Checkout Complete
  const completeHeader = await page.locator('.complete-header').innerText();
  expect(completeHeader).toBe('Thank you for your order!');
  console.log('[Passed]: User successfully checked out the product');

});