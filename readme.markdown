# Introduction

This library is intended to facilitate the use of coordinates, making conversions between formats and preparing the fields to receive this type of data effortlessly.

# Instalation

```js
// Es6 module pattern
import coords from 'coords'

// Node module pattern
const coords = require('coords')
```

## Destructuring

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
degrees|Show degrees. Always true|`true`|`Boolean`
minutes|Show minutes|`true`|`Boolean`
seconds|Show seconds. False if minutes is also false|`true`|`Boolean`
spaces|Show spaces between parts|`true`|`Boolean`
degreeIndicator|Degree part indicator|`°`|`String`
minuteIndicator|Minute part indicator|`'`|`String`
secondIndicator|Second part indicator|`"`|`String`
showSign|Configure to show `[+/-]` sign at start|`true`|`Boolean`
showCompassDirection|Configure to show compass direction at end|`true`|`Boolean`
decimalSeparator|Last part's decimal separator|`.`|`String`
decimalPlaces|Number of decimal places|`5`|*Integer*


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
normalize('41º 12.123"') 

// Returns
// 41° 12.123"
```
------

## parse( `String` coordinate )

Extract coordinates components from passed string

### Parameters

Name|Type|Optional|Description
---|---|---|---
coordinate|`String`|required|Coordinate in any [Accepted Input Formats](#accepted-input-formats)

### Example

```javascript
const {parse} = require('coords');

parse('S17 33 08.352');

/*Returns
{
    compass:"S",
    degrees:17,
    minutes:33,
    seconds:8.352,
    signal:"-"
}*/
```

------
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
  showSign: true, 
  showCompassDirection:false, 
  minutes:false 
  } 
);

// Returns
// - 41.41694444444445°

```
------
## toString( `Object` parsedCoordinate [ , options ] )

Convert the object `parsedCordinate` to other format according `options`

### Parameters

Name|Type|Optional|Description
---|---|---|---
parsedCordinate|`Object`|required|Object of coordinates parts, like returned by parse()
options|``Object``|optional|[Properties object](#properties)

### Example

```javascript

const {toString} = require('coords') ;

// object returned by parse()
const parts = {
  compass:"S",
  degrees:17,
  minutes:33,
  seconds:8.352,
  signal:"-"
}

// Configuration options
const options = {
  showSign:false, 
  showCompassDirection:true
}

toString(parts, options );

// Returns 
// 17° 33' 8.352" S
```

------
## toFloat( `String` coordinate [ , options ] )

Convert `cordinate` to numeric format with float type

### Parameters

Name|Type|Optional|Description
---|---|---|---
coordinate|`String`|required|Coordinate in any [Accepted Input Formats](#accepted-input-formats)

### Example

```javascript

const {toFloat} = require('coords') ;

toFloat('42 12 10')
// Returns
// 42.202777777777776

toFloat('S 42 12 10')
// Returns
// - 42.202777777777776
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


