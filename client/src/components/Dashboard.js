import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Dashboard() {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <h1>Dashboard</h1>
        </Col>
        <Col></Col>
        <Col>
          <div> / add account details</div>{" "}
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
