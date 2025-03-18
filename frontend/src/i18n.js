import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"
// اللغات التي سيتم استخدامها
import enTranslation from "./locale/en.json"; // ملفات الترجمة للإنجليزية
import arTranslation from "./locale/ar.json"; // ملفات الترجمة للعربية


 const resources= {
      en: {
        translation: enTranslation,
      },
      ar: {
        translation: arTranslation,
      },
    };
    i18n.use(LanguageDetector)
    .use(initReactI18next).init({
        resources,  lng: "en", // اللغة الافتراضية
    fallbackLng: "en", // لغة افتراضية في حال عدم وجود الترجمة
    interpolation: {
      escapeValue: false,
   
    },react:{
        useSuspense:false
    }
  });

export default i18n;
