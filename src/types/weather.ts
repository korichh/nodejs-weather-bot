export type WeatherGeoLocales = Record<string, string>;

export interface WeatherGeo {
  name: string;
  local_names: WeatherGeoLocales;
  lat: number;
  lon: number;
  country: string;
  state: string;
  timeZone: string;
}

export interface ForecastEntryMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface ForecastEntryWeatherItem {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface ForecastEntryClouds {
  all: number;
}

export interface ForecastEntryWind {
  speed: number;
  deg: number;
  gust: number;
}

export interface ForecastEntrySys {
  pod: string;
}

export interface ForecastEntry {
  dt: number;
  main: ForecastEntryMain;
  weather: ForecastEntryWeatherItem[];
  clouds: ForecastEntryClouds;
  wind: ForecastEntryWind;
  visibility: number;
  pop: number;
  sys: ForecastEntrySys;
  dt_txt: string;
}

export interface ForecastCityCoord {
  lat: number;
  lon: number;
}

export interface ForecastCity {
  id: number;
  name: string;
  coord: ForecastCityCoord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface WeatherForecast {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastEntry[];
  city: ForecastCity;
}

export interface ParsedForecast {
  cityMeta: string;
  dayList: string[];
}

export interface WeatherReport {
  time: string;
  weather: string;
  temp: string;
  tempFeels: string;
  clouds: string;
  rain: string;
  humidity: string;
  wind: string;
  pressure: string;
}

export interface CityReport {
  name: string;
  sunrise: string;
  sunset: string;
}
