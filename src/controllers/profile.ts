import { HelperController } from "./helper";
import { MESSAGE } from "@constants";
import { TelegrafContext, TelegrafNext } from "@types";
import { parseUser } from "@utils";
import { inject, injectable } from "inversify";

const { USER_INFO } = MESSAGE;

@injectable()
export class ProfileController {
  public constructor(
    @inject(HelperController) private helperController: HelperController
  ) {}

  public handleTrigger = async (
    ctx: TelegrafContext,
    next: TelegrafNext
  ): Promise<void> => {
    try {
      let { t, user, keyboard } =
        await this.helperController.initContext(ctx);

      const userInfo = parseUser(t, user);

      await ctx.reply(USER_INFO(t, userInfo), {
        parse_mode: "Markdown",
        reply_markup: keyboard.reply_markup,
      });

      await next();
    } catch (err) {
      await this.helperController.handleError(ctx, err);
    }
  };
}
