export interface CoordOptions {
  //Spaces between parts
  spaces: boolean,
  //Show degrees. Always boolean
  degrees: boolean,
  //Show minutes.
  minutes: boolean,
  //Show seconds. False if minutes is false too
  seconds: boolean,
  //Degree component indicator
  degreeIndicator: string,
  //Minute component indicator
  minuteIndicator: string,
  //Second component indicator
  secondIndicator: string,
  //Configure to show sign at start
  showSign: boolean,
  //Configure to show compass direction at end
  showCompassDirection: boolean,
  //Last component's decimal separator
  decimalSeparator: string,
  //Arredondar o último componente para um número de casas definido
  decimalPlaces: number,
}