import i18n from "i18next";
import Backend from "i18next-http-backend";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationENG from "../public/locales/en/translation.json";
import translationRUS from "../public/locales/ru/translation.json";
import translationUZB from "../public/locales/uz/translation.json";

// the translations
const resources = {
  uz: {
    translation: translationUZB,
  },
  ru: {
    translation: translationRUS,
  },
  en: {
    translation: translationENG,
  },
};

const language = localStorage.getItem("I18N_LANGUAGE");
if (!language) {
  localStorage.setItem("I18N_LANGUAGE", "uz");
}

i18n
  .use(Backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("I18N_LANGUAGE") || "uz",
    fallbackLng: "uz", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
