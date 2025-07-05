export const ENV = {
  NODE_ENV: process.env["NODE_ENV"] || "production",

  TELEGRAM_BOT_TOKEN: process.env["TELEGRAM_BOT_TOKEN"] || "",

  WEATHER_API_URL: process.env["WEATHER_API_URL"] || "",
  WEATHER_API_KEY: process.env["WEATHER_API_KEY"] || "",
};
