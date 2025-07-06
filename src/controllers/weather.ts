import { inject, injectable } from "inversify";
import { ExtraReplyMessage } from "telegraf/typings/telegram-types";

import { HelperController } from "./helper";

import { MESSAGE } from "@/constants";
import { WeatherService } from "@/services";
import { TelegrafContext, TelegrafNext } from "@/types";
import { parseForecast } from "@/utils";

const { MISSING_LOCATION } = MESSAGE;

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
      let { t, user, keyboard } =
        await this.helperController.initContext(ctx);

      if (!user.location) {
        throw new Error(MISSING_LOCATION(t));
      }

      const extra: ExtraReplyMessage = {
        parse_mode: "Markdown",
        reply_markup: keyboard.reply_markup,
      };

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

      await ctx.reply(cityMeta, extra);

      for (const dayMeta of dayList) {
        await ctx.reply(dayMeta, extra);
      }

      await next();
    } catch (err) {
      await this.helperController.handleError(ctx, err, false);
    }
  };
}
