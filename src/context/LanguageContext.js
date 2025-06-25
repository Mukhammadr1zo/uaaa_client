'use client'

import { createContext, useContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  function getInitial() {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("language");
      if (storage) return storage;
    }
    if (typeof navigator !== "undefined") {
      const navLang = navigator.language?.slice(0, 2);
      if (["uz", "ru", "en"].includes(navLang)) return navLang;
    }
    return "en";
  }

  const [language, setLanguage] = useState(getInitial);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("language");
      if (storage && storage !== language) setLanguage(storage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    if (typeof window !== "undefined") localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);