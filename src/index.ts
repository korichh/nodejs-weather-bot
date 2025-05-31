import app from "./app";
import { ENV } from "./constants";
import { logger } from "./utils";

const { nodeEnv } = ENV;

(async (): Promise<void> => {
  try {
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
      const message = nodeEnv === "development" ? err.stack : err.message;

      logger.error(`[Error] ${message}`);
    }
  }
})();
