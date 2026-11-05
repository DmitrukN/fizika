import { ALL_CARDS, SECTIONS, type SectionId } from '../content/sections';
import type { Day } from '../domain/date';
import { dueCards } from '../domain/stats';
import type { Store } from '../storage/store';
import { cardsWord } from '../ui/format';

interface StartScreenProps {
  store: Store;
  day: Day;
  onStart: (section: SectionId) => void;
  onProgress: () => void;
}

export function StartScreen({
  store,
  day,
  onStart,
  onProgress,
}: StartScreenProps) {
  return (
    <main className="screen">
      <header className="start__head">
        <h1>Физика</h1>
        <p className="start__subtitle">
          {ALL_CARDS.length} {cardsWord(ALL_CARDS.length)}
        </p>
      </header>

      <div className="list-caption">
        <span>Разделы</span>
        <span>к повторению</span>
      </div>

      <ul className="start__list">
        {SECTIONS.map((section) => {
          const due = dueCards(section.cards, store, day).length;

          return (
            <li key={section.id}>
              <button
                type="button"
                className="section-row section-row--section"
                onClick={() => onStart(section.id)}
              >
                <span className="section-row__main">
                  <span className="section-row__title">{section.title}</span>
                  <span className="section-row__meta">
                    {section.cards.length} {cardsWord(section.cards.length)}
                  </span>
                </span>
                <span className="section-row__count">
                  {due} из {section.cards.length}
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
