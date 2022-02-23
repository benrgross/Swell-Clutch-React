import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import SpotHeader from "./SpotHeader";
import CurrentSwellCont from "./CurrentSwellCont";
import SaveSwellBtn from "./SaveSwellBtn";
import "./CurrentSwellCont/currentSwell.css";

function CurrentSwell({ data }) {
  const { spot } = data;

  return (
    <Container fluid>
      <SpotHeader spot={spot} />
      <Row className="current-swell__cont">
        <CurrentSwellCont spot={spot} />
      </Row>
      <Container className="current-swell__button-cont">
        <SaveSwellBtn spot={spot} />
        <Container className="d-flex justify-content-center">
          <Button className="back-to-search-btn" href="/search">
            Back to Search
          </Button>
        </Container>
      </Container>
    </Container>
  );
}

export default CurrentSwell;
