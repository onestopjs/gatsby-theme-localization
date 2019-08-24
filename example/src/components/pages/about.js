import React from "react";
import { useTranslation } from "react-i18next";
import Layout from "../layout";

const AboutPage = () => {
  const [t] = useTranslation("about");

  return (
    <Layout>
      <div>{t("page_title")}</div>
    </Layout>
  );
};

export default AboutPage;
