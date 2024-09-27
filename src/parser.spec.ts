import { getCases } from './data';
import { Parser } from './parser';

describe('Parse', () => {
  describe('Parse', () => {
    const formats = [
      // DMS
      { input: '41 25 01N', expected: { signal: '+', compass: 'N', degrees: 41, minutes: 25, seconds: 1 } },
      { input: '41°25\'01"N', expected: { signal: '+', compass: 'N', degrees: 41, minutes: 25, seconds: 1 } },
      { input: 'S17 33 08.352', expected: { signal: '-', compass: 'S', degrees: 17, minutes: 33, seconds: 8.352 } },
      { input: '+17 33 08.352', expected: { signal: '+', compass: false, degrees: 17, minutes: 33, seconds: 8.352 } },
      { input: '-41°25\'01"', expected: { signal: '-', compass: false, degrees: 41, minutes: 25, seconds: 1 } },

      // DM
      { input: '41 25N', expected: { signal: '+', compass: 'N', degrees: 41, minutes: 25, seconds: 0 } },
      { input: "41°25'N", expected: { signal: '+', compass: 'N', degrees: 41, minutes: 25, seconds: 0 } },
      { input: 'N41 25.117', expected: { signal: '+', compass: 'N', degrees: 41, minutes: 25, seconds: 7.020000000000053 } },
      { input: '-41 25.117', expected: { signal: '-', compass: false, degrees: 41, minutes: 25, seconds: 7.020000000000053 } },
      { input: "-41°25'", expected: { signal: '-', compass: false, degrees: 41, minutes: 25, seconds: 0 } },

      // D
      { input: '41 N', expected: { signal: '+', compass: 'N', degrees: 41, minutes: 0, seconds: 0 } },
      { input: '41°N ', expected: { signal: '+', compass: 'N', degrees: 41, minutes: 0, seconds: 0 } },
      { input: 'N41.092', expected: { signal: '+', compass: 'N', degrees: 41, minutes: 5, seconds: 31.199999999995498 } },
      { input: '90S', expected: { signal: '-', compass: 'S', degrees: 90, minutes: 0, seconds: 0 } },
      { input: '-41°', expected: { signal: '-', compass: false, degrees: 41, minutes: 0, seconds: 0 } },
      { input: '+N41.092', expected: { signal: '+', compass: 'N', degrees: 41, minutes: 5, seconds: 31.199999999995498 } },

      // DMS que precisam ser normalizados
      { input: '41º 25\' 01"', expected: { signal: '+', compass: false, degrees: 41, minutes: 25, seconds: 1 } },
      { input: '41º 25ʼ  01"', expected: { signal: '+', compass: false, degrees: 41, minutes: 25, seconds: 1 } },
      { input: "41º    25' 01ʼʼ", expected: { signal: '+', compass: false, degrees: 41, minutes: 25, seconds: 1 } },

      // Decimal
      // TODO incluir decimais
    ];

    test.each(formats)('DMS %s', (data) => {
      const parse = new Parser(data.input);
      console.log(data.input, parse);
    });
  });
});

// // const test = require('tape')

// const { normalize, parse } = require('../dist/CoordsFormater')
// // const coords = require('../index')

// // { Format : Expected }
// const formats = {
//   // DMS
//   '41 25 01N': { signal: '+', compass: 'N', degrees: 41, minutes: 25, seconds: 1 },
//   '41°25\'01"N': { signal: '+', compass: 'N', degrees: 41, minutes: 25, seconds: 1 },
//   'S17 33 08.352': { signal: '-', compass: 'S', degrees: 17, minutes: 33, seconds: 8.352 },
//   '+17 33 08.352': { signal: '+', compass: false, degrees: 17, minutes: 33, seconds: 8.352 },
//   '-41°25\'01"': { signal: '-', compass: false, degrees: 41, minutes: 25, seconds: 1 },

//   // DM
//   '41 25N': { signal: '+', compass: 'N', degrees: 41, minutes: 25, seconds: 0 },
//   '41°25\'N': { signal: '+', compass: 'N', degrees: 41, minutes: 25, seconds: 0 },
//   'N41 25.117': { signal: '+', compass: 'N', degrees: 41, minutes: 25, seconds: 7.020000000000053 },
//   '-41 25.117': { signal: '-', compass: false, degrees: 41, minutes: 25, seconds: 7.020000000000053 },
//   '-41°25\'': { signal: '-', compass: false, degrees: 41, minutes: 25, seconds: 0 },

