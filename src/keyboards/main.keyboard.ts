import { BotHearTrigger } from "../types";
import { Markup } from "telegraf";

export const mainKeyboard = Markup.keyboard([
  [BotHearTrigger.SET_LOCATION, BotHearTrigger.SET_NOTIFICATION_TIME],
]).resize();
