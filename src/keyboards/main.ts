import { HEAR } from "../constants";
import { BotHearTrigger, User } from "../types";
import { injectable } from "inversify";
import { Markup } from "telegraf";
import { ReplyKeyboardMarkup } from "telegraf/typings/core/types/typegram";

@injectable()
export class MainKeyboard {
  public init = (user?: User): Markup.Markup<ReplyKeyboardMarkup> => {
    const keyboard: string[][] = [];

    keyboard.push([
      HEAR[BotHearTrigger.SET_LOCATION],
      HEAR[BotHearTrigger.SET_NOTIFICATION_TIME],
    ]);

    keyboard.push([HEAR[BotHearTrigger.GET_PROFILE]]);

    if (user) {
      keyboard.push([
        user.isSubscribed
          ? HEAR[BotHearTrigger.UNSUBSCRIBE]
          : HEAR[BotHearTrigger.SUBSCRIBE],
      ]);
    }

    return Markup.keyboard(keyboard).resize();
  };
}
