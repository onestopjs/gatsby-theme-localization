import {renderToString} from 'react-dom/server';
import i18n from './i18n';

import fs from 'fs';
import path from 'path';
import getLangFromPathname from './utils/getLangFromPathname';

export const replaceRenderer = ({bodyComponent, pathname, replaceBodyHTMLString}, {languages = [], namespaces = [], ...options}) => {
  const initialLang = getLangFromPathname(pathname);
  const resources = languages.reduce((acc, lang) => {
    return {
      ...acc,
      [lang]: namespaces.reduce((acc, ns) => {
        const file = fs.readFileSync(path.resolve(options.localesDir, `./${lang}/${ns}.json`), 'utf8');
        const parsedTranslations = JSON.parse(file);
        return {
          ...acc,
          [ns]: parsedTranslations
        }
      }, {})
    };
  }, {})
  i18n.init({
    lng: initialLang,
    debug: true,

    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    react: {
      useSuspense: false
    },
    resources
  });

  i18n.changeLanguage(initialLang, () => {
    replaceBodyHTMLString(renderToString(bodyComponent));
  })
};
