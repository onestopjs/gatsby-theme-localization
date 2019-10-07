---
id: introduction
title: Introduction
sidebar_label: Introduction
---

`gatsby-theme-localization` is a full (opionated) solution for Gatsby localization. It is born out of frustration that there isn't an easy way to have internationalization in Gatsby. Most localization projects are either outdated, abandoned or too "broad" - meaning that you have to do a lot of work to achieve a satisfactory result.

This plugin combines the awesome [i18next](https://i18next.com) and [gatsby-plugin-i18n](https://www.gatsbyjs.org/packages/gatsby-plugin-i18n/) and acts as a bridge between the two.

## What this plugin can do

If you are familiar with `i18next`, you can consider this plugin a Gatsby adapter for i18next.
It creates different routes for different languages (for SEO reasons) using the power of `gatsby-plugin-i18n`.
Currently, there is an option for local translations only, but in the future there will be remote translations.

## What this plugin can NOT do

Translate your markdown files. So far, it cannot automatically choose between multiple versions of your markdown files for different languages.
