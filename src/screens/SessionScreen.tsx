import { useState } from 'react';
import { cardById, type Card } from '../content/sections';
import type { Answer } from '../domain/scheduler';
import { CardMode } from '../components/CardMode';
import { CardFigure } from '../components/CardFigure';
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
            {!revealed && card.kind === 'task' && card.figure && (
              <CardFigure id={card.figure} />
            )}
            {!revealed && (
              <p className="card__hint">
                {card.kind === 'task'
                  ? 'Нажмите, чтобы открыть решение'
                  : 'Нажмите, чтобы открыть формулу'}
              </p>
            )}
          </button>

          {revealed && card.kind === 'task' && (
            <div className="card__answer">
              {card.figure && <CardFigure id={card.figure} small />}

              <ol className="solution">
                {card.solution?.map((step, index) => {
                  if ('text' in step) {
                    return (
                      <li key={index} className="solution__step">
                        <p className="solution__text">{step.text}</p>
                      </li>
                    );
                  }
                  return (
                    <li
                      key={index}
                      className={
                        step.continuation
                          ? 'solution__step solution__step--cont'
                          : 'solution__step'
                      }
                    >
                      <Formula latex={step.latex} />
                    </li>
                  );
                })}
              </ol>

              <NotationList items={card.notation} />
            </div>
          )}

          {revealed && card.kind !== 'task' && (
            <div className="card__answer">
              <Formula latex={card.formula} />

              {card.figure && <CardFigure id={card.figure} />}

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
