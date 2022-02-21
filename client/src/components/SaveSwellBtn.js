import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

function SaveSwellBtn({ spot }) {
  const { user } = useAuth0();
  const history = useHistory();

  const saveSwell = async () => {
    console.log(user);
    const body = {
      spot: spot,
      account: user,
    };
    const { data } = await axios.post("/api/session/saveSwell", body);
    history.push("/");
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
