import React from "react";
import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const currentLanguage = i18n.language;
    const newLanguage = currentLanguage === "en" ? "pl" : "en";
    console.log(`Changing language from ${currentLanguage} to ${newLanguage}`);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <>
      <div className="language-toggle-container">
        <button className="btn btn-secondary" onClick={toggleLanguage}>
          {i18n.language === "en"
            ? "Switch to Polish"
            : "Przełącz na angielski"}
        </button>
      </div>
    </>
  );
};

export default LanguageToggle;
