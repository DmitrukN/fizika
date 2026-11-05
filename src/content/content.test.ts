import { describe, expect, it } from 'vitest';
import katex from 'katex';
import { ALL_CARDS, SECTIONS } from './sections';

describe('содержимое разделов', () => {
  it('содержит 34 карточки', () => {
    expect(ALL_CARDS).toHaveLength(34);
  });

  it('не повторяет идентификаторы', () => {
    const ids = new Set(ALL_CARDS.map((card) => card.id));
    expect(ids.size).toBe(ALL_CARDS.length);
  });

  it('не оставляет пустых разделов', () => {
    for (const section of SECTIONS) {
      expect(section.cards.length, section.id).toBeGreaterThan(0);
    }
  });

  it('заполняет название, формулу и обозначения', () => {
    for (const card of ALL_CARDS) {
      expect(card.title.trim(), card.id).not.toBe('');
      expect(card.formula.trim(), card.id).not.toBe('');
      expect(card.notation.length, card.id).toBeGreaterThanOrEqual(2);

      const symbols = card.notation.map((item) => item.symbol);
      expect(new Set(symbols).size, card.id).toBe(symbols.length);

      for (const item of card.notation) {
        expect(item.symbol.trim(), card.id).not.toBe('');
        expect(item.text.trim(), card.id).not.toBe('');
      }
    }
  });

  it('рисует каждую формулу через KaTeX', () => {
    for (const card of ALL_CARDS) {
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

  it('рисует каждый символ обозначения через KaTeX', () => {
    for (const card of ALL_CARDS) {
      for (const item of card.notation) {
        expect(
          () =>
            katex.renderToString(item.symbol, {
              throwOnError: true,
              displayMode: false,
            }),
          `${card.id}: ${item.symbol}`,
        ).not.toThrow();
      }
    }
  });
});
