import React from "react";
import { Button, Row } from "react-bootstrap";
import SpotHeader from "./SpotHeader";
import CurrentSwellCont from "./CurrentSwellCont";
import SaveSwellBtn from "./SaveSwellBtn";
import "./CurrentSwellCont/currentSwell.css";

function CurrentSwell({ data }) {
  const { spot } = data;

  return (
    <>
      <SpotHeader spot={spot} />
      <Row className="current-swell__cont">
        <CurrentSwellCont spot={spot} />
      </Row>
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
