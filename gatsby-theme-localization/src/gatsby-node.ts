import functionRunner from './gatsby/node';

export const onCreateWebpackConfig = functionRunner('onCreateWebpackConfig');
export const onPreInit = functionRunner('onPreInit');
export const onPreBootstrap = functionRunner('onPreBootstrap');
export const onPostBootstrap = functionRunner('onPostBootstrap');
