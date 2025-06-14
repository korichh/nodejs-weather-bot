import { ENV } from "./constants";
import { useErrorHandler, useSession } from "./middlewares";
import { commandRoutes, hearRoutes, messageRoutes } from "./routes";
import { TelegrafContext } from "./types";
import { initCommands, initHears, initMessages } from "./utils";
import { initForecast } from "./utils";
import { Telegraf } from "telegraf";

const { TELEGRAM_BOT_TOKEN } = ENV;

class App {
  private bot: Telegraf<TelegrafContext>;

  public constructor() {
    this.bot = new Telegraf(TELEGRAM_BOT_TOKEN);

    this.setupMiddlewares();
    this.setupRoutes();
    this.setupJobs();
    this.setupErrorHandler();
  }

  private setupMiddlewares = (): void => {
    this.bot.use(useSession);
  };

  private setupRoutes = (): void => {
    initCommands(this.bot, commandRoutes);
    initHears(this.bot, hearRoutes);
    initMessages(this.bot, messageRoutes);
  };

  private setupJobs = (): void => {
    initForecast(this.bot);
  };

  private setupErrorHandler = (): void => {
    this.bot.catch(useErrorHandler);
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
