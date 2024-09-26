import { Coord } from './coord';
import { getCases } from './data';

describe('Coord', () => {
  test.each(getCases())('parse %s to int', (input) => {
    const coord = new Coord(input, input);
    // console.log(coord.getLatitude());
    console.log(coord.getLatitude({ indicator: 'compass' }));
  });
});
