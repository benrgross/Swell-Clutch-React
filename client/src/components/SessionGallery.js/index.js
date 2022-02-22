import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import SessionCard from "../SessionCard.js";
import "./sessionGallery.css";

function SessionGallery({ sessions }) {
  return (
    <Container>
      <div className="d-flex justify-content-center">
        <h1 className="session__gallery-header">
          Sessions At {sessions[0].spot.name}
        </h1>
      </div>

      <Row>
        {sessions.map((spot) => (
          <SessionCard spot={spot} />
        ))}
      </Row>
    </Container>
  );
}

export default SessionGallery;
