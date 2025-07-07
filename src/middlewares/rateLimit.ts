import { MESSAGE } from "@/constants";
import { TelegrafContext, TelegrafNext } from "@/types";
import { getT } from "@/utils";
import { rateLimiter } from "@/utils/rateLimiter";

const { TOO_OFTEN } = MESSAGE;

export const rateLimitMiddleware = async (
  ctx: TelegrafContext,
  next: TelegrafNext
) => {
  const userId = ctx.from?.id;

  if (!userId || !rateLimiter.isAllowed(userId)) {
    const t = getT(ctx.session.user);

    await ctx.reply(TOO_OFTEN(t));
    return;
  }

  return next();
};
