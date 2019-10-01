/**
 * Functionality for using custom suspense fallback component
 */

import {ParentSpanPluginArgs, CreateWebpackConfigArgs} from 'gatsby';
import {PluginOptions} from '../../types';

let suspenseFallbackComponent: string;

export const onPreInit = (
  {}: ParentSpanPluginArgs,
  {suspenseFallback}: PluginOptions
) => {
  const defaultFallback = './components/DefaultFallback';
  const optionComponent = suspenseFallback || defaultFallback;
  suspenseFallbackComponent = optionComponent;
};

export const onCreateWebpackConfig = ({
  actions,
  plugins
}: CreateWebpackConfigArgs) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        'process.env.GATSBY_SUSPENSE_FALLBACK': JSON.stringify(
          suspenseFallbackComponent
        )
      })
    ]
  });
};
