import { startController } from "../controllers";
import { BotCommandTrigger, BotCommandRoutes } from "../types";

export const commandRoutes: BotCommandRoutes = {
  [BotCommandTrigger.START]: startController.handleTrigger,
};
