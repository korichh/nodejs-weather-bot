import { Context } from "telegraf";

export type BotHandlerFn = (ctx: Context) => void;

export enum BotCommand {
  START = "start",
}

export type BotCommandHandlers = Record<BotCommand, BotHandlerFn>;

export enum BotListener {
  SET_LOCATION = "Set location",
  SET_NOTIFICATION_TIME = "Set notification time",
}

export type BotListenerHandlers = Record<BotListener, BotHandlerFn>;
