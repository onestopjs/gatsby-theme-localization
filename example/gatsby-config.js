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
          react: {
            wait: true,
            useSuspense: true
          },
          debug: process.env.NODE_ENV !== 'production'
        },
        i18nPlugin: {
          // whatever you want to pass to gatsby-plugin-i18n
          langKeyDefault: 'en',
          useLangKeyLayout: false
        }
      }
    }
  ]
};
