import { I18NEXT } from "@configs";
import { TelegrafUser } from "@types";

const { languages } = I18NEXT;

export const isValidLocation = (location: string | undefined): boolean => {
  if (!location || location.length < 2) {
    return false;
  }

  const locationRegex =
    /^[a-zA-Z\u0400-\u04FF\u0500-\u052F\u2DE0-\u2DFF\uA640-\uA69F\s\-']+$/u;

  return locationRegex.test(location);
};

export const validateString = (location: string): string => {
  return location.trim().toLowerCase();
};

export const isValidTime = (time: string | undefined): boolean => {
  if (!time || time.length < 2) {
    return false;
  }

  const timeRegex = /^([0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

  return timeRegex.test(time);
};

export const validatelanguage = (telegrafUser: TelegrafUser): void => {
  if (!languages.includes(telegrafUser.language_code || "")) {
    telegrafUser.language_code = languages[0];
  }
};
