import { REPLY } from "../constants";
import { userService, UserService } from "../services";
import { Context } from "telegraf";

const { unableToGetUserInformation } = REPLY;

export class StartHandler {
  public constructor(private userService: UserService) {}

  public use = (ctx: Context): void => {
    const telegramUser = ctx.from;
    if (!telegramUser) {
      ctx.reply(unableToGetUserInformation);

      return;
    }

    const user = this.userService.save(telegramUser);

    ctx.reply(`Hello, ${user.firstName}`);
  };
}

export const startHandler = new StartHandler(userService);
