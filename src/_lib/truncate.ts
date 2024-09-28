export function truncate(value: number | string, decimalPlaces = 2): number {
  if (!value || Number.isNaN(+value)) {     
    return 0
  }

  // Pega qualquer número seguido ou não de ponto. Se tiver ponto, pega só os 2 primeiros números
  // É uma alternativa aos métodos de trunc do js que arredondam sem necessidade
  const re = new RegExp(`^-?\\d+(?:.\\d{0,${decimalPlaces}})?`);
  const match = String(value).match(re);

  if (match) value = Number(match?.at(0));

  return +value;
}