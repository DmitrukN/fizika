import { expect, test } from '@playwright/test';

test('сессия: возврат забытой карточки, итог и прогресс', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Физика' })).toBeVisible();

  await page.getByRole('button', { name: /Все разделы/ }).click();

  const card = page.locator('.card__hit');
  const title = await card.locator('.card__title').innerText();

  await card.click();
  await expect(page.locator('.formula .katex')).toBeVisible();
  await page.getByRole('button', { name: 'Забыл' }).click();

  for (let index = 0; index < 3; index += 1) {
    await page.locator('.card__hit').click();
    await page.getByRole('button', { name: 'Знаю' }).click();
  }

  await expect(page.locator('.card__title')).toHaveText(title);

  await page.locator('.card__hit').click();
  await page.getByRole('button', { name: 'Знаю' }).click();
  await page.getByRole('button', { name: 'Закончить' }).click();

  await expect(
    page.getByRole('heading', { name: 'Сессия закончена' }),
  ).toBeVisible();
  await expect(page.getByText('Забыл')).toBeVisible();

  await page.getByRole('button', { name: 'Прогресс' }).click();
  await expect(page.getByRole('heading', { name: 'Прогресс' })).toBeVisible();
  await expect(page.getByText('закреплено').first()).toBeVisible();
  await expect(page.getByText('Точность за всё время')).toBeVisible();
});

test('ответы переживают перезагрузку', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Модель идеального газа/ }).click();

  await page.locator('.card__hit').click();
  await page.getByRole('button', { name: 'Знаю' }).click();

  const stored = await page.evaluate(() =>
    localStorage.getItem('fizika.v1'),
  );
  expect(stored).not.toBeNull();

  await page.reload();
  await expect(page.getByRole('heading', { name: 'Физика' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Продолжить/ })).toBeVisible();
});

test('на 402 × 874 нет прокрутки', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Физика' })).toBeVisible();

  const fits = () =>
    page.evaluate(() => {
      const root = document.documentElement;
      return (
        root.scrollHeight <= window.innerHeight + 1 &&
        root.scrollWidth <= window.innerWidth + 1
      );
    });

  expect(await fits()).toBe(true);

  await page.getByRole('button', { name: /Все разделы/ }).click();
  expect(await fits()).toBe(true);
});

test('битые данные показывают ошибку и сброс', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('fizika.v1', '{не json');
  });
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Прогресс не читается' }),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Сбросить прогресс' }).click();
  await expect(page.getByRole('heading', { name: 'Физика' })).toBeVisible();
});
