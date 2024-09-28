import { DMS } from './_interfaces/interface';
import { truncate } from './_lib/truncate';

const DECIMAL_PLACES = 6;

export class Converter {
  static decimalToDMS(value: number): DMS {
    const factor = value < 0 ? -1 : 1;
    const decimal = Math.abs(value);

    const degrees = truncate(decimal, 0);
    const minutesDecimal = truncate((decimal - degrees) * 60, DECIMAL_PLACES);
    const minutes = truncate(minutesDecimal, 0);

    const seconds = truncate((minutesDecimal - minutes >= 0 ? minutesDecimal - minutes : 0) * 60, DECIMAL_PLACES);
    return {
      degrees: degrees * factor,
      minutes,
      seconds,
      signal: degrees < 0 ? '-' : '+',
    };
  }

  static dmsToDecimal(dms: DMS): number {
    const factor = dms.degrees < 0 ? -1 : 1;
    dms.degrees = Math.abs(dms.degrees);

    const { degrees = 0, minutes = 0, seconds = 0 } = dms;
    const result = Number((degrees + minutes / 60 + seconds / 3600).toFixed(DECIMAL_PLACES));

    return result * factor;
  }

  /**
   *
   * Tenta normalizar o dms.
   * Por exemplo:
   * Se receber um objeto aassim: { degrees: 42.1  } devolver { degrees: 42, minutes: 4 }
   *
   */
  static normalizeDMS(dms: DMS): DMS {
    return Converter.decimalToDMS(Converter.dmsToDecimal(dms));
  }
}
