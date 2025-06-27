import { ENV } from "../constants";
import { TelegrafContext } from "../types";
import { logger } from "../utils";

const { NODE_ENV } = ENV;

export const useErrorHandler = (
  err: unknown,
  _ctx: TelegrafContext
): void => {
  if (err instanceof Error) {
    const message = NODE_ENV === "development" ? err.stack : err.message;

    logger.error(`[Bot Error] ${message}`);
  }
};

export const useJobErrorHandler = (err: unknown): void => {
  if (err instanceof Error) {
    const message = NODE_ENV === "development" ? err.stack : err.message;

    logger.error(`[Job Error] ${message}`);
  }
};
