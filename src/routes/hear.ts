import { I18NEXT } from "../configs";
import { HEAR } from "../constants";
import {
  LanguageController,
  LocationController,
  ProfileController,
  SubscriptionController,
  TimeController,
  WeatherController,
} from "../controllers";
import { useTrigger } from "../middlewares";
import { BotHearTrigger, BotHearRoutes, TelegrafContext } from "../types";
import { getFixedT } from "i18next";
import { inject, injectable } from "inversify";
import { Telegraf } from "telegraf";

const { languages } = I18NEXT;

@injectable()
export class HearRoutes {
  public constructor(
    @inject(Telegraf<TelegrafContext>)
    private bot: Telegraf<TelegrafContext>,
    @inject(LocationController)
    private locationController: LocationController,
    @inject(TimeController)
    private timeController: TimeController,
    @inject(WeatherController)
    private WeatherController: WeatherController,
    @inject(ProfileController)
    private profileController: ProfileController,
    @inject(LanguageController)
    private languageController: LanguageController,
    @inject(SubscriptionController)
    private subscriptionController: SubscriptionController
  ) {}

  public init = async (): Promise<void> => {
    let hearRoutes: BotHearRoutes = {};

    languages.forEach((lng) => {
      const t = getFixedT(lng);

      hearRoutes = {
        ...hearRoutes,
        [HEAR[BotHearTrigger.SET_LOCATION](t)]:
          this.locationController.handleTrigger,
        [HEAR[BotHearTrigger.SET_NOTIFICATION_TIME](t)]:
          this.timeController.handleTrigger,
        [HEAR[BotHearTrigger.GET_WEATHER](t)]:
          this.WeatherController.handleTrigger,
        [HEAR[BotHearTrigger.GET_PROFILE](t)]:
          this.profileController.handleTrigger,
        [HEAR[BotHearTrigger.LANGUAGE](t)]:
          this.languageController.handleTrigger,
        [HEAR[BotHearTrigger.SUBSCRIBE](t)]:
          this.subscriptionController.handleTrigger,
        [HEAR[BotHearTrigger.UNSUBSCRIBE](t)]:
          this.subscriptionController.handleTrigger,
      };
    });

    Object.entries(hearRoutes).forEach(([hear, handlerFn]) => {
      this.bot.hears(hear, handlerFn, useTrigger(hear as BotHearTrigger));
    });
  };
}
