import React from "react";
import { globalResourceBundleName } from "../utils/const";

interface CreateComponentFnArgs {
  resourceBundle: string;
}
type CreateComponentFn = ({resourceBundle}: CreateComponentFnArgs) => React.ComponentType

const createPreloadNamespacesComponent: CreateComponentFn = ({ resourceBundle }) => {
  const PreloadNamespacesComponent = () => {
    return <script type="text/javascript" dangerouslySetInnerHTML={{__html: `window.${globalResourceBundleName} = '${resourceBundle}'`}}></script>;
  };

  return PreloadNamespacesComponent;
};

export default createPreloadNamespacesComponent;
