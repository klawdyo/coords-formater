#Introduction

This library is intended to facilitate the use of coordinates in HTML forms, making conversions between formats and preparing the fields to receive this type of data effortlessly.

##Instalation

Head

```html
<link href="coords.css" rel="stylesheet" type="text/css" />
<script src="coords.js"></script>```


Body

```html
<div class="input input-container coords w2">
    <input type="coords" name="latitude"  class="coords w2">
</div>```


Before close body

```javascript
    coords.init( 'input[type="coords"]' );
```

###Using jQuery

```javascript
    $( 'input[type="coords"]' ).coords();
```

or

```javascript
    $('input[type="coords"]').coords({ degrees:true, minutes: false });
```

#Options

##degrees
Show degrees. Always true

**default** *true*

**type** *boolean*

##minutes
Show minutes

**default** *true*

**type** *boolean*

##seconds
Show seconds. False if minutes is false too

**default** *true*

**type** *boolean*


##spaces   
Spaces between parts

**default** *true*

**type** *boolean*

##degreeIndicator
Degree component indicator

**default** *°*

**type** *string*

##minuteIndicator
Minute component indicator

**default** *'*

**type** *string*

##secondIndicator
Second component indicator

**default** *"*

**type** *string*

##showSign
Configure to show sign at start

**default** *false*

**type** *boolean*

##showCompassDirection
Configure to show compass direction at end

**default** *true*

**type** *boolean*

##decimalSeparator
Last component's decimal separator

**default** *.*

**type** *string*

##decimalPlaces
Number of decimal places

**default** *5*

**type** *integer*

#Methods

##coords.init( selector [, options ] )
Starting the library

**selector** *(string)*
Selector in a format accepted by `document.querySelectorAll()`

**options** *(object) Optional*
Configuration object

###Example

```javascript
coords.parse('S17 33 08.352')
/*Returns
    class object
*/
```

##coords.parse( string )
Extract coordinates components from passed string

###Example

```javascript
coords.parse('S17 33 08.352')
/*Returns
{
    compass:"S"
    degrees:17
    minutes:33
    seconds:8.352
    signal:"-"
}*/
```

###Accepted Input Formats

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

##coords.convert( coordinate [ , options ] )
Convert `cordinate` to other format according `options`

**coordinate** *(string)*
Selector in a format accepted by `document.querySelectorAll()`

**options** *(object) Optional*
Configuration object

###Example

```javascript
coords.convert('41° 25\' 01" W', { showSign: true, showCompassDirection:false, minutes:false } )
/*Returns
    - 41.41694444444445°
*/
```



#Copyright

(c) claudiomedeiros.net (klawdyo) 2017
