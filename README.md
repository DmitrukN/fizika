# Физика

Мобильные мемо-карточки по молекулярной физике: 34 формулы, 7 разделов, один ученик.

Открывается по ссылке на iPhone, работает в портрете 402 × 874, прогресс хранится в браузере.

## Запуск

```powershell
npm install
npm run dev
```

## Проверки

```powershell
npm run typecheck
npm test
npm run build
npx playwright test
```

## Публикация

Сайт собирается workflow `.github/workflows/deploy.yml` при пуше в `feat/mvp`.
В настройках репозитория: Settings → Pages → Source: GitHub Actions.
Адрес: https://dmitrukn.github.io/fizika/

## Документы

- Спека: `docs/specs/0001-molecular-physics.md`
- Решения: `docs/adr/`
- Словарь: `GLOSSARY.md`
- Тикеты: `.scratch/flashcards/issues/`
