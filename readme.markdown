# Introduction

This library is intended to facilitate the use of coordinates, making conversions between formats and preparing the fields to receive this type of data effortlessly.

# Instalation

```js
// Es6 module pattern
import coords from 'coords'

// Node module pattern
const coords = require('coords')
```

## Destructing

```javascript
// Es6 module pattern
import {convert, parse} from 'coords'

// Node module pattern
const {normalize} = require('coords')
```

# Properties

The `properties` below can be used to configurate some methods, `convert()`.

Property|Description|Default Value|Type
---|---|---|---
degress|Show degrees. Always true|*true*|*boolean*
minutes|Show minutes|*true*|*boolean*
seconds|Show seconds. False if minutes is also false|*true*|*boolean*
spaces|Show spaces between parts|*true*|*boolean*
degreeIndicator|Degree part indicator|*°*|*string*
minuteIndicator|Minute part indicator|*'*|*string*
secondIndicator|Second part indicator|*"*|*string*
showSign|Configure to show `[+/-]` sign at start|*true*|*boolean*
showCompassDirection|Configure to show compass direction at end|*true*|*boolean*
decimalSeparator|Last part's decimal separator|*.*|*string*
decimalPlaces|Number of decimal places|*5*|*integer*


# Methods

## normalize( `String` coordinate  )

Normalizes input coordinate, removing unpattern characters

### Parameters

Name|Type|Optional|Description
---|---|---|---
coordinate|`String`|required|Coordinate in any [Accepted Input Formats](#accepted-input-formats)

### Example

```javascript
// Import
const {normalize} = require('coord');

// Replaces "º" by "°"
normalize('41º 12.123"') // 41° 12.123"
```

## parse( `String` coordinate )

Extract coordinates components from passed string

### Parameters

Name|Type|Optional|Description
---|---|---|---
coordinate|`String`|required|Coordinate in any [Accepted Input Formats](#accepted-input-formats)

### Example

```javascript
const {parse} = require('coords');

parse('S17 33 08.352')
/*Returns
{
    compass:"S"
    degrees:17
    minutes:33
    seconds:8.352
    signal:"-"
}*/
```


## convert( `String` coordinate [ , options ] )

Convert `cordinate` to other format according `options`

### Parameters

Name|Type|Optional|Description
---|---|---|---
coordinate|`String`|required|Coordinate in any [Accepted Input Formats](#accepted-input-formats)
options|``Object``|optional|[Properties object](#properties)

### Example

```javascript

const {convert} = require('coords') ;

convert('41° 25\' 01" W', { 
  showSign: true, showCompassDirection:false, minutes:false 
} )
/*Returns
    - 41.41694444444445°
*/
```

# Accepted Input Formats

- 41 25 01N
- 41°25'01"N
- S17 33 08.352
- +17 33 08.352
- -41°25'01"
- 41 25N
- 41°25'N
- N41 25.117
- -41 25.117
- -41°25'
- 41 N
- 41°N
- N41.092
- 90S
- -41°
- +N41.092



# License

MIT

# Copyright

(c) klawdyo.com (klawdyo) 2017


