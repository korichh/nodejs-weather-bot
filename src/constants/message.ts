import { TFunction } from "i18next";

import { CityReport, UserInfo, WeatherReport } from "@/types";

export const MESSAGE = {
  WELCOME: (t: TFunction): string => t("message.welcome"),

  YES: (t: TFunction): string => t("message.yes"),

  NO: (t: TFunction): string => t("message.no"),

  MISSING_LOCATION_TIME: (t: TFunction): string =>
    t("message.missing_location_time"),

  MISSING_LOCATION: (t: TFunction): string =>
    t("message.missing_location"),

  MISSING_TIME: (t: TFunction): string => t("message.missing_time"),

  READY_TO_SUBSCRIBE: (t: TFunction): string =>
    t("message.ready_to_subscribe"),

  ALREADY_SUBSCRIBED: (t: TFunction): string =>
    t("message.already_subscribed"),

  PROMPT_ENTER_LOCATION: (t: TFunction): string =>
    t("message.prompt_enter_location"),

  SUCCESS_LOCATION: (t: TFunction, location: string): string =>
    t("message.success_location", { location }),

  SUCCESS_LOCATION_WITH_TIME_PROMPT: (
    t: TFunction,
    location: string
  ): string =>
    t("message.success_location_with_time_prompt", {
      success_location: t("message.success_location", { location }),
    }),

  PROMPT_ENTER_TIME: (t: TFunction): string =>
    t("message.prompt_enter_time"),

  SUCCESS_TIME: (t: TFunction, time: string): string =>
    t("message.success_time", { time }),

  SUCCESS_TIME_WITH_LOCATION_PROMPT: (
    t: TFunction,
    time: string
  ): string =>
    t("message.success_time_with_location_prompt", {
      success_time: t("message.success_time", { time }),
    }),

  WEATHER_REPORT: (t: TFunction, weatherReport: WeatherReport): string =>
    t("message.weather_report", { ...weatherReport }),

  CITY_REPORT: (t: TFunction, cityReport: CityReport): string =>
    t("message.city_report", { ...cityReport }),

  CITY_REPORT_DAY: (t: TFunction, day: string): string =>
    t("message.city_report_day", { day }),

  SUCCESS_SUBSCRIBE: (t: TFunction): string =>
    t("message.success_subscribe"),

  SUCCESS_UNSUBSCRIBE: (t: TFunction): string =>
    t("message.success_unsubscribe"),

  USER_INFO: (t: TFunction, userInfo: UserInfo): string =>
    t("message.user_info", { ...userInfo }),

  SUCCESS_LANGUAGE: (t: TFunction): string =>
    t("message.success_language"),

  TOO_OFTEN: (t: TFunction): string => t("message.too_often"),
};
