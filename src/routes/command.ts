import { inject, injectable } from "inversify";
import { Telegraf } from "telegraf";

import { COMMAND } from "@/constants";
import { StartController } from "@/controllers";
import { useTrigger } from "@/middlewares";
import {
  BotCommandRoutes,
  BotCommandTrigger,
  TelegrafContext,
} from "@/types";

@injectable()
export class CommandRoutes {
  public constructor(
    @inject(Telegraf<TelegrafContext>)
    private bot: Telegraf<TelegrafContext>,
    @inject(StartController) private startController: StartController
  ) {}

  public init = async (): Promise<void> => {
    const commandRoutes: BotCommandRoutes = {
      [COMMAND[BotCommandTrigger.START]]:
        this.startController.handleTrigger,
    };

    Object.entries(commandRoutes).forEach(([command, handlerFn]) => {
      this.bot.command(
        command,
        handlerFn,
        useTrigger(command as BotCommandTrigger)
      );
    });
  };
}
