import "dotenv/config";

export const ENV = {
  botToken: process.env["BOT_TOKEN"] || "",
  weatherApiKey: process.env["WEATHER_API_KEY"] || "",
};
