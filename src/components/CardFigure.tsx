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
          d="M44 160 L254 160 L254 55 Z"
          fill="#eef0ec"
          stroke={INK}
          strokeWidth="1.2"
        />
        <line
          x1="12"
          y1="160"
          x2="292"
          y2="160"
          stroke="#b6bcb5"
          strokeWidth="1"
        />

        <path
          d="M78 160 A34 34 0 0 0 74.4 144.8"
          fill="none"
          stroke={MUTED}
          strokeWidth="0.9"
        />
        <text x="82" y="155" fontSize="12" fill={MUTED}>
          α
        </text>

        {/* оси: x вниз по склону, y от поверхности */}
        <line
          x1="96"
          y1="84"
          x2="65.6"
          y2="99.2"
          stroke={MUTED}
          strokeWidth="1"
          markerEnd="url(#fig-axis)"
        />
        <text x="61" y="105" fontSize="10" fill={MUTED} textAnchor="end">
          x
        </text>

        <line
          x1="96"
          y1="84"
          x2="81.7"
          y2="55.4"
          stroke={MUTED}
          strokeWidth="1"
          markerEnd="url(#fig-axis)"
        />
        <text x="78" y="52" fontSize="10" fill={MUTED} textAnchor="end">
          y
        </text>

        <g transform="translate(144.1 97.7) rotate(-26.57)">
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

        {/* силы из центра бруска: mg 52, N = mg cos α 46, Fтр 32 */}
        <line
          x1="144.1"
          y1="97.7"
          x2="144.1"
          y2="149.7"
          stroke={INK}
          strokeWidth="1.4"
          markerEnd="url(#fig-ink)"
        />
        <line
          x1="158"
          y1="131"
          x2="167"
          y2="131"
          stroke={INK}
          strokeWidth="0.9"
          markerEnd="url(#vec-ink)"
        />
        <text x="150" y="142" fontSize="11" fill={INK}>
          mg
        </text>

        <line
          x1="144.1"
          y1="97.7"
          x2="123.5"
          y2="56.6"
          stroke={GREEN}
          strokeWidth="1.6"
          markerEnd="url(#fig-green)"
        />
        <line
          x1="111"
          y1="42"
          x2="120"
          y2="42"
          stroke={GREEN}
          strokeWidth="0.9"
          markerEnd="url(#vec-green)"
        />
        <text x="119" y="53" fontSize="11" fill={GREEN} textAnchor="end">
          N
        </text>

        <line
          x1="144.1"
          y1="97.7"
          x2="172.7"
          y2="83.4"
          stroke={RED}
          strokeWidth="1.6"
          markerEnd="url(#fig-red)"
        />
        <line
          x1="175"
          y1="68"
          x2="184"
          y2="68"
          stroke={RED}
          strokeWidth="0.9"
          markerEnd="url(#vec-red)"
        />
        <text x="176" y="79" fontSize="11" fill={RED}>
          F<tspan fontSize="8" dy="3">тр</tspan>
        </text>

        {/* ускорение рядом с бруском, не касаясь его */}
        <line
          x1="118"
          y1="100"
          x2="96.5"
          y2="110.7"
          stroke={BLUE}
          strokeWidth="1.6"
          markerEnd="url(#fig-blue)"
        />
        <line
          x1="77"
          y1="122"
          x2="85"
          y2="122"
          stroke={BLUE}
          strokeWidth="0.9"
          markerEnd="url(#vec-blue)"
        />
        <text x="84" y="133" fontSize="11" fill={BLUE} textAnchor="end">
          a
        </text>
      </svg>
    </div>
  );
}
