import { inject, injectable } from "inversify";

import { HelperController } from "./helper";

import { ERROR, MESSAGE } from "@/constants";
import { ForecastJob } from "@/jobs";
import { UserService } from "@/services";
import { TelegrafContext, TelegrafNext } from "@/types";

const { USER_NOT_FOUND } = ERROR;
const { SUCCESS_LANGUAGE } = MESSAGE;

@injectable()
export class LanguageController {
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

      const updatedUser = await this.userService.setLanguage(user.id);
      if (!updatedUser) {
        throw new Error(USER_NOT_FOUND(t));
      }

      ({ t, user, keyboard } = await this.helperController.updateContext(
        ctx,
        updatedUser
      ));

      await ctx.reply(SUCCESS_LANGUAGE(t), keyboard);

      await this.forecastJob.update(user);

      await next();
    } catch (err) {
      await this.helperController.handleError(ctx, err);
    }
  };
}
