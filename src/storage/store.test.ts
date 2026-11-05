import { describe, expect, it } from 'vitest';
import { NEW_CARD } from '../domain/scheduler';
import {
  clear,
  emptyStore,
  load,
  markDay,
  save,
  STORAGE_KEY,
  type Store,
} from './store';

function fakeStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => {
      data.set(key, value);
    },
    removeItem: (key: string) => {
      data.delete(key);
    },
  };
}

describe('хранилище', () => {
  it('на пустом хранилище отдаёт пустой прогресс', () => {
    const result = load(fakeStorage());
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.store).toEqual(emptyStore());
  });

  it('сохраняет и читает прогресс без потерь', () => {
    const storage = fakeStorage();
    const store: Store = {
      ...emptyStore(),
      cards: { amount: { ...NEW_CARD, interval: 5, due: '2026-11-10' } },
      days: ['2026-11-05'],
      lastSection: 'mkt',
    };

    save(storage, store);
    const result = load(storage);

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.store).toEqual(store);
  });

  it('сообщает о битом JSON', () => {
    const result = load(fakeStorage({ [STORAGE_KEY]: '{не json' }));
    expect(result.ok).toBe(false);
  });

  it('сообщает о неизвестной версии', () => {
    const result = load(
      fakeStorage({ [STORAGE_KEY]: JSON.stringify({ version: 99 }) }),
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toContain('версия');
  });

  it('сообщает о повреждённой структуре', () => {
    const result = load(
      fakeStorage({
        [STORAGE_KEY]: JSON.stringify({
          version: 1,
          cards: { amount: { interval: 4 } },
          sessions: [],
          days: [],
          lastSection: 'all',
        }),
      }),
    );
    expect(result.ok).toBe(false);
  });

  it('добавляет день занятий один раз', () => {
    const once = markDay(emptyStore(), '2026-11-05');
    const twice = markDay(once, '2026-11-05');
    expect(twice.days).toEqual(['2026-11-05']);
  });

  it('очищает ключ', () => {
    const storage = fakeStorage({ [STORAGE_KEY]: '{}' });
    clear(storage);
    expect(storage.getItem(STORAGE_KEY)).toBeNull();
  });
});
