import { ERROR, MESSAGE } from "../constants";
import { MainKeyboard } from "../keyboards";
import { UserService } from "../services";
import { TelegrafContext } from "../types";
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

@injectable()
export class StartController {
  public constructor(
    @inject(UserService) private userService: UserService,
    @inject(MainKeyboard) private mainKeyboard: MainKeyboard
  ) {}

  public handleTrigger = async (ctx: TelegrafContext): Promise<void> => {
    try {
      await ctx.reply(WELCOME);

      const telegrafUser = ctx.from;
      if (!telegrafUser) {
        throw new Error(UNABLE_TO_OBTAIN_USER);
      }

      const user = await this.userService.saveUser(telegrafUser);
      const hasLocation = !!user.location;
      const hasTime = !!user.time;

      let message: string;

      if (!hasLocation && !hasTime) {
        message = MISSING_LOCATION_TIME;
      } else if (!hasLocation) {
        message = MISSING_LOCATION;
      } else if (!hasTime) {
        message = MISSING_TIME;
      } else if (!user.isSubscribed) {
        message = READY_TO_SUBSCRIBE;
      } else {
        message = ALREADY_SUBSCRIBED;
      }

      const keyboard = this.mainKeyboard.init(user).oneTime();

      await ctx.reply(message, keyboard);
    } catch (err) {
      if (err instanceof Error) {
        await ctx.reply(ERROR_MESSAGE(err.message));
      }
    }
  };
}
