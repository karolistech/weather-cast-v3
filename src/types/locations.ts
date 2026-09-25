export type Location = {
  id: number;
  name: string;
  lat: number;
  lon: number;
};

export type GeocodedLocation = Location & {
  country: string;
  countryCode: string;
  region?: string;
};

export type Locations = {
  current: Location;
  pinned: Location;
  saved: Location[];
};
