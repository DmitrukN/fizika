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
        viewBox="0 0 300 200"
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
          d="M40 150 L240 150 L240 50 Z"
          fill="#eef0ec"
          stroke={INK}
          strokeWidth="1.2"
        />
        <line
          x1="8"
          y1="150"
          x2="292"
          y2="150"
          stroke="#b6bcb5"
          strokeWidth="1"
        />

        <path
          d="M70 150 A30 30 0 0 0 66.8 136.6"
          fill="none"
          stroke={MUTED}
          strokeWidth="0.9"
        />
        <text x="74" y="145" fontSize="12" fill={MUTED}>
          α
        </text>

        {/* оси: x вниз по склону, y от поверхности */}
        <line
          x1="70"
          y1="105"
          x2="45.4"
          y2="117.3"
          stroke={MUTED}
          strokeWidth="1"
          markerEnd="url(#fig-axis)"
        />
        <text x="41" y="123" fontSize="10" fill={MUTED} textAnchor="end">
          x
        </text>

        <line
          x1="70"
          y1="105"
          x2="56.6"
          y2="78.2"
          stroke={MUTED}
          strokeWidth="1"
          markerEnd="url(#fig-axis)"
        />
        <text x="53" y="75" fontSize="10" fill={MUTED} textAnchor="end">
          y
        </text>

        <g transform="translate(135.1 90.2) rotate(-26.57)">
          <rect
            x="-18"
            y="-10"
            width="36"
            height="20"
            rx="2"
            fill="#f7f7f4"
            stroke={INK}
            strokeWidth="1.2"
          />
        </g>

        {/* силы из центра: mg 80, N = mg cos α 71, Fтр 34 */}
        <line
          x1="135.1"
          y1="90.2"
          x2="135.1"
          y2="170.2"
          stroke={INK}
          strokeWidth="1.4"
          markerEnd="url(#fig-ink)"
        />
        <line
          x1="149"
          y1="169"
          x2="158"
          y2="169"
          stroke={INK}
          strokeWidth="0.9"
          markerEnd="url(#vec-ink)"
        />
        <text x="141" y="180" fontSize="11" fill={INK}>
          mg
        </text>

        <line
          x1="135.1"
          y1="90.2"
          x2="103.4"
          y2="26.7"
          stroke={GREEN}
          strokeWidth="1.6"
          markerEnd="url(#fig-green)"
        />
        <line
          x1="91"
          y1="12"
          x2="100"
          y2="12"
          stroke={GREEN}
          strokeWidth="0.9"
          markerEnd="url(#vec-green)"
        />
        <text x="99" y="23" fontSize="11" fill={GREEN} textAnchor="end">
          N
        </text>

        <line
          x1="135.1"
          y1="90.2"
          x2="165.5"
          y2="75.0"
          stroke={RED}
          strokeWidth="1.6"
          markerEnd="url(#fig-red)"
        />
        <line
          x1="168"
          y1="60"
          x2="177"
          y2="60"
          stroke={RED}
          strokeWidth="0.9"
          markerEnd="url(#vec-red)"
        />
        <text x="169" y="71" fontSize="11" fill={RED}>
          F<tspan fontSize="8" dy="3">тр</tspan>
        </text>

        {/* ускорение рядом с бруском, не касаясь его */}
        <line
          x1="108"
          y1="100"
          x2="84.1"
          y2="111.8"
          stroke={BLUE}
          strokeWidth="1.6"
          markerEnd="url(#fig-blue)"
        />
        <line
          x1="71"
          y1="113"
          x2="79"
          y2="113"
          stroke={BLUE}
          strokeWidth="0.9"
          markerEnd="url(#vec-blue)"
        />
        <text x="78" y="124" fontSize="11" fill={BLUE} textAnchor="end">
          a
        </text>
      </svg>
    </div>
  );
}
