export const ERROR = {
  ERROR_MESSAGE: (message: string): string => `❌ Error: ${message}`,

  DATABASE_NOT_INIT: "Database is not initialized.",

  UNABLE_TO_OBTAIN_USER: "Unable to obtain user information.",

  INVALID_LOCATION:
    "Invalid location. Please retry with a valid location name.",

  USER_NOT_FOUND: "User is not registered. Please use the /start command.",

  INVALID_TIME: "Invalid time. Please retry with a valid time string.",
};
