import { ENV } from "../constants";
import { logger } from "../utils";
import { Context } from "telegraf";

const { NODE_ENV } = ENV;

export const errorHandler = (err: unknown, _ctx: Context): void => {
  if (err instanceof Error) {
    const message = NODE_ENV === "development" ? err.stack : err.message;

    logger.error(`[Bot Error] ${message}`);
  }
};
