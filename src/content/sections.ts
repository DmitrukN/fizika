export type SectionId = 'molecular' | 'kinematics';

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
  V: n('V', 'объем, м³'),
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
  c: n('c', 'удельная теплоемкость, Дж/(кг·К)'),
  lambda: n(String.raw`\lambda`, 'удельная теплота плавления, Дж/кг'),
  L: n('L', 'удельная теплота парообразования, Дж/кг'),
  q: n('q', 'удельная теплота сгорания, Дж/кг'),
  eta: n(String.raw`\eta`, 'КПД'),
  phi: n(String.raw`\varphi`, 'относительная влажность, %'),
  dT: n(String.raw`\Delta T`, 'изменение температуры, К'),
  dV: n(String.raw`\Delta V`, 'изменение объема, м³'),
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

const KI = {
  alpha: n(String.raw`\alpha`, 'угол между вектором и осью Ox'),

  v: n(String.raw`\vec v`, 'скорость, м/с'),
  vAvg: n(
    String.raw`\langle\vec v\rangle`,
    'средняя скорость перемещения, м/с',
  ),
  vPath: n(String.raw`\langle v\rangle`, 'средняя путевая скорость, м/с'),
  dr: n(String.raw`\Delta\vec r`, 'перемещение, м'),
  s: n('s', 'путь, м'),
  dt: n(String.raw`\Delta t`, 'промежуток времени, с'),

  a: n(String.raw`\vec a`, 'ускорение, м/с²'),
  dv: n(String.raw`\Delta\vec v`, 'изменение скорости, м/с'),

  drAbs: n(
    String.raw`\Delta\vec r_{\text{абс}}`,
    'перемещение в неподвижной системе отсчета, м',
  ),
  drRel: n(
    String.raw`\Delta\vec r_{\text{отн}}`,
    'перемещение в подвижной системе отсчета, м',
  ),
  drCar: n(
    String.raw`\Delta\vec r_{\text{пер}}`,
    'перемещение подвижной системы отсчета, м',
  ),

  vAbs: n(
    String.raw`\vec v_{\text{абс}}`,
    'скорость в неподвижной системе отсчета, м/с',
  ),
  vRel: n(
    String.raw`\vec v_{\text{отн}}`,
    'скорость в подвижной системе отсчета, м/с',
  ),
  vCar: n(
    String.raw`\vec v_{\text{пер}}`,
    'скорость подвижной системы отсчета, м/с',
  ),

  aAbs: n(
    String.raw`\vec a_{\text{абс}}`,
    'ускорение в неподвижной системе отсчета, м/с²',
  ),
  aRel: n(
    String.raw`\vec a_{\text{отн}}`,
    'ускорение в подвижной системе отсчета, м/с²',
  ),
  aCar: n(
    String.raw`\vec a_{\text{пер}}`,
    'ускорение подвижной системы отсчета, м/с²',
  ),

  v0: n('v_0', 'начальная скорость, м/с'),
  v0vec: n(String.raw`\vec v_0`, 'начальная скорость, м/с'),
  r: n(String.raw`\vec r`, 'радиус-вектор, м'),
  r0: n(String.raw`\vec r_0`, 'начальный радиус-вектор, м'),
  t: n('t', 'время, с'),

  ax: n('a_x', 'проекция ускорения на ось Ox, м/с²'),
  ay: n('a_y', 'проекция ускорения на ось Oy, м/с²'),
  vx: n('v_x', 'проекция скорости на ось Ox, м/с'),
  vy: n('v_y', 'проекция скорости на ось Oy, м/с'),
  v0x: n('v_{0x}', 'проекция начальной скорости на ось Ox, м/с'),
  v0y: n('v_{0y}', 'проекция начальной скорости на ось Oy, м/с'),
  x: n('x', 'координата x, м'),
  y: n('y', 'координата y, м'),
  x0: n('x_0', 'начальная координата, м'),
  y0: n('y_0', 'начальная координата, м'),
  drx: n(String.raw`\Delta r_x`, 'проекция перемещения на ось Ox, м'),

  g: n('g', 'ускорение свободного падения, 9,8 м/с²'),
  tRise: n(String.raw`t_{\text{под}}`, 'время подъема, с'),
  tFall: n(String.raw`t_{\text{пад}}`, 'время падения, с'),
  H: n('H', 'максимальная высота, м'),
  L: n('L', 'дальность полета, м'),

  dphi: n(String.raw`\Delta\varphi`, 'угол поворота, рад'),
  omega: n(String.raw`\omega`, 'угловая скорость, рад/с'),
  nu: n(String.raw`\nu`, 'частота, с⁻¹'),
  period: n('T', 'период, с'),
  radius: n('R', 'радиус, м'),
  vSpeed: n('v', 'линейная скорость, м/с'),
  aCentr: n('a', 'центростремительное ускорение, м/с²'),
};

