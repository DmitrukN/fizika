import { describe, expect, it } from 'vitest';
import { addDays, daysBack, toDay } from './date';
import {
  advance,
  applyAnswer,
  dueAfter,
  isDue,
  NEW_CARD,
  requeueIndex,
  type Interval,
} from './scheduler';

describe('advance', () => {
  const cases: Array<[Interval, 'know' | 'forgot', Interval]> = [
    [0, 'know', 5],
    [1, 'know', 3],
    [3, 'know', 5],
    [5, 'know', 7],
    [7, 'know', 7],
    [0, 'forgot', 1],
    [1, 'forgot', 1],
    [3, 'forgot', 1],
    [5, 'forgot', 1],
    [7, 'forgot', 1],
  ];

  it.each(cases)('интервал %i после ответа %s → %i', (from, answer, expected) => {
    expect(advance(from, answer)).toBe(expected);
  });
});

describe('срок', () => {
  it('откладывает на длину интервала', () => {
    expect(dueAfter('2026-11-05', 5)).toBe('2026-11-10');
    expect(dueAfter('2026-11-05', 7)).toBe('2026-11-12');
  });

  it('после «Забыл» карточка возвращается завтра', () => {
    const next = applyAnswer(NEW_CARD, 'forgot', '2026-11-05');
    expect(next.interval).toBe(1);
    expect(next.due).toBe('2026-11-06');
  });

  it('новая карточка считается созревшей', () => {
    expect(isDue(NEW_CARD, '2026-11-05')).toBe(true);
  });

  it('карточка со сроком в будущем не созрела', () => {
    const next = applyAnswer(NEW_CARD, 'know', '2026-11-05');
    expect(isDue(next, '2026-11-05')).toBe(false);
    expect(isDue(next, '2026-11-10')).toBe(true);
  });

  it('просроченная карточка остаётся созревшей', () => {
    const next = applyAnswer(NEW_CARD, 'know', '2026-11-05');
    expect(isDue(next, '2026-12-01')).toBe(true);
  });
});

describe('ответ', () => {
  it('считает «Знаю» и «Забыл» отдельно', () => {
    const first = applyAnswer(NEW_CARD, 'know', '2026-11-05');
    const second = applyAnswer(first, 'forgot', '2026-11-06');
    expect(second.know).toBe(1);
    expect(second.forgot).toBe(1);
    expect(second.lastAnswered).toBe('2026-11-06');
  });
});

describe('возврат в очередь', () => {
  it('ставит карточку после трёх других', () => {
    expect(requeueIndex(10)).toBe(3);
  });

  it('не выходит за конец короткой очереди', () => {
    expect(requeueIndex(2)).toBe(2);
    expect(requeueIndex(0)).toBe(0);
  });
});

describe('даты', () => {
  it('не уезжает на UTC при переходе через полночь', () => {
    expect(toDay(new Date(2026, 10, 5, 23, 59))).toBe('2026-11-05');
  });

  it('складывает дни через границу месяца', () => {
    expect(addDays('2026-11-28', 5)).toBe('2026-12-03');
  });

  it('отдаёт последние 14 дней по возрастанию', () => {
    const days = daysBack('2026-11-05', 14);
    expect(days).toHaveLength(14);
    expect(days[0]).toBe('2026-10-23');
    expect(days[13]).toBe('2026-11-05');
  });
});
