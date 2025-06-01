import { TelegrafContext } from "../types";

export class TimeController {
  public handleTrigger = async (ctx: TelegrafContext): Promise<void> => {
    await ctx.reply("test time trigger");
  };

  public handleMessage = async (ctx: TelegrafContext): Promise<void> => {
    await ctx.reply("test time message");
  };
}

export const timeController = new TimeController();
