import { ERROR, MESSAGE } from "../constants";
import { MainKeyboard } from "../keyboards";
import { UserService } from "../services";
import { TelegrafContext, TelegrafNext } from "../types";
import { getT, parseUser } from "../utils";
import { inject, injectable } from "inversify";
import { ExtraReplyMessage } from "telegraf/typings/telegram-types";

const { ERROR_MESSAGE, USER_NOT_FOUND } = ERROR;
const { USER_INFO } = MESSAGE;

@injectable()
export class ProfileController {
  public constructor(
    @inject(MainKeyboard) private mainKeyboard: MainKeyboard,
    @inject(UserService) private userService: UserService
  ) {}

  public handleTrigger = async (
    ctx: TelegrafContext,
    next: TelegrafNext
  ): Promise<void> => {
    let t = getT(ctx.session.user);

    try {
      const userId = String(ctx.from?.id);
      const user = await this.userService.getUser(userId);

      if (!user) {
        throw new Error(USER_NOT_FOUND(t));
      }

      t = getT(user);

      const userInfo = parseUser(t, user);
      const message = USER_INFO(t, userInfo);

      const keyboard = this.mainKeyboard.init(t, user).oneTime();
      const extra: ExtraReplyMessage = {
        parse_mode: "Markdown",
        reply_markup: keyboard.reply_markup,
      };

      await ctx.reply(message, extra);

      await next();
    } catch (err) {
      if (err instanceof Error) {
        await ctx.reply(ERROR_MESSAGE(t, err.message));
      }
    }
  };
}
