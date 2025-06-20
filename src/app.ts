import { ENV } from "./constants";
import { useErrorHandler, useSession } from "./middlewares";
import { userModel } from "./models";
import { commandRoutes, hearRoutes, messageRoutes } from "./routes";
import { weatherService } from "./services";
import { TelegrafContext } from "./types";
import {
  registerCommands,
  registerHears,
  registerMessages,
} from "./utils";
import { Telegraf } from "telegraf";

const { TELEGRAM_BOT_TOKEN } = ENV;

class App {
  private bot: Telegraf<TelegrafContext>;

  public constructor() {
    this.bot = new Telegraf(TELEGRAM_BOT_TOKEN);

    this.init();
  }

  private init = (): void => {
    this.setupMiddlewares();
    this.setupRoutes();
    this.testForecast();
    this.setupErrorHandler();
  };

  private setupMiddlewares = (): void => {
    this.bot.use(useSession);
  };

  private setupRoutes = (): void => {
    registerCommands(this.bot, commandRoutes);
    registerHears(this.bot, hearRoutes);
    registerMessages(this.bot, messageRoutes);
  };

  // TODO: remove test forecast method
  private testForecast = async (): Promise<void> => {
    const users = userModel.getAll();

    for (const user of users) {
      // const forecast = await weatherService.getForecast(user.location);
      // console.log(forecast);
    }
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
