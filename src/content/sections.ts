export type SectionId = 'molecular';

export interface Notation {
  symbol: string;
  text: string;
}

export interface Card {
  id: string;
  title: string;
  formula: string;
  notation: Notation[];
  note?: string;
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
  NA: n(String.raw`N_A`, 'постоянная Авогадро, 6,02·10²³ моль⁻¹'),
  m: n('m', 'масса газа, кг'),
  M: n('M', 'молярная масса, кг/моль'),
  m0: n(String.raw`m_0`, 'масса одной молекулы, кг'),
  V: n('V', 'объём, м³'),
  n: n('n', 'концентрация молекул, м⁻³'),
  rho: n(String.raw`\rho`, 'плотность газа, кг/м³'),
  p: n('p', 'давление, Па'),
  v2: n(
    String.raw`\langle v^2\rangle`,
    'средний квадрат скорости, м²/с²',
  ),
  Ek: n(
    String.raw`\bar{E}_{\text{к}}`,
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
  Ap: n(String.raw`A_{\text{п}}`, 'полезная работа, Дж'),
  Q1: n(String.raw`Q_1`, 'теплота нагревателя, Дж'),
  Q2: n(String.raw`Q_2`, 'теплота холодильника, Дж'),
  pSm: n(String.raw`p_{\text{см}}`, 'давление смеси газов, Па'),
  pP: n(String.raw`p_{\text{п}}`, 'парциальное давление пара, Па'),
  pH: n(String.raw`p_{\text{н}}`, 'давление насыщенного пара, Па'),
  rhoP: n(String.raw`\rho_{\text{п}}`, 'плотность пара, кг/м³'),
  rhoH: n(
    String.raw`\rho_{\text{н}}`,
    'плотность насыщенного пара, кг/м³',
  ),
};

export const SECTIONS: Section[] = [
  {
    id: 'molecular',
    title: 'Молекулярная физика',
    cards: [
      {
        id: 'amount',
        title: 'Количество вещества',
        formula: String.raw`\nu=\dfrac{N}{N_A}=\dfrac{m}{M}`,
        notation: [SYM.nu, SYM.N, SYM.NA, SYM.m, SYM.M],
        note: 'Связывает число частиц, массу и молярную массу.',
      },
      {
        id: 'molecules',
        title: 'Число молекул',
        formula: String.raw`N=\nu N_A=\dfrac{m}{M}N_A`,
        notation: [SYM.N, SYM.nu, SYM.NA, SYM.m, SYM.M],
        note: 'Через количество вещества или через массу.',
      },
      {
        id: 'molecule-mass',
        title: 'Масса одной молекулы',
        formula: String.raw`m_0=\dfrac{m}{N}=\dfrac{M}{N_A}`,
        notation: [SYM.m0, SYM.m, SYM.N, SYM.M, SYM.NA],
      },
      {
        id: 'concentration',
        title: 'Концентрация молекул',
        formula: String.raw`n=\dfrac{N}{V}=\dfrac{\nu N_A}{V}`,
        notation: [SYM.n, SYM.N, SYM.V, SYM.nu, SYM.NA],
      },
      {
        id: 'density',
        title: 'Плотность газа',
        formula: String.raw`\rho=\dfrac{m}{V}=m_0 n`,
        notation: [SYM.rho, SYM.m, SYM.V, SYM.m0, SYM.n],
        note: 'Если дана плотность, а нужна концентрация, идти через массу молекулы.',
      },
      {
        id: 'mkt-basic',
        title: 'Основное уравнение МКТ',
        formula: String.raw`p=\dfrac{1}{3}n m_0\langle v^2\rangle`,
        notation: [SYM.p, SYM.n, SYM.m0, SYM.v2],
        note: 'Давление — результат ударов молекул о стенку.',
      },
      {
        id: 'mkt-energy',
        title: 'Давление через среднюю энергию',
        formula: String.raw`p=\dfrac{2}{3}n\bar{E}_{\text{к}}`,
        notation: [SYM.p, SYM.n, SYM.Ek],
      },
      {
        id: 'molecule-energy',
        title: 'Кинетическая энергия молекулы',
        formula: String.raw`\bar{E}_{\text{к}}=\dfrac{m_0\langle v^2\rangle}{2}`,
        notation: [SYM.Ek, SYM.m0, SYM.v2],
      },
      {
        id: 'vrms-definition',
        title: 'Средняя квадратичная скорость',
        formula: String.raw`v_{\text{кв}}=\sqrt{\langle v^2\rangle}`,
        notation: [SYM.vkv, SYM.v2],
        note: '⟨v²⟩ и v_кв — разные величины: первая стоит в уравнении давления, вторая отвечает на вопрос о скорости молекулы.',
      },
      {
        id: 'vrms-temperature',
        title: 'Скорость через температуру',
        formula: String.raw`v_{\text{кв}}=\sqrt{\dfrac{3kT}{m_0}}`,
        notation: [SYM.vkv, SYM.k, SYM.T, SYM.m0],
      },
      {
        id: 'vrms-molar',
        title: 'Скорость через молярную массу',
        formula: String.raw`v_{\text{кв}}=\sqrt{\dfrac{3RT}{M}}`,
        notation: [SYM.vkv, SYM.R, SYM.T, SYM.M],
      },
      {
        id: 'kelvin',
        title: 'Перевод температуры в кельвины',
        formula: String.raw`T=t+273`,
        notation: [SYM.T, SYM.t],
        note: 'В задачах температура всегда переводится в кельвины.',
      },
      {
        id: 'pressure-temperature',
        title: 'Давление через концентрацию и температуру',
        formula: String.raw`p=nkT`,
        notation: [SYM.p, SYM.n, SYM.k, SYM.T],
      },
      {
        id: 'energy-temperature',
        title: 'Энергия молекулы и температура',
        formula: String.raw`\bar{E}_{\text{к}}=\dfrac{3}{2}kT`,
        notation: [SYM.Ek, SYM.k, SYM.T],
        note: 'Температура задаёт среднюю энергию, а не скорость отдельной молекулы.',
      },
      {
        id: 'boltzmann',
        title: 'Постоянная Больцмана',
        formula: String.raw`k=\dfrac{R}{N_A}`,
        notation: [SYM.k, SYM.R, SYM.NA],
      },
      {
        id: 'clapeyron-mendeleev',
        title: 'Уравнение Клапейрона—Менделеева',
        formula: String.raw`pV=\dfrac{m}{M}RT=\nu RT`,
        notation: [SYM.p, SYM.V, SYM.m, SYM.M, SYM.R, SYM.T, SYM.nu],
        note: 'Работает, только если масса газа не меняется.',
      },
      {
        id: 'state-density',
        title: 'Давление через плотность',
        formula: String.raw`p=\dfrac{\rho RT}{M}`,
        notation: [SYM.p, SYM.rho, SYM.R, SYM.T, SYM.M],
      },
      {
        id: 'clapeyron',
        title: 'Уравнение Клапейрона',
        formula: String.raw`\dfrac{p_1V_1}{T_1}=\dfrac{p_2V_2}{T_2}`,
        notation: [
          n(String.raw`p_1`, 'давление в первом состоянии, Па'),
          n(String.raw`V_1`, 'объём в первом состоянии, м³'),
          n(String.raw`T_1`, 'температура в первом состоянии, К'),
          n(String.raw`p_2`, 'давление во втором состоянии, Па'),
          n(String.raw`V_2`, 'объём во втором состоянии, м³'),
          n(String.raw`T_2`, 'температура во втором состоянии, К'),
        ],
        note: 'Для двух состояний одного газа при неизменной массе.',
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
        note: 'Для смеси уравнение состояния пишут для каждого газа отдельно, а давления складывают.',
      },
      {
        id: 'boyle',
        title: 'Закон Бойля—Мариотта',
        formula: String.raw`pV=\text{const}`,
        notation: [SYM.p, SYM.V],
        note: 'T = const, масса не меняется. На графике p(V) — гипербола.',
      },
      {
        id: 'gay-lussac',
        title: 'Закон Гей-Люссака',
        formula: String.raw`\dfrac{V}{T}=\text{const}`,
        notation: [SYM.V, SYM.T],
        note: 'p = const, масса не меняется.',
      },
      {
        id: 'charles',
        title: 'Закон Шарля',
        formula: String.raw`\dfrac{p}{T}=\text{const}`,
        notation: [SYM.p, SYM.T],
        note: 'V = const, масса не меняется.',
      },
      {
        id: 'internal-energy',
        title: 'Внутренняя энергия идеального газа',
        formula: String.raw`U=\dfrac{3}{2}\dfrac{m}{M}RT=\dfrac{3}{2}pV`,
        notation: [SYM.U, SYM.m, SYM.M, SYM.R, SYM.T, SYM.p, SYM.V],
        note: 'Для одноатомного идеального газа.',
      },
      {
        id: 'internal-energy-change',
        title: 'Изменение внутренней энергии',
        formula: String.raw`\Delta U=\dfrac{3}{2}\nu R\Delta T`,
        notation: [SYM.dU, SYM.nu, SYM.R, SYM.dT],
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
      },
      {
        id: 'heating',
        title: 'Нагревание и охлаждение',
        formula: String.raw`Q=cm\Delta T=cm(T_2-T_1)`,
        notation: [
          SYM.Q,
          SYM.c,
          SYM.m,
          SYM.dT,
          n(String.raw`T_1`, 'начальная температура, К'),
          n(String.raw`T_2`, 'конечная температура, К'),
        ],
      },
      {
        id: 'melting',
        title: 'Плавление и кристаллизация',
        formula: String.raw`Q=\lambda m`,
        notation: [SYM.Q, SYM.lambda, SYM.m],
      },
      {
        id: 'vaporization',
        title: 'Парообразование и конденсация',
        formula: String.raw`Q=Lm`,
        notation: [SYM.Q, SYM.L, SYM.m],
      },
      {
        id: 'combustion',
        title: 'Сгорание топлива',
        formula: String.raw`Q=qm`,
        notation: [SYM.Q, SYM.q, SYM.m],
      },
      {
        id: 'first-law',
        title: 'Первый закон термодинамики',
        formula: String.raw`Q=\Delta U+A=\Delta U+p\Delta V`,
        notation: [SYM.Q, SYM.dU, SYM.A, SYM.p, SYM.dV],
        note: 'Тело получает тепло Q > 0, газ расширяется A > 0. При изохорном процессе A = 0, при изотермическом ΔU = 0.',
      },
      {
        id: 'efficiency',
        title: 'КПД теплового двигателя',
        formula: String.raw`\eta=\dfrac{A_{\text{п}}}{Q_1}=\dfrac{Q_1-Q_2}{Q_1}`,
        notation: [SYM.eta, SYM.Ap, SYM.Q1, SYM.Q2],
        note: 'КПД всегда меньше единицы: часть теплоты отдаётся холодильнику.',
      },
      {
        id: 'cycle-balance',
        title: 'Баланс энергии за цикл',
        formula: String.raw`Q_1=Q_2+A_{\text{п}}`,
        notation: [SYM.Q1, SYM.Q2, SYM.Ap],
      },
      {
        id: 'humidity-pressure',
        title: 'Относительная влажность через давление',
        formula: String.raw`\varphi=\dfrac{p_{\text{п}}}{p_{\text{н}}}\cdot100\%`,
        notation: [SYM.phi, SYM.pP, SYM.pH],
      },
      {
        id: 'humidity-density',
        title: 'Относительная влажность через плотность',
        formula: String.raw`\varphi=\dfrac{\rho_{\text{п}}}{\rho_{\text{н}}}\cdot100\%`,
        notation: [SYM.phi, SYM.rhoP, SYM.rhoH],
        note: 'Давление насыщенного пара зависит только от температуры; сжатие не повышает влажность.',
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
