# @klawdyo/coords

```ts
// Constructor
const coord = new Coord(56.1234455657, `42º 13' 45"`);
//
coord.latitude; //  -> 56.1234455657
coord.longitude; // -> 42.2476886

// Formatting
coord.getLatitude(); //  -> 56.1234455657
coord.getLongitude(); // -> 42.2476886
coord.getLatitude({ compass: 'after', showMinutes: true, showSeconds: false }); //  -> 56° 20.23565' N
coord.getLongitude({ compass: 'before', showMinutes: true, showSeconds: true }); // -> E 56° 20' 45"

// Formatter
new Formatter(`42º 13' 45"`).format({ compass: 'before', showMinutes: true, showSeconds: true }); // -> E 56° 20' 45"
new Formatter(56.1234455657).format({ compass: 'before', showMinutes: true, showSeconds: true }); // -> E 56° 20' 45"

// Parser
new Parser(`42º 13' 45"`).parse() // -> { degrees: 42, minutes: 13, seconds: 45, signal: '+' }

```
