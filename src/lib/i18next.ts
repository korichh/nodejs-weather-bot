import i18next from "i18next";
import Backend from "i18next-fs-backend";

import { I18NEXT_CONFIG } from "@/configs";

const { languages } = I18NEXT_CONFIG;

i18next.use(Backend).init({
  fallbackLng: languages[0],
  preload: languages,
  backend: {
    loadPath: `${process.cwd()}/locales/{{lng}}.json`,
  },
  interpolation: {
    escapeValue: false,
  },
});

export { i18next };
