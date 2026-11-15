import type { FigureId } from '../content/sections';

const INK = '#191b1d';
const GREEN = '#3f6b4f';
const RED = '#8d3b34';
const BLUE = '#1f4fd8';

function Incline({ acceleration }: { acceleration: boolean }) {
  return (
    <svg viewBox="0 0 260 160" role="img" aria-label="Наклонная плоскость">
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
          id="fig-blue"
          viewBox="0 0 10 10"
          refX="9.5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0 0 L10 5 L0 10 Z" fill={BLUE} />
        </marker>
      </defs>

      <path
        d="M28 132 L200 132 L200 46 Z"
        fill="#eef0ec"
        stroke={INK}
        strokeWidth="1.2"
      />
      <line x1="12" y1="132" x2="250" y2="132" stroke="#b6bcb5" strokeWidth="1" />

      <path
        d="M64 132 A36 36 0 0 0 60.2 115.9"
        fill="none"
        stroke="#62686d"
        strokeWidth="0.9"
      />
      <text x="68" y="127" fontSize="12" fill="#62686d">
        α
      </text>

      <g transform="translate(112.9 78.4) rotate(-26.57)">
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
        x1="112.9"
        y1="78.4"
        x2="112.9"
        y2="116.4"
        stroke={INK}
        strokeWidth="1.4"
        markerEnd="url(#fig-ink)"
      />
      <text x="118" y="124" fontSize="11" fill={INK}>
        mg
      </text>

      <line
        x1="112.9"
        y1="78.4"
        x2="97.7"
        y2="48.0"
        stroke={GREEN}
        strokeWidth="1.4"
        markerEnd="url(#fig-green)"
      />
      <text x="93" y="44" fontSize="11" fill={GREEN} textAnchor="end">
        N
      </text>

      {acceleration ? (
        <>
          <line
            x1="112.9"
            y1="78.4"
            x2="71.8"
            y2="99.0"
            stroke={BLUE}
            strokeWidth="1.4"
            markerEnd="url(#fig-blue)"
          />
          <text x="66" y="106" fontSize="11" fill={BLUE} textAnchor="end">
            a
          </text>
        </>
      ) : (
        <>
          <line
            x1="112.9"
            y1="78.4"
            x2="143.3"
            y2="63.2"
            stroke={RED}
            strokeWidth="1.4"
            markerEnd="url(#fig-red)"
          />
          <text x="147" y="58" fontSize="11" fill={RED}>
            F<tspan fontSize="8" dy="3">тр</tspan>
          </text>
        </>
      )}
    </svg>
  );
}

export function CardFigure({ id }: { id: FigureId }) {
  return (
    <div className="card__figure">
      <Incline acceleration={id === 'incline-acceleration'} />
    </div>
  );
}
