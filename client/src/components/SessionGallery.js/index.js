import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import SessionCard from "../SessionCard.js";

import { useHistory } from "react-router-dom";
import ReportCard from "../ReportCard/index.js";
import "./sessionGallery.css";

function SessionGallery({ sessions, name, report }) {
  const history = useHistory();
  const getReport = async (e) => {
    history.push(`/sessions/${e.target.getAttribute("data-id")}`);
  };
  return (
    <Container>
      <div className="d-flex justify-content-center">
        <h1 className="session__gallery-header">Sessions At {name}</h1>
      </div>
      {sessions.length === 1 ? (
        <Row>
          <Col md={6} sm={12} className="session__card-col">
            <ReportCard report={report} />
          </Col>
          <Col md={6} sm={12} className="session__card-col">
            <SessionCard spot={sessions[0]} />
          </Col>
        </Row>
      ) : (
        <Row>
          {sessions.map((session) => (
            <Col md={6} sm={12} className="session__card-col">
              <Button
                onClick={(e) => getReport(e)}
                data-id={session.id}
                className="session__report-btn"
              >
                Compare Report
              </Button>
              <SessionCard spot={session} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default SessionGallery;
