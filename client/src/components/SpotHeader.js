import React from "react";
import { Row, Col, Container } from "react-bootstrap";

function SpotHeader({ spot }) {
  return (
    <Row className="current-swell__head-row">
      <Col></Col>
      <Col md={12}>
        <Container
          style={{ backgroundImage: `url(${spot.thumbnail})` }}
          className="current-swell__head-cont shadow-sm rounded"
        >
          <p className="current-swell__head">{spot.name}</p>
        </Container>
      </Col>
      <Col></Col>
    </Row>
  );
}

export default SpotHeader;
