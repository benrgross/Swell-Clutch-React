import React from "react";
import { Container, Col } from "react-bootstrap";
import SessionCard from "../SessionCard.js";

function SessionGallery({ sessions }) {
  return (
    <Container fluid>
      {sessions.map((spot) => (
        <SessionCard spot={spot} />
      ))}
    </Container>
  );
}

export default SessionGallery;
