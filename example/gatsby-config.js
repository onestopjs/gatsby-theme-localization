module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-localization`,
      options: {
        languages: ["en", "bg"],
        namespaces: ["translation", "about"],
        localesDir: "./src/locales",
        allowIndex: false,
        defaultLng: "en",
        suspenseFallback: require.resolve(`./src/components/fallback`),
        embedTranslations: {
          preloadNamespaces: [
            {
              regex: "/.*/",
              namespaces: ["translation"],
              languages: ["en"]
            },
            {
              regex: "/about/",
              namespaces: ["about"],
              languages: ["en"]
            }
          ]
        },
        i18next: {
          fallbackLng: "en",
          react: {
            wait: true,
            useSuspense: true
          },
          debug: process.env.NODE_ENV !== "production"
        },
        i18nPlugin: {
          // whatever you want to pass to gatsby-plugin-i18n
          langKeyDefault: "en",
          useLangKeyLayout: false
        }
      }
    }
  ]
};
