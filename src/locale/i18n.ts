import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import langKo from "./kr.json";
import langEn from "./en.json";

const resources = {
  ko: {
    translations: langKo,
  },
  en: {
    translations: langEn,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "ko",
  fallbackLng: "ko",
  debug: true,
  defaultNS: "translations",
  ns: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
