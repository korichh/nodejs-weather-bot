import { ERROR, MESSAGE } from "../constants";
import { ForecastJob } from "../jobs";
import { MainKeyboard } from "../keyboards";
import { UserService, WeatherService } from "../services";
import { TelegrafContext, TelegrafNext } from "../types";
import { getT, isValidLocation } from "../utils";
import { injectable, inject } from "inversify";
import { Message } from "telegraf/typings/core/types/typegram";

const { ERROR_MESSAGE, INVALID_LOCATION, USER_NOT_FOUND } = ERROR;
const {
  PROMPT_ENTER_LOCATION,
  SUCCESS_LOCATION,
  SUCCESS_LOCATION_WITH_TIME_PROMPT,
} = MESSAGE;

@injectable()
export class LocationController {
  public constructor(
    @inject(UserService) private userService: UserService,
    @inject(WeatherService) private weatherService: WeatherService,
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

      await ctx.reply(PROMPT_ENTER_LOCATION(t));

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

      t = getT(user);

      const userPrompt = (ctx.message as Message.TextMessage).text;
      if (!isValidLocation(userPrompt)) {
        throw new Error(INVALID_LOCATION(t));
      }

      const location = userPrompt.trim().toLowerCase();
      const locationGeo = await this.weatherService.getGeo(location);

      if (!locationGeo) {
        throw new Error(INVALID_LOCATION(t));
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { local_names, ...userLocation } = locationGeo;
      const updatedUser = await this.userService.setLocation(
        user.id,
        userLocation
      );

      if (!updatedUser) {
        throw new Error(USER_NOT_FOUND(t));
      }

      ctx.session.user = updatedUser;

      const message = !!updatedUser.time
        ? SUCCESS_LOCATION(t, userLocation.name)
        : SUCCESS_LOCATION_WITH_TIME_PROMPT(t, userLocation.name);

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
