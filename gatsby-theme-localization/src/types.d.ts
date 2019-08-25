type LanguageType = string;
type NamespaceType = string;
type LocaleDirType = string;

export interface PluginOptions {
  languages: LanguageType[];
  namespaces: NamespaceType[];
  localesDir: LocaleDirType;
  defaultLng?: string;
  allowIndex?: boolean,
  i18nPlugin?: object;
  i18next?: object;
  [key: string]: any;
}
