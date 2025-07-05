import { HEAR } from "@constants";
import { BotHearTrigger, User } from "@types";
import { TFunction } from "i18next";
import { injectable } from "inversify";
import { Markup } from "telegraf";
import { ReplyKeyboardMarkup } from "telegraf/typings/core/types/typegram";

@injectable()
export class MainKeyboard {
  public init = (
    user: User | null,
    t: TFunction
  ): Markup.Markup<ReplyKeyboardMarkup> => {
    const keyboard: string[][] = [];

    keyboard.push([
      HEAR[BotHearTrigger.SET_LOCATION](t),
      HEAR[BotHearTrigger.SET_NOTIFICATION_TIME](t),
    ]);

    keyboard.push([
      HEAR[BotHearTrigger.GET_PROFILE](t),
      HEAR[BotHearTrigger.GET_WEATHER](t)
  ]);

    keyboard.push([
      HEAR[BotHearTrigger.LANGUAGE](t),
      user?.isSubscribed === false
        ? HEAR[BotHearTrigger.SUBSCRIBE](t)
        : HEAR[BotHearTrigger.UNSUBSCRIBE](t),
    ]);

    return Markup.keyboard(keyboard).resize();
  };
}
