interface DMS {
  degrees: number;
  minutes: number;
  seconds: number;
}

function decimalToDMS(decimal: number): DMS {
  const degrees = Math.floor(decimal);
  const minutesDecimal = (decimal - degrees) * 60;
  const minutes = Math.floor(minutesDecimal);
  const seconds = (minutesDecimal - minutes) * 60;
  return { degrees, minutes, seconds };
}

function dmsToDecimal(dms: DMS): number {
  const { degrees, minutes, seconds } = dms;
  return degrees + minutes / 60 + seconds / 3600;
}

describe('', () => {
  describe('Decimal to DMS', () => {
    test.each([
      //
      { input: 129.123, expected: { degrees: 129, minutes: 7, seconds: 22.8 } },
      { input: 100.508333, expected: { degrees: 100, minutes: 30, seconds: 30 } },
      { input: 45, expected: { degrees: 45, minutes: 0, seconds: 0 } },
      { input: 90.75, expected: { degrees: 90, minutes: 45, seconds: 0 } },
      { input: 90.0125, expected: { degrees: 90, minutes: 0, seconds: 45 } },
    ])('%s deve gerar o objeto correto', (data) => {
      const result = decimalToDMS(data.input);
      console.log('input:', data.input, 'expected:', data.expected, 'result:', result);
      
      expect(result).toBeDefined();
      expect(result.degrees).toBe(data.expected.degrees);
      expect(result.minutes).toBe(data.expected.minutes);
      expect(result.seconds).toBeCloseTo(data.expected.seconds);
    });
  });

  describe('DMS to Decimal', () => {
    test.each([
      //
      { input: { degrees: 129, minutes: 7, seconds: 22.8 }, expected: 129.123 },
      { input: { degrees: 100, minutes: 30, seconds: 30 }, expected: 100.508333 },
      { input: { degrees: 45, minutes: 0, seconds: 0 }, expected: 45 },
      { input: { degrees: 90, minutes: 45, seconds: 0 }, expected: 90.75 },
      { input: { degrees: 90, minutes: 0, seconds: 45 }, expected: 90.0125 },
    ])('%s deve gerar o decimal correto', (data) => {
      const result = dmsToDecimal(data.input);
      console.log('input:', data.input, 'expected:', data.expected, 'result:', result);
      
      expect(result).toBeDefined();
      expect(result).toBeCloseTo(data.expected);
    });
  });
});
