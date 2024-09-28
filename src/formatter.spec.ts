import { getCases } from '../test/data';
import { ExtendedDMS } from './_interfaces/interface';
import { Formatter } from './formatter';
import { Parser } from './parser';

describe('Formatter', () => {
  test.each([
    { value: '30', expected: 30 },
    { value: '30 30', expected: 30.5 },
    { value: '90º50 49', expected: 91.65 },
    { value: 91.65, expected: 91.65 },
  ])('parse %s to int', (input) => {
    const calculatedFloat = new Formatter(new Parser(input.value)).toDecimal();
    console.log({ input, calculatedFloat });
    expect(+calculatedFloat.toFixed(5)).toBe(input.expected);
  });

  test.only.each(getCases())('format(%s)', (input) => {
    const parse = new Parser(input);

    const formatFn = (data: ExtendedDMS) => `${data.degrees}° ${data.minutes}'${data.compass||''}`

    const formated = new Formatter(parse).format(formatFn);
    // console.log('formated', formated);
    expect(formated).toBe(formatFn(parse))
    // console.log({ input, calculatedFloat });
    // expect(+calculatedFloat.toFixed(5)).toBe(input.expected)
  });
});
