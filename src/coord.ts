import { Formatter } from './formatter';
import { Parser } from './parser';

export interface DMS {
  degree: number;
  minute: number;
  second: number;
}

export class Coord {
  private _latitude: Parser;
  private _longitude: Parser;

  constructor(latitude: string | number, longitude: string | number) {
    this._latitude = new Parser(latitude);
    this._longitude = new Parser(longitude);
  }

  get latitude(): number {
    return new Formatter(this._latitude).toDecimal()
  }

  get longitude() {
    return new Formatter(this._longitude).toDecimal()
  }

  getLatitude(options?: FormatterOptions) {
    const formatter = new Formatter(this._latitude);
    return !options ? formatter.toDecimal() : formatter.toString('latitude', options);
  }

  getLongitude(options?: FormatterOptions) {
    const formatter = new Formatter(this._longitude);
    return !options ? formatter.toDecimal() : formatter.toString('longitude', options);
  }
}

export interface FormatterOptions {
  indicator?: 'compass' | 'signal';
  indicatorPosition?: 'after' | 'before';

  showMinutes?: boolean;
  showSeconds?: boolean;

  degreeSeparator?: string;
  minuteSeparator?: string;
  secondSeparator?: string;
}
