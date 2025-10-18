import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

// Importar traducciones
import en from "./locales/en.json";
import es from "./locales/es.json";

// Recursos de traducción
const resources = {
  en: { translation: en },
  es: { translation: es },
};

// Detectar idioma del dispositivo
const deviceLanguage = Localization.getLocales()[0]?.languageCode || "es";

// Inicializar i18next
i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage, // Idioma por defecto (detectado del dispositivo)
  fallbackLng: "es", // Idioma de respaldo
  interpolation: {
    escapeValue: false, // React ya hace escape
  },
});

export default i18n;
