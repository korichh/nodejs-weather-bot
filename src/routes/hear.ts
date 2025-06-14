import { locationController, timeController } from "../controllers";
import { BotHearTrigger, BotHearRoutes } from "../types";

export const hearRoutes: BotHearRoutes = {
  [BotHearTrigger.SET_LOCATION]: locationController.handleTrigger,
  [BotHearTrigger.SET_NOTIFICATION_TIME]: timeController.handleTrigger,
};
