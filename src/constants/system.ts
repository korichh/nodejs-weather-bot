export const SYSTEM = {
  APP_START: "Application started successfully",

  APP_STOP: "Application stopped successfully",

  APP_MESSAGE: (message?: string): string => `[App] ${message}`,

  APP_ERROR: (message?: string): string => `[App Error] ${message}`,

  BOT_ERROR: (message?: string): string => `[Bot Error] ${message}`,

  JOB_ERROR: (message?: string): string => `[Job Error] ${message}`,
};
