import { getCases } from './data';
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

  test.only.each(getCases())('parse %s to int', (input) => {
    const format = new Formatter(new Parser(input));
    console.log(format.format(({ signal, minute }) => `${signal}${minute}`));

    // console.log({ input, calculatedFloat });
    // expect(+calculatedFloat.toFixed(5)).toBe(input.expected)
  });
});
