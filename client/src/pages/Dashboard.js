import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import DashboardGallery from "../components/DashboardGallery";

function Dashboard() {
  return (
    <Container>
      <Header />
      <Row className="dash__title-row">
        <Col md={4}>
          <h1>Dashboard</h1>
        </Col>
        <Col></Col>
        <Col>
          <div> / add account details</div>{" "}
        </Col>
      </Row>
      <Row>
        <DashboardGallery />
      </Row>
    </Container>
  );
}

export default Dashboard;