//   // D
//   '41 N': { signal: '+', compass: 'N', degrees: 41, minutes: 0, seconds: 0 },
//   '41°N ': { signal: '+', compass: 'N', degrees: 41, minutes: 0, seconds: 0 },
//   'N41.092': { signal: '+', compass: 'N', degrees: 41, minutes: 5, seconds: 31.199999999995498 },
//   '90S': { signal: '-', compass: 'S', degrees: 90, minutes: 0, seconds: 0 },
//   '-41°': { signal: '-', compass: false, degrees: 41, minutes: 0, seconds: 0 },
//   '+N41.092': { signal: '+', compass: 'N', degrees: 41, minutes: 5, seconds: 31.199999999995498 },

//   // DMS que precisam ser normalizados
//   '41º 25\' 01"': { signal: '+', compass: false, degrees: 41, minutes: 25, seconds: 1 },
//   '41º 25ʼ  01"': { signal: '+', compass: false, degrees: 41, minutes: 25, seconds: 1 },
//   '41º    25\' 01ʼʼ': { signal: '+', compass: false, degrees: 41, minutes: 25, seconds: 1 },
// }

// test('Parsing coordinates with format: Degree Minute Second', t => {
//   const formats = {
//     // DMS
//     '41 25 01N': { signal: '+', compass: 'N', degrees: 41, minutes: 25, seconds: 1 },
//     '41°25\'01"N': { signal: '+', compass: 'N', degrees: 41, minutes: 25, seconds: 1 },
//     'S17 33 08.352': { signal: '-', compass: 'S', degrees: 17, minutes: 33, seconds: 8.352 },
//     '+17 33 08.352': { signal: '+', compass: false, degrees: 17, minutes: 33, seconds: 8.352 },
//     '-41°25\'01"': { signal: '-', compass: false, degrees: 41, minutes: 25, seconds: 1 },
//   }

//   Object.keys(formats)
//     .forEach(format => t.deepEqual(parse(format), formats[format], `Parsing format: ${format}`))
//   t.end()
// })

// test('Parsing coordinates with format: Degree Minute', t => {
//   const formats = {
//     // DM
//     '41 25N': { signal: '+', compass: 'N', degrees: 41, minutes: 25, seconds: 0 },
//     '41°25\'N': { signal: '+', compass: 'N', degrees: 41, minutes: 25, seconds: 0 },
//     'N41 25.117': { signal: '+', compass: 'N', degrees: 41, minutes: 25, seconds: 7.020000000000053 },
//     '-41 25.117': { signal: '-', compass: false, degrees: 41, minutes: 25, seconds: 7.020000000000053 },
//     '-41°25\'': { signal: '-', compass: false, degrees: 41, minutes: 25, seconds: 0 },
//   }

//   Object.keys(formats)
//     .forEach(format => t.deepEqual(parse(format), formats[format], `Parsing format: ${format}`))
//   t.end()
// })

// test('Parsing coordinates with format: Degree', t => {
//   const formats = {
//     // D
//     '41 N': { signal: '+', compass: 'N', degrees: 41, minutes: 0, seconds: 0 },
//     '41°N ': { signal: '+', compass: 'N', degrees: 41, minutes: 0, seconds: 0 },
//     'N41.092': { signal: '+', compass: 'N', degrees: 41, minutes: 5, seconds: 31.199999999995498 },
//     '90S': { signal: '-', compass: 'S', degrees: 90, minutes: 0, seconds: 0 },
//     '-41°': { signal: '-', compass: false, degrees: 41, minutes: 0, seconds: 0 },
//     '+N41.092': { signal: '+', compass: 'N', degrees: 41, minutes: 5, seconds: 31.199999999995498 },
//   }

//   Object.keys(formats)
//     .forEach(format => t.deepEqual(parse(format), formats[format], `Parsing format: ${format}`))
//   t.end()
// })

// test('Parsing coordinates with format: Degree Minute Second and needing to be normalized', t => {
//   const formats = {
//     // DMS que precisam ser normalizados
//     '41º 25\' 01"': { signal: '+', compass: false, degrees: 41, minutes: 25, seconds: 1 },
//     '41º 25ʼ  01"': { signal: '+', compass: false, degrees: 41, minutes: 25, seconds: 1 },
//     '41º    25\' 01ʼʼ': { signal: '+', compass: false, degrees: 41, minutes: 25, seconds: 1 },
//   }

//   Object.keys(formats)
//     .forEach(format => t.deepEqual(parse(format), formats[format], `Parsing format: ${format}`))
//   t.end()
// })
