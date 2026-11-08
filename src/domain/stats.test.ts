import { describe, expect, it } from 'vitest';
import { ALL_CARDS, SECTIONS } from '../content/sections';
import { NEW_CARD } from './scheduler';
import {
  accuracy,
  dueCards,
  formatPercent,
  progressOf,
  sectionStats,
  studyDays,
} from './stats';
import { emptyStore, type Store } from '../storage/store';

function storeWith(cards: Store['cards']): Store {
  return { ...emptyStore(), cards };
}

describe('статистика раздела', () => {
  it('делит карточки на закреплённые, в работе и нетронутые', () => {
    const store = storeWith({
      amount: { ...NEW_CARD, interval: 7 },
      molecules: { ...NEW_CARD, interval: 3 },
      density: { ...NEW_CARD, interval: 0 },
    });

    expect(sectionStats(SECTIONS[0], store)).toEqual({
      title: 'Молекулярная физика',
      locked: 1,
      learning: 1,
      untouched: 39,
      total: 41,
    });
  });

  it('показывает созревшие карточки, включая новые', () => {
    const store = storeWith({
      amount: { ...NEW_CARD, interval: 5, due: '2026-12-01' },
    });
    expect(dueCards(ALL_CARDS, store, '2026-11-05')).toHaveLength(40);
  });

  it('считает точность по всем ответам и по последней сессии', () => {
    const store: Store = {
      ...emptyStore(),
      cards: {
        amount: { ...NEW_CARD, know: 3, forgot: 1 },
        molecules: { ...NEW_CARD, know: 1, forgot: 0 },
      },
      sessions: [
        {
          startedAt: 1,
          endedAt: 2,
          section: 'molecular',
          answered: 4,
          know: 3,
          forgot: 1,
        },
      ],
    };

    const result = accuracy(store);
    expect(result.all).toBeCloseTo(4 / 5);
    expect(result.last).toBeCloseTo(3 / 4);
  });

  it('не делит на ноль', () => {
    const result = accuracy(emptyStore());
    expect(result.all).toBeNull();
    expect(result.last).toBeNull();
    expect(formatPercent(null)).toBe('—');
  });

  it('помечает последние 14 дней', () => {
    const store = { ...emptyStore(), days: ['2026-11-04'] };
    const days = studyDays(store, '2026-11-05');
    expect(days).toHaveLength(14);
    expect(days[12]).toEqual({ day: '2026-11-04', studied: true });
    expect(days[13]).toEqual({ day: '2026-11-05', studied: false });
  });

  it('для неизвестной карточки считает прогресс новым', () => {
    expect(progressOf(emptyStore(), 'нет такой')).toEqual(NEW_CARD);
  });
});
