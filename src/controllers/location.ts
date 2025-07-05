import { inject, injectable } from "inversify";
import { Message } from "telegraf/typings/core/types/typegram";

import { HelperController } from "./helper";

import { ERROR, MESSAGE } from "@/constants";
import { ForecastJob } from "@/jobs";
import { UserService, WeatherService } from "@/services";
import { TelegrafContext, TelegrafNext } from "@/types";
import {
  isValidLocation,
  parseUserLocation,
  validateString,
} from "@/utils";

const { INVALID_LOCATION, USER_NOT_FOUND } = ERROR;
const {
  PROMPT_ENTER_LOCATION,
  SUCCESS_LOCATION,
  SUCCESS_LOCATION_WITH_TIME_PROMPT,
} = MESSAGE;

@injectable()
export class LocationController {
  public constructor(
    @inject(HelperController) private helperController: HelperController,
    @inject(UserService) private userService: UserService,
    @inject(WeatherService) private weatherService: WeatherService,
    @inject(ForecastJob) private forecastJob: ForecastJob
  ) {}

  public handleTrigger = async (
    ctx: TelegrafContext,
    next: TelegrafNext
  ): Promise<void> => {
    try {
      const { t } = await this.helperController.initContext(ctx);

      await ctx.reply(PROMPT_ENTER_LOCATION(t));

      await next();
    } catch (err) {
      await this.helperController.handleError(ctx, err, false);
    }
  };

  public handleMessage = async (ctx: TelegrafContext): Promise<void> => {
    try {
      let { t, user, keyboard } =
        await this.helperController.initContext(ctx);

      const locationText = (ctx.message as Message.TextMessage).text;
      if (!isValidLocation(locationText)) {
        throw new Error(INVALID_LOCATION(t));
      }

      const location = validateString(locationText);

      const locationGeo = await this.weatherService.getGeo(location);
      if (!locationGeo) {
        throw new Error(INVALID_LOCATION(t));
      }

      const userLocation = parseUserLocation(user, locationGeo);

      const updatedUser = await this.userService.setLocation(
        user.id,
        userLocation
      );

      if (!updatedUser) {
        throw new Error(USER_NOT_FOUND(t));
      }

      ({ t, user, keyboard } = await this.helperController.updateContext(
        ctx,
        updatedUser
      ));

      const message = !user.time
        ? SUCCESS_LOCATION_WITH_TIME_PROMPT(t, userLocation.name)
        : SUCCESS_LOCATION(t, userLocation.name);

      await ctx.reply(message, keyboard);

      await this.forecastJob.update(user);
    } catch (err) {
      await this.helperController.handleError(ctx, err);
    }
  };
}
