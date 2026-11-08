export type SectionId = 'molecular';

export interface Notation {
  symbol: string;
  text: string;
}

export type CardKind = 'basis' | 'definition' | 'consequence';

export interface ExtraLine {
  label: string;
  latex: string;
}

export interface Derivation {
  from: string[];
  steps: string[];
}

export interface Card {
  id: string;
  title: string;
  formula: string;
  notation: Notation[];
  kind: CardKind;
  extra?: ExtraLine[];
  derivation?: Derivation;
}

export interface Section {
  id: SectionId;
  title: string;
  cards: Card[];
}

function n(symbol: string, text: string): Notation {
  return { symbol, text };
}

const SYM = {
  nu: n(String.raw`\nu`, 'количество вещества, моль'),
  N: n('N', 'число молекул'),
  NA: n('N_A', 'постоянная Авогадро, 6,02·10²³ моль⁻¹'),
  m: n('m', 'масса газа, кг'),
  M: n('M', 'молярная масса, кг/моль'),
  m0: n(String.raw`m_0`, 'масса одной молекулы, кг'),
  V: n('V', 'объём, м³'),
  n: n('n', 'концентрация молекул, м⁻³'),
  rho: n(String.raw`\rho`, 'плотность, кг/м³'),
  p: n('p', 'давление, Па'),
  v2: n(
    String.raw`\langle v^2\rangle`,
    'средний квадрат скорости, м²/с²',
  ),
  Ek: n(
    String.raw`\langle E_{\text{к}}\rangle`,
    'средняя кинетическая энергия молекулы, Дж',
  ),
  vkv: n(String.raw`v_{\text{кв}}`, 'средняя квадратичная скорость, м/с'),
  k: n('k', 'постоянная Больцмана, 1,38·10⁻²³ Дж/К'),
  T: n('T', 'абсолютная температура, К'),
  t: n('t', 'температура по Цельсию, °C'),
  R: n('R', 'универсальная газовая постоянная, 8,31 Дж/(моль·К)'),
  U: n('U', 'внутренняя энергия, Дж'),
  dU: n(String.raw`\Delta U`, 'изменение внутренней энергии, Дж'),
  A: n('A', 'работа газа, Дж'),
  Q: n('Q', 'количество теплоты, Дж'),
  c: n('c', 'удельная теплоёмкость, Дж/(кг·К)'),
  lambda: n(String.raw`\lambda`, 'удельная теплота плавления, Дж/кг'),
  L: n('L', 'удельная теплота парообразования, Дж/кг'),
  q: n('q', 'удельная теплота сгорания, Дж/кг'),
  eta: n(String.raw`\eta`, 'КПД'),
  phi: n(String.raw`\varphi`, 'относительная влажность, %'),
  dT: n(String.raw`\Delta T`, 'изменение температуры, К'),
  dV: n(String.raw`\Delta V`, 'изменение объёма, м³'),
  Acyc: n(String.raw`A_{\text{ц}}`, 'работа цикла, Дж'),
  Q1: n(String.raw`Q_1`, 'теплота, полученная от нагревателя, Дж'),
  Q2: n(String.raw`Q_2`, 'теплота, отданная холодильнику, Дж'),
  pSm: n(String.raw`p_{\text{см}}`, 'давление смеси газов, Па'),
  pP: n(String.raw`p_{\text{п}}`, 'парциальное давление пара, Па'),
  pH: n(String.raw`p_{\text{н}}`, 'давление насыщенного пара, Па'),
  rhoP: n(String.raw`\rho_{\text{п}}`, 'плотность пара, кг/м³'),
  rhoH: n(
    String.raw`\rho_{\text{н}}`,
    'плотность насыщенного пара, кг/м³',
  ),
};

const mBody = n('m', 'масса тела, кг');
const mSubstance = n('m', 'масса вещества, кг');
const mFuel = n('m', 'масса топлива, кг');

