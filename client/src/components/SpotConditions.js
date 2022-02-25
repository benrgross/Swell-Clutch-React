import React from "react";

function SpotConditions({ conditions }) {
  if (conditions) {
    if (conditions.includes("_")) {
      return <span> {conditions.replace(/_/g, " ")}</span>;
    } else
      return (
        <span className="current-swell__spot-conditions">{conditions}</span>
      );
  } else return "";
}

export default SpotConditions;
