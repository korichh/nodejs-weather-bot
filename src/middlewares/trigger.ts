import { BotTrigger, TelegrafContext } from "@/types";

export const useTrigger = (trigger: BotTrigger) => {
  return async (ctx: TelegrafContext): Promise<void> => {
    ctx.session.lastTrigger = trigger;
  };
};
