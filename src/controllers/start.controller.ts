import { MESSAGE } from "../constants";
import { mainKeyboard } from "../keyboards";
import { userService, UserService } from "../services";
import { Context } from "telegraf";

const {
  WELCOME,
  UNABLE_TO_OBTAIN_USER,
  MISSING_LOCATION_TIME,
  MISSING_LOCATION,
  MISSING_TIME,
  ALREADY_SUBSCRIBED,
} = MESSAGE;

export class StartController {
  public constructor(private userService: UserService) {}

  public use = async (ctx: Context): Promise<void> => {
    await ctx.reply(WELCOME);

    const telegramUser = ctx.from;
    if (!telegramUser) {
      ctx.reply(UNABLE_TO_OBTAIN_USER);

      return;
    }

    const user = this.userService.save(telegramUser);
    const hasLocation = !!user.location?.trim();
    const hasNotificationTime = !!user.notificationTime?.trim();

    let message: string;

    if (!hasLocation && !hasNotificationTime) {
      message = MISSING_LOCATION_TIME;
    } else if (!hasLocation) {
      message = MISSING_LOCATION;
    } else if (!hasNotificationTime) {
      message = MISSING_TIME;
    } else {
      message = ALREADY_SUBSCRIBED;
    }

    await ctx.reply(message, mainKeyboard.oneTime());
  };
}

export const startController = new StartController(userService);
