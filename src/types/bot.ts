import { User } from "./user";
import { Context } from "telegraf";
import { User as TUser } from "telegraf/typings/core/types/typegram";

export type TelegrafUser = TUser;

export type TelegrafNext = () => Promise<void>;

export enum BotCommandTrigger {
  START = "START",
}

export enum BotHearTrigger {
  SET_LOCATION = "SET_LOCATION",
  SET_NOTIFICATION_TIME = "SET_NOTIFICATION_TIME",
  GET_PROFILE = "GET_PROFILE",
  SUBSCRIBE = "SUBSCRIBE",
  UNSUBSCRIBE = "UNSUBSCRIBE",
}

export type BotTrigger = BotCommandTrigger | BotHearTrigger;

export type BotHandlerFn = (ctx: TelegrafContext) => Promise<void>;

export interface TelegrafSession {
  lastTrigger: BotTrigger | null;
  user: User | null;
}

export interface TelegrafContext extends Context {
  session: TelegrafSession;
}

export type BotCommandRoutes = Partial<
  Record<BotCommandTrigger, BotHandlerFn>
>;

export type BotHearRoutes = Partial<Record<BotHearTrigger, BotHandlerFn>>;

export type BotMessageRoutes = Partial<Record<BotTrigger, BotHandlerFn>>;
