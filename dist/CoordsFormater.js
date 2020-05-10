"use strict";function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(Object(b),!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(Object(b)).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}/********************************************
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

  
  
 *****************************/ /**
     * @var
     * Opções gerais, usado para exibição dos inputs e para conversão entre formatos
     */var defaultOptions={spaces:!0,//Spaces between parts
degrees:!0,//Show degrees. Always true
minutes:!0,//Show minutes.
seconds:!0,//Show seconds. False if minutes is false too
degreeIndicator:"\xB0",//Degree component indicator
minuteIndicator:"'",//Minute component indicator
secondIndicator:"\"",//Second component indicator
showSign:!1,//Configure to show sign at start
showCompassDirection:!0,//Configure to show compass direction at end
decimalSeparator:".",//Last component's decimal separator
decimalPlaces:5//Arredondar o último componente para um número de casas definido
//@todo: permitir renomear as direções exibidas
//'compassDirections'     : { 'north': 'N', 'east': 'E', 'west': 'W', 'south':'S' }, //change compass directions at exibition
},normalize=function(a){// 
return a+="",a.replace(/\s{2,}/g," ")// double spaces
.replace(/[°˚⁰∘◦॰ºo]+/g,"\xB0")// degree indicators
.replace(/[`'ʹʼˈ׳′ꞌ]{1}/g,"'")// single quotes
.replace("''","\"")//two single quotes
.replace(/["„“”]+/g,"\"")// double quote
.replace(/\,+/g,".");//commas to dots
},parse=function(a){a=normalize(a);//V0.1
//var pattern = /([NEWS]{1}|[-+]{1})?([0-9,\.]+°)([0-9,\.]+')?([0-9,\.]+")?([NEWS]{1})?/i;
//V0.2 - 22/01/2017 - Adicionado suporte ao formato "12 24 56"
var b=/([NEWS]{1}|[-+]{1})?\s*([0-9,\.]+\s*°?)\s*([0-9,\.]+\s*'?)?\s*([0-9,\.]+\s*"?)?\s*([NEWS]{1})?/i.exec(a);if(null==b)return!1;var c=["N","E","W","S"],d=-1===c.indexOf(b[1])?-1!==c.indexOf(b[5])&&b[5]:b[1].toUpperCase(),e="-"==b[1]||-1!==["S","W"].indexOf(d)?"-":"+",f="undefined"==typeof b[2]?0:parseFloat(b[2]),g="undefined"==typeof b[3]?0:parseFloat(b[3]),h="undefined"==typeof b[4]?0:parseFloat(b[4]);//Só tem como determinar qual a direção se for informada, pois em casos negativos podem
//tanto ser W como S, assim como o positivo podem ser N e E, dependendo se é latitude ou longitude
return 0===g&&0===h&&f!==parseInt(f)&&(g=60*(f-parseInt(f)),f=parseInt(f)),0===h&&g!==parseInt(g)&&(h=60*(g-parseInt(g)),g=parseInt(g)),{signal:e,compass:d,degrees:f,minutes:g,seconds:h}},toFloat=function(a){var b={degrees:!0,minutes:!1,seconds:!1,showSign:!0,spaces:!1,degreeIndicator:"",showCompassDirection:!1},c=parse(a);return"+"===c.signal&&(b.showSign=!1),parseFloat(toString(c,b))},convert=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{};return toString(parse(a),b)},toString=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{};b=_objectSpread(_objectSpread({},defaultOptions),b),!1===b.minutes&&(b.seconds=!1),!1===b.seconds&&(a.minutes+=a.seconds/60,a.seconds=!1),!1===b.minutes&&(a.degrees+=a.minutes/60,a.minutes=!1);var c=b.spaces?" ":"";return(//Exibindo o sinal caso a opção esteja definida
(b.showSign?a.signal+c:"")+//exibindo a parte dos graus junto com a opção do indicador
a.degrees+b.degreeIndicator//   //Exibindo a parte dos minutos
+(!0==b.minutes?c+a.minutes+b.minuteIndicator:"")//   //Exibindo a parte dos segundos
+(!0==b.seconds?c+a.seconds+b.secondIndicator:"")//   //imprimindo a direção da bússola
+(b.showCompassDirection&&a.compass?c+a.compass:"")//   //substituindo os pontos e vírgulas pela opção definida
).replace(/[,\.]+/g,b.decimalSeparator).trim()};/**
 * normalize
 * Tenta deixar a expressão em um formato padronizado
 * - Remove espaços duplicados
 * - Substitui ' ʹ ʼ ˈ ́  ׳ ′ꞌ  por '
 * - Substitui '' por "
 * - Substitui " „ “ ” por "
 * - Substitui ° ˚ ̊  ⁰ ∘ ◦ ॰ o por °
 * - Substitui , por .
 *
 * @version 0.1 21/01/2017 Initial
 *          0.2 16/01/2020 Refactoring
 *          0.3 17/01/2020 Parâmetro strCoord sempre convertido para String
 *
 * Fonte dos caracteres: http://www.fileformat.info/info/unicode/char/00b0/index.htm
 *
 * @todo: substituir os caracteres pelos seus correspondentes no unicode
 *        http://www.w3schools.com/jsref/jsref_regexp_unicode_hex.asp
 * 
 * @param string strCoord Texto com a coordenada em qualquer valor
 * @return String Coordenadas formatadas
 */module.exports={normalize:normalize,parse:parse,convert:convert,toFloat:toFloat,toString:toString};