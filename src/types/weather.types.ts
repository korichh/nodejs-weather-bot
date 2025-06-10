export type WeatherGeoLocales = Record<string, string>;

export interface WeatherGeo {
  name: string;
  local_names: WeatherGeoLocales;
  lat: number;
  lon: number;
  country: string;
  state: string;
}
