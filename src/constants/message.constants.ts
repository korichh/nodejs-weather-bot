export const MESSAGE = {
  WELCOME: "👋 Welcome to the Weather Bot!",
  UNABLE_TO_OBTAIN_USER: "⚠️ Unable to obtain your user information.",
  MISSING_LOCATION_TIME:
    "📍⏰ Please set your location and notification time.",
  MISSING_LOCATION: "📍 Please set your location.",
  MISSING_TIME: "⏰ Please set your notification time.",
  ALREADY_SUBSCRIBED: "✅ You are already subscribed.",
  PROMPT_ENTER_LOCATION: "Please, enter your city (e.g. kharkiv)",
  SUCCESS_LOCATION: (location: string): string =>
    `📍 Your location has been set to: ${location}.`,
  SUCCESS_LOCATION_WITH_NOTIFICATION_PROMPT: (location: string): string =>
    `📍 Your location has been set to: ${location}, please set the notification time as well.`,
};
