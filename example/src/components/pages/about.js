import React from "react";
import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const [t] = useTranslation('about');

  return (
    <div>
      {t('page_title')}
    </div>
  );
};

export default AboutPage;
