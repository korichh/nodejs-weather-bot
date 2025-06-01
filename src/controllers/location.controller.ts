import { ERROR, MESSAGE } from "../constants";
import { mainKeyboard } from "../keyboards";
import { userService, UserService } from "../services";
import { TelegrafContext } from "../types";
import { isValidLocation } from "../utils";
import { Message } from "telegraf/typings/core/types/typegram";

const { INVALID_LOCATION, USER_NOT_FOUND } = ERROR;
const {
  PROMPT_ENTER_LOCATION,
  SUCCESS_LOCATION,
  SUCCESS_LOCATION_WITH_NOTIFICATION_PROMPT,
} = MESSAGE;

export class LocationController {
  public constructor(private userService: UserService) {}

  public handleTrigger = async (ctx: TelegrafContext): Promise<void> => {
    await ctx.reply(PROMPT_ENTER_LOCATION);
  };

  public handleMessage = async (ctx: TelegrafContext): Promise<void> => {
    try {
      const userId = String(ctx.from?.id || "");
      const location = (ctx.message as Message.TextMessage).text
        .trim()
        .toLowerCase();

      if (!isValidLocation(location)) {
        throw new Error(INVALID_LOCATION);
      }

      const user = this.userService.setLocation(userId, location);
      if (!user) {
        throw new Error(USER_NOT_FOUND);
      }

      const hasNotificationTime = !!user.notificationTime?.trim();

      const message = hasNotificationTime
        ? SUCCESS_LOCATION(location)
        : SUCCESS_LOCATION_WITH_NOTIFICATION_PROMPT(location);

      const keyboard = hasNotificationTime
        ? undefined
        : mainKeyboard.oneTime();

      ctx.reply(message, keyboard);
    } catch (err) {
      if (err instanceof Error) {
        ctx.reply(`❌ Error: ${err.message}`);
      }
    }
  };
}

export const locationController = new LocationController(userService);
