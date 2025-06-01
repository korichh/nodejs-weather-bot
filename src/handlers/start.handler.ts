import { Context } from "telegraf";

export class StartHandler {
  public use = (ctx: Context): void => {
    ctx.reply("start");
  };
}

export const startHandler = new StartHandler();
