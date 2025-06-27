import { LocationController, TimeController } from "../controllers";
import { useTrigger } from "../middlewares";
import { BotHearTrigger, BotHearRoutes, TelegrafContext } from "../types";
import { inject, injectable } from "inversify";
import { Telegraf } from "telegraf";

@injectable()
export class HearRoutes {
  public constructor(
    @inject(Telegraf<TelegrafContext>)
    private bot: Telegraf<TelegrafContext>,
    @inject(LocationController)
    private locationController: LocationController,
    @inject(TimeController) private timeController: TimeController
  ) {}

  public init = async (): Promise<void> => {
    const hearRoutes: BotHearRoutes = {
      [BotHearTrigger.SET_LOCATION]: this.locationController.handleTrigger,
      [BotHearTrigger.SET_NOTIFICATION_TIME]:
        this.timeController.handleTrigger,
    };

    Object.entries(hearRoutes).forEach(([hear, handlerFn]) => {
      this.bot.hears(hear, useTrigger(hear as BotHearTrigger), handlerFn);
    });
  };
}
