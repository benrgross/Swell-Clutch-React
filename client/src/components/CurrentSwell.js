import React from "react";
import { Button } from "react-bootstrap";
import SpotHeader from "./SpotHeader";
import CurrentSwellCont from "./CurrentSwellCont";
import SaveSwellBtn from "./SaveSwellBtn";

function CurrentSwell({ data }) {
  const { spot } = data;

  return (
    <>
      <SpotHeader spot={spot} />
      <CurrentSwellCont spot={spot} />
      <SaveSwellBtn spot={spot} />
      <div className="d-flex justify-content-center">
        <Button className="back-to-search-btn" href="/search">
          Back to Search
        </Button>
      </div>
    </>
  );
}

export default CurrentSwell;
