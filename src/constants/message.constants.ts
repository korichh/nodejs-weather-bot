export const MESSAGE = {
  WELCOME: "👋 Welcome to the Weather Bot!",
  UNABLE_TO_OBTAIN_USER: "⚠️ Unable to obtain your user information.",
  MISSING_LOCATION_TIME:
    "📍⏰ Please set your location and notification time.",
  MISSING_LOCATION: "📍 Please set your location.",
  MISSING_TIME: "⏰ Please set your notification time.",
  ALREADY_SUBSCRIBED: "✅ You are already subscribed.",
  PROMPT_ENTER_LOCATION: "Please, enter your city (e.g. kharkiv).",
  SUCCESS_LOCATION: (location: string): string =>
    `📍 Your location has been set to: ${location}.`,
  SUCCESS_LOCATION_WITH_TIME_PROMPT: (location: string): string =>
    `${MESSAGE.SUCCESS_LOCATION(location)} Please set the notification time as well.`,
  PROMPT_ENTER_TIME:
    "Please, enter your desired notification time (e.g. 7:00).",
  SUCCESS_TIME: (notificationTime: string): string =>
    `⏰ Your notification time has been set to: ${notificationTime}.`,
  SUCCESS_TIME_WITH_LOCATION_PROMPT: (notificationTime: string): string =>
    `${MESSAGE.SUCCESS_TIME(notificationTime)}. Please set the location as well.`,
};
