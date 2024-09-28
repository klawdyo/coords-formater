/* eslint-disable @typescript-eslint/no-unused-vars */
import { Compass } from './_enums/compass.enum';
import { Parser } from './parser';

describe('Parse', () => {
  describe('Parse', () => {
    const formats = [
      // // DMS
      { input: '41 25 01N', expected: { signal: '+', compass: Compass.NORTH, degrees: 41, minutes: 25, seconds: 1 } },
      { input: '41°25\'01"N', expected: { signal: '+', compass: Compass.NORTH, degrees: 41, minutes: 25, seconds: 1 } },
      { input: 'S17 33 08.352', expected: { signal: '-', compass: Compass.SOUTH, degrees: -17, minutes: 33, seconds: 8.352 } },
      { input: '+17 33 08.352', expected: { signal: '+', compass: undefined, degrees: 17, minutes: 33, seconds: 8.352 } },
      { input: '-41°25\'01"', expected: { signal: '-', compass: undefined, degrees: -41, minutes: 25, seconds: 1 } },

      // DM
      { input: '41 25N', expected: { signal: '+', compass: Compass.NORTH, degrees: 41, minutes: 25, seconds: 0 } },
      { input: "41°25'N", expected: { signal: '+', compass: Compass.NORTH, degrees: 41, minutes: 25, seconds: 0 } },
      { input: 'N41 25.117', expected: { signal: '+', compass: Compass.NORTH, degrees: 41, minutes: 25, seconds: 7.0212 } },
      { input: '-41 25.117', expected: { signal: '-', compass: undefined, degrees: -41, minutes: 25, seconds: 7.0212 } },
      { input: "-41°25'", expected: { signal: '-', compass: undefined, degrees: -41, minutes: 25, seconds: 0.0 } },

      // D
      { input: '41 N', expected: { signal: '+', compass: Compass.NORTH, degrees: 41, minutes: 0, seconds: 0 } },
      { input: '41°N ', expected: { signal: '+', compass: Compass.NORTH, degrees: 41, minutes: 0, seconds: 0 } },
      { input: '90S', expected: { signal: '-', compass: Compass.SOUTH, degrees: -90, minutes: 0, seconds: 0 } },
      { input: '-41°', expected: { signal: '-', compass: undefined, degrees: -41, minutes: 0, seconds: 0 } },
      { input: 'N41.092', expected: { signal: '+', compass: Compass.NORTH, degrees: 41, minutes: 5, seconds: 31.2 } },
      { input: '+N41.092', expected: { signal: '+', compass: Compass.NORTH, degrees: 41, minutes: 5, seconds: 31.2 } },

      // DMS que precisam ser normalizados
      { input: '41º 25\' 01"', expected: { signal: '+', compass: undefined, degrees: 41, minutes: 25, seconds: 1 } },
      { input: '41º 25ʼ  01"', expected: { signal: '+', compass: undefined, degrees: 41, minutes: 25, seconds: 1 } },
      { input: '41º    25ʼ    01"', expected: { signal: '+', compass: undefined, degrees: 41, minutes: 25, seconds: 1 } },

      // Decimal
      { input: 123.456789, expected: { signal: '+', compass: undefined, degrees: 123, minutes: 27, seconds: 24.4404 } },
      { input: -123.456789, expected: { signal: '-', compass: undefined, degrees: -123, minutes: 27, seconds: 24.4404 } },
    ];

    test.each(formats)('DMS %s', (data) => {
      const parse = new Parser(data.input);

      expect(parse).toBeDefined();
      expect(parse.degrees).toBeCloseTo(data.expected.degrees || 0);
      expect(parse.minutes).toBeCloseTo(data.expected.minutes || 0);
      expect(parse.seconds).toBeCloseTo(data.expected.seconds || 0);
    });
  });
});
