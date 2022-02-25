import React from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import DashboardGallery from "../components/DashboardGallery";
import { useAuth0 } from "@auth0/auth0-react";

function Dashboard() {
  const { user } = useAuth0();
  return (
    <div id="dash__cont">
      <Header />
      <Row className="dash__title-row">
        <Col md={4} sm={6}>
          <h1>Sessions</h1>
        </Col>
        <Col></Col>
        {user ? (
          <Col md={4} sm={6} className="mr-auto">
            <div className="dash__info"> {user.nickname}</div>{" "}
          </Col>
        ) : (
          <Col md={4} sm={6}></Col>
        )}
      </Row>
      <Row>
        <DashboardGallery />
      </Row>
    </div>
  );
}

export default Dashboard;
