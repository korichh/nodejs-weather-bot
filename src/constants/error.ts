import { TFunction } from "i18next";

export const ERROR = {
  ERROR_MESSAGE: (t: TFunction, message: string): string =>
    t("error.error_message", { message }),

  UNABLE_TO_OBTAIN_USER: (t: TFunction): string =>
    t("error.unable_to_obtain_user"),

  USER_NOT_FOUND: (t: TFunction): string => t("error.user_not_found"),

  INVALID_LOCATION: (t: TFunction): string => t("error.invalid_location"),

  INVALID_TIME: (t: TFunction): string => t("error.invalid_time"),
};
