import type { Day } from '../domain/date';
import { INTERVALS, type CardProgress, type Interval } from '../domain/scheduler';
import { SECTIONS, type SectionId } from '../content/sections';

export const STORAGE_KEY = 'fizika.v1';
export const STORE_VERSION = 1;

export type SectionChoice = SectionId | 'all';

export interface SessionRecord {
  startedAt: number;
  endedAt: number;
  section: SectionChoice;
  answered: number;
  know: number;
  forgot: number;
}

export interface Store {
  version: typeof STORE_VERSION;
  cards: Record<string, CardProgress>;
  sessions: SessionRecord[];
  days: Day[];
  lastSection: SectionChoice;
}

export type LoadResult =
  | { ok: true; store: Store }
  | { ok: false; reason: string };

export function emptyStore(): Store {
  return {
    version: STORE_VERSION,
    cards: {},
    sessions: [],
    days: [],
    lastSection: 'all',
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isInterval(value: unknown): value is Interval {
  return INTERVALS.includes(value as Interval);
}

function isProgress(value: unknown): value is CardProgress {
  if (!isRecord(value)) return false;
  return (
    isInterval(value.interval) &&
    (value.due === null || typeof value.due === 'string') &&
    typeof value.know === 'number' &&
    typeof value.forgot === 'number' &&
    (value.lastAnswered === null || typeof value.lastAnswered === 'string')
  );
}

function isSession(value: unknown): value is SessionRecord {
  if (!isRecord(value)) return false;
  return (
    typeof value.startedAt === 'number' &&
    typeof value.endedAt === 'number' &&
    (value.section === 'all' || SECTIONS.some((item) => item.id === value.section)) &&
    typeof value.answered === 'number' &&
    typeof value.know === 'number' &&
    typeof value.forgot === 'number'
  );
}

function isStore(value: unknown): value is Store {
  if (!isRecord(value)) return false;
  if (value.version !== STORE_VERSION) return false;
  if (!isRecord(value.cards)) return false;
  if (!Object.values(value.cards).every(isProgress)) return false;
  if (!Array.isArray(value.sessions) || !value.sessions.every(isSession)) {
    return false;
  }
  if (
    !Array.isArray(value.days) ||
    !value.days.every((day) => typeof day === 'string')
  ) {
    return false;
  }
  if (
    value.lastSection !== 'all' &&
    !SECTIONS.some((item) => item.id === value.lastSection)
  ) {
    return false;
  }
  return true;
}

export function load(storage: Pick<Storage, 'getItem'>): LoadResult {
  const raw = storage.getItem(STORAGE_KEY);
  if (raw === null) {
    return { ok: true, store: emptyStore() };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, reason: 'Сохранённые данные не читаются как JSON.' };
  }

  if (isRecord(parsed) && parsed.version !== STORE_VERSION) {
    return {
      ok: false,
      reason: `Неизвестная версия данных: ${String(parsed.version)}.`,
    };
  }

  if (!isStore(parsed)) {
    return { ok: false, reason: 'Структура сохранённых данных повреждена.' };
  }

  return { ok: true, store: parsed };
}

export function save(storage: Pick<Storage, 'setItem'>, store: Store): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function clear(storage: Pick<Storage, 'removeItem'>): void {
  storage.removeItem(STORAGE_KEY);
}

export function markDay(store: Store, day: Day): Store {
  if (store.days.includes(day)) return store;
  return { ...store, days: [...store.days, day] };
}
