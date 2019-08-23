import React from "react";
import { Location } from "@reach/router";

const withLocation = Component => {
  const WithLocationComponent = props => {
    return (
      <Location>
        {({ location, navigate }) => {
          return (
            <Component {...props} location={location} navigate={navigate} />
          );
        }}
      </Location>
    );
  };

  return WithLocationComponent;
};

export default withLocation;
