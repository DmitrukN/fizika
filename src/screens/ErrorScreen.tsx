interface ErrorScreenProps {
  reason: string;
  onReset: () => void;
}

export function ErrorScreen({ reason, onReset }: ErrorScreenProps) {
  return (
    <main className="screen screen--center">
      <div className="message">
        <h1>Прогресс не читается</h1>
        <p className="message__text">{reason}</p>
        <p className="message__text">
          Сброс удалит интервалы и историю занятий на этом устройстве.
        </p>
      </div>

      <div className="summary__actions">
        <button type="button" className="btn btn--danger" onClick={onReset}>
          Сбросить прогресс
        </button>
      </div>
    </main>
  );
}
