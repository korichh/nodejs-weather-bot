import { COMMAND } from "@constants";
import { StartController } from "@controllers";
import { useTrigger } from "@middlewares";
import {
  BotCommandTrigger,
  BotCommandRoutes,
  TelegrafContext,
} from "@types";
import { inject, injectable } from "inversify";
import { Telegraf } from "telegraf";

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
