import {TOptions} from 'i18next';
import {globalResourceBundleName} from './utils/const';

type Language = string;
type Namespace = string;
type LocaleDir = string;

interface PluginOptions {
  languages: Language[];
  namespaces: Namespace[];
  localesDir: LocaleDirType;
  defaultLng?: string;
  allowIndex?: boolean;
  i18nPlugin?: object;
  i18next?: TOptions;
  suspenseFallback?: string;
  embedTranslations?: EmbedTranslationsOption;
}

interface PreloadNamespace {
  exact?: string;
  regex?: RegExp | string;
  namespaces: Namespace[];
  languages?: Language[];
}

interface EmbedTranslationsOption {
  preloadFallbackLng?: boolean;
  preloadNamespaces: PreloadNamespace[];
}

declare global {
  interface Window {
    [globalResourceBundleName]: string; // actually ResourceBundle but JSON
  }
}

interface ResourceBundle {
  lang: Language;
  namespaces: {
    [key: NamespaceType]: object;
  };
}

interface GatsbyNodeFunction {
  onPreBootstrap?: Function;
  onPostBootstrap?: Function;
  onPreInit?: Function;
  onCreateWebpackConfig?: Function;
}

type GatsbyNodeFunctionMethods =
  | 'onPreBootstrap'
  | 'onPostBootstrap'
  | 'onPreInit'
  | 'onCreateWebpackConfig';

interface GatsbySSRFunction {
  replaceRenderer?: Function;
  onRenderBody?: Function;
}

type GatsbySSRFunctionMethods = 'replaceRenderer' | 'onRenderBody';
