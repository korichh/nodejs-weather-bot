import "dotenv/config";

export const ENV = {
  nodeEnv: process.env["NODE_ENV"] || "production",
  telegramBotToken: process.env["TELEGRAM_BOT_TOKEN"] || "",
  weatherApiKey: process.env["WEATHER_API_KEY"] || "",
};
