import { HEAR } from "../constants";
import {
  LocationController,
  ProfileController,
  SubscriptionController,
  TimeController,
} from "../controllers";
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
    @inject(TimeController) private timeController: TimeController,
    @inject(ProfileController)
    private profileController: ProfileController,
    @inject(SubscriptionController)
    private subscriptionController: SubscriptionController
  ) {}

  public init = async (): Promise<void> => {
    const hearRoutes: BotHearRoutes = {
      [HEAR[BotHearTrigger.SET_LOCATION]]:
        this.locationController.handleTrigger,
      [HEAR[BotHearTrigger.SET_NOTIFICATION_TIME]]:
        this.timeController.handleTrigger,
      [HEAR[BotHearTrigger.GET_PROFILE]]:
        this.profileController.handleTrigger,
      [HEAR[BotHearTrigger.SUBSCRIBE]]:
        this.subscriptionController.handleTrigger,
      [HEAR[BotHearTrigger.UNSUBSCRIBE]]:
        this.subscriptionController.handleTrigger,
    };

    Object.entries(hearRoutes).forEach(([hear, handlerFn]) => {
      this.bot.hears(hear, useTrigger(hear as BotHearTrigger), handlerFn);
    });
  };
}
