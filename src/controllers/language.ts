import { ERROR, MESSAGE } from "../constants";
import { ForecastJob } from "../jobs";
import { MainKeyboard } from "../keyboards";
import { UserService } from "../services";
import { TelegrafContext, TelegrafNext } from "../types";
import { getT } from "../utils";
import { inject, injectable } from "inversify";

const { ERROR_MESSAGE, USER_NOT_FOUND } = ERROR;
const { SUCCESS_LANGUAGE } = MESSAGE;

@injectable()
export class LanguageController {
  public constructor(
    @inject(UserService) private userService: UserService,
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

      const updatedUser = await this.userService.setLanguage(user.id);
      if (!updatedUser) {
        throw new Error(USER_NOT_FOUND(t));
      }

      ctx.session.user = updatedUser;
      t = getT(updatedUser);

      const message = SUCCESS_LANGUAGE(t);

      const keyboard = this.mainKeyboard.init(t, updatedUser).oneTime();

      await ctx.reply(message, keyboard);

      await this.forecastJob.update(updatedUser);

      await next();
    } catch (err) {
      if (err instanceof Error) {
        await ctx.reply(ERROR_MESSAGE(t, err.message));
      }
    }
  };
}
