---
id: defaultLng
title: defaultLng
sidebar_label: defaultLng
---

The `defaultLng` specifies what your preferred language is. It is used internally for a lot of different cases, and will be used in the future. Is is used as a fallback if the current language cannot be determined for some reason. 

Another example is when you try to open the `index` page and you have [allowIndex](allowIndex) set to false. It tries to detect the current language from the browser and if you support the user's language, it will redirect to that version of the website. Otherwise, `defaultLng` is used.