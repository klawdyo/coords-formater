import { Compass } from "../_enums/compass.enum";

export interface Indicator {
  compass?: Compass;
  signal: string;
}

export interface DMS {
  degrees: number;
  minutes: number;
  seconds: number;
  signal: string;
  // compass?: Compass;
  // decimal?: number;
}

export interface Decimal {
  decimal: number
}

export type ExtendedDMS = DMS & Decimal & Indicator;