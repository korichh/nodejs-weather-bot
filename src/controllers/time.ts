import { ERROR, MESSAGE } from "../constants";
import { ForecastJob } from "../jobs";
import { MainKeyboard } from "../keyboards";
import { UserService } from "../services";
import { TelegrafContext } from "../types";
import { isValidTime } from "../utils";
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

  public handleTrigger = async (ctx: TelegrafContext): Promise<void> => {
    await ctx.reply(PROMPT_ENTER_TIME);
  };

  public handleMessage = async (ctx: TelegrafContext): Promise<void> => {
    try {
      const userId = String(ctx.from?.id || "");
      const userPrompt = (ctx.message as Message.TextMessage).text;

      if (!isValidTime(userPrompt)) {
        throw new Error(INVALID_TIME);
      }

      const time = userPrompt.trim().toLowerCase();
      const user = await this.userService.setTime(userId, time);

      if (!user) {
        throw new Error(USER_NOT_FOUND);
      }

      const message = !!user.location
        ? SUCCESS_TIME(time)
        : SUCCESS_TIME_WITH_LOCATION_PROMPT(time);

      const keyboard = this.mainKeyboard.init(user).oneTime();

      await ctx.reply(message, keyboard);

      await this.forecastJob.update(user);
    } catch (err) {
      if (err instanceof Error) {
        await ctx.reply(ERROR_MESSAGE(err.message));
      }
    }
  };
}
