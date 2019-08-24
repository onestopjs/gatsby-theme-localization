import React from "react";
import { useTranslation } from "react-i18next";
import Layout from "../layout";

const IndexPage = () => {
  const [t, i18n] = useTranslation();

  return (
    <Layout>
      <div>
        {t("current_language", { language: i18n.language })} <br />
      </div>
    </Layout>
  );
};

export default IndexPage;
