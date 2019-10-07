---
id: link
title: Link
sidebar_label: Link
---

`gatsby-theme-localization` exports a drop-in replacement for Gatsby's Link plugin. It mainly prefixes the current language to the path provided.

| Prop              | Default | Description                                               |
|-------------------|---------|-----------------------------------------------------------|
| prefixLanguage    | true    | Prefix language before url (e.g. "/about" -> "/en/about") |
| preloadNamespaces | []      | Namespaces to preload on hover for faster loading         |

Every other prop is passed directly to [Gatsby's original Link](https://www.gatsbyjs.org/docs/gatsby-link/).
