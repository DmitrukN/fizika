import type { FigureId } from '../content/sections';

const INK = '#191b1d';
const GREEN = '#3f6b4f';
const RED = '#8d3b34';
const BLUE = '#1f4fd8';
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
        viewBox="0 0 300 190"
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
          <marker
            id="vec-ink"
            viewBox="0 0 10 10"
            refX="9.5"
            refY="5"
            markerWidth="3.4"
            markerHeight="3.4"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill={INK} />
          </marker>
          <marker
            id="vec-green"
            viewBox="0 0 10 10"
            refX="9.5"
            refY="5"
            markerWidth="3.4"
            markerHeight="3.4"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill={GREEN} />
          </marker>
          <marker
            id="vec-red"
            viewBox="0 0 10 10"
            refX="9.5"
            refY="5"
            markerWidth="3.4"
            markerHeight="3.4"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill={RED} />
          </marker>
          <marker
            id="vec-blue"
            viewBox="0 0 10 10"
            refX="9.5"
            refY="5"
            markerWidth="3.4"
            markerHeight="3.4"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill={BLUE} />
          </marker>
        </defs>

        <path
          d="M40 170 L240 170 L240 30 Z"
          fill="#eef0ec"
          stroke={INK}
          strokeWidth="1.2"
        />
        <line
          x1="8"
          y1="170"
          x2="292"
          y2="170"
          stroke="#b6bcb5"
          strokeWidth="1"
        />

        <path
          d="M74 170 A34 34 0 0 0 67.9 150.5"
          fill="none"
          stroke={MUTED}
          strokeWidth="0.9"
        />
        <text x="78" y="165" fontSize="12" fill={MUTED}>
          α
        </text>

        {/* оси: x вниз по склону, y от поверхности */}
        <line
          x1="70"
          y1="110"
          x2="45.4"
          y2="127.2"
          stroke={MUTED}
          strokeWidth="1"
          markerEnd="url(#fig-axis)"
        />
        <text x="41" y="133" fontSize="10" fill={MUTED} textAnchor="end">
          x
        </text>

        <line
          x1="70"
          y1="110"
          x2="52.8"
          y2="85.4"
          stroke={MUTED}
          strokeWidth="1"
          markerEnd="url(#fig-axis)"
        />
        <text x="49" y="82" fontSize="10" fill={MUTED} textAnchor="end">
          y
        </text>

        <g transform="translate(133.7 91.0) rotate(-35)">
          <rect
            x="-22"
            y="-11"
            width="44"
            height="22"
            rx="2"
            fill="#f7f7f4"
            stroke={INK}
            strokeWidth="1.2"
          />
        </g>

        {/* силы из центра: mg 56, N = mg cos α 46, Fтр 24 */}
        <line
          x1="133.7"
          y1="91.0"
          x2="133.7"
          y2="147.0"
          stroke={INK}
          strokeWidth="1.4"
          markerEnd="url(#fig-ink)"
        />
        <line
          x1="147"
          y1="146"
          x2="156"
          y2="146"
          stroke={INK}
          strokeWidth="0.9"
          markerEnd="url(#vec-ink)"
        />
        <text x="139" y="157" fontSize="11" fill={INK}>
          mg
        </text>

        <line
          x1="133.7"
          y1="91.0"
          x2="107.3"
          y2="53.3"
          stroke={GREEN}
          strokeWidth="1.6"
          markerEnd="url(#fig-green)"
        />
        <line
          x1="94"
          y1="38"
          x2="103"
          y2="38"
          stroke={GREEN}
          strokeWidth="0.9"
          markerEnd="url(#vec-green)"
        />
        <text x="102" y="49" fontSize="11" fill={GREEN} textAnchor="end">
          N
        </text>

        <line
          x1="133.7"
          y1="91.0"
          x2="153.4"
          y2="77.2"
          stroke={RED}
          strokeWidth="1.6"
          markerEnd="url(#fig-red)"
        />
        <line
          x1="156"
          y1="62"
          x2="165"
          y2="62"
          stroke={RED}
          strokeWidth="0.9"
          markerEnd="url(#vec-red)"
        />
        <text x="157" y="73" fontSize="11" fill={RED}>
          F<tspan fontSize="8" dy="3">тр</tspan>
        </text>

        {/* ускорение рядом с бруском, не касаясь его */}
        <line
          x1="108"
          y1="100"
          x2="88.3"
          y2="113.8"
          stroke={BLUE}
          strokeWidth="1.6"
          markerEnd="url(#fig-blue)"
        />
        <line
          x1="75"
          y1="117"
          x2="83"
          y2="117"
          stroke={BLUE}
          strokeWidth="0.9"
          markerEnd="url(#vec-blue)"
        />
        <text x="82" y="128" fontSize="11" fill={BLUE} textAnchor="end">
          a
        </text>
      </svg>
    </div>
  );
}
