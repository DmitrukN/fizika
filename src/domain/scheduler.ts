import { addDays, type Day } from './date';

export const INTERVALS = [0, 1, 3, 5, 7] as const;

export type Interval = (typeof INTERVALS)[number];
export type Answer = 'know' | 'forgot';

export interface CardProgress {
  interval: Interval;
  due: Day | null;
  know: number;
  forgot: number;
  lastAnswered: Day | null;
}

export const NEW_CARD: CardProgress = {
  interval: 0,
  due: null,
  know: 0,
  forgot: 0,
  lastAnswered: null,
};

export function advance(interval: Interval, answer: Answer): Interval {
  if (answer === 'forgot') return 1;
  switch (interval) {
    case 0:
      return 5;
    case 1:
      return 3;
    case 3:
      return 5;
    case 5:
      return 7;
    case 7:
      return 7;
  }
}

export function dueAfter(today: Day, interval: Interval): Day {
  return addDays(today, interval);
}

export function isDue(progress: CardProgress, today: Day): boolean {
  return progress.due === null || progress.due <= today;
}

export function applyAnswer(
  progress: CardProgress,
  answer: Answer,
  today: Day,
): CardProgress {
  const interval = advance(progress.interval, answer);
  return {
    interval,
    due: dueAfter(today, interval),
    know: progress.know + (answer === 'know' ? 1 : 0),
    forgot: progress.forgot + (answer === 'forgot' ? 1 : 0),
    lastAnswered: today,
  };
}

export function requeueIndex(queueLength: number, gap = 3): number {
  return Math.min(gap, queueLength);
}
