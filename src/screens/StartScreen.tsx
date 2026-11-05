import { CARDS } from '../content/cards';
import { SECTIONS, sectionTitle } from '../content/sections';
import type { Day } from '../domain/date';
import { dueCards } from '../domain/stats';
import type { SectionChoice, Store } from '../storage/store';
import { cardsWord } from '../ui/format';

interface StartScreenProps {
  store: Store;
  day: Day;
  onStart: (section: SectionChoice) => void;
  onProgress: () => void;
}

export function StartScreen({
  store,
  day,
  onStart,
  onProgress,
}: StartScreenProps) {
  const due = dueCards(CARDS, store, day).length;
  const lastSection = store.lastSection;
  const lastPool =
    lastSection === 'all'
      ? CARDS
      : CARDS.filter((card) => card.section === lastSection);
  const lastDue = dueCards(lastPool, store, day).length;

  return (
    <main className="screen">
      <header className="start__head">
        <h1>Физика</h1>
        <p className="start__subtitle">
          Молекулярная физика · {CARDS.length} {cardsWord(CARDS.length)}
        </p>
      </header>

      {lastSection === 'all' ? (
        <button
          type="button"
          className="btn btn--primary start__all"
          onClick={() => onStart('all')}
        >
          <span>Все разделы</span>
          <span className="start__all-count">
            {due} из {CARDS.length}
          </span>
        </button>
      ) : (
        <>
          <button
            type="button"
            className="btn btn--primary start__all start__all--stacked"
            onClick={() => onStart(lastSection)}
          >
            <span className="start__cta">
              <span>Продолжить</span>
              <span className="start__cta-sub">
                {sectionTitle(lastSection)}
              </span>
            </span>
            <span className="start__all-count">
              {lastDue} из {lastPool.length}
            </span>
          </button>
          <button
            type="button"
            className="btn btn--ghost start__secondary"
            onClick={() => onStart('all')}
          >
            <span>Все разделы</span>
            <span className="start__all-count">
              {due} из {CARDS.length}
            </span>
          </button>
        </>
      )}

      <div className="list-caption">
        <span>Разделы</span>
        <span>к повторению</span>
      </div>

      <ul className="start__list">
        {SECTIONS.map((section) => {
          const pool = CARDS.filter((card) => card.section === section.id);
          const sectionDue = dueCards(pool, store, day).length;

          return (
            <li key={section.id}>
              <button
                type="button"
                className="section-row"
                onClick={() => onStart(section.id)}
              >
                <span className="section-row__title">{section.title}</span>
                <span className="section-row__count">
                  {sectionDue} из {pool.length}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <footer className="start__footer">
        <button type="button" className="btn btn--text" onClick={onProgress}>
          Прогресс
        </button>
      </footer>
    </main>
  );
}
