import React from 'react';

import fs from 'fs';
import path from 'path';
import {RenderBodyArgs} from 'gatsby';

import {PluginOptions, Namespace, ResourceBundle, Language} from '../../types';
import createPreloadNamespacesComponent from '../../components/PreloadNamespacesComponent';
import getLangFromPath from '../../utils/getLangFromPath';

export const onRenderBody = (
  {pathname, setHeadComponents}: RenderBodyArgs,
  options: PluginOptions
) => {
  if (!options.embedTranslations) return;

  const langFromPathname = getLangFromPath(pathname);

  const namespacesToPreloadSet = new Set<Namespace>([]);
  const languagesToPreloadSet = new Set<Language>([langFromPathname]);

  if (
    options.embedTranslations.preloadFallbackLng &&
    options.i18next &&
    options.i18next.fallbackLng
  ) {
    const {fallbackLng} = options.i18next;
    if (typeof fallbackLng === 'string') {
      languagesToPreloadSet.add(fallbackLng);
    } else if (Array.isArray(fallbackLng)) {
      fallbackLng.forEach(lang => languagesToPreloadSet.add(lang));
    } else if (typeof fallbackLng === 'object') {
      Object.values(fallbackLng).forEach(langs => {
        langs.forEach(lang => {
          languagesToPreloadSet.add(lang);
        });
      });
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
  });

  const resourceBundle: ResourceBundle[] = [];

  languagesToPreload.forEach(lang => {
    const obj = {
      lang: lang,
      namespaces: namespacesToPreload.reduce((acc, ns) => {
        const file = fs.readFileSync(
          path.resolve(options.localesDir, `./${lang}/${ns}.json`),
          'utf8'
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
