import { find as findTz } from "geo-tz";
import { injectable } from "inversify";

import { WEATHER_CONFIG } from "@/configs";
import { ENV } from "@/constants";
import { Api } from "@/lib";
import { ForecastCityCoord, WeatherForecast, WeatherGeo } from "@/types";

const { WEATHER_API_URL, WEATHER_API_KEY } = ENV;

@injectable()
export class WeatherService {
  public constructor() {}

  public getGeo = async (location: string): Promise<WeatherGeo | null> => {
    const url = `${WEATHER_API_URL}/geo/1.0/direct`;
    const params = new URLSearchParams({
      appid: WEATHER_API_KEY,
      q: location,
    });

    const response = await Api.get<WeatherGeo[]>(url, { params });
    const data = response.data;

    const weatherGeo = data[0];
    if (!weatherGeo) {
      return null;
    }

    weatherGeo.timeZone = findTz(weatherGeo.lat, weatherGeo.lon)[0] || "";

    return weatherGeo;
  };

  public getForecast = async (
    cityCoord: ForecastCityCoord,
    lang: string
  ): Promise<WeatherForecast> => {
    const url = `${WEATHER_API_URL}/data/2.5/forecast`;
    const forecastCnt = WEATHER_CONFIG.maxDaysForecast * 8;
    const params = new URLSearchParams({
      appid: WEATHER_API_KEY,
      lat: String(cityCoord.lat),
      lon: String(cityCoord.lon),
      units: "metric",
      cnt: String(forecastCnt),
      lang,
    });

    const response = await Api.get<WeatherForecast>(url, { params });
    const data = response.data;

    return data;
  };
}
