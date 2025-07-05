import { inject, injectable } from "inversify";

import { HelperController } from "./helper";

import { ERROR, MESSAGE } from "@/constants";
import { ForecastJob } from "@/jobs";
import { UserService } from "@/services";
import { TelegrafContext, TelegrafNext } from "@/types";

const { USER_NOT_FOUND } = ERROR;
const { SUCCESS_SUBSCRIBE, SUCCESS_UNSUBSCRIBE } = MESSAGE;

@injectable()
export class SubscriptionController {
  public constructor(
    @inject(HelperController) private helperController: HelperController,
    @inject(UserService) private userService: UserService,
    @inject(ForecastJob) private forecastJob: ForecastJob
  ) {}

  public handleTrigger = async (
    ctx: TelegrafContext,
    next: TelegrafNext
  ): Promise<void> => {
    try {
      let { t, user, keyboard } =
        await this.helperController.initContext(ctx);

      const updatedUser = await this.userService.setSubscribtion(user.id);
      if (!updatedUser) {
        throw new Error(USER_NOT_FOUND(t));
      }

      ({ t, user, keyboard } = await this.helperController.updateContext(
        ctx,
        updatedUser
      ));

      const message = user.isSubscribed
        ? SUCCESS_SUBSCRIBE(t)
        : SUCCESS_UNSUBSCRIBE(t);

      await ctx.reply(message, keyboard);

      await this.forecastJob.update(user);

      await next();
    } catch (err) {
      await this.helperController.handleError(ctx, err);
    }
  };
}
