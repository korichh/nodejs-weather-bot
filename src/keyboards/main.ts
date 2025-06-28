import { BotHearTrigger, User } from "../types";
import { injectable } from "inversify";
import { Markup } from "telegraf";
import { ReplyKeyboardMarkup } from "telegraf/typings/core/types/typegram";

@injectable()
export class MainKeyboard {
  public init = (user?: User): Markup.Markup<ReplyKeyboardMarkup> => {
    const keyboard: string[][] = [];

    keyboard.push([
      BotHearTrigger.SET_LOCATION,
      BotHearTrigger.SET_NOTIFICATION_TIME,
    ]);

    if (user) {
      keyboard.push([
        user.isSubscribed
          ? BotHearTrigger.UNSUBSCRIBE
          : BotHearTrigger.SUBSCRIBE,
      ]);
    }

    return Markup.keyboard(keyboard).resize();
  };
}
