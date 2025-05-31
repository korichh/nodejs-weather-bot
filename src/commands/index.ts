import { startHandler } from "../handlers";
import { BotCommand } from "../types";

const commands: BotCommand[] = [
  {
    name: "start",
    handler: startHandler.use,
  },
];

export default commands;
