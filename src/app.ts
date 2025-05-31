import commands from "./commands";
import { ENV } from "./constants";
import { errorHandler } from "./middlewares";
import { Context, Telegraf } from "telegraf";

const { telegramBotToken } = ENV;

class App {
  private bot: Telegraf<Context>;

  public constructor() {
    this.bot = new Telegraf(telegramBotToken);

    this.init();
  }

  private init = (): void => {
    this.setupCommands();
    this.setupErrorHandler();
  };

  private setupCommands = (): void => {
    commands.forEach(({ name, handler }) =>
      this.bot.command(name, handler)
    );
  };

  private setupErrorHandler = (): void => {
    this.bot.catch(errorHandler);
  };

  public start = async (
    config: Telegraf.LaunchOptions,
    onStart?: () => void
  ): Promise<void> => {
    await this.bot.launch(config, onStart);
  };

  public stop = (reason?: string, onStop?: () => void): void => {
    this.bot.stop(reason);

    if (onStop) {
      onStop();
    }
  };
}

export default new App();
