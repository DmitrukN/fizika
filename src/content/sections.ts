export const SECTIONS = [
  { id: 'model', title: 'Модель идеального газа' },
  { id: 'mkt', title: 'Основное уравнение МКТ' },
  { id: 'temperature', title: 'Температура' },
  { id: 'state', title: 'Уравнение состояния' },
  { id: 'isoprocess', title: 'Изопроцессы' },
  { id: 'thermo', title: 'Внутренняя энергия и теплота' },
  { id: 'vapor', title: 'Насыщенный пар и влажность' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

export function sectionTitle(id: SectionId): string {
  const section = SECTIONS.find((item) => item.id === id);
  if (!section) throw new Error(`Неизвестный раздел: ${id}`);
  return section.title;
}
