import type { FigureId } from '../content/sections';

const INK = '#191b1d';
const GREEN = '#3f6b4f';
const RED = '#8d3b34';
const MUTED = '#62686d';

export function CardFigure({
  id,
  small = false,
}: {
  id: FigureId;
  small?: boolean;
}) {
  return (
    <div
      className={small ? 'card__figure card__figure--small' : 'card__figure'}
    >
      <svg
        viewBox="0 0 260 160"
        role="img"
        data-figure={id}
        aria-label="Наклонная плоскость"
      >
        <defs>
          <marker
            id="fig-ink"
            viewBox="0 0 10 10"
            refX="9.5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill={INK} />
          </marker>
          <marker
            id="fig-green"
            viewBox="0 0 10 10"
            refX="9.5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill={GREEN} />
          </marker>
          <marker
            id="fig-red"
            viewBox="0 0 10 10"
            refX="9.5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill={RED} />
          </marker>
          <marker
            id="fig-axis"
            viewBox="0 0 10 10"
            refX="9.5"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
          </marker>
        </defs>

        <path
          d="M44 132 L216 132 L216 46 Z"
          fill="#eef0ec"
          stroke={INK}
          strokeWidth="1.2"
        />
        <line
          x1="12"
          y1="132"
          x2="252"
          y2="132"
          stroke="#b6bcb5"
          strokeWidth="1"
        />

        <path
          d="M76 132 A32 32 0 0 0 72.6 117.7"
          fill="none"
          stroke={MUTED}
          strokeWidth="0.9"
        />
        <text x="80" y="127" fontSize="12" fill={MUTED}>
          α
        </text>

        <line
          x1="44"
          y1="132"
          x2="26.1"
          y2="96.2"
          stroke={MUTED}
          strokeWidth="1"
          markerEnd="url(#fig-axis)"
        />
        <text x="21" y="93" fontSize="10" fill={MUTED} textAnchor="end">
          y
        </text>

        <line
          x1="40.4"
          y1="124.8"
          x2="79.7"
          y2="105.1"
          stroke={MUTED}
          strokeWidth="1"
          markerEnd="url(#fig-axis)"
        />
        <text x="83" y="102" fontSize="10" fill={MUTED}>
          x
        </text>

        <g transform="translate(128.9 78.4) rotate(-26.57)">
          <rect
            x="-20"
            y="-10"
            width="40"
            height="20"
            rx="2"
            fill="#f7f7f4"
            stroke={INK}
            strokeWidth="1.2"
          />
        </g>

        <line
          x1="128.9"
          y1="78.4"
          x2="128.9"
          y2="116.4"
          stroke={INK}
          strokeWidth="1.4"
          markerEnd="url(#fig-ink)"
        />
        <text x="134" y="124" fontSize="11" fill={INK}>
          mg
        </text>

        <line
          x1="128.9"
          y1="78.4"
          x2="113.7"
          y2="48.0"
          stroke={GREEN}
          strokeWidth="1.4"
          markerEnd="url(#fig-green)"
        />
        <text x="109" y="44" fontSize="11" fill={GREEN} textAnchor="end">
          N
        </text>

        <line
          x1="128.9"
          y1="78.4"
          x2="159.3"
          y2="63.2"
          stroke={RED}
          strokeWidth="1.4"
          markerEnd="url(#fig-red)"
        />
        <text x="163" y="58" fontSize="11" fill={RED}>
          F<tspan fontSize="8" dy="3">тр</tspan>
        </text>
      </svg>
    </div>
  );
}
