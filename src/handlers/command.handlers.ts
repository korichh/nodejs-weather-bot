import { startController } from "../controllers";
import { BotCommand, BotCommandHandlers } from "../types";

export const commandHandlers: BotCommandHandlers = {
  [BotCommand.START]: startController.use,
};
