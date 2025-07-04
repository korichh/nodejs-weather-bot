import { HelperController } from "./helper";
import { ERROR, MESSAGE } from "@constants";
import { ForecastJob } from "@jobs";
import { MainKeyboard } from "@keyboards";
import { UserService } from "@services";
import { TelegrafContext, TelegrafNext } from "@types";
import { getT, isValidTime, validateString } from "@utils";
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
    @inject(HelperController) private helperController: HelperController,
    @inject(UserService) private userService: UserService,
    @inject(ForecastJob) private forecastJob: ForecastJob,
    @inject(MainKeyboard) private mainKeyboard: MainKeyboard
  ) {}

  public handleTrigger = async (
    ctx: TelegrafContext,
    next: TelegrafNext
  ): Promise<void> => {
    try {
      const { t } = await this.helperController.initContext(ctx);

      await ctx.reply(PROMPT_ENTER_TIME(t));

      await next();
    } catch (err) {
      await this.helperController.handleError(ctx, err, false);
    }
  };

  public handleMessage = async (ctx: TelegrafContext): Promise<void> => {
    try {
      let { t, user, keyboard } =
        await this.helperController.initContext(ctx);

      const timeText = (ctx.message as Message.TextMessage).text;
      if (!isValidTime(timeText)) {
        throw new Error(INVALID_TIME(t));
      }

      const time = validateString(timeText);

      const updatedUser = await this.userService.setTime(user.id, time);
      if (!updatedUser) {
        throw new Error(USER_NOT_FOUND(t));
      }

      ({ t, user, keyboard } = await this.helperController.updateContext(
        ctx,
        updatedUser
      ));

      const message = !user.location
        ? SUCCESS_TIME_WITH_LOCATION_PROMPT(t, time)
        : SUCCESS_TIME(t, time);

      await ctx.reply(message, keyboard);

      await this.forecastJob.update(user);
    } catch (err) {
      await this.helperController.handleError(ctx, err);
    }
  };
}
