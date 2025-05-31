import { locationController, timeController } from "../controllers";
import { BotListener, BotListenerHandlers } from "../types";

export const listenerHandlers: BotListenerHandlers = {
  [BotListener.SET_LOCATION]: locationController.use,
  [BotListener.SET_NOTIFICATION_TIME]: timeController.use,
};
