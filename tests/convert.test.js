const test = require('tape')


const { convert } = require('../index')

const { log } = console
log(convert('41 12 34N', { seconds: false }))

test('Convert coordinates between formats', t => {
  t.equal(convert('41 12 34N'), `41° 12' 34" N`, `Convert 41N expecting 41° 12' 34" N`)
  // t.equal(convert('41 12 34N', { seconds: false }), `41° 12' N`, `Convert 41N expecting 41° 0' N`)


  t.end()
})

