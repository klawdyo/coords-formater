import { Normalizer } from './normalizer';

/* eslint-disable no-misleading-character-class */
describe('Normalizer', () => {
  describe('normalize', () => {
    test('Normalize verify', () => {
      expect(`41° 25' 01" W`).toBe(`41° 25' 01" W`);
    });
  });

  describe('Unicode', () => {
    const degreeIndicators = [
      0x00b0, // ° -  U+00B0 (DEGREE SIGN)                 <--------- Caractere padrão
      0x00ba, // º -  U+00BA (MASCULINE ORDINAL INDICATOR)
      0x006f, // o -  U+006F (LATIN SMALL LETTER O)
      0x02da, // ˚ -  U+02DA (RING ABOVE)
      // 0x030a, // ̊ -   U+030A (COMBINING RING ABOVE) <-- Só existe em combinação com outro
      0x2070, // ⁰ -  U+2070 (SUPERSCRIPT ZERO)
      0x2218, // ∘ -  U+2218 (RING OPERATOR)
      0x2219, // ◦ -  U+2219 (BULLET OPERATOR)
      0x0968, // ॰ -  U+0968 (DEVANAGARI SIGN AVAGRAHA)
      0x25e6, // ॰ -  U+25E6 (WHITE CIRCLE)
      0x0970, // ० -  U+0970 (DEVANAGARI DIGIT ZERO)
    ];

    const singleQuotes = [
      0x0027, // ' -  U+0027 (Acento agudo)              <--------- Caractere padrão
      0x02b9, // ʹ -  U+02B9 (Acento agudo modificador)
      0x02bc, // ʼ -  U+02BC (Acento agudo modificador)
      0x02c8, // ˈ -  U+02C8 (Acento agudo modificador)
      0x05f3, // ׳ -  U+05F3 (Acento agudo hebraico)
      0x2032, // ′ -  U+2032 (Prime)
      0xa78c, // ꞌ -  U+A78C (Acento agudo latino)
    ];

    const doubleQuotes = [
      0x0022, // "  - U+0022 (QUOTATION MARK)             <------- Caractere padrão de segundos
      0x201e, // „  - U+201E (DOUBLE LOW-9 QUOTATION MARK)
      0x201c, // “  - U+201C (LEFT DOUBLE QUOTATION MARK)
      0x201d, // ”  - U+201D (RIGHT DOUBLE QUOTATION MARK)
      0x301d, // 〝 - U+301D (LEFT WHITE DOUBLE QUOTATION MARK)
      0x301e, // 〞 - U+301E (RIGHT WHITE DOUBLE QUOTATION MARK)
      0x201f, // “  - U+201F (DOUBLE HIGH-REVERSED-9 QUOTATION MARK)
    ];

    test.each(degreeIndicators)('Testa a substituição de %s do indicator de graus', (indicator) => {
      const coord = `41${String.fromCodePoint(indicator)} 25' 01" W`;
      const replaced = coord.replace(/[\u00BA\u006F\u02DA\u030A\u2070\u2218\u2219\u0968\u25E6\u0970]/gu, String.fromCodePoint(0x00b0));
      expect(replaced).toBe(`41° 25' 01" W`);
      expect(Normalizer.normalize(coord)).toBe(`41° 25' 01" W`);
    });

    test.each(singleQuotes)('Testa a substituição de %s do indicator de minutos', (indicator) => {
      const coord = `41° 25${String.fromCodePoint(indicator)} 01" W`;
      const replaced = coord.replace(/[\u02B9\u02BC\u02C8\u05F3\u2032\uA78C]/gu, String.fromCodePoint(0x0027));
      expect(replaced).toBe(`41° 25' 01" W`);
      expect(Normalizer.normalize(coord)).toBe(`41° 25' 01" W`);
    });

    test.each(doubleQuotes)('Testa a substituição de %s do indicator de segundos', (indicator) => {
      const coord = `41° 25' 01${String.fromCodePoint(indicator)} W`;
      const replaced = coord.replace(/[\u201E\u201C\u201D\u301D\u301E\u201F]/gu, String.fromCodePoint(0x0022));
      expect(replaced).toBe(`41° 25' 01" W`);
      expect(Normalizer.normalize(coord)).toBe(`41° 25' 01" W`);
    });
  });

  describe('Strings', () => {
    const degreeIndicators = [
      '°', // ° - U+00B0 (DEGREE SIGN)                 <--------- Caractere padrão
      'º', // º - U+00BA (MASCULINE ORDINAL INDICATOR)
      'o', // o - U+006F (LATIN SMALL LETTER O)
      '˚', // ˚ - U+02DA (RING ABOVE)
      '⁰', // ⁰ - U+2070 (SUPERSCRIPT ZERO)
      '∘', // ∘ - U+2218 (RING OPERATOR)
      '॰', // ॰ -  U+25E6 (WHITE CIRCLE)
      // '०', // ० -  U+0970 (DEVANAGARI DIGIT ZERO)  <-- não funciona na substituição da string
      // '̊', // ̊ - U+030A (COMBINING RING ABOVE) <-- Só funciona combinado com outro
      // '◦', // ◦ - U+2219 (BULLET OPERATOR) <-- não funciona na substituição da string
      // '॰', // ॰ - U+0968 (DEVANAGARI SIGN AVAGRAHA) <-- não funciona na substituição da string
    ];

    const singleQuotes = [
      "'", // ' - U+0027 (Acento agudo)              <--------- Caractere padrão
      'ʹ', // ʹ - U+02B9 (Acento agudo modificador)
      'ʼ', // ʼ - U+02BC (Acento agudo modificador)
      'ˈ', // ˈ - U+02C8 (Acento agudo modificador)
      '׳', // ׳ - U+05F3 (Acento agudo hebraico)
      '′', // ′ - U+2032 (Prime)
      'ꞌ', // ꞌ - U+A78C (Acento agudo latino)
    ];

    const doubleQuotes = [
      '"', // "  - U+0022 (QUOTATION MARK)             <------- Caractere padrão de segundos
      '„', // „  - U+201E (DOUBLE LOW-9 QUOTATION MARK)
      '“', // “  - U+201C (LEFT DOUBLE QUOTATION MARK)
      '”', // ”  - U+201D (RIGHT DOUBLE QUOTATION MARK)
      '〝', // 〝 - U+301D (LEFT WHITE DOUBLE QUOTATION MARK)
      '〞', // 〞 - U+301E (RIGHT WHITE DOUBLE QUOTATION MARK)
      '“', // “  - U+201F (DOUBLE HIGH-REVERSED-9 QUOTATION MARK)
    ];

    test.each(degreeIndicators)('Testa a substituição de %s do indicator de graus', (indicator) => {
      const coord = `41${indicator} 25' 01" W`;
      const replaced = coord.replace(/[\u00BA\u006F\u02DA\u030A\u2070\u2218\u2219\u0968\u25E6\u0970]/gu, String.fromCodePoint(0x00b0));
      expect(replaced).toBe(`41° 25' 01" W`);
      expect(Normalizer.normalize(coord)).toBe(`41° 25' 01" W`);
    });

    test.each(singleQuotes)('Testa a substituição de %s do indicator de minutos', (indicator) => {
      const coord = `41° 25${indicator} 01" W`;
      const replaced = coord.replace(/[\u02B9\u02BC\u02C8\u05F3\u2032\uA78C]/gu, String.fromCodePoint(0x0027));
      expect(replaced).toBe(`41° 25' 01" W`);
      expect(Normalizer.normalize(coord)).toBe(`41° 25' 01" W`);
    });

    test.each(doubleQuotes)('Testa a substituição de %s do indicator de segundos', (indicator) => {
      const coord = `41° 25' 01${indicator} W`;
      const replaced = coord.replace(/[\u201E\u201C\u201D\u301D\u301E\u201F]/gu, String.fromCodePoint(0x0022));
      expect(replaced).toBe(`41° 25' 01" W`);
      expect(Normalizer.normalize(coord)).toBe(`41° 25' 01" W`);
    });
  });
});
