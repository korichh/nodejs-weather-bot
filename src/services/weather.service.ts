import { ENV } from "../constants";
import { Api } from "../lib";
import { WeatherGeo } from "../types";

const { WEATHER_API_URL, WEATHER_API_KEY } = ENV;

export class WeatherService {
  public getGeo = async (location: string): Promise<WeatherGeo | null> => {
    const url = `${WEATHER_API_URL}/geo/1.0/direct`;
    const params = new URLSearchParams({
      appid: WEATHER_API_KEY,
      q: location,
    });

    const response = await Api.get<WeatherGeo[]>(url, { params });
    const data = response.data;

    return data[0] || null;
  };

  public getForecast = (): void => {};
}

export const weatherService = new WeatherService();
