const coords = require('./index')

// Normalize
console.log(coords.normalize('12º 12 23'));

// Parse
console.log(coords.parse('12º 12 23'));

// Converts to Float, like: -12.2342355
console.log(coords.toFloat('12º 12 45'))

// Converts to string accordly by options in second param
console.log(coords.convert('12º 12 45', { signal: true }))

// Converts to string accordly by options in second param
console.log(coords.toString(
  { signal: '+', compass: false, degrees: 12, minutes: 12, seconds: 23 },
  { signal: true }
))
