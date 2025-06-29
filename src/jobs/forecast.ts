import { useJobErrorHandler } from "../middlewares";
import { WeatherService } from "../services";
import { TelegrafContext, User } from "../types";
import { getT } from "../utils";
import { parseForecast } from "../utils/weather";
import { CronJob } from "cron";
import { TFunction } from "i18next";
import { inject, injectable } from "inversify";
import { Telegraf } from "telegraf";
import { ExtraReplyMessage } from "telegraf/typings/telegram-types";

@injectable()
export class ForecastJob {
  private jobs = new Map<string, CronJob>();

  public constructor(
    @inject(Telegraf<TelegrafContext>)
    private bot: Telegraf<TelegrafContext>,
    @inject(WeatherService) private weatherService: WeatherService
  ) {}

  public init = async (users: User[]): Promise<void> => {
    for (const user of users) {
      const t = getT(user);

      await this.create(t, user);
    }
  };

  public update = async (user: User): Promise<void> => {
    const t = getT(user);

    await this.remove(user);

    await this.create(t, user);
  };

  public remove = async (user: User): Promise<void> => {
    const job = this.jobs.get(user.id);

    if (job) {
      await job.stop();

      this.jobs.delete(user.id);
    }
  };

  private create = async (t: TFunction, user: User): Promise<void> => {
    if (!user.location || !user.time || !user.isSubscribed) return;

    const [hour, minute] = user.time.split(":");
    const cronTime = `${minute} ${hour} * * *`;
    const timeZone = user.location?.timeZone;

    const job = CronJob.from({
      cronTime,
      timeZone,
      start: true,
      errorHandler: useJobErrorHandler,
      onTick: async () => await this.onTick(t, user),
    });

    this.jobs.set(user.id, job);
  };

  private onTick = async (t: TFunction, user: User): Promise<void> => {
    if (!user.location) return;

    const extra: ExtraReplyMessage = { parse_mode: "Markdown" };
    const forecast = await this.weatherService.getForecast({
      lat: user.location.lat,
      lon: user.location.lon,
    });

    const { cityMeta, dayList } = parseForecast(t, forecast);

    await this.bot.telegram.sendMessage(user.telegramId, cityMeta, extra);

    for (const dayMeta of dayList) {
      await this.bot.telegram.sendMessage(user.telegramId, dayMeta, extra);
    }
  };
}
