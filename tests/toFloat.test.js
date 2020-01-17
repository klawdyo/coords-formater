const test = require('tape')


const { toFloat } = require('../index')
const { log: _ } = console


test('Testing if result type is number', t => {

  t.equal(typeof toFloat('42 12 10'), 'number', 'toFloat(42 12 10) is a number')
  t.equal(typeof toFloat('S42 12 10'), 'number', 'toFloat(S42 12 10) is a number')

  t.end()
})

test('Testing if toFloat() asserts return', t => {

  t.equal(toFloat('42 12 10'), 42.202777777777776, 'toFloat(42 12 10) is 42.202777777777776')
  t.equal(toFloat('S42 12 10'), -42.202777777777776, 'toFloat(S42 12 10) is -42.202777777777776')

  t.end()
})

