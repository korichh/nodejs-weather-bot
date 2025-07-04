import { HelperController } from "./helper";
import { MESSAGE } from "@constants";
import { TelegrafContext, TelegrafNext } from "@types";
import { inject, injectable } from "inversify";

const {
  WELCOME,
  MISSING_LOCATION_TIME,
  MISSING_LOCATION,
  MISSING_TIME,
  READY_TO_SUBSCRIBE,
  ALREADY_SUBSCRIBED,
} = MESSAGE;

@injectable()
export class StartController {
  public constructor(
    @inject(HelperController) private helperController: HelperController
  ) {}

  public handleTrigger = async (
    ctx: TelegrafContext,
    next: TelegrafNext
  ): Promise<void> => {
    try {
      const { t, user, keyboard } =
        await this.helperController.initContext(ctx, true);

      let message: string;

      if (!user.location && !user.time) {
        message = MISSING_LOCATION_TIME(t);
      } else if (!user.location) {
        message = MISSING_LOCATION(t);
      } else if (!user.time) {
        message = MISSING_TIME(t);
      } else if (!user.isSubscribed) {
        message = READY_TO_SUBSCRIBE(t);
      } else {
        message = ALREADY_SUBSCRIBED(t);
      }

      await ctx.reply(WELCOME(t));

      await ctx.reply(message, keyboard);

      await next();
    } catch (err) {
      await this.helperController.handleError(ctx, err, false);
    }
  };
}
