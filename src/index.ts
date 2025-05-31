import app from "./app";
import { logger } from "./utils";

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
      logger.error(`[Error] ${err.message}`);
    }
  }
})();
