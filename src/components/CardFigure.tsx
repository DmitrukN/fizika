import type { ReactElement } from 'react';
import type { FigureId } from '../content/sections';

const INK = '#191b1d';
const GREEN = '#3f6b4f';
const RED = '#8d3b34';
const BLUE = '#1f4fd8';
const MUTED = '#62686d';

function Defs() {
  return (
    <defs>
      <marker id="fig-ink" viewBox="0 0 10 10" refX="9.5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 Z" fill={INK} />
      </marker>
      <marker id="fig-green" viewBox="0 0 10 10" refX="9.5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 Z" fill={GREEN} />
      </marker>
      <marker id="fig-red" viewBox="0 0 10 10" refX="9.5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 Z" fill={RED} />
      </marker>
      <marker id="fig-blue" viewBox="0 0 10 10" refX="9.5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 Z" fill={BLUE} />
      </marker>
      <marker id="fig-axis" viewBox="0 0 10 10" refX="9.5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
        <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
      </marker>
      <marker id="vec-ink" viewBox="0 0 10 10" refX="9.5" refY="5" markerWidth="3.4" markerHeight="3.4" orient="auto">
        <path d="M0 0 L10 5 L0 10 Z" fill={INK} />
      </marker>
      <marker id="vec-green" viewBox="0 0 10 10" refX="9.5" refY="5" markerWidth="3.4" markerHeight="3.4" orient="auto">
        <path d="M0 0 L10 5 L0 10 Z" fill={GREEN} />
      </marker>
      <marker id="vec-red" viewBox="0 0 10 10" refX="9.5" refY="5" markerWidth="3.4" markerHeight="3.4" orient="auto">
        <path d="M0 0 L10 5 L0 10 Z" fill={RED} />
      </marker>
      <marker id="vec-blue" viewBox="0 0 10 10" refX="9.5" refY="5" markerWidth="3.4" markerHeight="3.4" orient="auto">
        <path d="M0 0 L10 5 L0 10 Z" fill={BLUE} />
      </marker>
    </defs>
  );
}

function Incline() {
  return (
    <svg viewBox="0 0 300 200" role="img" aria-label="Наклонная плоскость">
      <Defs />
      <path d="M40 150 L240 150 L240 50 Z" fill="#eef0ec" stroke={INK} strokeWidth="1.2" />
      <line x1="8" y1="150" x2="292" y2="150" stroke="#b6bcb5" strokeWidth="1" />

      <path d="M70 150 A30 30 0 0 0 66.8 136.6" fill="none" stroke={MUTED} strokeWidth="0.9" />
      <text x="74" y="145" fontSize="12" fill={MUTED}>α</text>

      <line x1="70" y1="105" x2="45.4" y2="117.3" stroke={MUTED} strokeWidth="1" markerEnd="url(#fig-axis)" />
      <text x="41" y="123" fontSize="10" fill={MUTED} textAnchor="end">x</text>
      <line x1="70" y1="105" x2="56.6" y2="78.2" stroke={MUTED} strokeWidth="1" markerEnd="url(#fig-axis)" />
      <text x="53" y="75" fontSize="10" fill={MUTED} textAnchor="end">y</text>

      <g transform="translate(135.1 90.2) rotate(-26.57)">
        <rect x="-18" y="-10" width="36" height="20" rx="2" fill="#f7f7f4" stroke={INK} strokeWidth="1.2" />
      </g>

      <line x1="135.1" y1="90.2" x2="135.1" y2="170.2" stroke={INK} strokeWidth="1.4" markerEnd="url(#fig-ink)" />
      <line x1="149" y1="169" x2="158" y2="169" stroke={INK} strokeWidth="0.9" markerEnd="url(#vec-ink)" />
      <text x="141" y="180" fontSize="11" fill={INK}>mg</text>

      <line x1="135.1" y1="90.2" x2="103.4" y2="26.7" stroke={GREEN} strokeWidth="1.6" markerEnd="url(#fig-green)" />
      <line x1="91" y1="12" x2="100" y2="12" stroke={GREEN} strokeWidth="0.9" markerEnd="url(#vec-green)" />
      <text x="99" y="23" fontSize="11" fill={GREEN} textAnchor="end">N</text>

      <line x1="135.1" y1="90.2" x2="165.5" y2="75.0" stroke={RED} strokeWidth="1.6" markerEnd="url(#fig-red)" />
      <line x1="168" y1="60" x2="177" y2="60" stroke={RED} strokeWidth="0.9" markerEnd="url(#vec-red)" />
      <text x="169" y="71" fontSize="11" fill={RED}>F<tspan fontSize="8" dy="3">тр</tspan></text>

      <line x1="108" y1="100" x2="84.1" y2="111.8" stroke={BLUE} strokeWidth="1.6" markerEnd="url(#fig-blue)" />
      <line x1="71" y1="113" x2="79" y2="113" stroke={BLUE} strokeWidth="0.9" markerEnd="url(#vec-blue)" />
      <text x="78" y="124" fontSize="11" fill={BLUE} textAnchor="end">a</text>
    </svg>
  );
}

