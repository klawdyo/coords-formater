/* eslint-disable no-misleading-character-class */
export class Normalizer {
  static clearPart(value?: string): number {
    return +(value?.replace(/[^\d.]/, '') || 0);
  }

  static normalize(value: string): string {
    const normalized = value
      .replace(/\s{2,}/g, ' ') // double spaces
      .replace(/[°ºo°˚̊⁰∘◦॰]+/g, '°') // degree indicators
      .replace(/[`'ʹʼˈ׳′ꞌ]{1}/g, "'") // single quotes
      .replace("''", '"') //two single quotes
      .replace(/["„“”]+/g, '"') // double quote
      .replace(/,+/g, '.'); //commas to dots

    return normalized;
  }
}
