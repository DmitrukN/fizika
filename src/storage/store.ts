import type { Day } from '../domain/date';
import { INTERVALS, type CardProgress, type Interval } from '../domain/scheduler';
import { SECTIONS, type SectionId } from '../content/sections';

export const STORAGE_KEY = 'fizika.v2';
export const LEGACY_KEY = 'fizika.v1';
export const STORE_VERSION = 2;

export interface SessionRecord {
  startedAt: number;
  endedAt: number;
  section: SectionId;
  answered: number;
  know: number;
  forgot: number;
}

export interface Store {
  version: typeof STORE_VERSION;
  cards: Record<string, CardProgress>;
  sessions: SessionRecord[];
  days: Day[];
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

function isKnownSection(value: unknown): value is SectionId {
  return SECTIONS.some((section) => section.id === value);
}

function isSession(value: unknown): value is SessionRecord {
  if (!isRecord(value)) return false;
  return (
    typeof value.startedAt === 'number' &&
    typeof value.endedAt === 'number' &&
    isKnownSection(value.section) &&
    typeof value.answered === 'number' &&
    typeof value.know === 'number' &&
    typeof value.forgot === 'number'
  );
}

function isCards(value: unknown): value is Record<string, CardProgress> {
  return isRecord(value) && Object.values(value).every(isProgress);
}

function isDays(value: unknown): value is Day[] {
  return Array.isArray(value) && value.every((day) => typeof day === 'string');
}

function isStore(value: unknown): value is Store {
  if (!isRecord(value)) return false;
  if (value.version !== STORE_VERSION) return false;
  if (!isCards(value.cards)) return false;
  if (!Array.isArray(value.sessions) || !value.sessions.every(isSession)) {
    return false;
  }
  return isDays(value.days);
}

interface LegacySession {
  startedAt: number;
  endedAt: number;
  answered: number;
  know: number;
  forgot: number;
}

interface LegacyStore {
  cards: Record<string, CardProgress>;
  sessions: LegacySession[];
  days: Day[];
}

function isLegacyStore(value: unknown): value is LegacyStore {
  if (!isRecord(value)) return false;
  if (value.version !== 1) return false;
  if (!isCards(value.cards)) return false;
  if (
    !Array.isArray(value.sessions) ||
    !value.sessions.every(
      (session) =>
        isRecord(session) &&
        typeof session.startedAt === 'number' &&
        typeof session.endedAt === 'number' &&
        typeof session.answered === 'number' &&
        typeof session.know === 'number' &&
        typeof session.forgot === 'number',
    )
  ) {
    return false;
  }
  return isDays(value.days);
}

function parseCurrent(raw: string): LoadResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, reason: 'Сохраненные данные не читаются как JSON.' };
  }

  if (isRecord(parsed) && parsed.version !== STORE_VERSION) {
    return {
      ok: false,
      reason: `Неизвестная версия данных: ${String(parsed.version)}.`,
    };
  }

  if (!isStore(parsed)) {
    return { ok: false, reason: 'Структура сохраненных данных повреждена.' };
  }

  return { ok: true, store: parsed };
}

function parseLegacy(raw: string): LoadResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, reason: 'Сохраненные данные не читаются как JSON.' };
  }

  if (!isLegacyStore(parsed)) {
    return {
      ok: false,
      reason: 'Старые сохраненные данные повреждены.',
    };
  }

  return {
    ok: true,
    store: {
      version: STORE_VERSION,
      cards: parsed.cards,
      days: parsed.days,
      sessions: parsed.sessions.map((session) => ({
        startedAt: session.startedAt,
        endedAt: session.endedAt,
        answered: session.answered,
        know: session.know,
        forgot: session.forgot,
        section: 'molecular',
      })),
    },
  };
}

export function load(storage: Pick<Storage, 'getItem'>): LoadResult {
  const raw = storage.getItem(STORAGE_KEY);
  if (raw !== null) return parseCurrent(raw);

  const legacy = storage.getItem(LEGACY_KEY);
  if (legacy !== null) return parseLegacy(legacy);

  return { ok: true, store: emptyStore() };
}

export function save(storage: Pick<Storage, 'setItem'>, store: Store): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function clear(
  storage: Pick<Storage, 'removeItem'>,
): void {
  storage.removeItem(STORAGE_KEY);
  storage.removeItem(LEGACY_KEY);
}

export function markDay(store: Store, day: Day): Store {
  if (store.days.includes(day)) return store;
  return { ...store, days: [...store.days, day] };
}
