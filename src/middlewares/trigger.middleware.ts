import { BotTrigger, TelegrafContext, TelegrafNext } from "../types";

export const useTrigger = (trigger: BotTrigger) => {
  return async (
    ctx: TelegrafContext,
    next: TelegrafNext
  ): Promise<void> => {
    ctx.session.lastTrigger = trigger;
    await next();
  };
};
