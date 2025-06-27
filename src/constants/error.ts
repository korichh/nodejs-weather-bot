export const ERROR = {
  ERROR_MESSAGE: (message: string): string => `❌ Error: ${message}`,

  DATABASE_NOT_INIT: "Database is not initialized.",

  NOT_FOUND: (entity: string = ""): string =>
    entity ? `${entity} is not found.` : "Not found.",

  INVALID_LOCATION: "Please enter a valid location.",

  USER_NOT_FOUND: "You are not registered. Please use the /start command.",

  INVALID_TIME: "Please enter a valid time string.",
};
