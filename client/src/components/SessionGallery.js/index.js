import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import SessionCard from "../SessionCard.js";
import "./sessionGallery.css";

function SessionGallery({ sessions, name }) {
  return (
    <Container>
      <div className="d-flex justify-content-center">
        <h1 className="session__gallery-header">Sessions At {name}</h1>
      </div>

      <Row>
        {sessions.map((session) => (
          <SessionCard spot={session} />
        ))}
      </Row>
    </Container>
  );
}

export default SessionGallery;
