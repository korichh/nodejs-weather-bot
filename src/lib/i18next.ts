import { I18NEXT } from "@configs";
import i18next from "i18next";
import Backend from "i18next-fs-backend";

const { languages } = I18NEXT;

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
