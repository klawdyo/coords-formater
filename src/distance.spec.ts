import { Coord } from "./coord"
import { Distance } from "./distance"

describe('Distance', () => {
  describe('defined', () => {
    test('', () => {

    })
  })

  describe('calculate', () => {
    test('Calcula a distância entre 2 pontos', () => {
      const from = new Coord(-27.584905257808835, -48.545022195325124);
      const to = new Coord(-27.496887588317275, -48.522234807851476);
      expect(Distance.calculate(from, to)).toBeCloseTo(10);
    })
  })

 
})