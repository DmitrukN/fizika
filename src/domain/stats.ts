import type { Card, Section } from '../content/sections';
import { daysBack, type Day } from './date';
import { isDue, NEW_CARD, type CardProgress } from './scheduler';
import type { SessionRecord, Store } from '../storage/store';

export interface SectionStats {
  title: string;
  locked: number;
  learning: number;
  untouched: number;
  total: number;
}

export function progressOf(store: Store, cardId: string): CardProgress {
  return store.cards[cardId] ?? NEW_CARD;
}

export function sectionStats(section: Section, store: Store): SectionStats {
  let locked = 0;
  let learning = 0;
  let untouched = 0;

  for (const card of section.cards) {
    const progress = progressOf(store, card.id);
    if (progress.interval === 7) locked += 1;
    else if (progress.interval === 0) untouched += 1;
    else learning += 1;
  }

  return {
    title: section.title,
    locked,
    learning,
    untouched,
    total: section.cards.length,
  };
}

export function dueCards(cards: Card[], store: Store, day: Day): Card[] {
  return cards.filter((card) => isDue(progressOf(store, card.id), day));
}

export function accuracy(store: Store): {
  all: number | null;
  last: number | null;
} {
  let know = 0;
  let forgot = 0;
  for (const progress of Object.values(store.cards)) {
    know += progress.know;
    forgot += progress.forgot;
  }

  const lastSession = lastSessionOf(store);
  const lastTotal = lastSession ? lastSession.know + lastSession.forgot : 0;

  return {
    all: know + forgot === 0 ? null : know / (know + forgot),
    last: lastSession && lastTotal > 0 ? lastSession.know / lastTotal : null,
  };
}

export function studyDays(store: Store, day: Day, count = 14) {
  return daysBack(day, count).map((value) => ({
    day: value,
    studied: store.days.includes(value),
  }));
}

export function lastSessionOf(store: Store): SessionRecord | null {
  return store.sessions.length === 0
    ? null
    : store.sessions[store.sessions.length - 1];
}

export function formatPercent(value: number | null): string {
  return value === null ? '—' : `${Math.round(value * 100)}%`;
}
