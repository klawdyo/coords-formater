/* eslint-disable no-misleading-character-class */
export class Normalizer {
  /**
   * Remove tudo o que não for número e ponto
   * 
   */
  static clearPart(value?: string): number {
    return +(value?.replace(/[^\d.]/, '') || 0);
  }

  /**
   * Substitui os caracteres parecidos com aspas simples, duplas e indicador de graus por um valor padrão
   * 
   */
  static normalize(value: string): string {
    const normalized = value
      .replace(/\s{2,}/g, ' ') // double spaces
      .replace(/[\u00BA\u006F\u02DA\u030A\u2070\u2218\u2219\u0968\u25E6\u0970]/gu, String.fromCodePoint(0x00b0)) // degree indicators
      .replace(/[\u02B9\u02BC\u02C8\u05F3\u2032\uA78C]/gu, String.fromCodePoint(0x0027)) // single quotes
      .replace(/[\u201E\u201C\u201D\u301D\u301E\u201F]/gu, String.fromCodePoint(0x0022)); // double quotes

    return normalized;
  }
}
