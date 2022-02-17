import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";

function SaveSwellBtn({ spot }) {
  const { user } = useUser();
  const saveSwell = async () => {
    console.log(user);
    const body = {
      spot: spot,
      user: user,
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
