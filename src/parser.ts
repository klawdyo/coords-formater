import { Compass } from "./_enums/compass.enum";
import { Converter } from "./converter";
import { DMS } from "./coord";
import { Normalizer } from "./normalizer";

export class Parser implements DMS {
  signal!: string;
  compass?: Compass;
  degrees!: number;
  minutes!: number;
  seconds!: number;

  constructor(input: string | number) {
    if (Number.isNaN(+input)) this.parseString(input as string);
    else this.parseNumber(+input);
  }

  private parseNumber(value: number): void {
    const { degrees, minutes, seconds } = Converter.decimalToDMS(value)

    this.signal = value < 0 ? '-' : '+';
    this.degrees = degrees;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  private parseString(value: string) {
    const pattern = /(?<sig1>[NEWS]{1}|[-+]{1})?\s*(?<deg>[0-9,.]+\s*°?)\s*(?<min>[0-9,.]+\s*'?)?\s*(?<sec>[0-9,.]+\s*"?)?\s*(?<sig2>[NEWS]{1})?/i;
    const normalized = Normalizer.normalize(value);
    const match = pattern.exec(normalized);

    if (!match) throw new Error('Invalid coordinate');

    const { signal, compass } = this.calculateSignal(match?.groups?.sig1, match?.groups?.sig2);
    this.signal = signal
    this.compass = compass
    this.degrees = Normalizer.clearPart(match?.groups?.deg);
    this.minutes = Normalizer.clearPart(match?.groups?.min);
    this.seconds = Normalizer.clearPart(match?.groups?.sec);



  }

  private calculateSignal(signal1?: string, signal2?: string): { signal: string; compass?: Compass } {
    const signal = signal1 || signal2;
    if (signal === '+' || signal === '-') return { signal };
    else if (signal && [Compass.NORTH, Compass.SOUTH, Compass.EAST, Compass.WEST].includes(signal as Compass)) {
      const compass = signal as Compass;
      if (signal === Compass.SOUTH || signal === Compass.WEST) return { signal: '-', compass };
      else if (signal === Compass.NORTH || signal === Compass.EAST) return { signal: '+', compass };
    }

    return { signal: '+' };
  }

  toJSON() {
    return {
      signal: this.signal,
      compass: this.compass,
      degrees: this.degrees,
      minutes: this.minutes,
      seconds: this.seconds,
    }
  }

}
