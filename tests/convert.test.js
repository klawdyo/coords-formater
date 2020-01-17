const test = require('tape')
const { convert } = require('../index')

test('Convert coordinates between formats', t => {

  const from = '41 12 34N';

  t.matchConverting = function (to, options) {
    this.equal(convert(from, options), to, `Convert: ${from} Expecting: ${to}`)
  }


  t.matchConverting(`41° 12' 34" N`)
  t.matchConverting(`41° 12.566666666666666' N`, { seconds: false })
  t.matchConverting(`+ 41° 12' 34"`, { showCompassDirection: false, showSign: true })
  t.matchConverting(`41.20944444444444° N`, { minutes: false })


  t.end()
})

