import React from "react";
import SpotResults from "./SpotResults";

function Results({ data }) {
  return (
    <div className="spot__results-cont">
      <SpotResults data={data} />
    </div>
  );
}

export default Results;
