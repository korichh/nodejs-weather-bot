import { Context } from "telegraf";

export class LocationController {
  public use = async (ctx: Context): Promise<void> => {
    await ctx.reply("test location controller");
  };
}

export const locationController = new LocationController();
