import { TFunction } from "i18next";

import { i18next } from "@/lib";
import { User } from "@/types";

export const getT = (user: User | null): TFunction => {
  const lang = user?.languageCode || "en";

  return i18next.getFixedT(lang);
};
