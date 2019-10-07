---
id: suspenseFallback
title: suspenseFallback
sidebar_label: suspenseFallback
---

By default, <a href="https://react.i18next.com" target="_blank" rel="noopener noreferrer">react-i18next</a> uses Suspense. Suspense has a fallback to display while your resources load.

`suspenseFallback` takes a string as an argument - the path to your fallback component's file. Usually, you would enter the path (relative to `gatsby-config.js`) to your component and wrap it in `require.resolve` to get the absolute path.
