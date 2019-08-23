import React from "react";
import i18n from "./i18n";
import WrapRoot from "./wrap-root";
import getLangFromPathname from "./utils/getLangFromPathname";

const getInitialLang = (pathname, options) => {
  const pathLang = getLangFromPathname(pathname);
  if (options.languages.includes(pathLang)) return pathLang;

  if (options.languages.includes(navigator.language)) return navigator.language;

  return options.defaultLng;
};

export const wrapRootElement = ({ element }, options) => {
  const initialLang = getInitialLang(window.location.pathname, options);
  i18n.init({
    lng: initialLang,
    debug: true,

    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    react: {
      useSuspense: false
    }
  });

  return (
    <WrapRoot i18n={i18n} options={options}>
      {element}
    </WrapRoot>
  );
};
