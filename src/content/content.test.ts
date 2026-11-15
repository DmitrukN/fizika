import { describe, expect, it } from 'vitest';
import katex from 'katex';
import { ALL_CARDS, SECTIONS } from './sections';

describe('содержимое разделов', () => {
  it('содержит 64 карточки', () => {
    expect(ALL_CARDS).toHaveLength(64);
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

  it('рисует дополнительные строки и шаги вывода через KaTeX', () => {
    const latex = ALL_CARDS.flatMap((card) => [
      ...(card.extra ?? []).map((item) => ({
        where: `${card.id}: ${item.label}`,
        value: item.latex,
      })),
      ...(card.derivation?.steps ?? []).map((step, index) => ({
        where: `${card.id}: шаг ${index + 1}`,
        value: step,
      })),
    ]);

    expect(latex.length).toBeGreaterThan(0);

    for (const item of latex) {
      expect(
        () =>
          katex.renderToString(item.value, {
            throwOnError: true,
            displayMode: true,
          }),
        item.where,
      ).not.toThrow();
    }
  });

  it('делит карточки на 10 основ, 23 определения и 31 следствие', () => {
    const count = (kind: string) =>
      ALL_CARDS.filter((card) => card.kind === kind).length;

    expect(count('basis')).toBe(10);
    expect(count('definition')).toBe(23);
    expect(count('consequence')).toBe(31);
  });

  it('дает каждому следствию вывод с существующими источниками', () => {
    const ids = new Set(ALL_CARDS.map((card) => card.id));

    for (const card of ALL_CARDS) {
      if (card.kind === 'consequence') {
        expect(card.derivation, card.id).toBeDefined();
        const derivation = card.derivation;
        if (!derivation) continue;

        expect(derivation.steps.length, card.id).toBeGreaterThan(0);
        expect(derivation.from.length, card.id).toBeGreaterThan(0);
        expect(derivation.from, card.id).not.toContain(card.id);

        for (const source of derivation.from) {
          expect(ids.has(source), `${card.id} ← ${source}`).toBe(true);
        }
      } else {
        expect(card.derivation, card.id).toBeUndefined();
      }
    }
  });
});
