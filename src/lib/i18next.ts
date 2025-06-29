import i18next from "i18next";
import Backend from "i18next-fs-backend";

i18next.use(Backend).init({
  fallbackLng: "en",
  preload: ["en", "uk"],
  backend: {
    loadPath: "./locales/{{lng}}.json",
  },
  interpolation: {
    escapeValue: false,
  },
});

export { i18next };
