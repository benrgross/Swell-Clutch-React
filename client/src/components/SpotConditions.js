import React from "react";

function SpotConditions({ conditions }) {
  if (conditions.includes("_")) {
    return <span> {conditions.replace(/_/g, " ")}</span>;
  } else return <span>{conditions}</span>;
}

export default SpotConditions;
