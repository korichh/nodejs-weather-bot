import { inject, injectable } from "inversify";
import { ExtraReplyMessage } from "telegraf/typings/telegram-types";

import { MESSAGE } from "../constants";
import { WeatherService } from "../services";
import { TelegrafContext, TelegrafNext } from "../types";
import { parseForecast } from "../utils";
import { HelperController } from "./helper";

const { NO_LOCATION } = MESSAGE;

@injectable()
export class WeatherController {
  public constructor(
    @inject(HelperController) private helperController: HelperController,
    @inject(WeatherService) private weatherService: WeatherService
  ) {}

  public handleTrigger = async (
    ctx: TelegrafContext,
    next: TelegrafNext
  ): Promise<void> => {
    try {
      let { t, user } = await this.helperController.initContext(ctx);

      if (!user.location) {
        await ctx.sendMessage(NO_LOCATION(t));
        return;
      }

      const extra: ExtraReplyMessage = { parse_mode: "Markdown" };
      const forecast = await this.weatherService.getForecast(
        {
          lat: user.location.lat,
          lon: user.location.lon,
        },
        user.languageCode
      );

      forecast.city.name = user.location.name;

      const { cityMeta, dayList } = parseForecast(
        t,
        forecast,
        user.languageCode
      );

      await ctx.sendMessage(cityMeta, extra);

      for (const dayMeta of dayList) {
        await ctx.sendMessage(dayMeta, extra);
      }

      await next();
    } catch (err) {
      await this.helperController.handleError(ctx, err, false);
    }
  };
}
