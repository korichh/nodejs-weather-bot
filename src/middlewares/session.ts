import { session } from "telegraf";

import { TelegrafSession } from "@/types";

export const useSession = session({
  defaultSession: (): TelegrafSession => ({
    lastTrigger: null,
    user: null,
  }),
});
