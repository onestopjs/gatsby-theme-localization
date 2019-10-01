import * as embedTranslations from './embedTranslations';
import * as feedTranslations from './feedTranslations';
import {GatsbySSRFunction, GatsbySSRFunctionMethods} from '../../types';

const functions: GatsbySSRFunction[] = [feedTranslations, embedTranslations];

const functionRunner = (type: GatsbySSRFunctionMethods) => {
  return async (...args: any[]) => {
    // run functions sequentially (on purpose)
    for (let i = 0; i < functions.length; i++) {
      const gatsbyFn = functions[i][type];
      if (gatsbyFn) await gatsbyFn(...args);
    }
  };
};

export default functionRunner;
