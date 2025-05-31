import { Context } from "telegraf";

export class TimeController {
  public use = async (ctx: Context): Promise<void> => {
    await ctx.reply("test time controller");
  };
}

export const timeController = new TimeController();
