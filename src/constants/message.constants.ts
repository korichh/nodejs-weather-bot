import { WeatherReport, CityReport } from "../types";

export const MESSAGE = {
  WELCOME: "👋 Welcome to the Weather Bot!",

  UNABLE_TO_OBTAIN_USER: "⚠️ Unable to obtain your user information.",

  MISSING_LOCATION_TIME:
    "📍⏰ Please set your location and notification time.",

  MISSING_LOCATION: "📍 Please set your location.",

  MISSING_TIME: "⏰ Please set your notification time.",

  ALREADY_SUBSCRIBED: "✅ You are already subscribed.",

  PROMPT_ENTER_LOCATION: "Please, enter your city (e.g. kharkiv).",

  SUCCESS_LOCATION: (location: string): string =>
    `📍 Your location has been set to: ${location}.`,

  SUCCESS_LOCATION_WITH_TIME_PROMPT: (location: string): string =>
    `${MESSAGE.SUCCESS_LOCATION(location)} Please set the notification time as well.`,

  PROMPT_ENTER_TIME:
    "Please, enter your desired notification time (e.g. 7:00).",

  SUCCESS_TIME: (time: string): string =>
    `⏰ Your notification time has been set to: ${time}.`,

  SUCCESS_TIME_WITH_LOCATION_PROMPT: (time: string): string =>
    `${MESSAGE.SUCCESS_TIME(time)}. Please set the location as well.`,

  WEATHER_REPORT: (params: WeatherReport): string =>
    `🕒 *${params.time}*\n\n` +
    `🌦 Weather: *${params.weather}*\n` +
    `🌡 Temp: *${params.temp}°C* | Feels: *${params.tempFeels}°C*\n` +
    `☁️ Clouds: *${params.clouds}%* | Rain: *${params.rain}%*\n` +
    `💧 Humidity: *${params.humidity}%*\n` +
    `💨 Wind: *${params.wind} m/s*\n` +
    `📊 Pressure: *${params.pressure} hPa*`,

  CITY_REPORT: (params: CityReport): string =>
    `📍 Weather for: *${params.name}*, *${params.country}*\n\n` +
    `🌅 Sunrise: *${params.sunrise}* | 🌇 Sunset: *${params.sunset}*`,

  CITY_REPORT_DAY: (day: string): string => `📅 *${day}*`,
};
