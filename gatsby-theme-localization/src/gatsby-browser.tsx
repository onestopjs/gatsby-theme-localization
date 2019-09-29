import React, {Suspense, Fragment} from "react";
import i18n from "./i18n";
import WrapRoot from "./wrap-root";
import getLangFromPathname from "./utils/getLangFromPathname";
import {i18nextOptions as defaultI18nextOptions} from "./defaultOptions";
import { PluginOptions, ResourceBundle } from "./types";
import { I18nextProvider } from "react-i18next";
import preferDefault from "./utils/preferDefault";
import { globalResourceBundleName } from "./utils/const";

const getInitialLang = (pathname: string, options: PluginOptions) => {
  const pathLang = getLangFromPathname(pathname);
  if (options.languages.includes(pathLang)) return pathLang;

  if (options.languages.includes(navigator.language)) return navigator.language;

  return options.defaultLng || "en";
};

export const wrapRootElement = ({ element }: any, options: PluginOptions) => {
  const initialLang = getInitialLang(window.location.pathname, options);
  
  const i18nextOptions = options.i18next || {};

  i18n.init({
    ...defaultI18nextOptions,
    ...i18nextOptions,
    lng: initialLang
  });

  const Fallback: React.ComponentType = preferDefault(require(process.env.GATSBY_SUSPENSE_FALLBACK || ''));
  const MaybeSuspense = typeof document !== "undefined" ? Suspense : Fragment;

  if(options.preloadNamespaces) {
    const resourceBundle: ResourceBundle[] = JSON.parse(window[globalResourceBundleName])
    resourceBundle.forEach(rb => {
      Object.entries(rb.namespaces).forEach(([ns, bundle]) => {
        console.log(`added LANG: ${rb.lang} NAMESPACE: ${ns}, bundle: ${bundle}`)
        i18n.addResourceBundle(rb.lang, ns, bundle);
      })
    })
    console.log('LOADED NAMESPACES', i18n.getResourceBundle('en', 'translation'))
  }

  return (
    <MaybeSuspense fallback={<Fallback />}>
      <I18nextProvider i18n={i18n}>
        <WrapRoot options={options} >
          {element}
        </WrapRoot>
      </I18nextProvider>
    </MaybeSuspense>
    
  );
};
