import { DMS } from "./coord";

export class Converter {
    static decimalToDMS(decimal: number): DMS {
    const degrees = Math.floor(decimal);
    const minutesDecimal = (decimal - degrees) * 60;
    const minutes = Math.floor(minutesDecimal);
    const seconds = (minutesDecimal - minutes) * 60;
      return {
      degrees,
      minutes,
      seconds,
      };
    }
  
    static dmsToDecimal(dms: DMS): number {
    const { degrees = 0, minutes = 0, seconds = 0 } = dms;
    return degrees + minutes / 60 + seconds / 3600;
  }
    }
  }
  