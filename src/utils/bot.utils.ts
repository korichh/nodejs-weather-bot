import { useTrigger } from "../middlewares";
import {
  BotCommandRoutes,
  BotCommandTrigger,
  BotHearRoutes,
  BotHearTrigger,
  BotMessageRoutes,
  TelegrafContext,
} from "../types";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

export const registerCommands = (
  bot: Telegraf<TelegrafContext>,
  commandRoutes: BotCommandRoutes
): void => {
  Object.entries(commandRoutes).forEach(([command, handlerFn]) => {
    bot.command(
      command,
      useTrigger(command as BotCommandTrigger),
      handlerFn
    );
  });
};

export const registerHears = (
  bot: Telegraf<TelegrafContext>,
  hearRoutes: BotHearRoutes
): void => {
  Object.entries(hearRoutes).forEach(([hear, handlerFn]) => {
    bot.hears(hear, useTrigger(hear as BotHearTrigger), handlerFn);
  });
};

export const registerMessages = (
  bot: Telegraf<TelegrafContext>,
  messageRoutes: BotMessageRoutes
): void => {
  bot.on(message(), async (ctx) => {
    const lastTrigger = ctx.session.lastTrigger;
    if (!lastTrigger) {
      return;
    }

    const handlerFn = messageRoutes[lastTrigger];
    if (!handlerFn) {
      return;
    }

    handlerFn(ctx);
    ctx.session.lastTrigger = null;
  });
};
