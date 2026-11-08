import type { Card } from '../content/sections';

interface CardModeProps {
  card: Card;
  open: boolean;
  panelId: string;
  onToggle: () => void;
}

export function CardMode({ card, open, panelId, onToggle }: CardModeProps) {
  if (card.kind !== 'consequence') {
    return (
      <p className="mode">
        <span className="mode__rule" aria-hidden="true" />
        <span className="mode__label">Учить наизусть</span>
      </p>
    );
  }

  return (
    <button
      type="button"
      className="mode mode--button"
      aria-expanded={open}
      aria-controls={panelId}
      onClick={onToggle}
    >
      <span className="mode__rule" aria-hidden="true" />
      <span className="mode__label">Можно вывести</span>
      <span className="mode__chevron" aria-hidden="true" />
    </button>
  );
}
