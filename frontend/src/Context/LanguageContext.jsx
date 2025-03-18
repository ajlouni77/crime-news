// import React, { createContext, useContext, useState } from "react";

// // إنشاء السياق
// const LanguageContext = createContext();

// // Hook لاستخدام السياق
// export const useLanguage = () => useContext(LanguageContext);

// // مكون الموفّر (Provider)
// export const LanguageProvider = ({ children }) => {
//   const [language, setLanguage] = useState("en"); // اللغة الافتراضية: الإنجليزية

//   const toggleLanguage = () => {
//     setLanguage((prevLang) => (prevLang === "en" ? "ar" : "en"));
//   };

//   return (
//     <LanguageContext.Provider value={{ language, toggleLanguage }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };
import React, { createContext, useContext, useState } from "react";
import { useTranslation } from "react-i18next"; // استيراد useTranslation

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation(); // الحصول على i18n من react-i18next
  const [language, setLanguage] = useState(i18n.language); // استخدام اللغة الحالية من i18next

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en"; // تحديد اللغة الجديدة
    setLanguage(newLang); // تحديث اللغة في context
    i18n.changeLanguage(newLang); // تغيير اللغة في i18next
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
