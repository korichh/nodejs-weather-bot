import { userModel } from "../models";
import { weatherService } from "../services";
import { TelegrafContext } from "../types";
import { parseForecast } from "../utils/weather";
import { CronJob } from "cron";
import { Telegraf } from "telegraf";
import { ExtraReplyMessage } from "telegraf/typings/telegram-types";

export const initForecast = (bot: Telegraf<TelegrafContext>): void => {
  const users = userModel.getAll();
  const extra: ExtraReplyMessage = { parse_mode: "Markdown" };

  for (const user of users) {
    if (!user.location || !user.time) {
      continue;
    }

    const onTick = async (): Promise<void> => {
      if (!user.location) {
        return;
      }

      const forecast = await weatherService.getForecast({
        lat: user.location.lat,
        lon: user.location.lon,
      });

      const { cityMeta, dayList } = parseForecast(forecast);

      await bot.telegram.sendMessage(user.telegramId, cityMeta, extra);

      dayList.forEach(async (dayMeta) => {
        await bot.telegram.sendMessage(user.telegramId, dayMeta, extra);
      });
    };

    const [hour, minute] = user.time.split(":");
    const cronTime = `${minute} ${hour} * * *`;
    const timeZone = user.location.timeZone;

    const job = CronJob.from({ cronTime, timeZone, onTick });

    job.start();
  }
};
