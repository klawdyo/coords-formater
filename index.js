"use strict";
/********************************************
  @description
  Coordinates parser and conversor between formats

  @example
  const {parse} = require('coords')
  parse('S17 33 08.352')
  Returns
  {
    compass:"S"
    degrees:17
    minutes:33
    seconds:8.352
    signal:"-"
  }

  - Accepted input formats
     41 25 01N
     41°25'01"N
     S17 33 08.352
     +17 33 08.352
     -41°25'01"
     41 25N
     41°25'N
     N41 25.117
     -41 25.117
     -41°25'
     41 N
     41°N
     N41.092
     90S
     -41°
     +N41.092



 *****************************/
var CoordsFormater = require('./dist/CoordsFormater');

// function Coords() {

// return {
const Coords = {
  normalize: function (strCoord) {
    return CoordsFormater.normalize(strCoord)
  },

  parse: function (strCoord) {
    return CoordsFormater.parse(strCoord)
  },

  toFloat: function (strCoord) {
    return CoordsFormater.toFloat(strCoord)
  },

  convert: function (strCoord, options = {}) {
    return CoordsFormater.convert(strCoord, options)
  },

  toString: function (parsedCoord, options = {}) {
    return CoordsFormater.toString(parsedCoord, options)
  },

  // };
}

module.exports = Coords;