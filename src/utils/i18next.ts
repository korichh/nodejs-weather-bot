import { i18next } from "../lib";
import { User } from "../types";
import { TFunction } from "i18next";

export const getT = (user: User): TFunction => {
  const lang = user.languageCode || "en";

  return i18next.getFixedT(lang);
};
