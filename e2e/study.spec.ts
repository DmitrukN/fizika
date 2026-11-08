import { expect, test } from '@playwright/test';

test('сессия: обозначения, возврат забытой карточки, итог и прогресс', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Физика' })).toBeVisible();

  await page.getByRole('button', { name: /Молекулярная физика/ }).click();

  const card = page.locator('.card__hit');
  const title = await card.locator('.card__title').innerText();

  await page.locator('.card__hit').click();
  await expect(page.locator('.card__answer > .formula .katex')).toBeVisible();
  await expect(page.locator('.notation dt').first()).toBeVisible();
  await expect(page.locator('.notation dd').first()).not.toBeEmpty();

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
  await expect(page.getByText('Точность за все время')).toBeVisible();
});

test('ответы переживают перезагрузку', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Молекулярная физика/ }).click();

  await page.locator('.card__hit').click();
  await page.getByRole('button', { name: 'Знаю' }).click();

  const stored = await page.evaluate(() => localStorage.getItem('fizika.v2'));
  expect(stored).not.toBeNull();

  await page.reload();
  await expect(page.getByRole('heading', { name: 'Физика' })).toBeVisible();
  await expect(page.locator('.section-row__count')).toHaveText('40 из 41');
});

test('на обороте виден режим карточки, вывод раскрывается по слову', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Молекулярная физика/ }).click();

  for (let index = 0; index < 45; index += 1) {
    await page.locator('.card__hit').click();

    const mode = page.locator('.mode').first();
    await expect(mode).toBeVisible();
    await expect(mode.locator('.mode__label')).toHaveText(
      /Учить наизусть|Можно вывести/,
    );

    const toggle = page.getByRole('button', { name: 'Можно вывести' });
    if ((await toggle.count()) > 0) {
      const panel = page.locator('.derivation');
      await expect(panel).toBeHidden();
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');

      await toggle.click();
      await expect(panel).toBeVisible();
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(panel.locator('.formula .katex').first()).toBeVisible();
      await expect(panel.locator('.derivation__from')).toContainText('Из:');
      return;
    }

    await page.getByRole('button', { name: 'Знаю' }).click();
  }

  throw new Error('в колоде не нашлось карточки-следствия');
});

test('шаги вывода не вылезают за ширину карточки', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Молекулярная физика/ }).click();

  const overflow: string[] = [];

  for (let index = 0; index < 41; index += 1) {
    const title = await page.locator('.card__title').innerText();
    await page.locator('.card__hit').click();

    const toggle = page.getByRole('button', { name: 'Выводится' });
    if ((await toggle.count()) > 0) {
      await toggle.click();
      const widths = await page
        .locator('.derivation .formula')
        .evaluateAll((nodes) =>
          nodes.map((node) => ({
            client: node.clientWidth,
            scroll: node.scrollWidth,
          })),
        );
      widths.forEach((item, step) => {
        if (item.scroll > item.client + 1) {
          overflow.push(`${title}, шаг ${step + 1}`);
        }
      });
      await toggle.click();
    }

    await page.getByRole('button', { name: 'Знаю' }).click();
  }

  expect(overflow).toEqual([]);
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

  await page.getByRole('button', { name: /Молекулярная физика/ }).click();
  expect(await fits()).toBe(true);
});

test('битые данные показывают ошибку и сброс', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('fizika.v2', '{не json');
  });
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Прогресс не читается' }),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Сбросить прогресс' }).click();
  await expect(page.getByRole('heading', { name: 'Физика' })).toBeVisible();
});
