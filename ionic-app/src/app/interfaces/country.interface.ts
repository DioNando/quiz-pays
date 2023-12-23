export interface CountryInterface {
  name: Name;
  cca2: string;
  ccn3: string;
  cca3: string;
  capital: string;
  region: string;
  timezones?: string[];
  flags: Flags;
  population: number;
  continents: string;
  maps: Maps;
}

interface Name {
  common: string;
  official: string;
}

interface Flags {
  svg: string;
  alt?: string;
}

interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export const exampleCountry: CountryInterface = {
  name: {
    common: 'United States',
    official: 'United States of America',
  },
  cca2: 'US',
  ccn3: '840',
  cca3: 'USA',
  capital: 'Washington, D.C.',
  region: 'Americas',
  timezones: ['UTC-12:00'],
  flags: {
    svg: 'https://flagcdn.com/us.svg',
  },
  population: 329484123,
  continents: 'North America',
  maps: {
    googleMaps: 'googleMaps": "https://goo.gl/maps/e8M246zY4BSjkjAv6',
    openStreetMaps:
      'https://www.openstreetmap.org/relation/148838#map=2/20.6/-85.8',
  },
};
