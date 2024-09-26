import { DMS } from "./coord";
import { Normalizer } from "./normalizer";

export class Parser implements DMS {
  signal!: string;
  degree!: number;
  minute!: number;
  second!: number;

  constructor(input: string | number) {
    if (typeof input === 'number') this.parseNumber(input);
    else this.parseString(input);
  }

  private parseNumber(value: number): void {
    const degree = parseInt(`${value}`);
    const minute = (value - degree) / 60;
    const second = (value - minute) / 60;

    this.signal = value < 0 ? '-' : '+';
    this.degree = degree;
    this.minute = minute;
    this.second = second;
  }

  private parseString(value: string) {
    const pattern = /(?<sig>[NEWS]{1}|[-+]{1})?\s*(?<deg>[0-9,.]+\s*°?)\s*(?<min>[0-9,.]+\s*'?)?\s*(?<sec>[0-9,.]+\s*"?)?\s*(?<sig2>[NEWS]{1})?/i;
    const normalized = Normalizer.normalize(value);
    const match = pattern.exec(normalized);

    if (!match) throw new Error('Invalid coordinate');

    // return {
    this.signal = this.calculateSignal(match?.groups?.sig1, match?.groups?.sig2);
    this.degree = Normalizer.clearPart(match?.groups?.deg);
    this.minute = Normalizer.clearPart(match?.groups?.min);
    this.second = Normalizer.clearPart(match?.groups?.sec);
    // }
  }

  private calculateSignal(signal1?: string, signal2?: string) {
    const signal = signal1 || signal2;
    if (signal === '+' || signal === '-') return signal;
    else if (signal === 'S' || signal === 'W') return '-';
    else if (signal === 'N' || signal === 'E') return '+';
    return '+';
  }

}
