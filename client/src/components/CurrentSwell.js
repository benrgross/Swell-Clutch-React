import React from "react";
import { Container, Row } from "react-bootstrap";
import SpotHeader from "./SpotHeader";
import CurrentSwellCont from "./CurrentSwellCont";
import "./CurrentSwellCont/currentSwell.css";

function CurrentSwell({ data }) {
  const { spot } = data;

  return (
    <Container fluid>
      <SpotHeader spot={spot} />
      <Row className="current-swell__cont">
        <CurrentSwellCont spot={spot} />
      </Row>
    </Container>
  );
}

export default CurrentSwell;
