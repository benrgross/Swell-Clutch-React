import React from "react";

import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";

function SaveSwellBtn({ spot }) {
  const saveSwell = async () => {
    const body = {
      spot: spot,
    };
    const { data } = await axios.post("/api/db/saveSwell", body);
    console.log(data);
  };
  return (
    <Row>
      <Col></Col>
      <Col md={4} sm={12} className="d-flex justify-content-center">
        <Button onClick={saveSwell} className="save-btn">
          Save Swell
        </Button>
      </Col>
      <Col></Col>
    </Row>
  );
}

export default SaveSwellBtn;
