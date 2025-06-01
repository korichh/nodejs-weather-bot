import { ENV } from "./constants";
import { commandHandlers, listenerHandlers } from "./handlers";
import { errorHandler } from "./middlewares";
import { Context, Telegraf } from "telegraf";

const { TELEGRAM_BOT_TOKEN } = ENV;

class App {
  private bot: Telegraf<Context>;

  public constructor() {
    this.bot = new Telegraf(TELEGRAM_BOT_TOKEN);

    this.init();
  }

  private init = (): void => {
    this.setupHandlers();
    this.setupErrorHandler();
  };

  private setupHandlers = (): void => {
    Object.entries(commandHandlers).forEach(([command, handlerFn]) => {
      this.bot.command(command, handlerFn);
    });

    Object.entries(listenerHandlers).forEach(([listener, handlerFn]) => {
      this.bot.hears(listener, handlerFn);
    });
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
