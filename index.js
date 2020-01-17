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

// const coords = {

/**
     * @var
     * Opções gerais, usado para exibição dos inputs e para conversão entre formatos
     */
const defaultOptions = {
  'spaces': true,  //Spaces between parts
  'degrees': true,  //Show degrees. Always true
  'minutes': true,  //Show minutes.
  'seconds': true,  //Show seconds. False if minutes is false too
  'degreeIndicator': '°',   //Degree component indicator
  'minuteIndicator': "'",   //Minute component indicator
  'secondIndicator': '"',   //Second component indicator
  'showSign': false, //Configure to show sign at start
  'showCompassDirection': true,  //Configure to show compass direction at end
  'decimalSeparator': '.',   //Last component's decimal separator
  'decimalPlaces': 5, //Arredondar o último componente para um número de casas definido


  //@todo: permitir renomear as direções exibidas
  //'compassDirections'     : { 'north': 'N', 'east': 'E', 'west': 'W', 'south':'S' }, //change compass directions at exibition
}

/**
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
 *
 * Fonte dos caracteres: http://www.fileformat.info/info/unicode/char/00b0/index.htm
 *
 * @todo: substituir os caracteres pelos seus correspondentes no unicode
 *        http://www.w3schools.com/jsref/jsref_regexp_unicode_hex.asp
 * 
 * @param string strCoord Texto com a coordenada em qualquer valor
 * @return String Coordenadas formatadas
 */
const normalize = function (strCoord) {
  return strCoord.replace(/\s{2,}/g, " ") // double spaces
    .replace(/[°˚⁰∘◦॰ºo]+/g, '°') // degree indicators
    .replace(/[`'ʹʼˈ׳′ꞌ]{1}/g, "'") // single quotes
    .replace("''", '"') //two single quotes
    .replace(/["„“”]+/g, '"') // double quote
    .replace(/\,+/g, '.') //commas to dots
}

/**
 * parse()
 * Pega os componentes da coordenada
 *
 * @version 0.1 21/01/2017 Initial
 *          0.2 23/01/2017 Parse agora converte todos os valores para DMS,
 *                         independentemente da entrada.
 *
 * @param strCoord
 * @return
 */
const parse = function (strCoord) {
  //Iniciando o parsing normalizado
  strCoord = normalize(strCoord);

  //V0.1
  //var pattern = /([NEWS]{1}|[-+]{1})?([0-9,\.]+°)([0-9,\.]+')?([0-9,\.]+")?([NEWS]{1})?/i;
  //V0.2 - 22/01/2017 - Adicionado suporte ao formato "12 24 56"
  var pattern = /([NEWS]{1}|[-+]{1})?\s*([0-9,\.]+\s*°?)\s*([0-9,\.]+\s*'?)?\s*([0-9,\.]+\s*"?)?\s*([NEWS]{1})?/i

  var parts = pattern.exec(strCoord);
  if (parts == null) return false;

  var compassDirections = ['N', 'E', 'W', 'S'];

  //Só tem como determinar qual a direção se for informada, pois em casos negativos podem
  //tanto ser W como S, assim como o positivo podem ser N e E, dependendo se é latitude ou longitude
  var hasCompass = compassDirections.indexOf(parts[1]) !== -1 ? parts[1].toUpperCase() : (compassDirections.indexOf(parts[5]) !== -1 ? parts[5] : false)
  var hasSignal = parts[1] == '-' || ['S', 'W'].indexOf(hasCompass) !== -1 ? '-' : '+';

  var degrees = typeof parts[2] !== 'undefined' ? parseFloat(parts[2]) : 0;
  var minutes = typeof parts[3] !== 'undefined' ? parseFloat(parts[3]) : 0;
  var seconds = typeof parts[4] !== 'undefined' ? parseFloat(parts[4]) : 0;

  //se minutos for zero e segundos for zero mas tiver casas decimais nos graus, divida os valores com os menores
  if (minutes === 0 && seconds === 0 && (degrees !== parseInt(degrees))) {
    minutes = (degrees - parseInt(degrees)) * 60;
    degrees = parseInt(degrees);
  }

  //se segundos for zero mas tiver casas decimais nos minutos, divida os valores com ele
  if (seconds === 0 && (minutes !== parseInt(minutes))) {
    seconds = (minutes - parseInt(minutes)) * 60;
    minutes = parseInt(minutes)
  }

  return {
    signal: hasSignal,
    compass: hasCompass,
    degrees: degrees,
    minutes: minutes,
    seconds: seconds,
  };
}

/**
 * Converte uma coordenada para float a partir de uma string em qualquer formato
 *
 * @version 0.1 22/01/2017 Initial
 *
 * @param string strCoord
 * @return
 */
const stringToDecimal = function (strCoord) {
  return this.convert(strCoord, {
    'degrees': true, 'minutes': false, 'seconds': false,
    'showSign': true, 'spaces': false, 'degreeIndicator': '',
    'showCompassDirection': false
  });
}

/**
 * convert()
 * Converte uma coordenada em float para o formado DD,DDD°
 *
 * @version 0.1 22/01/2017 Initial
 *          0.2 25/01/2017 Conversão realizada por parsedObjectToString()
 *
 * @example
 *
 * @param string strCoord Coordenada em qualquer formato de texto
 * @param object options  Objeto de configuração do retorno da conversão
 * @return string
 */
const convert = function (strCoord, options = {}) {
  return parsedObjectToString(parse(strCoord), options);
}


/**
 * parsedObjectToString()
 * A partir do objeto retornado por parse(), retorna uma string de acordo com
 * o formato definido em options
 *
 * @version 0.1 25/01/2017 Initial
 *
 * @param  object objParse Objeto retornado por parse()
 * @param  object options  Objeto de configurações
 * @return
 */
const parsedObjectToString = function (parsedCoord, options = {}) {
  options = { ...defaultOptions, ...options }

  if (options.minutes === false) options.seconds = false

  if (options.seconds === false) {
    parsedCoord.minutes = parsedCoord.minutes + (parsedCoord.seconds / 60);
    parsedCoord.seconds = false;
  }

  if (options.minutes === false) {
    parsedCoord.degrees = parsedCoord.degrees + (parsedCoord.minutes / 60);
    parsedCoord.minutes = false;
  }
  var spaces = options.spaces ? ' ' : '';

  return (
    //Exibindo o sinal caso a opção esteja definida
    (options.showSign ? parsedCoord.signal + spaces : '')
    //exibindo a parte dos graus junto com a opção do indicador
    + parsedCoord.degrees + options.degreeIndicator
    //   //Exibindo a parte dos minutos
    + (options.minutes == true ? spaces + parsedCoord.minutes + options.minuteIndicator : '')
    //   //Exibindo a parte dos segundos
    + (options.seconds == true ? spaces + parsedCoord.seconds + options.secondIndicator : '')
    //   //imprimindo a direção da bússola
    + (options.showCompassDirection && parsedCoord.compass ? spaces + parsedCoord.compass : '')
    // + ( options.showCompassDirection && parsedCoord.compass ? spaces + options.compassDirections.indexOf( parsedCoord.compass ) : '' )
    //   //substituindo os pontos e vírgulas pela opção definida
  ).replace(/[,\.]+/g, options.decimalSeparator).trim();

}

module.exports = {
  normalize,
  parse,
  convert
}

