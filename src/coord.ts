import { Formatter } from './formatter';
import { Parser } from './parser';



export class Coord {
  private _latitude: Parser;
  private _longitude: Parser;

  constructor(latitude: string | number, longitude: string | number) {
    this._latitude = new Parser(latitude);
    this._longitude = new Parser(longitude);
  }

  get latitude(): number {
    return this._latitude.decimal
  }

  get longitude() {
    return this._longitude.decimal
  }

  getLatitude(options?: FormatterOptions) {
    const formatter = new Formatter(this._latitude);
    return !options ? this._latitude.decimal : formatter.toString('latitude', options);
  }

  getLongitude(options?: FormatterOptions) {
    const formatter = new Formatter(this._longitude);
    return !options ? this._longitude.decimal : formatter.toString('longitude', options);
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
