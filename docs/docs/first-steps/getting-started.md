---
id: getting-started
title: Getting started
sidebar_label: Getting started
---

## Introduction

In this section you will learn how to set up your project to use `gatsby-theme-localization`. SPOILER: it is really easy. You install it like any other plugin and pass it some options

This plugin uses <a href="https://www.i18next.com/" target="_blank" rel="noopener noreferrer">i18next</a> and <a href="https://www.gatsbyjs.org/packages/gatsby-plugin-i18n/" target="_blank" rel="noopener noreferrer">gatsby-plugin-i18n</a> and acts as a bridge between the two.

If you are not familiar with them, you need to know the following:
  - i18next works with namespaces
  - gatsby-plugin-i18n creates a separate page for different languages (for SEO reasons)

The result is that your pages look like `example.com/en/about`, `example.com/bg/about`.

## Installing

Installing is pretty straightforward - you install it like any other NPM package or a Gatsby plugin.

With Yarn:

```
yarn add gatsby-theme-localization
```

With NPM:

```
npm install gatsby-theme-localization
```

## Configuring

Add the plugin to your `gatsby-config.js`.
This is the recommended set of options to get started.

```js
  plugins: [
    ...
    {
      resolve: `gatsby-theme-localization`,
      options: {
        languages: ['en', 'bg'],
        namespaces: ['translation', 'about'],
        localesDir: './src/locales',
        defaultLng: 'en',
        i18next: {
          // whatever you want to pass to react-i18next
          fallbackLng: 'en'
        },
        i18nPlugin: {
          // whatever you want to pass to gatsby-plugin-i18n
          langKeyDefault: 'en',
          useLangKeyLayout: false
        }
      }
    }
    ...
  ]

```

### Adding translations

You have to add your translations in JSON files in the directory you specified in the options. In this case, the directory is `src/locales`. You have to add your translations in the following structure: `{localesDir}/{language}/{namespace}` (e.g. `src/locales/en/translation.json`, `src/locales/bg/translation.json`). If a file is missing, the build will crash. This is intentional (although a better error message is needed) because it is better to crash the build and be notified of the missing translations than to build your website with missing texts.

## Usage

### Multi-language pages

To leverage the power of `gatsby-plugin-i18n` you need to create a page file for each page, in the following format: `{pageName}.{language}.js`. That means that you have to create a page for every language. Now, this may not seem ideal but there is a good reason for it - queries. You may need to use a different GraphQL queries for different languages or you may even need a different layout! If your page and query looks the same for all languages, you can just reexport your page component in those files.

### Translating
Now you can use `i18next` like you would use it in a normal React project. `react-i18next` is recommended and comes installed with this plugin.

```js
import {useTranslation} from 'react-i18next';

const MyPage = props => {
  const [t] = useTranslation('my_page');

  return <>
    <h2>{t('page_title')}</h2>
  </>
}
```

For more information, refer to <a href="https://react.i18next.com/" target="_blank" rel="noopener noreferrer">react-i18next's documentation</a>.

### Linking
Your paths are now prefixed with the language. If you want to link to another page in your website, you have to prefix the path with the current language. `gatsby-theme-localization` exports a drop-in replacement for [Gatsby's Link](https://www.gatsbyjs.org/docs/gatsby-link/).
Read the [full Link API reference](../api/link) for more information.

```js
import {useTranslation} from 'react-i18next';
import {Link} from 'gatsby-theme-localization';

const MyPage = props => {
  const [t] = useTranslation('my_page');

  return (
    <>
      <h2>{t('page_title')}</h2>
      <Link to="/another-page">Another page</Link>
    </>
  )
}
```

This will automatically prefix whatever the current language is, so you just need to replace the imports in your project.


## Example

You can refer to a more <a href="https://github.com/onestopjs/gatsby-theme-localization/blob/master/example/gatsby-config.js" target="_blank" rel="noreferrer noopener">real-world example</a> in the plugin repository.