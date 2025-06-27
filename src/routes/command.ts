import { StartController } from "../controllers";
import { useTrigger } from "../middlewares";
import {
  BotCommandTrigger,
  BotCommandRoutes,
  TelegrafContext,
} from "../types";
import { inject, injectable } from "inversify";
import { Telegraf } from "telegraf";

@injectable()
export class CommandRoutes {
  public constructor(
    @inject(Telegraf) private bot: Telegraf<TelegrafContext>,
    @inject(StartController) private startController: StartController
  ) {}

  public init = async (): Promise<void> => {
    const commandRoutes: BotCommandRoutes = {
      [BotCommandTrigger.START]: this.startController.handleTrigger,
    };

    Object.entries(commandRoutes).forEach(([command, handlerFn]) => {
      this.bot.command(
        command,
        useTrigger(command as BotCommandTrigger),
        handlerFn
      );
    });
  };
}
