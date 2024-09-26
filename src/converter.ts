import { DMS } from "./coord";

export class Converter {
    static decimalToDMS(decimal: number): DMS {
      const degree = Math.floor(decimal);
      const minutesDecimal = (decimal - degree) * 60;
      const minute = Math.floor(minutesDecimal);
      const second = (minutesDecimal - minute) * 60;
      return {
        degree,
        minute,
        second,
      };
    }
  
    static dmsToDecimal(dms: DMS): number {
      const { degree, minute, second } = dms;
      return degree + minute / 60 + second / 3600;
    }
  }
  