import { ERROR, MESSAGE } from "../constants";
import { mainKeyboard } from "../keyboards";
import {
  userService,
  UserService,
  weatherService,
  WeatherService,
} from "../services";
import { TelegrafContext } from "../types";
import { isValidLocation } from "../utils";
import { Message } from "telegraf/typings/core/types/typegram";

const { ERROR_MESSAGE, INVALID_LOCATION, USER_NOT_FOUND } = ERROR;
const {
  PROMPT_ENTER_LOCATION,
  SUCCESS_LOCATION,
  SUCCESS_LOCATION_WITH_TIME_PROMPT,
} = MESSAGE;

export class LocationController {
  public constructor(
    private weatherService: WeatherService,
    private userService: UserService
  ) {}

  public handleTrigger = async (ctx: TelegrafContext): Promise<void> => {
    await ctx.reply(PROMPT_ENTER_LOCATION);
  };

  public handleMessage = async (ctx: TelegrafContext): Promise<void> => {
    try {
      const userId = String(ctx.from?.id || "");
      const userPrompt = (ctx.message as Message.TextMessage).text;

      if (!isValidLocation(userPrompt)) {
        throw new Error(INVALID_LOCATION);
      }

      const location = userPrompt.trim().toLowerCase();
      const locationGeo = await this.weatherService.getGeo(location);

      if (!locationGeo) {
        throw new Error(INVALID_LOCATION);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { local_names, ...userLocation } = locationGeo;
      const user = this.userService.setLocation(userId, userLocation);

      if (!user) {
        throw new Error(USER_NOT_FOUND);
      }

      const hasNotificationTime = !!user.notificationTime;

      const message = hasNotificationTime
        ? SUCCESS_LOCATION(userLocation.name)
        : SUCCESS_LOCATION_WITH_TIME_PROMPT(userLocation.name);

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

export const locationController = new LocationController(
  weatherService,
  userService
);
