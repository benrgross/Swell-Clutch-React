import React from "react";
import { Container, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import DeleteSpotBtn from "../DeleteSpotBtn.js";
import "./dashboardThumb.css";

function DashboardThumb({ spot }) {
  let history = useHistory();

  const getSessions = (e) => {
    const spotId = e.target.getAttribute("data-spot-id");

    history.push(`/sessions/${spotId}`);
  };

  return (
    <Col md={6} sm={12}>
      <DeleteSpotBtn spotId={spot.spot_id} />
      <Container
        onClick={(e) => getSessions(e)}
        data-spot-id={spot.spot_id}
        style={{ backgroundImage: `url(${spot.thumbnail})` }}
        className="dashboard__thumb shadow-sm rounded"
      >
        <p className="current-swell__head" data-spot-id={spot.spot_id}>
          {spot.name}
        </p>
      </Container>
    </Col>
  );
}

export default DashboardThumb;
