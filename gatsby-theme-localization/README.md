# gatsby-theme-localization
Opinionated Gatsby theme which provides a full solution for localization in Gatsby. This theme is built upon the awesome [gatsby-plugin-intl](https://www.npmjs.com/package/gatsby-plugin-i18n) and [react-i18next](https://react.i18next.com/) and acts as a bridge between the two. I couldn't find a full solution for localization with Gatsby which works the way I want it to, so I made a custom solution for my personal website and put everything I learned in this Gatsby theme in hopes to help out anyone who may struggle with the same.

## Getting started
Using this plugin is really simple. First, install it by using `npm install gatsby-theme-localization`.
Add this to your `gatsby-config.js`:
```javascript
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
          // whatever you want to pass to react-i18next
          debug: process.env.NODE_ENV !== 'production'
        },
        i18nPlugin: {
          // whatever you want to pass to gatsby-plugin-intl
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

This theme exports a drop-in replacement for Gatsby's link. In fact, it forwards all props to the original Gatsby link, except for the "to" prop, which is enhanced to prefix the current language. This feature can be disabled via the "prefixLanguage" prop. Currently, there are no types for this component, but I am planning on implementing it with TypeScript later.

In your locales folder, you need to create a folder for each language you support, and a JSON file for each namespace you want. It is important that all files exist, otherwise it will crash. This is intentional as I think it is better to crash your build rather than have missing texts.

## How it works
gatsby-plugin-i18n creates the routes for each language but doesn't do anything for the actual translations, so we are free to use any plugin we like. I18next handles the actual translation. My theme synchronizes the two awesome libraries.
Make sure to read both plugins' documentation to make use of their full capabilities. 

## Options API
| Option     | Default         | Description                                                                                                        |
|------------|-----------------|--------------------------------------------------------------------------------------------------------------------|
| languages  | []              | List of language you support                                                                                       |
| namespaces | []              | List of namespaces you support                                                                                     |
| allowIndex | false           | This controls whether you want your "/" route to be accessible. If not, redirect to the user's preferred language |
| defaultLng | 'en'            | Default language, used for a number of things (such as fallback when language cannot be detected)                  |
| localesDir | './src/locales' | Directory where your JSON files are stored (relative to the root of your project)                                  |
| i18next    | {}              | Object with options which will be passed to i18next                                                                |
| i18nPlugin | {}              | Object with options which will be passed to gatsby-plugin-i18n                                                     |

## Exports
| Export | Description                           |
|--------|---------------------------------------|
| Link   | Drop-in replacement for Gatsby's Link |

I am planning on adding TypeScript, so proper types will be exported soon.

## Disclaimer
I am new to Gatsby, so it is possible this is written in a really suboptimal way. When I had all the knowledge to build this, I rushed to get it working so people can use it as soon as possible. As a result, the code is quite a mess now. My next goal will be to refactor and reorganize everything in a more maintainable manner, then I will start adding more features (such as remote translations). It is quite possible to have bugs or unforeseen use cases which prevent you from using this plugin. Please, open an issue in GitHub and I will try to address it as soon as possible.

## License
I don't understand how all of this works, so do whatever you like as long as you don't rip off my work and present it as yours.