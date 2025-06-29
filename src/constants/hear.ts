import { TFunction } from "i18next";

export const HEAR = {
  SET_LOCATION: (t: TFunction): string => t("hear.set_location"),

  SET_NOTIFICATION_TIME: (t: TFunction): string =>
    t("hear.set_notification_time"),

  GET_PROFILE: (t: TFunction): string => t("hear.get_profile"),

  LANGUAGE: (t: TFunction): string => t("hear.language"),

  SUBSCRIBE: (t: TFunction): string => t("hear.subscribe"),

  UNSUBSCRIBE: (t: TFunction): string => t("hear.unsubscribe"),
};
