import {PluginOptions} from './types';

module.exports = ({i18nPlugin = {}}: PluginOptions) => ({
  plugins: [
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        ...i18nPlugin
      }
    }
  ]
});