function Elevator() {
  const cab = (x: number) => (
    <>
      <line x1={x + 40} y1="18" x2={x + 40} y2="50" stroke={MUTED} strokeWidth="1.2" />
      <rect x={x} y="50" width="80" height="100" rx="3" fill="#f7f7f4" stroke={INK} strokeWidth="1.2" />
      <rect x={x + 22} y="106" width="36" height="32" rx="2" fill="#eef0ec" stroke={INK} strokeWidth="1" />
      <line x1={x + 40} y1="122" x2={x + 40} y2="94" stroke={GREEN} strokeWidth="1.6" markerEnd="url(#fig-green)" />
      <line x1={x + 40} y1="122" x2={x + 40} y2="148" stroke={INK} strokeWidth="1.4" markerEnd="url(#fig-ink)" />
    </>
  );

  return (
    <svg viewBox="0 0 300 190" role="img" aria-label="Вес в лифте">
      <Defs />
      {cab(40)}
      {cab(180)}

      <text x="104" y="88" fontSize="11" fill={GREEN} textAnchor="end">N</text>
      <text x="104" y="154" fontSize="11" fill={INK} textAnchor="end">mg</text>
      <text x="244" y="88" fontSize="11" fill={GREEN} textAnchor="end">N</text>
      <text x="244" y="154" fontSize="11" fill={INK} textAnchor="end">mg</text>

      <line x1="140" y1="120" x2="140" y2="98" stroke={BLUE} strokeWidth="1.6" markerEnd="url(#fig-blue)" />
      <text x="144" y="108" fontSize="10" fill={BLUE}>a</text>
      <line x1="260" y1="142" x2="260" y2="164" stroke={BLUE} strokeWidth="1.6" markerEnd="url(#fig-blue)" />
      <text x="264" y="156" fontSize="10" fill={BLUE}>a</text>

      <text x="80" y="176" fontSize="10" fill={MUTED} textAnchor="middle">вверх</text>
      <text x="220" y="176" fontSize="10" fill={MUTED} textAnchor="middle">вниз</text>
    </svg>
  );
}

function Bridge() {
  return (
    <svg viewBox="0 0 300 170" role="img" aria-label="Вес на мосту">
      <Defs />
      <path d="M20 120 Q80 50 140 120" fill="none" stroke={INK} strokeWidth="1.4" />
      <path d="M160 70 Q220 140 280 70" fill="none" stroke={INK} strokeWidth="1.4" />

      <rect x="68" y="78" width="24" height="10" rx="2" fill="#f7f7f4" stroke={INK} strokeWidth="1.1" />
      <rect x="208" y="98" width="24" height="10" rx="2" fill="#f7f7f4" stroke={INK} strokeWidth="1.1" />

      <line x1="80" y1="83" x2="80" y2="56" stroke={GREEN} strokeWidth="1.6" markerEnd="url(#fig-green)" />
      <line x1="80" y1="83" x2="80" y2="108" stroke={INK} strokeWidth="1.4" markerEnd="url(#fig-ink)" />
      <line x1="220" y1="103" x2="220" y2="76" stroke={GREEN} strokeWidth="1.6" markerEnd="url(#fig-green)" />
      <line x1="220" y1="103" x2="220" y2="128" stroke={INK} strokeWidth="1.4" markerEnd="url(#fig-ink)" />

      <text x="64" y="60" fontSize="11" fill={GREEN} textAnchor="end">N</text>
      <text x="64" y="118" fontSize="11" fill={INK} textAnchor="end">mg</text>
      <text x="204" y="80" fontSize="11" fill={GREEN} textAnchor="end">N</text>
      <text x="204" y="138" fontSize="11" fill={INK} textAnchor="end">mg</text>

      <text x="80" y="160" fontSize="10" fill={MUTED} textAnchor="middle">выпуклый</text>
      <text x="220" y="160" fontSize="10" fill={MUTED} textAnchor="middle">вогнутый</text>
    </svg>
  );
}

