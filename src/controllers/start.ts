import { I18NEXT } from "../configs";
import { ERROR, MESSAGE } from "../constants";
import { MainKeyboard } from "../keyboards";
import { UserService } from "../services";
import { TelegrafContext, TelegrafNext } from "../types";
import { getT } from "../utils";
import { inject, injectable } from "inversify";

const { ERROR_MESSAGE, UNABLE_TO_OBTAIN_USER } = ERROR;
const {
  WELCOME,
  MISSING_LOCATION_TIME,
  MISSING_LOCATION,
  MISSING_TIME,
  READY_TO_SUBSCRIBE,
  ALREADY_SUBSCRIBED,
} = MESSAGE;

const { languages } = I18NEXT;

@injectable()
export class StartController {
  public constructor(
    @inject(UserService) private userService: UserService,
    @inject(MainKeyboard) private mainKeyboard: MainKeyboard
  ) {}

  public handleTrigger = async (
    ctx: TelegrafContext,
    next: TelegrafNext
  ): Promise<void> => {
    let t = getT(ctx.session.user);

    try {
      const telegrafUser = ctx.from;
      if (!telegrafUser) {
        throw new Error(UNABLE_TO_OBTAIN_USER(t));
      }

      if (!languages.includes(telegrafUser.language_code || "")) {
        telegrafUser.language_code = languages[0];
      }

      const user = await this.userService.saveUser(telegrafUser);

      t = getT(user);
      ctx.session.user = user;

      const hasLocation = !!user.location;
      const hasTime = !!user.time;

      let message: string;

      if (!hasLocation && !hasTime) {
        message = MISSING_LOCATION_TIME(t);
      } else if (!hasLocation) {
        message = MISSING_LOCATION(t);
      } else if (!hasTime) {
        message = MISSING_TIME(t);
      } else if (!user.isSubscribed) {
        message = READY_TO_SUBSCRIBE(t);
      } else {
        message = ALREADY_SUBSCRIBED(t);
      }

      const keyboard = this.mainKeyboard.init(t, user).oneTime();

      await ctx.reply(WELCOME(t));
      await ctx.reply(message, keyboard);

      await next();
    } catch (err) {
      if (err instanceof Error) {
        await ctx.reply(ERROR_MESSAGE(t, err.message));
      }
    }
  };
}
