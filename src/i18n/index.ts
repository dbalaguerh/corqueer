import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ca from "./locales/ca";
import es from "./locales/es";
import en from "./locales/en";
import fr from "./locales/fr";

const savedLang = localStorage.getItem("lang") || "ca";

i18n.use(initReactI18next).init({
  resources: { ca: { translation: ca }, es: { translation: es }, en: { translation: en }, fr: { translation: fr } },
  lng: savedLang,
  fallbackLng: "ca",
  interpolation: { escapeValue: false },
});

export default i18n;
