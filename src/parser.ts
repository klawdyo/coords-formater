import { Compass } from "./_enums/compass.enum";
import { Decimal, DMS, ExtendedDMS, Indicator } from "./_interfaces/interface";
import { Converter } from "./converter";
import { Normalizer } from "./normalizer";



export class Parser implements DMS, Indicator, Decimal {
  signal!: string;
  degrees!: number;
  minutes!: number;
  seconds!: number;
  decimal!: number;
  compass?: Compass;

  constructor(input: string | number) {
    this.parse(input)
  }



  /**
   * 
   * 
   * 
   */
  toJSON(): ExtendedDMS {
    return {
      signal: this.signal,
      compass: this.compass,
      degrees: this.degrees,
      minutes: this.minutes,
      seconds: this.seconds,
      decimal: this.decimal,
    }
  }

  // 
  // 
  // 
  // 
  // 

  /**
   * 
   * 
   * 
   * 
   */
  private parse(value: string | number): void {
    let dms: ExtendedDMS;

    if (Number.isNaN(+value)) dms = this.parseString(value as string);
    else dms = this.parseNumber(+value);

    this.degrees = dms.degrees;
    this.minutes = dms.minutes;
    this.seconds = dms.seconds;
    this.decimal = dms.decimal!;
    this.signal = dms.signal;
    this.compass = dms.compass;
  }

  /**
   * 
   * 
   * 
   * 
   */
  private parseNumber(decimal: number): ExtendedDMS {
    const { degrees, minutes, seconds } = Converter.decimalToDMS(decimal);

    return {
      signal: decimal < 0 ? '-' : '+',
      degrees,
      minutes,
      seconds,
      decimal,
      compass: undefined
    }
  }

  /**
   * 
   * 
   * 
   * 
   */
  private parseString(value: string): ExtendedDMS {
    const normalizedInput = Normalizer.normalize(value);

    const pattern = /(?<sig1>[NEWS]{1}|[-+]{1})?\s*(?<deg>[0-9,.]+\s*°?)\s*(?<min>[0-9,.]+\s*'?)?\s*(?<sec>[0-9,.]+\s*"?)?\s*(?<sig2>[NEWS]{1})?/i;
    const match = pattern.exec(normalizedInput);
    if (!match) throw new Error('Invalid coordinate');


    const { signal, compass } = this.getIndicators(match?.groups?.sig1, match?.groups?.sig2);

    const degrees = Normalizer.clearPart(match?.groups?.deg) * (signal === '+' ? 1 : -1);
    const minutes = Normalizer.clearPart(match?.groups?.min);
    const seconds = Normalizer.clearPart(match?.groups?.sec);

    const decimal = Converter.dmsToDecimal({ seconds, minutes, degrees, signal });
    const normalizedDMS = Converter.decimalToDMS(decimal);

    return {
      signal: signal,
      compass: compass,
      decimal: decimal,
      degrees: normalizedDMS.degrees,
      minutes: normalizedDMS.minutes,
      seconds: normalizedDMS.seconds,
    }
  }

  /**
   * 
   * 
   * 
   * 
   */
  private getIndicators(signal1?: string, signal2?: string): Indicator {
    const signal = signal1 || signal2;
    if (signal === '+' || signal === '-') return { signal };
    else if (signal && [Compass.NORTH, Compass.SOUTH, Compass.EAST, Compass.WEST].includes(signal as Compass)) {
      const compass = signal as Compass;
      if (signal === Compass.SOUTH || signal === Compass.WEST) return { signal: '-', compass };
      else if (signal === Compass.NORTH || signal === Compass.EAST) return { signal: '+', compass };
    }

    return { signal: '+' };
  }
}
