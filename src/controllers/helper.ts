import { ERROR } from "../constants";
import { MainKeyboard } from "../keyboards";
import { UserService } from "../services";
import { TelegrafContext, User } from "../types";
import { getT } from "../utils";
import { TFunction } from "i18next";
import { inject, injectable } from "inversify";
import { Markup } from "telegraf";
import { ReplyKeyboardMarkup } from "telegraf/typings/core/types/typegram";

const { ERROR_MESSAGE, UNABLE_TO_OBTAIN_USER, USER_NOT_FOUND } = ERROR;

export interface ControllerContext {
  t: TFunction;
  user: User;
  keyboard: Markup.Markup<ReplyKeyboardMarkup>;
}

@injectable()
export class HelperController {
  public constructor(
    @inject(MainKeyboard) private mainKeyboard: MainKeyboard,
    @inject(UserService) private userService: UserService
  ) {}

  public updateContext = async (
    ctx: TelegrafContext,
    user: User
  ): Promise<ControllerContext> => {
    ctx.session.user = user;

    const t = getT(user);
    const keyboard = this.mainKeyboard.init(user, t).oneTime();

    return { t, user, keyboard };
  };

  public initContext = async (
    ctx: TelegrafContext,
    withSave: boolean = false
  ): Promise<ControllerContext> => {
    const telegrafUser = ctx.from;
    if (!telegrafUser) {
      const t = getT(ctx.session.user);

      throw new Error(UNABLE_TO_OBTAIN_USER(t));
    }

    const user = await (withSave
      ? this.userService.saveUser(telegrafUser)
      : this.userService.getUser(String(telegrafUser.id)));

    if (!user) {
      const t = getT(ctx.session.user);

      throw new Error(USER_NOT_FOUND(t));
    }

    return this.updateContext(ctx, user);
  };

  public handleError = async (
    ctx: TelegrafContext,
    err: unknown,
    withKeyboard: boolean = true
  ): Promise<void> => {
    const user = ctx.session.user;
    const t = getT(user);
    const keyboard = withKeyboard
      ? this.mainKeyboard.init(user, t).oneTime()
      : {};

    if (err instanceof Error) {
      await ctx.reply(ERROR_MESSAGE(t, err.message), keyboard);
    }
  };
}
