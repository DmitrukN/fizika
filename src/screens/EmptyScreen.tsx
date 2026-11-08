interface EmptyScreenProps {
  sectionTitle: string;
  onRepeatAll: () => void;
  onHome: () => void;
}

export function EmptyScreen({
  sectionTitle,
  onRepeatAll,
  onHome,
}: EmptyScreenProps) {
  return (
    <main className="screen screen--center">
      <div className="message">
        <h1>На сегодня все</h1>
        <p className="message__text">
          В разделе «{sectionTitle}» нет созревших карточек. Можно повторить все
          подряд — интервалы от этого не сбросятся.
        </p>
      </div>

      <div className="summary__actions">
        <button type="button" className="btn btn--primary" onClick={onRepeatAll}>
          Повторить все
        </button>
        <button type="button" className="btn btn--text" onClick={onHome}>
          На старт
        </button>
      </div>
    </main>
  );
}
