# gatsby-theme-localization
⚠️This plugin is for Gatsby 2.x.x! There are better solutions out there for newer versions!

Opinionated Gatsby theme which provides a full solution for localization in Gatsby. This theme is built upon the awesome [gatsby-plugin-i18n](https://www.npmjs.com/package/gatsby-plugin-i18n) and [react-i18next](https://react.i18next.com/) and acts as a bridge between the two. I couldn't find a full solution for localization with Gatsby which works the way I want it to, so I made a custom solution for my personal website and put everything I learned in this Gatsby theme in hopes to help out anyone who may struggle with the same.

## Documentation
This is a basic overview to get you started. For more advanced features or better documentation, please visit the [full documentation](https://gatsby-theme-localization.onestopjs.dev).

## Getting started
Using this plugin is really simple. First, install it by using `npm install gatsby-theme-localization`.
Add this to your `gatsby-config.js`:
```javascript
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
          // whatever you want to pass to react-i18next
          fallbackLng: 'en',
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
```

This is an example configuration for this plugin, but you can probably get away with even less.

That's it! Your Gatsby-powered website now has localization!

## How to use
Currently, the way to store your translations is in a JSON file (although in the future I want to add remote translations).

For each language your page has, create a file in pages following this pattern: [your page name].[language].js.
An example of this is `index.en.js`. Inside your page component, you can use all of [react-i18next](https://react.i18next.com/)'s features. For me, the most convenient way is to use the `useTranslation` hook. If your page is the same for all languages, you can just reexport your page component in all languages you want, although this is often not the case.

This theme exports a drop-in replacement for Gatsby's link. In fact, it forwards all props to the original Gatsby link, except for the "to" prop, which is enhanced to prefix the current language. This feature can be disabled via the "prefixLanguage" prop.

In your locales folder, you need to create a folder for each language you support, and a JSON file for each namespace you want. It is important that all files exist, otherwise it will crash. This is intentional as I think it is better to crash your build rather than have missing texts.

## How it works
gatsby-plugin-i18n creates the routes for each language but doesn't do anything for the actual translations, so we are free to use any plugin we like. I18next handles the actual translation. My theme synchronizes the two awesome libraries.
Make sure to read both plugins' documentation to make use of their full capabilities. 

## Options API

For example usage, refer to the [example gatsby-config](https://github.com/onestopjs/gatsby-theme-localization/blob/master/example/gatsby-config.js).

| Option     | Default         | Description |
|------------|-----------------|--------------------------------------------------------------------------------------------------------------------|
| languages  | []              | List of language you support |
| namespaces | []              | List of namespaces you support  |
| allowIndex | false           | This controls whether you want your "/" route to be accessible. If not, redirect to the user's preferred language |
| defaultLng | 'en'            | Default language, used for a number of things (such as fallback when language cannot be detected) |
| localesDir | './src/locales' | Directory where your JSON files are stored (relative to the root of your project) |
| i18next    | {}              | Object with options which will be passed to i18next |
| i18nPlugin | {}              | Object with options which will be passed to gatsby-plugin-i18n  |
| suspenseFallback | undefined              | Path to fallback component for Suspense |

## Exports

### Link
| Prop              | Default | Description                                               |
|-------------------|---------|-----------------------------------------------------------|
| prefixLanguage    | true    | Prefix language before url (e.g. "/about" -> "/en/about") |
| preloadNamespaces | []      | Namespaces to preload on hover for faster loading         |

## License
Licensed under the [MIT License](./LICENSE).
