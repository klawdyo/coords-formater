// const coords = require('../index.js')
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


// // Cria um registro no ponto para gerar todos os resultados esperados
// const toString = () => {
//   let buff = '[\n';
//   Object.keys(formats).forEach((format, i) => {

//     buff += '\t{coordinate: `' + format + '`, expected:`' + coords.toString(coords.parse(format)) + '`},\n'


//   })

//   buff += ']'

//   console.log(buff)

// }

// // toString()

// const parts = {
//   compass: "S",
//   degrees: 17,
//   minutes: 33,
//   seconds: 8.352,
//   signal: "-",
// }

// // Configuration options
// const options = {
//   showSign: false, showCompassDirection: true
// }

// console.log('', coords.toString(parts, options))