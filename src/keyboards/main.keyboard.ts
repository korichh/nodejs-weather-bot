import { BotListener } from "../types";
import { Markup } from "telegraf";

export const mainKeyboard = Markup.keyboard([
  [BotListener.SET_LOCATION, BotListener.SET_NOTIFICATION_TIME],
]).resize();
