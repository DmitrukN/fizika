import { SECTIONS } from '../content/sections';
import { formatDateTimeShort, formatDay, type Day } from '../domain/date';
import {
  accuracy,
  formatPercent,
  lastSessionOf,
  sectionStats,
  studyDays,
} from '../domain/stats';
import type { Store } from '../storage/store';

interface ProgressScreenProps {
  store: Store;
  day: Day;
  onBack: () => void;
}

export function ProgressScreen({ store, day, onBack }: ProgressScreenProps) {
  const rows = SECTIONS.map((section) => sectionStats(section, store));
  const totals = rows.reduce(
    (sum, row) => ({
      locked: sum.locked + row.locked,
      learning: sum.learning + row.learning,
      untouched: sum.untouched + row.untouched,
    }),
    { locked: 0, learning: 0, untouched: 0 },
  );

  const scores = accuracy(store);
  const last = lastSessionOf(store);
  const days = studyDays(store, day);

  return (
    <main className="screen">
      <header className="progress__head">
        <h1>Прогресс</h1>
        <button type="button" className="btn btn--text" onClick={onBack}>
          Назад
        </button>
      </header>

      <section className="summary" aria-label="Сводка">
        <div>
          <div className="summary__value">{totals.locked}</div>
          <div className="summary__label">закреплено</div>
        </div>
        <div>
          <div className="summary__value">{totals.learning}</div>
          <div className="summary__label">в работе</div>
        </div>
        <div>
          <div className="summary__value">{totals.untouched}</div>
          <div className="summary__label">не начато</div>
        </div>
      </section>

      <div className="list-caption">
        <span>По разделам</span>
        <span>закреплено</span>
      </div>

      <section aria-label="Разделы">
        {rows.map((row) => {
          const width = row.total === 0 ? 0 : (row.locked / row.total) * 100;

          return (
            <div className="section-stat" key={row.title}>
              <div className="section-stat__row">
                <span>{row.title}</span>
                <span className="section-stat__count">
                  {row.locked} из {row.total}
                </span>
              </div>
              <div className="bar" aria-hidden="true">
                <div className="bar__fill" style={{ width: `${width}%` }} />
              </div>
            </div>
          );
        })}
      </section>

      <section className="days" aria-label="Последние 14 дней">
        <div className="days__head">
          <span>Последние 14 дней</span>
          <span className="days__last">
            {last
              ? `последняя · ${formatDateTimeShort(last.endedAt)}`
              : 'занятий еще не было'}
          </span>
        </div>
        <div className="days__grid">
          {days.map((entry) => (
            <div
              key={entry.day}
              className={entry.studied ? 'day day--studied' : 'day'}
              title={formatDay(entry.day)}
              aria-label={`${formatDay(entry.day)}: ${
                entry.studied ? 'занимался' : 'пропуск'
              }`}
            />
          ))}
        </div>
      </section>

      <section className="accuracy" aria-label="Точность">
        <div className="accuracy__row">
          <span>Точность за все время</span>
          <span className="mono">{formatPercent(scores.all)}</span>
        </div>
        <div className="accuracy__row">
          <span>Последняя сессия</span>
          <span className="mono">{formatPercent(scores.last)}</span>
        </div>
      </section>
    </main>
  );
}
