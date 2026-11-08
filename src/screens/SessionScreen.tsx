import { useState } from 'react';
import { cardById, type Card } from '../content/sections';
import type { Answer } from '../domain/scheduler';
import { CardMode } from '../components/CardMode';
import { Formula, InlineFormula } from '../components/Formula';
import { NotationList } from '../components/NotationList';
import { noBreakDash } from '../ui/format';

interface SessionScreenProps {
  sectionTitle: string;
  card: Card;
  revealed: boolean;
  answered: number;
  total: number;
  onReveal: () => void;
  onAnswer: (answer: Answer) => void;
  onFinish: () => void;
}

export function SessionScreen({
  sectionTitle,
  card,
  revealed,
  answered,
  total,
  onReveal,
  onAnswer,
  onFinish,
}: SessionScreenProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const filled = total === 0 ? 0 : (answered / total) * 100;
  const derivationOpen = openId === card.id;
  const panelId = `derivation-${card.id}`;

  return (
    <main className="screen screen--session">
      <header>
        <div className="session__top">
          <span className="session__section">{sectionTitle}</span>
          <button type="button" className="btn btn--text" onClick={onFinish}>
            Закончить
          </button>
        </div>
        <div className="session__meta">
          <span>
            {answered} из {total}
          </span>
        </div>
        <div className="progress-line" aria-hidden="true">
          <div className="progress-line__fill" style={{ width: `${filled}%` }} />
        </div>
      </header>

      <div className="session__body">
        <article className={revealed ? 'card card--revealed' : 'card'}>
          <button
            type="button"
            className="card__hit"
            aria-expanded={revealed}
            onClick={revealed ? undefined : onReveal}
          >
            <h2 className="card__title">{noBreakDash(card.title)}</h2>
            {!revealed && (
              <p className="card__hint">Нажмите, чтобы открыть формулу</p>
            )}
          </button>

          {revealed && (
            <div className="card__answer">
              <Formula latex={card.formula} />

              {card.extra && (
                <ul className="extra">
                  {card.extra.map((item) => (
                    <li key={item.label} className="extra__row">
                      <span className="extra__label">{item.label}:</span>
                      <InlineFormula latex={item.latex} />
                    </li>
                  ))}
                </ul>
              )}

              <CardMode
                card={card}
                open={derivationOpen}
                panelId={panelId}
                onToggle={() =>
                  setOpenId(derivationOpen ? null : card.id)
                }
              />

              {card.derivation && (
                <div
                  id={panelId}
                  className="derivation"
                  hidden={!derivationOpen}
                >
                  <p className="derivation__from">
                    Из:{' '}
                    {card.derivation.from
                      .map((id) => noBreakDash(cardById(id).title))
                      .join(' · ')}
                  </p>
                  {card.derivation.steps.map((step) => (
                    <Formula key={step} latex={step} />
                  ))}
                </div>
              )}

              <NotationList items={card.notation} />

              {card.note && <p className="card__note">{card.note}</p>}
            </div>
          )}
        </article>
      </div>

      <div className="session__actions">
        <button
          type="button"
          className="btn btn--ghost"
          disabled={!revealed}
          onClick={() => onAnswer('forgot')}
        >
          Забыл
        </button>
        <button
          type="button"
          className="btn btn--primary"
          disabled={!revealed}
          onClick={() => onAnswer('know')}
        >
          Знаю
        </button>
      </div>
    </main>
  );
}
