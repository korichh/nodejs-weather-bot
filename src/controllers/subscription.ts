import { ERROR, MESSAGE } from "../constants";
import { ForecastJob } from "../jobs";
import { MainKeyboard } from "../keyboards";
import { UserService } from "../services";
import { TelegrafContext, TelegrafNext } from "../types";
import { inject, injectable } from "inversify";

const { ERROR_MESSAGE, USER_NOT_FOUND } = ERROR;
const { SUCCESS_SUBSCRIBE, SUCCESS_UNSUBSCRIBE } = MESSAGE;

@injectable()
export class SubscriptionController {
  public constructor(
    @inject(UserService) private userService: UserService,
    @inject(ForecastJob) private forecastJob: ForecastJob,
    @inject(MainKeyboard) private mainKeyboard: MainKeyboard
  ) {}

  public handleTrigger = async (
    ctx: TelegrafContext,
    next: TelegrafNext
  ): Promise<void> => {
    try {
      let user = ctx.session.user;
      if (!user) {
        throw new Error(USER_NOT_FOUND);
      }

      user = await this.userService.setSubscribtion(user.id);
      if (!user) {
        throw new Error(USER_NOT_FOUND);
      }

      ctx.session.user = user;

      const message = user.isSubscribed
        ? SUCCESS_SUBSCRIBE
        : SUCCESS_UNSUBSCRIBE;

      const keyboard = this.mainKeyboard.init(user).oneTime();

      await ctx.reply(message, keyboard);

      await this.forecastJob.update(user);

      await next();
    } catch (err) {
      if (err instanceof Error) {
        await ctx.reply(ERROR_MESSAGE(err.message));
      }
    }
  };
}