function VerticalThrow() {
  return (
    <svg viewBox="0 0 240 190" role="img" aria-label="Бросок вертикально вверх">
      <Defs />
      <line x1="100" y1="170" x2="100" y2="20" stroke={MUTED} strokeWidth="1" markerEnd="url(#fig-axis)" />
      <text x="104" y="16" fontSize="10" fill={MUTED}>y</text>

      <circle cx="100" cy="150" r="4" fill={INK} />
      <line x1="100" y1="146" x2="100" y2="100" stroke={INK} strokeWidth="1.4" markerEnd="url(#fig-ink)" />
      <text x="104" y="98" fontSize="11" fill={INK}>v₀</text>

      <line x1="125" y1="150" x2="125" y2="172" stroke={BLUE} strokeWidth="1.6" markerEnd="url(#fig-blue)" />
      <text x="129" y="170" fontSize="11" fill={BLUE}>g</text>

      <line x1="100" y1="70" x2="136" y2="70" stroke={MUTED} strokeWidth="0.9" strokeDasharray="4 3" />
      <circle cx="100" cy="70" r="2.5" fill={MUTED} />
      <text x="140" y="74" fontSize="11" fill={MUTED}>H</text>
    </svg>
  );
}

function Projectile() {
  return (
    <svg viewBox="0 0 300 170" role="img" aria-label="Бросок под углом к горизонту">
      <Defs />
      <line x1="25" y1="150" x2="289" y2="150" stroke={MUTED} strokeWidth="1" markerEnd="url(#fig-axis)" />
      <text x="292" y="154" fontSize="10" fill={MUTED}>x</text>
      <line x1="30" y1="150" x2="30" y2="16" stroke={MUTED} strokeWidth="1" markerEnd="url(#fig-axis)" />
      <text x="26" y="13" fontSize="10" fill={MUTED} textAnchor="end">y</text>

      {/* парабола с начальным наклоном 45°: касательная совпадает с v₀ */}
      <path d="M30 150 Q155 25 280 150" fill="none" stroke={INK} strokeWidth="1.4" />
      <line x1="30" y1="150" x2="65" y2="115" stroke={INK} strokeWidth="1.4" markerEnd="url(#fig-ink)" />
      <text x="67" y="110" fontSize="11" fill={INK}>v₀</text>

      <path d="M62 150 A32 32 0 0 1 52.6 127.4" fill="none" stroke={MUTED} strokeWidth="0.9" />
      <text x="66" y="143" fontSize="11" fill={MUTED}>α</text>

      <line x1="155" y1="87.5" x2="155" y2="150" stroke={MUTED} strokeWidth="0.9" strokeDasharray="4 3" />
      <text x="160" y="122" fontSize="11" fill={MUTED}>H</text>

      <line x1="30" y1="158" x2="280" y2="158" stroke={MUTED} strokeWidth="0.9" />
      <line x1="30" y1="154" x2="30" y2="162" stroke={MUTED} strokeWidth="0.9" />
      <line x1="280" y1="154" x2="280" y2="162" stroke={MUTED} strokeWidth="0.9" />
      <text x="155" y="168" fontSize="11" fill={MUTED} textAnchor="middle">L</text>
    </svg>
  );
}

const FIGURES: Record<FigureId, () => ReactElement> = {
  'incline-forces': Incline,
  elevator: Elevator,
  bridge: Bridge,
  'vertical-throw': VerticalThrow,
  projectile: Projectile,
};

export function CardFigure({
  id,
  small = false,
}: {
  id: FigureId;
  small?: boolean;
}) {
  const Figure = FIGURES[id];

  return (
    <div
      className={small ? 'card__figure card__figure--small' : 'card__figure'}
    >
      <Figure />
    </div>
  );
}
