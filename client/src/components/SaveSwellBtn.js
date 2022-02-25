import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

function SaveSwellBtn({ spot, imageUrl }) {
  const { user } = useAuth0();
  const history = useHistory();

  // Save Swell Function After Search
  const saveSwell = async () => {
    try {
      const body = {
        spot: spot,
        account: user,
        imageUrl: imageUrl,
      };
      const { data } = await axios.post("/api/session/saveSwell", body);

      history.push("/");
    } catch (err) {
      console.log(err);
      history.push("/search");
    }
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
