import { test, expect } from '@playwright/test';

test.describe('attributes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/e2e/attributes');
    page.on('pageerror', (err) => expect(err).toEqual(undefined));
  });

  function tests() {
    test('initial render is correctly', async ({ page }) => {
      const input = await page.locator('#input');
      const label = await page.locator('#label');
      const svg = await page.locator('#svg');

      const renders = await page.locator('#renders');

      await expect(input).toHaveAttribute('aria-hidden', 'true');
      await expect(input).toHaveAttribute('aria-label', 'even');
      await expect(input).toHaveAttribute('tabindex', '-1');
      await expect(input).not.hasAttribute('required');
      await expect(input).toHaveAttribute('title', '');

      await expect(label).toHaveAttribute('for', 'even');
      await expect(label).toHaveAttribute('form', 'my-form');
      await expect(input).toHaveAttribute('title', '');

      await expect(svg).toHaveAttribute('width', '15');
      await expect(svg).toHaveAttribute('height', '15');
      await expect(svg).toHaveAttribute('preserveAspectRatio', 'xMidYMin slice');
      await expect(svg).toHaveAttribute('class', 'is-svg');
      await expect(svg).toHaveAttribute('aria-hidden', 'true');

      await expect(renders).toHaveText('1');
    });

    test('should type and reflect changes', async ({ page }) => {
      const input = await page.locator('#input');
      const svg = await page.locator('#svg');
      const inputCopy = await page.locator('#input-copy');
      const inputValue = await page.locator('#input-value');
      const stuffBtn = await page.locator('#stuff');
      const renders = await page.locator('#renders');

      await input.type('Hello');
      await expect(inputCopy).toHaveJSProperty('value', 'Hello');
      await expect(inputValue).toHaveText('Hello');
      await expect(renders).toHaveText('1');

      await stuffBtn.click();
      await expect(inputCopy).toHaveJSProperty('value', 'Hello');
      await expect(inputValue).toHaveText('Hello');
      await expect(renders).toHaveText('2');

      await input.type('Bye');
      await expect(inputCopy).toHaveJSProperty('value', 'ByeHello');
      await expect(inputValue).toHaveText('ByeHello');
      await expect(renders).toHaveText('2');

      await expect(svg).toHaveAttribute('width', '15');
      await expect(svg).toHaveAttribute('height', '15');
      await expect(svg).toHaveAttribute('preserveAspectRatio', 'xMidYMin slice');
      await expect(svg).toHaveAttribute('class', 'is-svg');
      await expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    test('should update aria-label', async ({ page }) => {
      const input = await page.locator('#input');
      const renders = await page.locator('#renders');
      const countBtn = await page.locator('#count');
      await countBtn.click();

      await expect(input).toHaveAttribute('aria-hidden', 'true');
      await expect(input).toHaveAttribute('aria-label', 'odd');
      await expect(input).toHaveAttribute('tabindex', '-1');
      await expect(input).not.hasAttribute('required');
      await expect(renders).toHaveText('1');
    });

    test('should update title', async ({ page }) => {
      const input = await page.locator('#input');
      const label = await page.locator('#label');

      const renders = await page.locator('#renders');
      const countBtn = await page.locator('#title');
      await countBtn.click();

      await expect(input).toHaveAttribute('title', 'some title');
      await expect(label).toHaveAttribute('title', 'some title');
      await expect(renders).toHaveText('1');

      await countBtn.click();
      await expect(input).toHaveAttribute('title', '');
      await expect(input).toHaveAttribute('title', '');
      await expect(renders).toHaveText('1');
    });

    test('should update aria-hidden', async ({ page }) => {
      const input = await page.locator('#input');
      const svg = await page.locator('#svg');
      const renders = await page.locator('#renders');
      const countBtn = await page.locator('#aria-hidden');
      await countBtn.click();

      await expect(input).toHaveAttribute('aria-hidden', 'false');
      await expect(input).toHaveAttribute('aria-label', 'even');
      await expect(input).toHaveAttribute('tabindex', '-1');
      await expect(input).not.hasAttribute('required');
      await expect(svg).toHaveAttribute('aria-hidden', 'false');
      await expect(renders).toHaveText('1');
    });

    test('should update required', async ({ page }) => {
      const input = await page.locator('#input');
      const renders = await page.locator('#renders');
      const countBtn = await page.locator('#required');
      await countBtn.click();
      await page.waitForTimeout(100);

      await expect(input).toHaveAttribute('aria-hidden', 'true');
      await expect(input).toHaveAttribute('aria-label', 'even');
      await expect(input).toHaveAttribute('tabindex', '-1');
      await expect(input).hasAttribute('required');
      await expect(renders).toHaveText('1');
    });

    test('should hide all attributes', async ({ page }) => {
      const input = await page.locator('#input');
      const renders = await page.locator('#renders');

      const requiredBtn = await page.locator('#required');
      await requiredBtn.click();

      const countBtn = await page.locator('#hide');
      await countBtn.click();

      await page.waitForTimeout(100);

      await expect(input).not.hasAttribute('aria-hidden');
      await expect(input).not.hasAttribute('aria-label');
      await expect(input).not.hasAttribute('tabindex');
      await expect(input).not.hasAttribute('required');

      await expect(renders).toHaveText('2');
    });

    test('should toggle attributes several times', async ({ page }) => {
      const input = await page.locator('#input');
      const label = await page.locator('#label');
      const svg = await page.locator('#svg');

      const renders = await page.locator('#renders');
      const countBtn = await page.locator('#hide');

      await countBtn.click();
      await page.waitForTimeout(100);

      await expect(input).not.hasAttribute('aria-hidden');
      await expect(input).not.hasAttribute('aria-label');
      await expect(input).not.hasAttribute('tabindex');
      await expect(input).not.hasAttribute('required');
      await expect(label).not.hasAttribute('for');
      await expect(label).not.hasAttribute('form');
      await expect(svg).not.hasAttribute('width');
      await expect(svg).not.hasAttribute('height');
      await expect(svg).not.hasAttribute('preserveAspectRatio');
      await expect(svg).toHaveAttribute('class', '');
      await expect(svg).not.hasAttribute('aria-hidden');

      await expect(renders).toHaveText('2');

      await countBtn.click();
      await page.waitForTimeout(100);
      await expect(input).toHaveAttribute('aria-hidden', 'true');
      await expect(input).toHaveAttribute('aria-label', 'even');
      await expect(input).toHaveAttribute('tabindex', '-1');
      await expect(input).not.hasAttribute('required');
      await expect(label).toHaveAttribute('for', 'even');
      await expect(label).toHaveAttribute('form', 'my-form');
      await expect(svg).toHaveAttribute('width', '15');
      await expect(svg).toHaveAttribute('height', '15');
      await expect(svg).toHaveAttribute('preserveAspectRatio', 'xMidYMin slice');
      await expect(svg).toHaveAttribute('class', 'is-svg');
      await expect(svg).toHaveAttribute('aria-hidden', 'true');

      await expect(renders).toHaveText('3');

      await countBtn.click();
      await page.waitForTimeout(100);
      await expect(input).not.hasAttribute('aria-hidden');
      await expect(input).not.hasAttribute('aria-label');
      await expect(input).not.hasAttribute('tabindex');
      await expect(input).not.hasAttribute('required');
      await expect(label).not.hasAttribute('for');
      await expect(label).not.hasAttribute('form');
      await expect(svg).not.hasAttribute('width');
      await expect(svg).not.hasAttribute('height');
      await expect(svg).not.hasAttribute('preserveAspectRatio');
      await expect(svg).not.hasAttribute('aria-hidden');
      await expect(svg).toHaveAttribute('class', '');
      await expect(renders).toHaveText('4');

      await countBtn.click();
      await page.waitForTimeout(100);
      await expect(input).toHaveAttribute('aria-hidden', 'true');
      await expect(input).toHaveAttribute('aria-label', 'even');
      await expect(input).toHaveAttribute('tabindex', '-1');
      await expect(input).not.hasAttribute('required');
      await expect(label).toHaveAttribute('for', 'even');
      await expect(label).toHaveAttribute('form', 'my-form');
      await expect(svg).toHaveAttribute('width', '15');
      await expect(svg).toHaveAttribute('height', '15');
      await expect(svg).toHaveAttribute('preserveAspectRatio', 'xMidYMin slice');
      await expect(svg).toHaveAttribute('class', 'is-svg');
      await expect(svg).toHaveAttribute('aria-hidden', 'true');

      await expect(renders).toHaveText('5');
    });
  }

  tests();

  test.describe('client rerender', () => {
    test.beforeEach(async ({ page }) => {
      const toggleRender = await page.locator('#force-rerender');
      await toggleRender.click();
      await page.waitForTimeout(100);
    });
    tests();
  });
});