export const SECTIONS: Section[] = [
  {
    id: 'kinematics',
    title: 'Кинематика',
    cards: [
      {
        id: 'velocity-instant',
        title: 'Мгновенная скорость',
        formula: String.raw`\vec v=\dfrac{\Delta\vec r}{\Delta t}`,
        notation: [KI.v, KI.dr, KI.dt],
        kind: 'definition',
      },
      {
        id: 'velocity-average',
        title: 'Средняя скорость перемещения',
        formula: String.raw`\langle\vec v\rangle=\dfrac{\Delta\vec r}{\Delta t}`,
        notation: [KI.vAvg, KI.dr, KI.dt],
        kind: 'definition',
      },
      {
        id: 'velocity-path',
        title: 'Средняя путевая скорость',
        formula: String.raw`\langle v\rangle=\dfrac{s}{\Delta t}`,
        notation: [KI.vPath, KI.s, KI.dt],
        kind: 'definition',
      },
      {
        id: 'acceleration',
        title: 'Ускорение',
        formula: String.raw`\vec a=\dfrac{\Delta\vec v}{\Delta t}`,
        notation: [KI.a, KI.dv, KI.dt],
        kind: 'definition',
      },
      {
        id: 'displacement-addition',
        title: 'Закон сложения перемещений',
        formula: String.raw`\Delta\vec r_{\text{абс}}=\Delta\vec r_{\text{отн}}+\Delta\vec r_{\text{пер}}`,
        notation: [KI.drAbs, KI.drRel, KI.drCar],
        kind: 'basis',
      },
      {
        id: 'velocity-addition',
        title: 'Закон сложения скоростей',
        formula: String.raw`\vec v_{\text{абс}}=\vec v_{\text{отн}}+\vec v_{\text{пер}}`,
        notation: [KI.vAbs, KI.vRel, KI.vCar],
        kind: 'consequence',
        derivation: {
          from: ['displacement-addition', 'velocity-instant'],
          steps: [
            String.raw`\vec v=\dfrac{\Delta\vec r}{\Delta t},\quad \Delta\vec r_{\text{абс}}=\Delta\vec r_{\text{отн}}+\Delta\vec r_{\text{пер}}`,
            String.raw`\Rightarrow\ \vec v_{\text{абс}}=\vec v_{\text{отн}}+\vec v_{\text{пер}}`,
          ],
        },
      },
      {
        id: 'acceleration-addition',
        title: 'Закон сложения ускорений',
        formula: String.raw`\vec a_{\text{абс}}=\vec a_{\text{отн}}+\vec a_{\text{пер}}`,
        notation: [KI.aAbs, KI.aRel, KI.aCar],
        kind: 'consequence',
        derivation: {
          from: ['velocity-addition', 'acceleration'],
          steps: [
            String.raw`\vec a=\dfrac{\Delta\vec v}{\Delta t},\quad \vec v_{\text{абс}}=\vec v_{\text{отн}}+\vec v_{\text{пер}}`,
            String.raw`\Rightarrow\ \vec a_{\text{абс}}=\vec a_{\text{отн}}+\vec a_{\text{пер}}`,
          ],
        },
      },
      {
        id: 'kinematic-equations',
        title: 'Кинематические уравнения',
        formula: String.raw`\begin{aligned}\vec v&=\vec v_0+\vec a t\\ \vec r&=\vec r_0+\vec v_0 t+\dfrac{\vec a t^2}{2}\end{aligned}`,
        notation: [KI.v, KI.v0vec, KI.a, KI.t, KI.r, KI.r0],
        kind: 'basis',
      },
      {
        id: 'kinematic-projections',
        title: 'Кинематические уравнения (в проекциях)',
        formula: String.raw`\begin{aligned}\text{Ox:}\quad a_x&=\text{const}\\ v_x&=v_{0x}+a_xt\\ x&=x_0+v_{0x}t+\dfrac{a_xt^2}{2}\\ \text{Oy:}\quad a_y&=\text{const}\\ v_y&=v_{0y}+a_yt\\ y&=y_0+v_{0y}t+\dfrac{a_yt^2}{2}\end{aligned}`,
        notation: [
          KI.ax,
          KI.ay,
          KI.vx,
          KI.vy,
          KI.v0x,
          KI.v0y,
          KI.x,
          KI.y,
          KI.x0,
          KI.y0,
          KI.t,
        ],
        kind: 'consequence',
        derivation: {
          from: ['kinematic-equations'],
          steps: [
            String.raw`\vec v=\vec v_0+\vec a t,\quad \vec r=\vec r_0+\vec v_0t+\dfrac{\vec a t^2}{2}`,
            String.raw`\Rightarrow\ v_x=v_{0x}+a_xt`,
            String.raw`x=x_0+v_{0x}t+\dfrac{a_xt^2}{2}`,
            String.raw`\text{на Oy — те же формулы с индексом } y`,
          ],
        },
      },
      {
        id: 'displacement-no-time',
        title: 'Перемещение (без времени)',
        formula: String.raw`\Delta r_x=\dfrac{v_x^2-v_{0x}^2}{2a_x}`,
        notation: [KI.drx, KI.vx, KI.v0x, KI.ax],
        kind: 'consequence',
        derivation: {
          from: ['kinematic-projections'],
          steps: [
            String.raw`t=\dfrac{v_x-v_{0x}}{a_x}\ \text{из } v_x=v_{0x}+a_xt`,
            String.raw`\Delta r_x=v_{0x}t+\dfrac{a_xt^2}{2}\ \Rightarrow\ \Delta r_x=\dfrac{v_x^2-v_{0x}^2}{2a_x}`,
          ],
        },
      },
      {
        id: 'displacement-average',
        title: 'Перемещение (через среднюю скорость)',
        formula: String.raw`\Delta r_x=\dfrac{v_{0x}+v_x}{2}\,t`,
        notation: [KI.drx, KI.v0x, KI.vx, KI.t],
        kind: 'consequence',
        derivation: {
          from: ['kinematic-projections'],
          steps: [
            String.raw`\Delta r_x=v_{0x}t+\dfrac{a_xt^2}{2},\quad a_xt=v_x-v_{0x}`,
            String.raw`\Rightarrow\ \Delta r_x=\dfrac{v_{0x}+v_x}{2}\,t`,
          ],
        },
      },
      {
        id: 'projectile-angle',
        title: 'Бросок под углом к горизонту',
        formula: String.raw`\begin{aligned}\text{Ox:}\quad a_x&=0\\ v_x&=v_0\cos\alpha\\ x&=x_0+v_0\cos\alpha\,t\\ \text{Oy:}\quad a_y&=-g\\ v_y&=v_0\sin\alpha-gt\\ y&=y_0+v_0\sin\alpha\,t-\dfrac{gt^2}{2}\end{aligned}`,
        notation: [
          KI.ax,
          KI.ay,
          KI.alpha,
          KI.v0,
          KI.g,
          KI.x0,
          KI.y0,
          KI.t,
          KI.vx,
          KI.vy,
          KI.x,
          KI.y,
        ],
        kind: 'consequence',
        derivation: {
          from: ['kinematic-projections'],
          steps: [
            String.raw`a_x=0,\quad a_y=-g`,
            String.raw`v_{0x}=v_0\cos\alpha,\quad v_{0y}=v_0\sin\alpha`,
            String.raw`\Rightarrow\ v_x=v_0\cos\alpha,\quad v_y=v_0\sin\alpha-gt`,
            String.raw`\Rightarrow\ x=x_0+v_0\cos\alpha\,t`,
            String.raw`y=y_0+v_0\sin\alpha\,t-\dfrac{gt^2}{2}`,
          ],
        },
      },
      {
        id: 'rise-time',
        title: 'Время подъема',
        formula: String.raw`t_{\text{под}}=\dfrac{v_0\sin\alpha}{g}`,
        notation: [KI.tRise, KI.v0, KI.alpha, KI.g],
        kind: 'consequence',
        derivation: {
          from: ['projectile-angle'],
          steps: [
            String.raw`v_y=v_0\sin\alpha-gt,\quad v_y=0`,
            String.raw`\Rightarrow\ t_{\text{под}}=\dfrac{v_0\sin\alpha}{g}`,
          ],
        },
      },
      {
        id: 'rise-height',
        title: 'Высота подъема (при y₀ = 0)',
        formula: String.raw`H=\dfrac{v_{0y}^2}{2g}`,
        notation: [KI.H, KI.v0y, KI.g],
        kind: 'consequence',
        derivation: {
          from: ['displacement-no-time'],
          steps: [
            String.raw`\Delta r_y=\dfrac{v_y^2-v_{0y}^2}{2a_y}`,
            String.raw`v_y=0,\quad a_y=-g,\quad y_0=0`,
            String.raw`\Rightarrow\ H=\dfrac{v_{0y}^2}{2g}`,
          ],
        },
      },
      {
        id: 'fall-time',
        title: 'Время падения',
        formula: String.raw`t_{\text{пад}}=\sqrt{\dfrac{2H}{g}}`,
        notation: [KI.tFall, KI.H, KI.g],
        kind: 'consequence',
        derivation: {
          from: ['projectile-angle'],
          steps: [
            String.raw`y=H-\dfrac{gt^2}{2},\quad y=0`,
            String.raw`\Rightarrow\ t_{\text{пад}}=\sqrt{\dfrac{2H}{g}}`,
          ],
        },
      },
      {
        id: 'range',
        title: 'Дальность полета',
        formula: String.raw`L=\dfrac{v_0^2\sin 2\alpha}{g}`,
        notation: [KI.L, KI.v0, KI.alpha, KI.g],
        kind: 'consequence',
        derivation: {
          from: ['projectile-angle', 'rise-time', 'fall-time'],
          steps: [
            String.raw`L=v_{0x}(t_{\text{под}}+t_{\text{пад}})`,
            String.raw`y_0=0\ \Rightarrow\ t_{\text{пад}}=t_{\text{под}}=\dfrac{v_0\sin\alpha}{g}`,
            String.raw`\Rightarrow\ L=v_0\cos\alpha\cdot\dfrac{2v_0\sin\alpha}{g}=\dfrac{v_0^2\sin 2\alpha}{g}`,
          ],
        },
      },
      {
        id: 'arc-length',
        title: 'Длина дуги окружности',
        formula: String.raw`s=R\Delta\varphi`,
        notation: [KI.s, KI.radius, KI.dphi],
        kind: 'definition',
      },
      {
        id: 'angular-velocity',
        title: 'Угловая скорость',
        formula: String.raw`\omega=\dfrac{\Delta\varphi}{\Delta t}`,
        notation: [KI.omega, KI.dphi, KI.dt],
        kind: 'definition',
      },
      {
        id: 'angular-period',
        title: 'Угловая скорость (через период)',
        formula: String.raw`\omega=\dfrac{2\pi}{T}`,
        notation: [KI.omega, KI.period],
        kind: 'consequence',
        derivation: {
          from: ['angular-velocity'],
          steps: [
            String.raw`\omega=\dfrac{\Delta\varphi}{\Delta t},\quad \Delta\varphi=2\pi,\quad \Delta t=T`,
            String.raw`\Rightarrow\ \omega=\dfrac{2\pi}{T}`,
          ],
        },
      },
      {
        id: 'angular-frequency',
        title: 'Угловая скорость (через частоту)',
        formula: String.raw`\omega=2\pi\nu`,
        notation: [KI.omega, KI.nu],
        kind: 'consequence',
        derivation: {
          from: ['angular-period', 'frequency-period'],
          steps: [
            String.raw`\omega=\dfrac{2\pi}{T},\quad \nu=\dfrac{1}{T}`,
            String.raw`\Rightarrow\ \omega=2\pi\nu`,
          ],
        },
      },
      {
        id: 'frequency-period',
        title: 'Частота и период',
        formula: String.raw`\nu=\dfrac{1}{T}`,
        notation: [KI.nu, KI.period],
        kind: 'definition',
      },
      {
        id: 'linear-velocity',
        title: 'Линейная скорость',
        formula: String.raw`v=\omega R`,
        notation: [KI.vSpeed, KI.omega, KI.radius],
        kind: 'consequence',
        derivation: {
          from: ['arc-length', 'angular-velocity'],
          steps: [
            String.raw`s=R\Delta\varphi,\quad \omega=\dfrac{\Delta\varphi}{\Delta t}`,
            String.raw`v=\dfrac{s}{\Delta t}=R\dfrac{\Delta\varphi}{\Delta t}=\omega R`,
          ],
        },
      },
      {
        id: 'centripetal-acceleration',
        title: 'Центростремительное ускорение',
        formula: String.raw`a=\dfrac{v^2}{R}=\omega^2 R`,
        notation: [KI.aCentr, KI.vSpeed, KI.radius, KI.omega],
        kind: 'consequence',
        derivation: {
          from: ['acceleration', 'linear-velocity'],
          steps: [
            String.raw`a=\dfrac{\Delta v}{\Delta t},\quad |\Delta\vec v|\approx v\Delta\varphi`,
            String.raw`a=\dfrac{v\Delta\varphi}{\Delta t}=v\omega=\dfrac{v^2}{R}`,
          ],
        },
      },
    ],
  },
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
          n(String.raw`V_1`, 'объем в первом состоянии, м³'),
          n(String.raw`T_1`, 'температура в первом состоянии, К'),
          n(String.raw`p_2`, 'давление во втором состоянии, Па'),
          n(String.raw`V_2`, 'объем во втором состоянии, м³'),
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
          n(String.raw`V_1`, 'начальный объем, м³'),
          n(String.raw`V_2`, 'конечный объем, м³'),
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
        title: 'Работа, совершенная двигателем',
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
