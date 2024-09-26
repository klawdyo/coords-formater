import { FormatterOptions } from "./coord";
import { Parser } from "./parser";

export class Formatter {
    constructor(private _value: Parser) {}
  
    format(cb: (data: Parser) => string) {
      return cb(this._value);
    }
  
    toString(dimension: 'latitude' | 'longitude', options?: FormatterOptions) {
      const indicator = this.getIndicator(this._value, options, dimension);
      const indicatorBefore = !options?.indicatorPosition || options?.indicatorPosition === 'before' ? indicator : '';
      const indicatorAfter = options?.indicatorPosition === 'after' ? indicator : '';
  
      const degreeSeparator = options?.degreeSeparator || '° ';
      const minuteSeparator = options?.minuteSeparator || '" ';
      const secondSeparator = options?.secondSeparator || "' ";
  
      const minute = this._value.minute ? `${this._value.minute}${minuteSeparator}` : '';
      const second = this._value.second ? `${this._value.second}${secondSeparator}` : '';
  
      return `${indicatorBefore} ${this._value.degree}${degreeSeparator}${minute}${second}${indicatorAfter}`;
    }
  
    /**
     *
     */
    toDecimal() {
      const { signal, degree, minute, second } = this._value;
  
      let accu = degree;
  
      if (minute) {
        accu += minute / 60;
      }
      if (second) {
        accu += second / 60;
      }
      if (signal === '-') return -1 * accu;
      return accu;
    }
  
    private getIndicator(value: Parser, options: FormatterOptions | undefined, dimension: 'latitude' | 'longitude') {
      if (options?.indicator === 'signal') return value.signal;
  
      if (dimension === 'latitude') {
        return value.signal === '+' ? 'N' : 'S';
      } else {
        return value.signal === '+' ? 'E' : 'W';
      }
    }
  }
  