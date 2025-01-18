import React from "react";

const Line = ({ className = "" }) => (
  <hr
    className={`border-t-2 border-border-color dark:border-dark-border-color ${className}`}
    aria-hidden="true"
  />
);

export default Line;
