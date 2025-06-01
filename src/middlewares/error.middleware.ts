import { logger } from "../utils";
import { Context } from "telegraf";

export const errorHandler = (err: unknown, _ctx: Context): void => {
  if (err instanceof Error) {
    logger.error(`[Bot Error] ${err.message}`);
  }
};
