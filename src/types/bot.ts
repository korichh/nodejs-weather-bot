import { Context } from "telegraf";
import { User } from "telegraf/typings/core/types/typegram";

export type TelegrafUser = User;

export type TelegrafNext = () => Promise<void>;

export enum BotCommandTrigger {
  START = "start",
}

export enum BotHearTrigger {
  SET_LOCATION = "📍 Set location",
  SET_NOTIFICATION_TIME = "⏰ Set time",
  GET_PROFILE = "👤 Get profile",
  SUBSCRIBE = "🟢 Subscribe",
  UNSUBSCRIBE = "🔴 Unsubscribe",
}

export type BotTrigger = BotCommandTrigger | BotHearTrigger;

export type BotHandlerFn = (ctx: TelegrafContext) => Promise<void>;

export interface TelegrafSession {
  lastTrigger: BotTrigger | null;
}

export interface TelegrafContext extends Context {
  session: TelegrafSession;
}

export type BotCommandRoutes = Partial<
  Record<BotCommandTrigger, BotHandlerFn>
>;

export type BotHearRoutes = Partial<Record<BotHearTrigger, BotHandlerFn>>;

export type BotMessageRoutes = Partial<Record<BotTrigger, BotHandlerFn>>;
