import { TelegrafSession } from "../types";
import { session } from "telegraf";

export const useSession = session({
  defaultSession: (): TelegrafSession => ({
    lastTrigger: null,
    user: null,
  }),
});
