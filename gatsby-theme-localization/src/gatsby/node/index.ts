import * as translationMover from './translationMover';
import * as suspenseFallback from './suspenseFallback';
import {GatsbyNodeFunction, GatsbyNodeFunctionMethods} from '../../types';

const functions: GatsbyNodeFunction[] = [translationMover, suspenseFallback];

const functionRunner = (type: GatsbyNodeFunctionMethods) => {
  return async (...args: any[]) => {
    const promises = functions
      .map(fn => {
        const gatsbyFn = fn[type];
        if (gatsbyFn) return gatsbyFn(...args);
      })
      .filter(nonEmpty => nonEmpty);
    await Promise.all(promises);
  };
};

export default functionRunner;
