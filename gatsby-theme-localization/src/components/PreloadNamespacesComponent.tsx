import React from 'react';
import {globalResourceBundleName} from '../utils/const';

interface CreateComponentFnArgs {
  resourceBundle: string;
}
type CreateComponentFn = ({
  resourceBundle
}: CreateComponentFnArgs) => React.ComponentType;

// this is a hacky component which basically sets a global variable
const createPreloadNamespacesComponent: CreateComponentFn = ({
  resourceBundle
}) => {
  const PreloadNamespacesComponent = () => {
    return (
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `window.${globalResourceBundleName} = '${resourceBundle}'`
        }}></script>
    );
  };

  return PreloadNamespacesComponent;
};

export default createPreloadNamespacesComponent;
