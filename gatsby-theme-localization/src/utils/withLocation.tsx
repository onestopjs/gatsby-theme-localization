import React, { FunctionComponent } from "react";
import { Location, WindowLocation, NavigateFn } from "@reach/router";
import { Subtract } from "utility-types";

export interface WithLocationProps {
  location: WindowLocation;
  navigate: NavigateFn;
}

const withLocation = <Props extends WithLocationProps>(Component: React.ComponentType<Props>) => {
  const WithLocationComponent: FunctionComponent<Subtract<Props, WithLocationProps>> = props => {
    return (
      <Location>
        {({ location, navigate }) => {
          const allProps = {
            ...props,
            location,
            navigate
          }
          return (
            <Component {...allProps as Props} />
          );
        }}
      </Location>
    );
  };

  return WithLocationComponent;
};

export default withLocation;
