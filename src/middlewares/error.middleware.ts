import { ENV } from "../constants";
import { logger } from "../utils";
import { Context } from "telegraf";

const { nodeEnv } = ENV;

export const errorHandler = (err: unknown, _ctx: Context): void => {
  if (err instanceof Error) {
    const message = nodeEnv === "development" ? err.stack : err.message;

    logger.error(`[Bot Error] ${message}`);
  }
};
