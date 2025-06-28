import { ENV } from "../../../constants";
import { TelegrafContext } from "../../../types";
import { container } from "../instance";
import { Telegraf } from "telegraf";

const { TELEGRAM_BOT_TOKEN } = ENV;

container
  .bind<Telegraf<TelegrafContext>>(Telegraf<TelegrafContext>)
  .toConstantValue(new Telegraf<TelegrafContext>(TELEGRAM_BOT_TOKEN));
