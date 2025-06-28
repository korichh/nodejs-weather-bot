import { ERROR, MESSAGE } from "../constants";
import { ForecastJob } from "../jobs";
import { MainKeyboard } from "../keyboards";
import { UserService } from "../services";
import { TelegrafContext } from "../types";
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

  public handleTrigger = async (ctx: TelegrafContext): Promise<void> => {
    try {
      const userId = String(ctx.from?.id || "");
      const user = await this.userService.setSubscribtion(userId);

      if (!user) {
        throw new Error(USER_NOT_FOUND);
      }

      const message = user.isSubscribed
        ? SUCCESS_SUBSCRIBE
        : SUCCESS_UNSUBSCRIBE;

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
