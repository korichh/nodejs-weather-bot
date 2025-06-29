import { ERROR, MESSAGE } from "../constants";
import { ForecastJob } from "../jobs";
import { MainKeyboard } from "../keyboards";
import { UserService } from "../services";
import { TelegrafContext, TelegrafNext } from "../types";
import { getT, isValidTime } from "../utils";
import { inject, injectable } from "inversify";
import { Message } from "telegraf/typings/core/types/typegram";

const { ERROR_MESSAGE, INVALID_TIME, USER_NOT_FOUND } = ERROR;
const {
  PROMPT_ENTER_TIME,
  SUCCESS_TIME,
  SUCCESS_TIME_WITH_LOCATION_PROMPT,
} = MESSAGE;

@injectable()
export class TimeController {
  public constructor(
    @inject(UserService) private userService: UserService,
    @inject(ForecastJob) private forecastJob: ForecastJob,
    @inject(MainKeyboard) private mainKeyboard: MainKeyboard
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

      await ctx.reply(PROMPT_ENTER_TIME(t));

      await next();
    } catch (err) {
      if (err instanceof Error) {
        await ctx.reply(ERROR_MESSAGE(t, err.message));
      }
    }
  };

  public handleMessage = async (ctx: TelegrafContext): Promise<void> => {
    let t = getT(ctx.session.user);

    try {
      const userId = String(ctx.from?.id);
      const user = await this.userService.getUser(userId);

      if (!user) {
        throw new Error(USER_NOT_FOUND(t));
      }

      t = getT(ctx.session.user);

      const userPrompt = (ctx.message as Message.TextMessage).text;
      if (!isValidTime(userPrompt)) {
        throw new Error(INVALID_TIME(t));
      }

      const time = userPrompt.trim().toLowerCase();
      const updatedUser = await this.userService.setTime(user.id, time);

      if (!updatedUser) {
        throw new Error(USER_NOT_FOUND(t));
      }

      ctx.session.user = updatedUser;

      const message = !!updatedUser.location
        ? SUCCESS_TIME(t, time)
        : SUCCESS_TIME_WITH_LOCATION_PROMPT(t, time);

      const keyboard = this.mainKeyboard.init(t, updatedUser).oneTime();

      await ctx.reply(message, keyboard);

      await this.forecastJob.update(updatedUser);
    } catch (err) {
      if (err instanceof Error) {
        await ctx.reply(ERROR_MESSAGE(t, err.message));
      }
    }
  };
}
