import { TFunction } from "i18next";

import {
  formatForecastDay,
  formatForecastSun,
  formatForecastTime,
} from "./date";
import { capital } from "./text";

import { WEATHER_CONFIG } from "@/configs";
import { MESSAGE } from "@/constants";
import { ForecastEntry, ParsedForecast, WeatherForecast } from "@/types";

const { WEATHER_REPORT, CITY_REPORT, CITY_REPORT_DAY } = MESSAGE;

const parseForecastEntry = (
  t: TFunction,
  entry: ForecastEntry
): string => {
  const time = formatForecastTime(entry.dt_txt);
  const weather = capital(entry.weather?.[0]?.description) || "N/A";
  const temp = entry.main.temp.toFixed(1);
  const tempFeels = entry.main.feels_like.toFixed(1);
  const clouds = String(entry.clouds.all);
  const rain = String(Math.round(entry.pop * 100));
  const humidity = String(entry.main.humidity);
  const wind = String(entry.wind.speed);
  const pressure = String(entry.main.pressure);

  return WEATHER_REPORT(t, {
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
  t: TFunction,
  forecast: WeatherForecast,
  lang: string
): ParsedForecast => {
  const { city, list } = forecast;

  const sunrise = formatForecastSun(city.sunrise, city.timezone);
  const sunset = formatForecastSun(city.sunset, city.timezone);

  const cityMeta = CITY_REPORT(t, {
    name: city.name,
    sunrise,
    sunset,
  });

  const dayMap: Record<string, string> = {};

  for (const entry of list) {
    const day = formatForecastDay(entry.dt_txt, lang);

    if (!dayMap[day]) {
      const daysLength = Object.keys(dayMap).length;

      if (daysLength >= WEATHER_CONFIG.maxDaysForecast) {
        break;
      }

      dayMap[day] = CITY_REPORT_DAY(t, day);
    }

    dayMap[day] += `\n\n\n${parseForecastEntry(t, entry)}`;
  }

  const dayList = Object.values(dayMap);

  return { cityMeta, dayList };
};
