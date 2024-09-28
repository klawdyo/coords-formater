import { Compass } from "./_enums/compass.enum";
import { Converter } from "./converter";
import { FormatterOptions } from "./coord";
import { Parser } from "./parser";

export class Formatter {
  constructor(private _value: Parser) { }

  format(cb: (data: Parser) => string) {
    return cb(this._value);
  }

  toString(dimension: 'latitude' | 'longitude', options?: FormatterOptions) {
    const indicator = this.getCompass(this._value, options, dimension);
    const indicatorBefore = !options?.indicatorPosition || options?.indicatorPosition === 'before' ? indicator : '';
    const indicatorAfter = options?.indicatorPosition === 'after' ? indicator : '';

    const degreeSeparator = options?.degreeSeparator || '° ';
    const minuteSeparator = options?.minuteSeparator || '" ';
    const secondSeparator = options?.secondSeparator || "' ";

    const minute = this._value.minutes ? `${this._value.minutes}${minuteSeparator}` : '';
    const second = this._value.seconds ? `${this._value.seconds}${secondSeparator}` : '';

    return `${indicatorBefore} ${this._value.degrees}${degreeSeparator}${minute}${second}${indicatorAfter}`;
  }

  /**
   * 
   */
  toDecimal() {
    return Converter.dmsToDecimal(this._value);
  }

  /**
   * 
   * 
   * 
   */
  private getCompass(value: Parser, options: FormatterOptions | undefined, dimension: 'latitude' | 'longitude'): string {
    // Deve retornar um signal
    if (options?.indicator === 'signal') return value.signal;
    
    // Deve retornar um compass. Caso compass estiver preenchido, retorne
    else if (options?.indicator === 'compass' && value.compass) return value.compass
    
    // Se deve retornar compass, porém compass não está preenchido, tente calculá-lo a partir do signal e do
    // dimension, verificando se é latitude ou longitude
    else {
      if (dimension === 'latitude') {
        return value.signal === '+' ? Compass.NORTH : Compass.SOUTH;
      } else {
        return value.signal === '+' ? Compass.EAST : Compass.WEST;
      }
    }
  }
}
