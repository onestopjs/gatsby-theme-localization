---
id: embedTranslations
title: embedTranslations
sidebar_label: embedTranslations
---

This is the API reference for `embedTranslations`, but you first need to know how it works and consider whether you need to use it because it has some trade-offs!
Before using this option, it is strongly recommended to read [Embedding Translations](../../advanced/embedding-translations).

In short, this option embeds the translations directly into the HTML and skips downloading them separately, saving some loading time (and flickering!).

This is the shape that this option expects:
```js
{
  preloadFallbackLng: true,
  preloadNamespaces: [
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
}
```

In this example, the `translation` namespace is loaded for every page. The "about" page will have `translation, about` namespaces loaded. They stack up!

## preloadFallbackLng

A boolean which determines whether to always embed the default language version of the translation, even if it is not listed in [preloadNamespaces](#preloadNamespaces). By default, it will embed only the current language version of the translations. Useful if some translations are missing and you want to skip downloading them too.

## preloadNamespaces

List of namespaces to preload if the page matches the pattern provided. 

**Keep in mind that those stack up!** It doesn't stop after the first match, it goes through all of them. So, if a page matches multiple items, it will merge their namespaces and languages and it will preload all of them.

### regex

The regex which will be matched against all pages. If a page matches that regex, it will have its translations embedded into the HTML.

### namespaces

The list of namespaces to preload for a certain page. By default it is an empty array (i.e. no namespaces will be preloaded).

### languages

List of languages to preload for a certain page. This means that it will not only embed all the translation files in the current language, it will also embed the translation files for all languages specified.
