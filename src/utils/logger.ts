import { LoggerLevel } from "@/types";

export const logger = {
  log(message: string, level: LoggerLevel = LoggerLevel.INFO): void {
    // eslint-disable-next-line no-console
    console[level](message);
  },
  info(msg: string): void {
    this.log(msg);
  },
  warn(msg: string): void {
    this.log(msg, LoggerLevel.WARN);
  },
  error(msg: string): void {
    this.log(msg, LoggerLevel.ERROR);
  },
};
