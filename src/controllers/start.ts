import { MESSAGE } from "../constants";
import { mainKeyboard } from "../keyboards";
import { UserService } from "../services";
import { TelegrafContext } from "../types";
import { inject, injectable } from "inversify";

const {
  WELCOME,
  UNABLE_TO_OBTAIN_USER,
  MISSING_LOCATION_TIME,
  MISSING_LOCATION,
  MISSING_TIME,
  ALREADY_SUBSCRIBED,
} = MESSAGE;

@injectable()
export class StartController {
  public constructor(
    @inject(UserService) private userService: UserService
  ) {}

  public handleTrigger = async (ctx: TelegrafContext): Promise<void> => {
    await ctx.reply(WELCOME);

    const telegrafUser = ctx.from;
    if (!telegrafUser) {
      ctx.reply(UNABLE_TO_OBTAIN_USER);

      return;
    }

    const user = await this.userService.getUser(telegrafUser);
    const hasLocation = !!user.location;
    const hasTime = !!user.time;

    let message: string;

    if (!hasLocation && !hasTime) {
      message = MISSING_LOCATION_TIME;
    } else if (!hasLocation) {
      message = MISSING_LOCATION;
    } else if (!hasTime) {
      message = MISSING_TIME;
    } else {
      message = ALREADY_SUBSCRIBED;
    }

    await ctx.reply(message, mainKeyboard.oneTime());
  };
}
