describe('Normalizer', () => {
  describe('Normalizer', () => {
    test('Normalize verify', () => {
      expect(`41° 25' 01" W`).toBe(`41° 25' 01" W`);
    });
  });

  describe('Normalize verifying degrees indicators: ( ° º o ° ˚ ̊  ⁰ ∘ ◦ ॰)', () => {
    test.each([
      `41° 25' 01" W`,
      `41º 25' 01" W`,
      `41o 25' 01" W`,
      `41° 25' 01" W`,
      `41˚ 25' 01" W`,
      `41̊ 25' 01" W`,
      `41⁰ 25' 01" W`,
      `41∘ 25' 01" W`,
      `41◦ 25' 01" W`,
      `41॰ 25' 01" W`,
    ])('Normalize verify', (data) => {
      expect(data).toBe(`41° 25' 01" W`);
    });
  });
});

describe.only('Unicode', () => {
  describe('graus', () => {
    /*
    test('Vrifica o unicode', () => {
        ['°', 'º', 'o', '˚', '̊', '⁰', '∘', '◦', '॰'].map(item => item.)
    })    
        °: U+00B0
        º: U+00BA, // <--- padrão. é o Alt+167
        o: U+006F
        ˚: U+02DA
        ̊: U+030A
        ⁰: U+2070
        ∘: U+2218
        ◦: U+25E6
        ॰: U+0970
    */
    test('', () => {
      const replaced = `41° 25' 01" W`.replace(/\u{00B0}|\u{00BA}|\u{006F}|\u{02DA}|\u{030A}|\u{2070}|\u{2218}|\u{25E6}|\u{0970}/ug, '°');
      console.log(replaced);
      
    });
  });
});

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
