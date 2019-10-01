import React from 'react';
import {useTranslation} from 'react-i18next';
import Layout from '../layout';

const AboutPage = () => {
  const [t] = useTranslation('about');

  return (
    <Layout>
      <h1 id="pageTitle">{t('page_title')}</h1>
    </Layout>
  );
};

export default AboutPage;
