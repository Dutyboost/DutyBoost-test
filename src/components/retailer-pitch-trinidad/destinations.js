// Destinations served across the Caribbean Airlines network — as listed in the
// Caribbean Airlines Duty Free header (dutyfree.caribbean-airlines.com).
// `flag` is the ISO 3166-1 alpha-2 code used to render the flag.

export const CAL_LOGO =
  "https://upload.wikimedia.org/wikipedia/commons/5/52/Caribbean_Airlines_logo.png";

export const CAL_DESTINATIONS = [
  { name: "Antigua", flag: "ag" },
  { name: "Bahamas", flag: "bs" },
  { name: "Barbados", flag: "bb" },
  { name: "Cuba", flag: "cu" },
  { name: "Curaçao", flag: "cw" },
  { name: "Dominica", flag: "dm" },
  { name: "Fort Lauderdale", flag: "us" },
  { name: "Grand Cayman", flag: "ky" },
  { name: "Grenada", flag: "gd" },
  { name: "Guyana", flag: "gy" },
  { name: "Kingston", flag: "jm" },
  { name: "Miami", flag: "us" },
  { name: "Montego Bay", flag: "jm" },
  { name: "New York", flag: "us" },
  { name: "Orlando", flag: "us" },
  { name: "St. Kitts", flag: "kn" },
  { name: "St. Lucia", flag: "lc" },
  { name: "St. Maarten", flag: "sx" },
  { name: "St. Vincent", flag: "vc" },
  { name: "Suriname", flag: "sr" },
  { name: "Tobago", flag: "tt" },
  { name: "Toronto", flag: "ca" },
  { name: "Trinidad", flag: "tt" },
  { name: "Venezuela", flag: "ve" },
];

export const flagUrl = (code) => `https://flagcdn.com/w40/${code}.png`;