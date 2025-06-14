import { Context } from "telegraf";
import { User } from "telegraf/typings/core/types/typegram";

export type TelegrafUser = User;

export type TelegrafNext = () => Promise<void>;

export enum BotCommandTrigger {
  START = "start",
}

export enum BotHearTrigger {
  SET_LOCATION = "📍 Set location",
  SET_NOTIFICATION_TIME = "⏰ Set notification time",
}

export type BotTrigger = BotCommandTrigger | BotHearTrigger;

export type BotHandlerFn = (ctx: TelegrafContext) => void;

export interface TelegrafSession {
  lastTrigger: BotTrigger | null;
}

export interface TelegrafContext extends Context {
  session: TelegrafSession;
}

export type BotCommandRoutes = Record<BotCommandTrigger, BotHandlerFn>;

export type BotHearRoutes = Record<BotHearTrigger, BotHandlerFn>;

export type BotMessageRoutes = Partial<Record<BotTrigger, BotHandlerFn>>;
