import { Converter } from "./converter";

describe('', () => {
  describe('Decimal to DMS', () => {
    test.each([
      //
      { input: 129.123, expected: { degree: 129, minute: 7, second: 22.8 } },
      { input: 100.508333, expected: { degree: 100, minute: 30, second: 30 } },
      { input: 45, expected: { degree: 45, minute: 0, second: 0 } },
      { input: 90.75, expected: { degree: 90, minute: 45, second: 0 } },
      { input: 90.0125, expected: { degree: 90, minute: 0, second: 45 } },
    ])('%s deve gerar o objeto correto', (data) => {
      const result = Converter.decimalToDMS(data.input);
      console.log('input:', data.input, 'expected:', data.expected, 'result:', result);
      
      expect(result).toBeDefined();
      expect(result.degree).toBe(data.expected.degree);
      expect(result.minute).toBe(data.expected.minute);
      expect(result.second).toBeCloseTo(data.expected.second);
    });
  });

  describe('DMS to Decimal', () => {
    test.each([
      //
      { input: { degree: 129, minute: 7, second: 22.8 }, expected: 129.123 },
      { input: { degree: 100, minute: 30, second: 30 }, expected: 100.508333 },
      { input: { degree: 45, minute: 0, second: 0 }, expected: 45 },
      { input: { degree: 90, minute: 45, second: 0 }, expected: 90.75 },
      { input: { degree: 90, minute: 0, second: 45 }, expected: 90.0125 },
    ])('%s deve gerar o decimal correto', (data) => {
      const result = Converter.dmsToDecimal(data.input);
      console.log('input:', data.input, 'expected:', data.expected, 'result:', result);
      
      expect(result).toBeDefined();
      expect(result).toBeCloseTo(data.expected);
    });
  });
});
