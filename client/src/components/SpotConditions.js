import React from "react";

function SpotConditions({ conditions }) {
  if (conditions.includes("_")) {
    return <span> {conditions.replace(/_/g, " ")}</span>;
  }
  return <sap>conditions</sap>;
}

export default SpotConditions;
