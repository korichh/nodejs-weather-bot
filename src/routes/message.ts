import { HEAR } from "../constants";
import { LocationController, TimeController } from "../controllers";
import {
  BotHearTrigger,
  BotMessageRoutes,
  TelegrafContext,
} from "../types";
import { inject, injectable } from "inversify";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

@injectable()
export class MessageRoutes {
  public constructor(
    @inject(Telegraf<TelegrafContext>)
    private bot: Telegraf<TelegrafContext>,
    @inject(LocationController)
    private locationController: LocationController,
    @inject(TimeController) private timeController: TimeController
  ) {}

  public init = async (): Promise<void> => {
    const messageRoutes: BotMessageRoutes = {
      [HEAR[BotHearTrigger.SET_LOCATION]]:
        this.locationController.handleMessage,
      [HEAR[BotHearTrigger.SET_NOTIFICATION_TIME]]:
        this.timeController.handleMessage,
    };

    this.bot.on(message(), async (ctx) => {
      const lastTrigger = ctx.session.lastTrigger;
      if (!lastTrigger) {
        return;
      }

      const handlerFn = messageRoutes[lastTrigger];
      if (!handlerFn) {
        return;
      }

      await handlerFn(ctx);

      ctx.session.lastTrigger = null;
    });
  };
}
