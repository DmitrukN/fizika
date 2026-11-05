import type { SectionId } from './sections';

export interface Card {
  id: string;
  section: SectionId;
  title: string;
  formula: string;
  note?: string;
}

export const CARDS: Card[] = [
  {
    id: 'amount',
    section: 'model',
    title: 'Количество вещества',
    formula: String.raw`\nu=\dfrac{N}{N_A}=\dfrac{m}{M}`,
    note: 'Связывает число частиц, массу и молярную массу.',
  },
  {
    id: 'molecules',
    section: 'model',
    title: 'Число молекул',
    formula: String.raw`N=\nu N_A=\dfrac{m}{M}N_A`,
    note: 'Через количество вещества или через массу.',
  },
  {
    id: 'molecule-mass',
    section: 'model',
    title: 'Масса одной молекулы',
    formula: String.raw`m_0=\dfrac{m}{N}=\dfrac{M}{N_A}`,
  },
  {
    id: 'concentration',
    section: 'model',
    title: 'Концентрация молекул',
    formula: String.raw`n=\dfrac{N}{V}=\dfrac{\nu N_A}{V}`,
  },
  {
    id: 'density',
    section: 'model',
    title: 'Плотность газа',
    formula: String.raw`\rho=\dfrac{m}{V}=m_0 n`,
    note: 'Если дана плотность, а нужна концентрация, идти через массу молекулы.',
  },
  {
    id: 'mkt-basic',
    section: 'mkt',
    title: 'Основное уравнение МКТ',
    formula: String.raw`p=\dfrac{1}{3}n m_0\langle v^2\rangle`,
    note: 'Давление — результат ударов молекул о стенку.',
  },
  {
    id: 'mkt-energy',
    section: 'mkt',
    title: 'Давление через среднюю энергию',
    formula: String.raw`p=\dfrac{2}{3}n\bar{E}_{\text{к}}`,
  },
  {
    id: 'molecule-energy',
    section: 'mkt',
    title: 'Кинетическая энергия молекулы',
    formula: String.raw`\bar{E}_{\text{к}}=\dfrac{m_0\langle v^2\rangle}{2}`,
  },
  {
    id: 'vrms-definition',
    section: 'mkt',
    title: 'Средняя квадратичная скорость',
    formula: String.raw`v_{\text{кв}}=\sqrt{\langle v^2\rangle}`,
    note: '⟨v²⟩ и v_кв — разные величины: первая стоит в уравнении давления, вторая отвечает на вопрос о скорости молекулы.',
  },
  {
    id: 'vrms-temperature',
    section: 'mkt',
    title: 'Скорость через температуру',
    formula: String.raw`v_{\text{кв}}=\sqrt{\dfrac{3kT}{m_0}}`,
  },
  {
    id: 'vrms-molar',
    section: 'mkt',
    title: 'Скорость через молярную массу',
    formula: String.raw`v_{\text{кв}}=\sqrt{\dfrac{3RT}{M}}`,
  },
  {
    id: 'kelvin',
    section: 'temperature',
    title: 'Перевод температуры в кельвины',
    formula: String.raw`T=t+273`,
    note: 'В задачах температура всегда переводится в кельвины.',
  },
  {
    id: 'pressure-temperature',
    section: 'temperature',
    title: 'Давление через концентрацию и температуру',
    formula: String.raw`p=nkT`,
  },
  {
    id: 'energy-temperature',
    section: 'temperature',
    title: 'Энергия молекулы и температура',
    formula: String.raw`\bar{E}_{\text{к}}=\dfrac{3}{2}kT`,
    note: 'Температура задаёт среднюю энергию, а не скорость отдельной молекулы.',
  },
  {
    id: 'boltzmann',
    section: 'temperature',
    title: 'Постоянная Больцмана',
    formula: String.raw`k=\dfrac{R}{N_A}`,
  },
  {
    id: 'clapeyron-mendeleev',
    section: 'state',
    title: 'Уравнение Клапейрона—Менделеева',
    formula: String.raw`pV=\dfrac{m}{M}RT=\nu RT`,
    note: 'Работает, только если масса газа не меняется.',
  },
  {
    id: 'state-density',
    section: 'state',
    title: 'Давление через плотность',
    formula: String.raw`p=\dfrac{\rho RT}{M}`,
  },
  {
    id: 'clapeyron',
    section: 'state',
    title: 'Уравнение Клапейрона',
    formula: String.raw`\dfrac{p_1V_1}{T_1}=\dfrac{p_2V_2}{T_2}`,
    note: 'Для двух состояний одного газа при неизменной массе.',
  },
  {
    id: 'dalton',
    section: 'state',
    title: 'Закон Дальтона',
    formula: String.raw`p_{\text{см}}=p_1+p_2+\dots`,
    note: 'Для смеси уравнение состояния пишут для каждого газа отдельно, а давления складывают.',
  },
  {
    id: 'boyle',
    section: 'isoprocess',
    title: 'Закон Бойля—Мариотта',
    formula: String.raw`pV=\text{const}`,
    note: 'T = const, масса не меняется. На графике p(V) — гипербола.',
  },
  {
    id: 'gay-lussac',
    section: 'isoprocess',
    title: 'Закон Гей-Люссака',
    formula: String.raw`\dfrac{V}{T}=\text{const}`,
    note: 'p = const, масса не меняется.',
  },
  {
    id: 'charles',
    section: 'isoprocess',
    title: 'Закон Шарля',
    formula: String.raw`\dfrac{p}{T}=\text{const}`,
    note: 'V = const, масса не меняется.',
  },
  {
    id: 'internal-energy',
    section: 'thermo',
    title: 'Внутренняя энергия идеального газа',
    formula: String.raw`U=\dfrac{3}{2}\dfrac{m}{M}RT=\dfrac{3}{2}pV`,
    note: 'Для одноатомного идеального газа.',
  },
  {
    id: 'internal-energy-change',
    section: 'thermo',
    title: 'Изменение внутренней энергии',
    formula: String.raw`\Delta U=\dfrac{3}{2}\nu R\Delta T`,
  },
  {
    id: 'work',
    section: 'thermo',
    title: 'Работа газа при постоянном давлении',
    formula: String.raw`A=p\Delta V=p(V_2-V_1)`,
  },
  {
    id: 'heating',
    section: 'thermo',
    title: 'Нагревание и охлаждение',
    formula: String.raw`Q=cm\Delta T=cm(T_2-T_1)`,
  },
  {
    id: 'melting',
    section: 'thermo',
    title: 'Плавление и кристаллизация',
    formula: String.raw`Q=\lambda m`,
  },
  {
    id: 'vaporization',
    section: 'thermo',
    title: 'Парообразование и конденсация',
    formula: String.raw`Q=Lm`,
  },
  {
    id: 'combustion',
    section: 'thermo',
    title: 'Сгорание топлива',
    formula: String.raw`Q=qm`,
  },
  {
    id: 'first-law',
    section: 'thermo',
    title: 'Первый закон термодинамики',
    formula: String.raw`Q=\Delta U+A=\Delta U+p\Delta V`,
    note: 'Тело получает тепло Q > 0, газ расширяется A > 0. При изохорном процессе A = 0, при изотермическом ΔU = 0.',
  },
  {
    id: 'efficiency',
    section: 'thermo',
    title: 'КПД теплового двигателя',
    formula: String.raw`\eta=\dfrac{A_{\text{п}}}{Q_1}=\dfrac{Q_1-Q_2}{Q_1}`,
    note: 'КПД всегда меньше единицы: часть теплоты отдаётся холодильнику.',
  },
  {
    id: 'cycle-balance',
    section: 'thermo',
    title: 'Баланс энергии за цикл',
    formula: String.raw`Q_1=Q_2+A_{\text{п}}`,
  },
  {
    id: 'humidity-pressure',
    section: 'vapor',
    title: 'Относительная влажность через давление',
    formula: String.raw`\varphi=\dfrac{p_{\text{п}}}{p_{\text{н}}}\cdot100\%`,
  },
  {
    id: 'humidity-density',
    section: 'vapor',
    title: 'Относительная влажность через плотность',
    formula: String.raw`\varphi=\dfrac{\rho_{\text{п}}}{\rho_{\text{н}}}\cdot100\%`,
    note: 'Давление насыщенного пара зависит только от температуры; сжатие не повышает влажность.',
  },
];
