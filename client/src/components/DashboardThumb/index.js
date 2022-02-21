import React from "react";
import { Container, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./dashboardThumb.css";

function DashboardThumb({ spot }) {
  let history = useHistory();
  const getSessions = async (e) => {
    const spotId = e.target.getAttribute("data-spot-id");

    history.push(`/sessions/${spotId}`);
  };
  return (
    <Col md={6} sm={12}>
      <Container
        onClick={(e) => getSessions(e)}
        data-spot-id={spot.spot_id}
        style={{ backgroundImage: `url(${spot.thumbnail})` }}
        className="dashboard__thumb shadow-sm rounded"
      >
        <p className="current-swell__head">{spot.name}</p>
      </Container>
    </Col>
  );
}

export default DashboardThumb;
