// const test = require('tape')

// const { toString, parse } = require('../dist/CoordsFormater')
// const { log: _ } = console


// const formats = [
//   { coordinate: `41 25 01N`, expected: `41° 25' 1" N` },
//   { coordinate: `41°25'01"N`, expected: `41° 25' 1" N` },
//   { coordinate: `S17 33 08.352`, expected: `17° 33' 8.352" S` },
//   { coordinate: `+17 33 08.352`, expected: `17° 33' 8.352"` },
//   { coordinate: `-41°25'01"`, expected: `41° 25' 1"` },
//   { coordinate: `41 25N`, expected: `41° 25' 0" N` },
//   { coordinate: `41°25'N`, expected: `41° 25' 0" N` },
//   { coordinate: `N41 25.117`, expected: `41° 25' 7.020000000000053" N` },
//   { coordinate: `-41 25.117`, expected: `41° 25' 7.020000000000053"` },
//   { coordinate: `-41°25'`, expected: `41° 25' 0"` },
//   { coordinate: `41 N`, expected: `41° 0' 0" N` },
//   { coordinate: `41°N `, expected: `41° 0' 0" N` },
//   { coordinate: `N41.092`, expected: `41° 5' 31.199999999995498" N` },
//   { coordinate: `90S`, expected: `90° 0' 0" S` },
//   { coordinate: `-41°`, expected: `41° 0' 0"` },
//   { coordinate: `+N41.092`, expected: `41° 5' 31.199999999995498" N` },
//   { coordinate: `41º 25' 01"`, expected: `41° 25' 1"` },
//   { coordinate: `41º 25ʼ  01"`, expected: `41° 25' 1"` },
//   { coordinate: `41º 25' 01ʼʼ`, expected: `41° 25' 1"` },
// ]

// test('Testing if toString() asserts return', t => {
//   formats.forEach(format => {
//     const result = toString(parse(format.coordinate));
//     t.equal(result, format.expected, `toString(${format.coordinate}) is ${format.expected}`)
//   })



//   t.end()
// })

