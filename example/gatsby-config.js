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
        defaultLng: 'en'
      }
    }
  ]
};
