const path = require('path');

module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-localization`,
      options: {
        languages: ['en', 'bg'],
        namespaces: ['translation', 'about'],
        localesDir: './src/locales',
        allowIndex: false,
        defaultLng: 'en',
        i18next: {
          debug: process.env.NODE_ENV !== 'production'
        },
        intlPlugin: {
          // whatever you want to pass to gatsby-plugin-intl
          langKeyDefault: 'en',
          useLangKeyLayout: false
        }
      }
    }
  ]
};
