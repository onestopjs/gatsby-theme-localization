import React from "react";
import i18n from "./i18n";
import WrapRoot from "./wrap-root";
import getLangFromPathname from "./utils/getLangFromPathname";
import defaultOptions from "./defaultOptions";

const getInitialLang = (pathname, options) => {
  const pathLang = getLangFromPathname(pathname);
  if (options.languages.includes(pathLang)) return pathLang;

  if (options.languages.includes(navigator.language)) return navigator.language;

  return options.defaultLng;
};

export const wrapRootElement = ({ element }, options) => {
  const initialLang = getInitialLang(window.location.pathname, options);

  const i18nextOptions = options.i18next || {};

  i18n.init({
    ...defaultOptions,
    ...i18nextOptions,
    lng: initialLang
  });

  return (
    <WrapRoot i18n={i18n} options={options}>
      {element}
    </WrapRoot>
  );
};
