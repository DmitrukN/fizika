export type Day = string;

export function toDay(date: Date): Day {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function today(now: Date = new Date()): Day {
  return toDay(now);
}

export function addDays(day: Day, amount: number): Day {
  const [year, month, date] = day.split('-').map(Number);
  const value = new Date(year, month - 1, date);
  value.setDate(value.getDate() + amount);
  return toDay(value);
}

export function daysBack(from: Day, count: number): Day[] {
  const days: Day[] = [];
  for (let offset = count - 1; offset >= 0; offset -= 1) {
    days.push(addDays(from, -offset));
  }
  return days;
}

export function formatDay(day: Day): string {
  const [year, month, date] = day.split('-').map(Number);
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
  }).format(new Date(year, month - 1, date));
}

export function formatDateTime(timestamp: number): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

export function formatDateTimeShort(timestamp: number): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
}
