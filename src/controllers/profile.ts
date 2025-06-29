import { ERROR, MESSAGE } from "../constants";
import { MainKeyboard } from "../keyboards";
import { TelegrafContext, TelegrafNext } from "../types";
import { inject, injectable } from "inversify";
import { ExtraReplyMessage } from "telegraf/typings/telegram-types";

const { ERROR_MESSAGE, USER_NOT_FOUND } = ERROR;
const { USER_INFO } = MESSAGE;

@injectable()
export class ProfileController {
  public constructor(
    @inject(MainKeyboard) private mainKeyboard: MainKeyboard
  ) {}

  public handleTrigger = async (
    ctx: TelegrafContext,
    next: TelegrafNext
  ): Promise<void> => {
    try {
      let user = ctx.session.user;
      if (!user) {
        throw new Error(USER_NOT_FOUND);
      }

      const message = USER_INFO(user);

      const keyboard = this.mainKeyboard.init(user).oneTime();
      const extra: ExtraReplyMessage = {
        parse_mode: "Markdown",
        reply_markup: keyboard.reply_markup,
      };

      await ctx.reply(message, extra);

      await next();
    } catch (err) {
      if (err instanceof Error) {
        await ctx.reply(ERROR_MESSAGE(err.message));
      }
    }
  };
}
