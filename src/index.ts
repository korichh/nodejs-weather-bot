import { App, container } from "./app";
import { ENV, SYSTEM } from "./constants";
import { logger } from "./utils";
import "reflect-metadata";

const { NODE_ENV } = ENV;
const { APP_START, APP_STOP, APP_MESSAGE, APP_ERROR } = SYSTEM;

(async (): Promise<void> => {
  try {
    const app = container.get(App);

    await app.init();

    await app.start({}, () => {
      logger.info(APP_MESSAGE(APP_START));

      const stopApp = (reason: string): void => {
        app.stop(reason, () => {
          logger.info(APP_MESSAGE(APP_STOP));
        });
      };

      process.once("SIGINT", stopApp);
      process.once("SIGTERM", stopApp);
    });
  } catch (err) {
    if (err instanceof Error) {
      const message = NODE_ENV === "development" ? err.stack : err.message;

      logger.error(APP_ERROR(message));
    }
  }
})();
