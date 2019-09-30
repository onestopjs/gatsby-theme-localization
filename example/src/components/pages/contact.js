import React from "react";
import { useTranslation } from "react-i18next";
import Layout from "../layout";

const ContactPage = () => {
  const [t] = useTranslation("contact");

  return (
    <Layout>
      <h1 id="pageTitle">{t("page_title")}</h1>
      <form>
        <label>
          {t('form.name')}<br />
          <input type="text" />
        </label>
        <br />
        <label>
          {t('form.message')}<br />
          <input type="text" />
        </label>
        <br />
        <button>{t('form.submit')}</button>
      </form>
    </Layout>
  );
};

export default ContactPage;
