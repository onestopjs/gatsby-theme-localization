import { PluginOptions } from "./types";

export const i18nextOptions = {
  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  },
  react: {
    useSuspense: false
  }
};

export const defaultPluginOptions: PluginOptions = {
  languages: [],
  namespaces: [],
  localesDir: "./src/locales"
};