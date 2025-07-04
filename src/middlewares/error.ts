import { ENV, SYSTEM } from "@constants";
import { TelegrafContext } from "@types";
import { logger } from "@utils";

const { NODE_ENV } = ENV;
const { BOT_ERROR, JOB_ERROR } = SYSTEM;

export const useErrorHandler = (
  err: unknown,
  _ctx: TelegrafContext
): void => {
  if (err instanceof Error) {
    const message = NODE_ENV === "development" ? err.stack : err.message;

    logger.error(BOT_ERROR(message));
  }
};

export const useJobErrorHandler = (err: unknown): void => {
  if (err instanceof Error) {
    const message = NODE_ENV === "development" ? err.stack : err.message;

    logger.error(JOB_ERROR(message));
  }
};
