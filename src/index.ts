import { App, container } from "./app";
import { ENV } from "./constants";
import { logger } from "./utils";
import "reflect-metadata";

const { NODE_ENV } = ENV;

(async (): Promise<void> => {
  try {
    const app = container.get(App);

    await app.init();

    await app.start({}, () => {
      logger.info("Application started successfully");

      const stopApp = (reason: string): void => {
        app.stop(reason, () => {
          logger.info("Application stopped successfully");
        });
      };

      process.once("SIGINT", stopApp);
      process.once("SIGTERM", stopApp);
    });
  } catch (err) {
    if (err instanceof Error) {
      const message = NODE_ENV === "development" ? err.stack : err.message;

      logger.error(`[Error] ${message}`);
    }
  }
})();
