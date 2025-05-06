import { ENV } from "../constants";
import { Context, Telegraf } from "telegraf";

const { botToken } = ENV;

export class BotModel {
  bot: Telegraf<Context>;

  constructor() {
    this.bot = new Telegraf(botToken);
  }
}

export const botModel = new BotModel();
