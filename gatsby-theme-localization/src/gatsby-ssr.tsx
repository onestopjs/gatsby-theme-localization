import React from "react";
import { renderToString } from "react-dom/server";
import i18n from "./i18n";

import fs from "fs";
import path from "path";
import {
  ReplaceRendererArgs as OriginalReplaceRendererArgs,
  RenderBodyArgs
} from "gatsby";
import getLangFromPathname from "./utils/getLangFromPathname";
import { i18nextOptions as defaultI18nextOptions } from "./defaultOptions";
import {
  PluginOptions,
  Namespace,
  ResourceBundle,
  LanguageType
} from "./types";
import createPreloadNamespacesComponent from "./components/PreloadNamespacesComponent";

// for some reason pathname and bodyComponent are not present in ReplaceRendererArgs, so this is a temporary solution
interface ReplaceRendererArgs extends OriginalReplaceRendererArgs {
  pathname: string;
  bodyComponent: React.ReactElement;
}

export const replaceRenderer = (
  { bodyComponent, pathname, replaceBodyHTMLString }: ReplaceRendererArgs,
  { languages = [], namespaces = [], ...options }: PluginOptions
) => {
  const langFromPathname = getLangFromPathname(pathname);
  const initialLang = languages.includes(langFromPathname)
    ? langFromPathname
    : options.defaultLng || "en";
  const resources = languages.reduce((acc, lang) => {
    return {
      ...acc,
      [lang]: namespaces.reduce((acc, ns) => {
        const file = fs.readFileSync(
          path.resolve(options.localesDir, `./${lang}/${ns}.json`),
          "utf8"
        );
        const parsedTranslations = JSON.parse(file);
        return {
          ...acc,
          [ns]: parsedTranslations
        };
      }, {})
    };
  }, {});

  const i18nextOptions = options.i18next || {};

  i18n.init({
    ...defaultI18nextOptions,
    ...i18nextOptions,
    lng: initialLang,
    resources
  });

  i18n.changeLanguage(initialLang, () => {
    replaceBodyHTMLString(renderToString(bodyComponent));
  });
};

export const onRenderBody = (
  { pathname, setHeadComponents }: RenderBodyArgs,
  options: PluginOptions
) => {
  if (!options.embedTranslations) return;

  const langFromPathname = getLangFromPathname(pathname);

  const namespacesToPreloadSet = new Set<Namespace>([]);
  const languagesToPreloadSet = new Set<LanguageType>([langFromPathname]);

  if(options.embedTranslations.preloadFallbackLng && options.i18next && options.i18next.fallbackLng) {
    const {fallbackLng} = options.i18next;
    if(typeof fallbackLng === 'string'){
      languagesToPreloadSet.add(fallbackLng)
    }else if(Array.isArray(fallbackLng)) {
      fallbackLng.forEach(lang => languagesToPreloadSet.add(lang))
    }else if(typeof fallbackLng === 'object') {
      Object.values(fallbackLng).forEach(langs => {
        langs.forEach(lang => {
          languagesToPreloadSet.add(lang)
        })
      })
    }
  }

  options.embedTranslations.preloadNamespaces.forEach(opt => {
    if (opt.exact === pathname) {
      opt.namespaces.forEach(ns => {
        namespacesToPreloadSet.add(ns);
      });
      if (opt.languages) {
        opt.languages.forEach(lang => {
          languagesToPreloadSet.add(lang);
        });
      }
    }

    if (opt.regex) {
      const regex = new RegExp(opt.regex);
      if (regex.test(pathname)) {
        opt.namespaces.forEach(ns => {
          namespacesToPreloadSet.add(ns);
        });
        if (opt.languages) {
          opt.languages.forEach(lang => {
            languagesToPreloadSet.add(lang);
          });
        }
      }
    }
  });

  // convert the Set to an array and remove invalid values
  const namespacesToPreload = [...namespacesToPreloadSet].filter(ns => {
    return options.namespaces.includes(ns);
  });
  const languagesToPreload = [...languagesToPreloadSet].filter(lang => {
    return options.languages.includes(lang);
  });;

  const resourceBundle: ResourceBundle[] = [];

  languagesToPreload.forEach(lang => {
    const obj = {
      lang: lang,
      namespaces: namespacesToPreload.reduce((acc, ns) => {
        const file = fs.readFileSync(
          path.resolve(options.localesDir, `./${lang}/${ns}.json`),
          "utf8"
        );
        const parsedTranslations = JSON.parse(file);
        return {
          ...acc,
          [ns]: parsedTranslations
        };
      }, {})
    };

    resourceBundle.push(obj);
  });

  const Component = createPreloadNamespacesComponent({
    resourceBundle: JSON.stringify(resourceBundle)
  });

  setHeadComponents(<Component key="resourceBundle" />);
};
