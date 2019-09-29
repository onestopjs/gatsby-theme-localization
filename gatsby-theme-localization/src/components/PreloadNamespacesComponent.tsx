import React, { useEffect } from "react";
import { globalResourceBundleName } from "../utils/const";

interface Args {
  resourceBundle: string;
}
type CreateComponentFn = ({resourceBundle}: Args) => React.ComponentType

const createPreloadNamespacesComponent: CreateComponentFn = ({ resourceBundle }) => {
  const PreloadNamespacesComponent = () => {
    // useEffect(() => {
    //   const script = document.createElement("script");
    //   script.type = "text/javascript";
    //   script.innerHTML = `window.${globalResourceBundleName} = ${resourceBundle}`;
    // }, []);
    return <script type="text/javascript" dangerouslySetInnerHTML={{__html: `window.${globalResourceBundleName} = '${resourceBundle}'`}}></script>;
  };

  return PreloadNamespacesComponent;
};

export default createPreloadNamespacesComponent;
