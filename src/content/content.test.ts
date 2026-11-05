import { describe, expect, it } from 'vitest';
import katex from 'katex';
import { CARDS } from './cards';
import { SECTIONS } from './sections';

describe('содержимое колоды', () => {
  it('содержит 34 карточки', () => {
    expect(CARDS).toHaveLength(34);
  });

  it('не повторяет идентификаторы', () => {
    const ids = new Set(CARDS.map((card) => card.id));
    expect(ids.size).toBe(CARDS.length);
  });

  it('ссылается только на существующие разделы', () => {
    const sectionIds = new Set(SECTIONS.map((section) => section.id));
    for (const card of CARDS) {
      expect(sectionIds.has(card.section), card.id).toBe(true);
    }
  });

  it('заполняет название и формулу', () => {
    for (const card of CARDS) {
      expect(card.title.trim(), card.id).not.toBe('');
      expect(card.formula.trim(), card.id).not.toBe('');
    }
  });

  it('раскладывает карточки по разделам без пустых', () => {
    const counts = Object.fromEntries(
      SECTIONS.map((section) => [
        section.id,
        CARDS.filter((card) => card.section === section.id).length,
      ]),
    );

    expect(counts).toEqual({
      model: 5,
      mkt: 6,
      temperature: 4,
      state: 4,
      isoprocess: 3,
      thermo: 10,
      vapor: 2,
    });
  });

  it('рисует каждую формулу через KaTeX', () => {
    for (const card of CARDS) {
      expect(
        () =>
          katex.renderToString(card.formula, {
            throwOnError: true,
            displayMode: true,
          }),
        card.id,
      ).not.toThrow();
    }
  });
});
