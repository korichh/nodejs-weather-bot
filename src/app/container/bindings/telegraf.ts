import { Telegraf } from "telegraf";

import { container } from "../instance";

import { ENV } from "@/constants";
import { TelegrafContext } from "@/types";

const { TELEGRAM_BOT_TOKEN } = ENV;

container
  .bind<Telegraf<TelegrafContext>>(Telegraf<TelegrafContext>)
  .toConstantValue(new Telegraf<TelegrafContext>(TELEGRAM_BOT_TOKEN));
