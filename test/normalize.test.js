// const test = require('tape')


// const { normalize } = require('../dist/CoordsFormater')
// // const coords = require('../index')

// test('Normalize verify', t => {
//   t.assert(normalize(`41° 25' 01" W`) === `41° 25' 01" W`, 'Normal normalize')

//   t.end()
// })

// // 
// test('Normalize verifying degrees indicators: (° º o ° ˚ ̊  ⁰ ∘ ◦ ॰)', t => {
//   t.assert(normalize(`41° 25' 01" W`) === `41° 25' 01" W`, 'Normal normalize')
//   t.assert(normalize(`41o 25' 01" W`) === `41° 25' 01" W`, '"o" as degree indicator')
//   t.assert(normalize(`41º 25' 01" W`) === `41° 25' 01" W`, '"º" as degree indicator')
//   t.assert(normalize(`41º 25' 01" W`) === `41° 25' 01" W`, '"°" as degree indicator')
//   t.assert(normalize(`41º 25' 01" W`) === `41° 25' 01" W`, '"˚" as degree indicator')
//   t.assert(normalize(`41º 25' 01" W`) === `41° 25' 01" W`, '"⁰" as degree indicator')
//   t.assert(normalize(`41º 25' 01" W`) === `41° 25' 01" W`, '"∘" as degree indicator')
//   t.assert(normalize(`41º 25' 01" W`) === `41° 25' 01" W`, '"◦" as degree indicator')
//   t.assert(normalize(`41º 25' 01" W`) === `41° 25' 01" W`, '"॰" as degree indicator')


//   t.end()
// })

// test("Normalize verifying minutes indicators: ('ʹʼˈ׳′ꞌ)   ", t => {
//   t.assert(normalize('41° 25` 01" W') === `41° 25' 01" W`, '` as minutes indicator')
//   t.assert(normalize(`41° 25' 01" W`) === `41° 25' 01" W`, `' as minutes indicator`)

//   t.assert(normalize(`41° 25ʼ 01" W`) === `41° 25' 01" W`, `ʼ as minutes indicator`)
//   t.assert(normalize(`41° 25ˈ 01" W`) === `41° 25' 01" W`, `ˈ as minutes indicator`)
//   t.assert(normalize(`41° 25′ 01" W`) === `41° 25' 01" W`, `′ as minutes indicator`)
//   t.assert(normalize(`41° 25ꞌ 01" W`) === `41° 25' 01" W`, `ꞌ as minutes indicator`)

//   t.end()
// })


// test("Normalize verifying seconds indicators", t => {
//   t.assert(normalize(`41° 25' 01" W`) === `41° 25' 01" W`, `" as seconds indicator`)
//   t.assert(normalize(`41° 25' 01'' W`) === `41° 25' 01" W`, `'' (two single quote) as seconds indicator`)
//   t.assert(normalize(`41° 25' 01ʼʼ W`) === `41° 25' 01" W`, `ʼʼ (two single quote) as seconds indicator`)

//   t.end()
// })