import { Coord } from "./coord";

export class Distance {
  // Função estática que calcula a distância entre dois pontos
  static calculate(from: Coord, to: Coord): number {
    // Raio da Terra em quilômetros
    const earthRadiusKm = 6371;

    // Converter graus para radianos
    const degToRad = (degrees: number) => degrees * (Math.PI / 180);

    // Diferença de latitude e longitude em radianos
    const dLat = degToRad(to.latitude - from.latitude);
    const dLon = degToRad(to.longitude - from.longitude);

    // Converter as latitudes para radianos
    const lat1Rad = degToRad(from.latitude);
    const lat2Rad = degToRad(to.latitude);

    // Fórmula de Haversine
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distância final em quilômetros
    return earthRadiusKm * c;
  }

  static calculate2(from: Coord, to: Coord) {
    const earthRadius = 6371;
    const degreesToRadians = Math.PI / 180;
    const deltaLat = (to.latitude - from.latitude) * degreesToRadians;
    const deltaLon = (to.longitude - from.longitude) * degreesToRadians;
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(from.latitude * degreesToRadians) *
      Math.cos(to.latitude * degreesToRadians) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return Math.round(distance);
  }
}

