export interface CountryInterface {
  name: Name;
  cca2: string;
  ccn3: string;
  cca3: string;
  capital: string;
  region: string;
  timezones: string;
  flags: SVG;
  population: number;
  continents: string;
  maps: Maps;
}

interface Name {
  common: string;
  official: string;
}

interface SVG {
  svg: string;
}

interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}
