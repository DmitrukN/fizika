import type { SessionRecord } from '../storage/store';
import { formatDuration } from '../ui/format';

interface SummaryScreenProps {
  result: SessionRecord;
  onRepeat: () => void;
  onProgress: () => void;
  onHome: () => void;
}

export function SummaryScreen({
  result,
  onRepeat,
  onProgress,
  onHome,
}: SummaryScreenProps) {
  return (
    <main className="screen screen--summary">
      <header className="summary__head">
        <h1>Сессия закончена</h1>
      </header>

      <dl className="result">
        <div className="result__row">
          <dt>Ответов</dt>
          <dd className="mono">{result.answered}</dd>
        </div>
        <div className="result__row">
          <dt>Знаю</dt>
          <dd className="mono">{result.know}</dd>
        </div>
        <div className="result__row">
          <dt>Забыл</dt>
          <dd className="mono">{result.forgot}</dd>
        </div>
        <div className="result__row">
          <dt>Время</dt>
          <dd className="mono">
            {formatDuration(result.endedAt - result.startedAt)}
          </dd>
        </div>
      </dl>

      <div className="summary__actions">
        <button type="button" className="btn btn--primary" onClick={onRepeat}>
          Повторить все
        </button>
        <button type="button" className="btn btn--ghost" onClick={onProgress}>
          Прогресс
        </button>
      </div>

      <footer className="start__footer">
        <button type="button" className="btn btn--text" onClick={onHome}>
          На старт
        </button>
      </footer>
    </main>
  );
}
