import { Context } from "telegraf";

export type BotHandlerFn = (ctx: Context) => void;

export interface BotCommand {
  name: string;
  handler: BotHandlerFn;
}
