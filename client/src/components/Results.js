import React from "react";
import SpotResults from "./SpotResults/";
import Loader from "./Loader.js";

function Results({ data, loading }) {
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="spot__results-cont">
          <SpotResults data={data} />
        </div>
      )}
    </>
  );
}

export default Results;
