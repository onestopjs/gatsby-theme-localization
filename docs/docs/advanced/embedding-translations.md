---
id: embedding-translations
title: Embedding translations
sidebar_label: Embedding translations
---

## What Embedding Translations means

In the context of this plugin, embedding translations means that the translation files will be embedded in the HTML that gets Server Side Rendered (in the context of Gatsby, Server Side Generated).

## Why

When using <a href="https://i18next.com" target="_blank" rel="noopener noreferrer">i18next</a>, you usually have resource files that you need to download. Downloading them takes some time (even if not much).

When your website is Server Side Generated with this plugin, during build time the translations are fed manually to the plugin so that the texts appear translated in the generated HTML. When you first open the page, the texts appear translated until the JavaScript kicks in. Then there are two possible cases, depending on whether you have Suspense enabled or not: 

  - If you have Suspense enabled, your fallback will get displayed until the translations are loaded. This causes some annoying flickering because you see your loaded page, then your fallback, then your loaded page again.

  - If you have Suspense disabled, you will get your page with translated texts, then it will flicker to show your translation keys (because the real texts are not loaded yet), then the real texts again.

Either way, the result is really unpleasant. To mitigate that, the translation files are embedded in the HTML. As a result, there is no downloading and waiting (also no flickering!).

## How

The plugin needs to know what namespaces are needed for each page. However, specifying those for every page is really annoying and unproductive. That's why there is a mechanism in `gatsby-theme-localization` which allows you to match pages with regex and load the desired namespaces for them.

This is how that looks in the configuration:

```js
[
  {
    regex: '/.*/',
    namespaces: ['translation']
  },
  {
    regex: '/about/',
    namespaces: ['about'],
    languages: ['en']
  }
]
```

This is useful if you have subpages which all use the same namespaces (e.g. /blog, /blog/post-1, /blog/post-2). You just need to specify `/blog\/.*/` and all pages under `/blog` will have the namespaces embedded.

Those also stack up! It won't stop after the first match, it will go through all of them and stack up all the matching ones!
In the example, this means that all pages will have `translation` namespace preloaded. The "/about" page will have namespaces `translation, about` preloaded.

## Conclusion

The main trade-off is that your HTML file may get really bloated if you have a lot of translations embedded. Use this option with caution!

On the other hand, one may argue that if the translation files will get downloaded anyways, you might as well download them with the HTML - the total downloaded data will be the same.

This is true, but now you know how that option works and you can make a decision for yourself!


Refer to the [API Reference](../api/options/embedTranslations) for more information on how to use this option.
