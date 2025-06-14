import { ERROR, MESSAGE } from "../constants";
import { mainKeyboard } from "../keyboards";
import { userService, UserService } from "../services";
import { TelegrafContext } from "../types";
import { isValidTime } from "../utils";
import { Message } from "telegraf/typings/core/types/typegram";

const { ERROR_MESSAGE, INVALID_TIME, USER_NOT_FOUND } = ERROR;
const {
  PROMPT_ENTER_TIME,
  SUCCESS_TIME,
  SUCCESS_TIME_WITH_LOCATION_PROMPT,
} = MESSAGE;

export class TimeController {
  public constructor(private userService: UserService) {}

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
      const user = this.userService.setTime(userId, time);

      if (!user) {
        throw new Error(USER_NOT_FOUND);
      }

      const hasLocation = !!user.location;

      const message = hasLocation
        ? SUCCESS_TIME(time)
        : SUCCESS_TIME_WITH_LOCATION_PROMPT(time);

      await ctx.reply(message, mainKeyboard.oneTime());
    } catch (err) {
      if (err instanceof Error) {
        await ctx.reply(
          ERROR_MESSAGE(err.message),
          mainKeyboard.oneTime()
        );
      }
    }
  };
}

export const timeController = new TimeController(userService);