export const SECTIONS: Section[] = [
  {
    id: 'molecular',
    title: 'Молекулярная физика',
    cards: [
      {
        id: 'amount',
        title: 'Количество вещества (через число частиц)',
        formula: String.raw`\nu=\dfrac{N}{N_A}`,
        notation: [SYM.nu, SYM.N, SYM.NA],
        kind: 'definition',
      },
      {
        id: 'molar-mass',
        title: 'Молярная масса (через массу молекулы)',
        formula: String.raw`M=m_0 N_A`,
        notation: [SYM.M, SYM.m0, SYM.NA],
        kind: 'definition',
      },
      {
        id: 'gas-mass',
        title: 'Масса газа (через массу молекулы)',
        formula: String.raw`m=m_0 N`,
        notation: [SYM.m, SYM.m0, SYM.N],
        kind: 'definition',
      },
      {
        id: 'concentration',
        title: 'Концентрация молекул газа',
        formula: String.raw`n=\dfrac{N}{V}`,
        notation: [SYM.n, SYM.N, SYM.V],
        kind: 'definition',
      },
      {
        id: 'molar-amount',
        title: 'Количество вещества (через массу тела)',
        formula: String.raw`\nu=\dfrac{m}{M}`,
        notation: [SYM.nu, SYM.m, SYM.M],
        kind: 'consequence',
        derivation: {
          from: ['amount', 'molar-mass', 'gas-mass'],
          steps: [
            String.raw`M=m_0N_A,\quad m=m_0N`,
            String.raw`\Rightarrow\quad \dfrac{m}{M}=\dfrac{N}{N_A}=\nu`,
          ],
        },
      },
      {
        id: 'molecule-mass',
        title: 'Масса одной молекулы',
        formula: String.raw`m_0=\dfrac{m}{N}=\dfrac{M}{N_A}`,
        notation: [SYM.m0, SYM.m, SYM.N, SYM.M, SYM.NA],
        kind: 'consequence',
        derivation: {
          from: ['molar-mass', 'gas-mass'],
          steps: [
            String.raw`m=m_0N\ \Rightarrow\ m_0=\dfrac{m}{N}`,
            String.raw`M=m_0N_A\ \Rightarrow\ m_0=\dfrac{M}{N_A}`,
          ],
        },
      },
      {
        id: 'molecules',
        title: 'Число молекул',
        formula: String.raw`N=\nu N_A=\dfrac{m}{M}N_A`,
        notation: [SYM.N, SYM.nu, SYM.NA, SYM.m, SYM.M],
        kind: 'consequence',
        derivation: {
          from: ['amount', 'molar-amount'],
          steps: [
            String.raw`\nu=\dfrac{N}{N_A}=\dfrac{m}{M}`,
            String.raw`\Rightarrow\ N=\nu N_A=\dfrac{m}{M}N_A`,
          ],
        },
      },
      {
        id: 'concentration-nu',
        title: 'Концентрация молекул (через количество вещества)',
        formula: String.raw`n=\dfrac{N}{V}=\dfrac{\nu N_A}{V}`,
        notation: [SYM.n, SYM.N, SYM.V, SYM.nu, SYM.NA],
        kind: 'consequence',
        derivation: {
          from: ['concentration', 'amount'],
          steps: [
            String.raw`N=\nu N_A,\quad n=\dfrac{N}{V}`,
            String.raw`\Rightarrow\ n=\dfrac{\nu N_A}{V}`,
          ],
        },
      },
      {
        id: 'density',
        title: 'Плотность вещества',
        formula: String.raw`\rho=\dfrac{m}{V}`,
        notation: [SYM.rho, SYM.m, SYM.V],
        kind: 'definition',
      },
      {
        id: 'density-number',
        title: 'Плотность газа (через концентрацию молекул)',
        formula: String.raw`\rho=m_0 n`,
        notation: [SYM.rho, SYM.m0, SYM.n],
        kind: 'consequence',
        derivation: {
          from: ['gas-mass', 'concentration'],
          steps: [
            String.raw`m=m_0N,\quad n=\dfrac{N}{V}`,
            String.raw`\Rightarrow\ \rho=\dfrac{m}{V}=m_0n`,
          ],
        },
      },
      {
        id: 'mkt-basic',
        title: 'Основное уравнение МКТ',
        formula: String.raw`p=\dfrac{1}{3}n m_0\langle v^2\rangle`,
        notation: [SYM.p, SYM.n, SYM.m0, SYM.v2],
        kind: 'basis',
      },
      {
        id: 'molecule-energy',
        title:
          'Средняя кинетическая энергия поступательного движения молекулы',
        formula: String.raw`\langle E_{\text{к}}\rangle=\dfrac{m_0\langle v^2\rangle}{2}`,
        notation: [SYM.Ek, SYM.m0, SYM.v2],
        kind: 'definition',
      },
      {
        id: 'mkt-energy',
        title:
          'Давление газа (через среднюю кинетическую энергию молекулы)',
        formula: String.raw`p=\dfrac{2}{3}n \langle E_{\text{к}}\rangle`,
        notation: [SYM.p, SYM.n, SYM.Ek],
        kind: 'consequence',
        derivation: {
          from: ['mkt-basic', 'molecule-energy'],
          steps: [
            String.raw`p=\dfrac{1}{3}nm_0\langle v^2\rangle,\quad m_0\langle v^2\rangle=2\langle E_{\text{к}}\rangle`,
            String.raw`\Rightarrow\ p=\dfrac{2}{3}n\langle E_{\text{к}}\rangle`,
          ],
        },
      },
      {
        id: 'kelvin',
        title: 'Перевод температуры из шкалы Цельсия в Кельвина',
        formula: String.raw`T=t+273`,
        notation: [SYM.T, SYM.t],
        kind: 'definition',
      },
      {
        id: 'pressure-temperature',
        title: 'Давление газа (через концентрацию и температуру)',
        formula: String.raw`p=nkT`,
        notation: [SYM.p, SYM.n, SYM.k, SYM.T],
        kind: 'basis',
      },
      {
        id: 'energy-temperature',
        title: 'Средняя кинетическая энергия молекулы (через температуру)',
        formula: String.raw`\langle E_{\text{к}}\rangle=\dfrac{3}{2}kT`,
        notation: [SYM.Ek, SYM.k, SYM.T],
        kind: 'basis',
      },
      {
        id: 'gas-constant',
        title: 'Универсальная газовая постоянная',
        formula: String.raw`R=kN_A=8{,}31\ \text{Дж}/(\text{моль}\cdot\text{К})`,
        notation: [SYM.R, SYM.k, SYM.NA],
        kind: 'definition',
      },
      {
        id: 'vrms-definition',
        title: 'Средняя квадратичная скорость',
        formula: String.raw`v_{\text{кв}}=\sqrt{\langle v^2\rangle}`,
        notation: [SYM.vkv, SYM.v2],
        kind: 'definition',
      },
      {
        id: 'vrms-temperature',
        title: 'Средняя квадратичная скорость (через температуру)',
        formula: String.raw`v_{\text{кв}}=\sqrt{\dfrac{3kT}{m_0}}`,
        notation: [SYM.vkv, SYM.k, SYM.T, SYM.m0],
        kind: 'consequence',
        derivation: {
          from: ['molecule-energy', 'energy-temperature', 'vrms-definition'],
          steps: [
            String.raw`\langle E_{\text{к}}\rangle=\dfrac{m_0\langle v^2\rangle}{2},\quad \langle E_{\text{к}}\rangle=\dfrac{3}{2}kT`,
            String.raw`\Rightarrow\ \langle v^2\rangle=\dfrac{3kT}{m_0}`,
            String.raw`v_{\text{кв}}=\sqrt{\langle v^2\rangle}=\sqrt{\dfrac{3kT}{m_0}}`,
          ],
        },
      },
      {
        id: 'vrms-molar',
        title: 'Средняя квадратичная скорость (через молярную массу)',
        formula: String.raw`v_{\text{кв}}=\sqrt{\dfrac{3RT}{M}}`,
        notation: [SYM.vkv, SYM.R, SYM.T, SYM.M],
        kind: 'consequence',
        derivation: {
          from: ['vrms-temperature', 'gas-constant', 'molecule-mass'],
          steps: [
            String.raw`k=\dfrac{R}{N_A},\quad m_0=\dfrac{M}{N_A}`,
            String.raw`\Rightarrow\ \dfrac{3kT}{m_0}=\dfrac{3RT}{M}`,
            String.raw`v_{\text{кв}}=\sqrt{\dfrac{3RT}{M}}`,
          ],
        },
      },
      {
        id: 'clapeyron-const',
        title: 'Уравнение Клапейрона',
        formula: String.raw`\dfrac{pV}{T}=\text{const}`,
        notation: [SYM.p, SYM.V, SYM.T],
        kind: 'basis',
      },
      {
        id: 'clapeyron-mendeleev',
        title: 'Уравнение Клапейрона—Менделеева',
        formula: String.raw`pV=\dfrac{m}{M}RT=\nu RT`,
        notation: [SYM.p, SYM.V, SYM.m, SYM.M, SYM.R, SYM.T, SYM.nu],
        kind: 'basis',
      },
      {
        id: 'clapeyron',
        title: 'Уравнение Клапейрона для двух состояний',
        formula: String.raw`\dfrac{p_1V_1}{T_1}=\dfrac{p_2V_2}{T_2}`,
        notation: [
          n(String.raw`p_1`, 'давление в первом состоянии, Па'),
          n(String.raw`V_1`, 'объём в первом состоянии, м³'),
          n(String.raw`T_1`, 'температура в первом состоянии, К'),
          n(String.raw`p_2`, 'давление во втором состоянии, Па'),
          n(String.raw`V_2`, 'объём во втором состоянии, м³'),
          n(String.raw`T_2`, 'температура во втором состоянии, К'),
        ],
        kind: 'consequence',
        derivation: {
          from: ['clapeyron-const'],
          steps: [
            String.raw`\dfrac{pV}{T}=\text{const}`,
            String.raw`\Rightarrow\ \dfrac{p_1V_1}{T_1}=\dfrac{p_2V_2}{T_2}`,
          ],
        },
      },
      {
        id: 'dalton',
        title: 'Закон Дальтона',
        formula: String.raw`p_{\text{см}}=p_1+p_2+\dots`,
        notation: [
          SYM.pSm,
          n(String.raw`p_1`, 'парциальное давление первого газа, Па'),
          n(String.raw`p_2`, 'парциальное давление второго газа, Па'),
        ],
        kind: 'basis',
      },
      {
        id: 'state-density',
        title: 'Давление (через плотность)',
        formula: String.raw`p=\dfrac{\rho RT}{M}`,
        notation: [SYM.p, SYM.rho, SYM.R, SYM.T, SYM.M],
        kind: 'consequence',
        derivation: {
          from: ['clapeyron-mendeleev', 'density'],
          steps: [
            String.raw`pV=\dfrac{m}{M}RT\ \Rightarrow\ p=\dfrac{m}{V}\cdot\dfrac{RT}{M}`,
            String.raw`\rho=\dfrac{m}{V}\ \Rightarrow\ p=\dfrac{\rho RT}{M}`,
          ],
        },
      },
      {
        id: 'boyle',
        title: 'Закон Бойля—Мариотта (изотермический)',
        formula: String.raw`pV=\text{const}`,
        notation: [SYM.p, SYM.V],
        kind: 'consequence',
        derivation: {
          from: ['clapeyron-const'],
          steps: [
            String.raw`\dfrac{pV}{T}=\text{const},\quad T=\text{const}`,
            String.raw`\Rightarrow\ pV=\text{const}`,
          ],
        },
      },
      {
        id: 'gay-lussac',
        title: 'Закон Гей-Люссака (изобарный)',
        formula: String.raw`\dfrac{V}{T}=\text{const}`,
        notation: [SYM.V, SYM.T],
        kind: 'consequence',
        derivation: {
          from: ['clapeyron-const'],
          steps: [
            String.raw`\dfrac{pV}{T}=\text{const},\quad p=\text{const}`,
            String.raw`\Rightarrow\ \dfrac{V}{T}=\text{const}`,
          ],
        },
      },
      {
        id: 'charles',
        title: 'Закон Шарля (изохорный)',
        formula: String.raw`\dfrac{p}{T}=\text{const}`,
        notation: [SYM.p, SYM.T],
        kind: 'consequence',
        derivation: {
          from: ['clapeyron-const'],
          steps: [
            String.raw`\dfrac{pV}{T}=\text{const},\quad V=\text{const}`,
            String.raw`\Rightarrow\ \dfrac{p}{T}=\text{const}`,
          ],
        },
      },
      {
        id: 'internal-energy',
        title: 'Внутренняя энергия одноатомного идеального газа',
        formula: String.raw`U=\dfrac{3}{2}\dfrac{m}{M}RT=\dfrac{3}{2}pV`,
        notation: [SYM.U, SYM.m, SYM.M, SYM.R, SYM.T, SYM.p, SYM.V],
        kind: 'basis',
        extra: [
          {
            label: 'Подсказка',
            latex: String.raw`U=N\langle E_{\text{к}}\rangle`,
          },
        ],
      },
      {
        id: 'internal-energy-change',
        title: 'Изменение внутренней энергии идеального газа',
        formula: String.raw`\Delta U=\dfrac{3}{2}\dfrac{m}{M} R\Delta T`,
        notation: [SYM.dU, SYM.m, SYM.M, SYM.R, SYM.dT],
        kind: 'consequence',
        derivation: {
          from: ['internal-energy'],
          steps: [
            String.raw`U=\dfrac{3}{2}\dfrac{m}{M}RT`,
            String.raw`\Rightarrow\ \Delta U=\dfrac{3}{2}\dfrac{m}{M}R\Delta T`,
          ],
        },
      },
      {
        id: 'first-law',
        title: 'Первый закон термодинамики',
        formula: String.raw`Q=\Delta U+A=\Delta U+p\Delta V`,
        notation: [SYM.Q, SYM.dU, SYM.A, SYM.p, SYM.dV],
        kind: 'basis',
      },
      {
        id: 'work',
        title: 'Работа газа при постоянном давлении',
        formula: String.raw`A=p\Delta V=p(V_2-V_1)`,
        notation: [
          SYM.A,
          SYM.p,
          SYM.dV,
          n(String.raw`V_1`, 'начальный объём, м³'),
          n(String.raw`V_2`, 'конечный объём, м³'),
        ],
        kind: 'definition',
      },
      {
        id: 'heating',
        title: 'Количество теплоты (нагревание и охлаждение)',
        formula: String.raw`Q=cm\Delta T=cm(T_2-T_1)`,
        notation: [
          SYM.Q,
          SYM.c,
          mBody,
          SYM.dT,
          n(String.raw`T_1`, 'начальная температура, К'),
          n(String.raw`T_2`, 'конечная температура, К'),
        ],
        kind: 'definition',
      },
      {
        id: 'melting',
        title: 'Количество теплоты (плавление и кристаллизация)',
        formula: String.raw`Q=\lambda m`,
        notation: [SYM.Q, SYM.lambda, mSubstance],
        kind: 'definition',
        extra: [
          {
            label: 'Кристаллизация',
            latex: String.raw`Q=-\lambda m`,
          },
        ],
      },
      {
        id: 'vaporization',
        title: 'Количество теплоты (парообразование и конденсация)',
        formula: String.raw`Q=Lm`,
        notation: [SYM.Q, SYM.L, mSubstance],
        kind: 'definition',
        extra: [
          {
            label: 'Конденсация',
            latex: String.raw`Q=-Lm`,
          },
        ],
      },
      {
        id: 'combustion',
        title: 'Количество теплоты (сгорание топлива)',
        formula: String.raw`Q=qm`,
        notation: [SYM.Q, SYM.q, mFuel],
        kind: 'definition',
      },
      {
        id: 'efficiency',
        title: 'КПД теплового двигателя',
        formula: String.raw`\eta=\dfrac{A_{\text{ц}}}{Q_1}`,
        notation: [SYM.eta, SYM.Acyc, SYM.Q1],
        kind: 'definition',
      },
      {
        id: 'cycle-work',
        title: 'Работа, совершённая двигателем',
        formula: String.raw`A_{\text{ц}}=Q_1-|Q_2|`,
        notation: [SYM.Acyc, SYM.Q1, SYM.Q2],
        kind: 'consequence',
        derivation: {
          from: ['first-law'],
          steps: [
            String.raw`Q=\Delta U+A,\quad \text{цикл: } \Delta U=0`,
            String.raw`\Rightarrow\ Q=A`,
            String.raw`Q=Q_1-|Q_2|,\quad A=A_{\text{ц}}`,
            String.raw`\Rightarrow\ A_{\text{ц}}=Q_1-|Q_2|`,
          ],
        },
      },
      {
        id: 'efficiency-heats',
        title: 'КПД теплового двигателя (через количество теплоты)',
        formula: String.raw`\eta=\dfrac{Q_1-|Q_2|}{Q_1}`,
        notation: [SYM.eta, SYM.Q1, SYM.Q2],
        kind: 'consequence',
        derivation: {
          from: ['efficiency', 'cycle-work'],
          steps: [
            String.raw`\eta=\dfrac{A_{\text{ц}}}{Q_1},\quad A_{\text{ц}}=Q_1-|Q_2|`,
            String.raw`\Rightarrow\ \eta=\dfrac{Q_1-|Q_2|}{Q_1}`,
          ],
        },
      },
      {
        id: 'humidity-pressure',
        title: 'Относительная влажность через давление',
        formula: String.raw`\varphi=\dfrac{p_{\text{п}}}{p_{\text{н}}}\cdot100\%`,
        notation: [SYM.phi, SYM.pP, SYM.pH],
        kind: 'definition',
      },
      {
        id: 'humidity-density',
        title: 'Относительная влажность через плотность',
        formula: String.raw`\varphi=\dfrac{\rho_{\text{п}}}{\rho_{\text{н}}}\cdot100\%`,
        notation: [SYM.phi, SYM.rhoP, SYM.rhoH],
        kind: 'consequence',
        derivation: {
          from: ['humidity-pressure', 'state-density'],
          steps: [
            String.raw`\varphi=\dfrac{p_{\text{п}}}{p_{\text{н}}},\quad p=\dfrac{\rho RT}{M}\ \text{при одной } T`,
            String.raw`\Rightarrow\ \varphi=\dfrac{\rho_{\text{п}}}{\rho_{\text{н}}}`,
          ],
        },
      },
    ],
  },
];

export const ALL_CARDS: Card[] = SECTIONS.flatMap((section) => section.cards);

export function sectionById(id: SectionId): Section {
  const section = SECTIONS.find((item) => item.id === id);
  if (!section) throw new Error(`Неизвестный раздел: ${id}`);
  return section;
}

export function sectionTitle(id: SectionId): string {
  return sectionById(id).title;
}

export function cardById(id: string): Card {
  const card = ALL_CARDS.find((item) => item.id === id);
  if (!card) throw new Error(`Неизвестная карточка: ${id}`);
  return card;
}
