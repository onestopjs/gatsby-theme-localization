---
id: good-to-know
title: Good to know
sidebar_label: Good to know
---

In this section you will learn some things which will help you make the most out of the plugin.

## Namespaces loading

### Concept
This plugin uses <a href="https://i18next.com/" target="_blank" rel="noopener noreferrer">i18next</a> which has "namespace" concept. You can refer to their documentation for more information, but what you need to know is that it doesn't load all namespaces by default (which is good). However, when you want to open a new page which utilizes a different namespaces, it will take some time for the new namespace to download. This is mitigated to some extent with the help of the [Link component](#link-component).

### Suspense
When a namespace is not loaded by the time the page has been opened, `react-i18next` will trigger a Suspense by default. It is an opt-out feature but it is better to leave it turned on. By default, in this plugin Suspense's fallback is just an empty component. You can pass a custom fallback component if you want to via the option `suspenseFallback` which takes a path to your desired fallback component.


## Link component

This plugin exports a [Link](../api/link) component. It is a drop-in replacement for [Gatsby's Link](https://www.gatsbyjs.org/docs/gatsby-link/) component. You only need to change the imports. It is mostly useful to prefix the current language to the path automatically. However, it has another useful property - `preloadNamespaces`. It takes a list of namespaces to preload before opening the page. 

```js
import {Link} from 'gatsby-theme-localization';

const MyPage = props => {
  return (
    <>
      <Link to="/another-page" preloadNamespaces={['another-page']}>Another Page</Link>
    </>
  )
}
```

Currently, it preloads the namespaces on hover. However, <a href="https://github.com/gatsbyjs/gatsby/issues/17952" target="_blank" rel="noopener noreferrer">a suggestion</a> was opened in Gatsby's GitHub repository which would allow to preload the namespaces together with Gatsby's other resource files. If the suggestion is accepted, this plugin will be updated to make use of the new functionality.
