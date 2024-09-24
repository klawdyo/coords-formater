import { Coord, Formatter, Parse } from "./coord";

const cases = [
  `41 25 01N`,
  `41°25'01"N`,
  `S17 33 08.352`,
  `+17 33 08.352`,
  `-41°25'01"`,
  `41 25N`,
  `41°25'N`,
  `N41 25.117`,
  `-41 25.117`,
  `-41°25'`,
  `41 N`,
  `41°N`,
  `N41.092`,
  `90S`,
  `-41°`,
  `+N41.092`,
]

describe('Parse', () => {
  describe('parse', () => {
    test.each(cases)('Parse %s', (value) => {

      console.log(value, new Parse(value));

      // expect(match).toBeDefined()
    })
  })
})

describe('Formatter', () => {
  test.each([
    { value: '30', expected: 30 },
    { value: '30 30', expected: 30.5 },
    { value: '90º50 49', expected: 91.65 },
    { value: 91.65, expected: 91.65 },
  ])('parse %s to int', (input) => {
    const calculatedFloat = new Formatter(new Parse(input.value)).toFloat()
    console.log({ input, calculatedFloat });
    expect(+calculatedFloat.toFixed(5)).toBe(input.expected)
  })

  test.only.each(cases)('parse %s to int', (input) => {
    const format = new Formatter(new Parse(input))
    console.log(format.format(({ signal, minute }) => `${signal}${minute}`));

    // console.log({ input, calculatedFloat });
    // expect(+calculatedFloat.toFixed(5)).toBe(input.expected)
  })
})

describe('Coord', () => {
  test.each(cases)('parse %s to int', (input) => {
    const coord = new Coord(input, input)
    // console.log(coord.getLatitude());
    console.log(coord.getLatitude({ indicator: 'compass' }));

  })
})

