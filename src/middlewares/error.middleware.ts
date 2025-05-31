import { logger } from "../utils";
import { Context } from "telegraf";

export const errorHandler = (err: unknown, ctx: Context): void => {
  if (err instanceof Error) {
    logger.error(`[${ctx.updateType}] ${err.message}`);
  }
};
