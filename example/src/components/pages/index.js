import React from "react";
import { useTranslation } from "react-i18next";

const IndexPage = () => {
  const [t, i18n] = useTranslation();

  return (
    <div>
      {t('current_language', {language: i18n.language})} <br />
      <button
        onClick={() =>
          i18n.changeLanguage(i18n.language === "en" ? "bg" : "en")
        }
      >
        {t('switch_language')}
      </button>
    </div>
  );
};

export default IndexPage;
