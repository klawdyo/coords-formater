
export class Coord {
  private _latitude: Parse;
  private _longitude: Parse;

  constructor(latitude: string | number, longitude: string | number) {
    this._latitude = new Parse(latitude)
    this._longitude = new Parse(longitude)
  }

  getLatitude(options?: FormatterOptions) {
    const formatter = new Formatter(this._latitude)
    return !options ? formatter.toFloat() : formatter.toString('latitude', options)
  }

  getLongitude(options?: FormatterOptions) {
    const formatter = new Formatter(this._longitude)
    return !options ? formatter.toFloat() : formatter.toString('longitude', options)
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

export class Formatter {
  constructor(private _value: Parse) { }

  format(cb: (data: Parse) => string) {
    return cb(this._value)
  }

  toString(dimension: 'latitude' | 'longitude', options?: FormatterOptions) {
    const indicator = this.getIndicator(this._value, options, dimension)
    const indicatorBefore = !options?.indicatorPosition || options?.indicatorPosition === 'before' ? indicator : ''
    const indicatorAfter = options?.indicatorPosition === 'after' ? indicator : ''

    const degreeSeparator = options?.degreeSeparator || '° '
    const minuteSeparator = options?.minuteSeparator || '" '
    const secondSeparator = options?.secondSeparator || "' "

    const minute = this._value.minute ? `${this._value.minute}${minuteSeparator}` : ''
    const second = this._value.second ? `${this._value.second}${secondSeparator}` : ''

    return `${indicatorBefore} ${this._value.degree}${degreeSeparator}${minute}${second}${indicatorAfter}`
  }

  /**
  * 
  */
  toFloat() {
    const { signal, degree, minute, second } = this._value

    let accu = degree;

    if (minute) { accu += minute / 60 }
    if (second) { accu += second / 60 }
    if (signal === '-') return -1 * accu;
    return accu;
  }

  private getIndicator(value: Parse, options: FormatterOptions | undefined, dimension: 'latitude' | 'longitude') {
    if (options?.indicator === 'signal') return value.signal

    if (dimension === 'latitude') {
      return value.signal === '+' ? 'N' : 'S'
    } else {
      return value.signal === '+' ? 'E' : 'W'
    }
  }
}

export class Parse {
  signal!: string;
  degree!: number;
  minute!: number;
  second!: number;

  constructor(input: string | number) {
    typeof input === 'number' ? this.parseNumber(input) : this.parseString(input)
    // this.signal = parse.signal;
    // this.degree = parse.degree;
    // this.minute = parse.minute;
    // this.second = parse.second;
  }

  private parseNumber(value: number): void {
    const degree = parseInt(`${value}`)
    const minute = (value - degree) / 60
    const second = (value - minute) / 60

    this.signal = value < 0 ? '-' : '+';
    this.degree = degree;
    this.minute = minute;
    this.second = second;
  }

  private parseString(value: string) {
    const pattern = /(?<sig>[NEWS]{1}|[-+]{1})?\s*(?<deg>[0-9,\.]+\s*°?)\s*(?<min>[0-9,\.]+\s*'?)?\s*(?<sec>[0-9,\.]+\s*"?)?\s*(?<sig2>[NEWS]{1})?/i;
    const normalized = this.normalize(value);
    const match = pattern.exec(normalized);

    if (!match) throw new Error('Invalid coordinate')

    // return {
    this.signal = this.calculateSignal(match?.groups?.sig1, match?.groups?.sig2);
    this.degree = this.clearPart(match?.groups?.deg);
    this.minute = this.clearPart(match?.groups?.min);
    this.second = this.clearPart(match?.groups?.sec);
    // }
  }

  private calculateSignal(signal1?: string, signal2?: string) {
    const signal = signal1 || signal2;
    if (signal === '+' || signal === '-') return signal;
    else if (signal === 'S' || signal === 'W') return '-'
    else if (signal === 'N' || signal === 'E') return '+'
    return '+'
  }

  private clearPart(value?: string): number {
    return +(value?.replace(/[^\d\.]/, '') || 0)
  }

  private normalize(value: string): string {
    const normalized = value.replace(/\s{2,}/g, " ") // double spaces
      .replace(/[°˚⁰∘◦॰ºo]+/g, '°') // degree indicators
      .replace(/[`'ʹʼˈ׳′ꞌ]{1}/g, "'") // single quotes
      .replace("''", '"') //two single quotes
      .replace(/["„“”]+/g, '"') // double quote
      .replace(/\,+/g, '.') //commas to dots

    return normalized
  }
}