import { TelegrafContext } from "../types";

export class LocationController {
  public handleTrigger = async (ctx: TelegrafContext): Promise<void> => {
    await ctx.reply("test location trigger");
  };

  public handleMessage = async (ctx: TelegrafContext): Promise<void> => {
    await ctx.reply("test location message");
  };
}

export const locationController = new LocationController();
