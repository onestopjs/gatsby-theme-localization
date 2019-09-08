import React, {Suspense, Fragment} from "react";
import i18n from "./i18n";
import WrapRoot from "./wrap-root";
import getLangFromPathname from "./utils/getLangFromPathname";
import {i18nextOptions as defaultI18nextOptions} from "./defaultOptions";
import { PluginOptions } from "./types";

const getInitialLang = (pathname: string, options: PluginOptions) => {
  const pathLang = getLangFromPathname(pathname);
  if (options.languages.includes(pathLang)) return pathLang;

  if (options.languages.includes(navigator.language)) return navigator.language;

  return options.defaultLng || "en";
};

export const wrapRootElement = ({ element }: any, options: any) => {
  const initialLang = getInitialLang(window.location.pathname, options);
  
  const i18nextOptions = options.i18next || {};

  i18n.init({
    ...defaultI18nextOptions,
    ...i18nextOptions,
    lng: initialLang
  });

  const MaybeSuspense = typeof document !== "undefined" ? Suspense : Fragment;

  return (
    <MaybeSuspense fallback="">
      <WrapRoot i18n={i18n} options={options} >
        {element}
      </WrapRoot>
    </MaybeSuspense>
    
  );
};
