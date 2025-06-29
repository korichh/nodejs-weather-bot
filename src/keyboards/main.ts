import { HEAR } from "../constants";
import { BotHearTrigger, User } from "../types";
import { TFunction } from "i18next";
import { injectable } from "inversify";
import { Markup } from "telegraf";
import { ReplyKeyboardMarkup } from "telegraf/typings/core/types/typegram";

@injectable()
export class MainKeyboard {
  public init = (
    t: TFunction,
    user?: User
  ): Markup.Markup<ReplyKeyboardMarkup> => {
    const keyboard: string[][] = [];

    keyboard.push([
      HEAR[BotHearTrigger.SET_LOCATION](t),
      HEAR[BotHearTrigger.SET_NOTIFICATION_TIME](t),
    ]);

    keyboard.push([HEAR[BotHearTrigger.GET_PROFILE](t)]);

    if (user) {
      keyboard.push([
        user.isSubscribed
          ? HEAR[BotHearTrigger.UNSUBSCRIBE](t)
          : HEAR[BotHearTrigger.SUBSCRIBE](t),
      ]);
    }

    return Markup.keyboard(keyboard).resize();
  };
}
