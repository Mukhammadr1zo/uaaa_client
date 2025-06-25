import { useEffect, useState } from "react";

export default function useLanguage(defaultLang = "en") {
  const getInitial = () => {
    if (typeof window !== "undefined") {
      const local = localStorage.getItem("language");
      if (local) return local;
    }
    if (typeof navigator !== "undefined") {
      const navLang = navigator.language?.slice(0, 2);
      if (["uz", "ru", "en"].includes(navLang)) return navLang;
    }
    return defaultLang;
  };

  const [language, setLanguage] = useState(getInitial);

  useEffect(() => {
    const local = typeof window !== "undefined" ? localStorage.getItem("language") : null;
    if (local && local !== language) setLanguage(local);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // faqat birinchi renderda

  const changeLanguage = (lang) => {
    setLanguage(lang);
    if (typeof window !== "undefined") localStorage.setItem("language", lang);
  };

  return [language, changeLanguage];
}