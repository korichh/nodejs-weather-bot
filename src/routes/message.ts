import { locationController, timeController } from "../controllers";
import { BotHearTrigger, BotMessageRoutes } from "../types";

export const messageRoutes: BotMessageRoutes = {
  [BotHearTrigger.SET_LOCATION]: locationController.handleMessage,
  [BotHearTrigger.SET_NOTIFICATION_TIME]: timeController.handleMessage,
};
