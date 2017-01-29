#Introduction

This library is intended to facilitate the use of coordinates in HTML forms, making conversions between formats and preparing the fields to receive this type of data effortlessly.

**Has support to copy/paste events.**

###Copy event

If you enter in any field and press 'ctrl+c', you will copy the full coordinate to clipboard in the format defined in method [setSaveFormat()](https://github.com/klawdyo/coords#coordssetsaveformat-options-)

###Paste event

The generated sub-fields has support to 'paste' events. Enter in any field and press 'ctrl+v' to insert from clipboard the coordinates in format defined in [init()](https://github.com/klawdyo/coords#coordsinit-selector--options--)

#Instalation

```html
<link href="coords.css" rel="stylesheet" type="text/css" />
<script src="coords.js"></script>
```

#Usage

```html
<div class="input input-container coords w2">
    <input type="coords" name="latitude"  class="coords w2">
</div>
```

#Initialization

###Pure Javascript

```javascript
    coords.init( 'input[type="coords"]' );
```

###Using jQuery

```javascript    
    //Using default options
    $( 'input[type="coords"]' ).coords();
    //or
    //Using custom options
    $('input[type="coords"]').coords({ degrees:true, minutes: false });
```

#Properties

The `properties` below can be used to configurate some methods, like `init()` and `convert()`.

##degrees

Description|Default Value|Type
---|---|---
Show degrees. Always true|*true*|*boolean*

##minutes

Description|Default Value|Type
---|---|---
Show minutes|*true*|*boolean*

##seconds

Description|Default Value|Type
---|---|---
Show seconds. False if minutes is false too|*true*|*boolean*

##spaces   

Description|Default Value|Type
---|---|---
Spaces between parts|*true*|*boolean*

##degreeIndicator

Description|Default Value|Type
---|---|---
Degree component indicator|*°*|*string*

##minuteIndicator

Description|Default Value|Type
---|---|---
Minute component indicator|*'*|*string*

##secondIndicator

Description|Default Value|Type
---|---|---
Second component indicator|*"*|*string*

##showSign

Description|Default Value|Type
---|---|---
Configure to show sign at start|*true*|*boolean*

##showCompassDirection

Description|Default Value|Type
---|---|---
Configure to show compass direction at end|*true*|*boolean*


##decimalSeparator

Description|Default Value|Type
---|---|---
Last component's decimal separator|*.*|*string*


##decimalPlaces

Description|Default Value|Type
---|---|---
Number of decimal places|*5*|*integer*



##recalculateWidth

Description|Default Value|Type
---|---|---
Sets if sub fields changes its widths onChange|*true*|*bool*


##pasteErrorMessage

Description|Default Value|Type
---|---|---
Message showed onPaste invalid coordinate|*The pasted text isn't a valid coordinate*|*string*


#Methods

##coords.init( selector [, options ] )

Starting the library. This method hides the main input and create new HTML fields according `options` to help handling coordinates information.

###Parameters

Name|Type|Optional|Description
---|---|---|---
selector|string|required|Selector in a format accepted by `document.querySelectorAll()`
options|object|Optional|Configuration object

###Example

```javascript
//Generate sub-fields with default configs
coords.init('input.coords')
//or
//Generate sub-fields with custom configs
coords.init('input.coords', { showSign:true, showCompassDirection: false })
/*Returns
    class object
*/
```

On form submit, the coordinate's format send to server backend is [+/-] dd.dddd. This values is update on each change in sub-fields.

##coords.parse( coordinate )

Extract coordinates components from passed string

###Parameters

Name|Type|Optional|Description
---|---|---|---
coordinate|string|required|Selector in a format accepted by `document.querySelectorAll()`

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

###Parameters

Name|Type|Optional|Description
---|---|---|---
coordinate|string|required|Selector in a format accepted by `document.querySelectorAll()`
options|JSON object|optional|Configuration object

###Example

```javascript
coords.convert('41° 25\' 01" W', { showSign: true, showCompassDirection:false, minutes:false } )
/*Returns
    - 41.41694444444445°
*/
```

##coords.setSaveFormat( options )


Set options to coordinate's save format. If is not used, the save format will be the same used to generate fields

###Parameters

Name|Type|Optional|Description
---|---|---|---
options|JSON object|optional|Configuration object. This uses the same properties used in init() to define saving format.

###Example

```javascript
coords.setSaveFormat( { showSign: true, showCompassDirection:false, minutes:false } )
/*Returns
    - 41.41694444444445°
*/
```



#Copyright

(c) claudiomedeiros.net (klawdyo) 2017
