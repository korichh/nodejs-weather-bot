import { Database } from "../../lib";
import { useErrorHandler, useSession } from "../../middlewares";
import { CommandRoutes, HearRoutes, MessageRoutes } from "../../routes";
import { TelegrafContext } from "../../types";
import { inject, injectable } from "inversify";
import { Telegraf } from "telegraf";

@injectable()
export class App {
  public constructor(
    @inject(Telegraf<TelegrafContext>)
    private bot: Telegraf<TelegrafContext>,
    @inject(Database) private database: Database,
    @inject(CommandRoutes) private commandRoutes: CommandRoutes,
    @inject(HearRoutes) private hearRoutes: HearRoutes,
    @inject(MessageRoutes) private messageRoutes: MessageRoutes
  ) {}

  public init = async (): Promise<void> => {
    await this.setupDatabase();
    await this.setupMiddlewares();
    await this.setupRoutes();
    // await this.setupJobs();
    await this.setupErrorHandler();
  };

  private setupDatabase = async (): Promise<void> => {
    await this.database.init();
  };

  private setupMiddlewares = async (): Promise<void> => {
    this.bot.use(useSession);
  };

  private setupRoutes = async (): Promise<void> => {
    await this.commandRoutes.init();
    await this.hearRoutes.init();
    await this.messageRoutes.init();
  };

  // private setupJobs = async (): Promise<void> => {
  //   await ForecastJob.create(
  //     this.bot,
  //     this.userModel,
  //     this.weatherService
  //   );
  // };

  private setupErrorHandler = async (): Promise<void> => {
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
