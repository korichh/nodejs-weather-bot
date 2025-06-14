import { WEATHER_CONFIG } from "../configs";
import { MESSAGE } from "../constants";
import { WeatherForecast, ForecastEntry, ParsedForecast } from "../types";
import {
  formatForecastDay,
  formatForecastTime,
  formatForecastSun,
} from "./date.utils";

const { WEATHER_REPORT, CITY_REPORT, CITY_REPORT_DAY } = MESSAGE;

const parseForecastEntry = (entry: ForecastEntry): string => {
  const time = formatForecastTime(entry.dt_txt);

  const weather =
    entry.weather.length > 0
      ? entry.weather.map((w) => `${w.main} (${w.description})`).join(", ")
      : "N/A";

  const temp = entry.main.temp.toFixed(1);
  const tempFeels = entry.main.feels_like.toFixed(1);
  const clouds = String(entry.clouds.all);
  const rain = String(Math.round(entry.pop * 100));
  const humidity = String(entry.main.humidity);
  const wind = String(entry.wind.speed);
  const pressure = String(entry.main.pressure);

  return WEATHER_REPORT({
    time,
    weather,
    temp,
    tempFeels,
    clouds,
    rain,
    humidity,
    wind,
    pressure,
  });
};

export const parseForecast = (
  forecast: WeatherForecast
): ParsedForecast => {
  const { city, list } = forecast;

  const sunrise = formatForecastSun(city.sunrise, city.timezone);
  const sunset = formatForecastSun(city.sunset, city.timezone);

  const cityMeta = CITY_REPORT({
    name: city.name,
    country: city.country,
    sunrise,
    sunset,
  });

  const dayMap: Record<string, string> = {};

  for (const entry of list) {
    const day = formatForecastDay(entry.dt_txt);

    if (!dayMap[day]) {
      const daysLength = Object.keys(dayMap).length;

      if (daysLength >= WEATHER_CONFIG.maxDaysForecast) {
        break;
      }

      dayMap[day] = CITY_REPORT_DAY(day);
    }

    dayMap[day] += `\n\n\n${parseForecastEntry(entry)}`;
  }

  const dayList = Object.values(dayMap);

  return { cityMeta, dayList };
};
