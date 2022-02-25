import React, { useRef, useState } from "react";

import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import Results from "../Results";
import API from "../../utils /API";
import "./search.css";

function SearchSpot() {
  const spotName = useRef();
  const [spot, setSpot] = useState([]);
  const [viewSearch, setSearch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchSpot = async (e) => {
    e.preventDefault();
    console.log(spotName.current.value);
    setLoading(true);
    setError(false);
    setSearch(false);

    try {
      const name = await spotName.current.value;
      const { data } = await API.searchSpots(name);
      console.log("data", data);
      setLoading(false);

      setSpot(data);
      setSearch(false);
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };
  return (
    <div>
      {error ? (
        <Alert variant="danger">Something went wrong, please try again</Alert>
      ) : (
        ""
      )}
      {viewSearch ? (
        <Row>
          <Col></Col>
          <Col md={6} sm={12}>
            <Container className="search__cont-class shadow-sm ">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicSearch">
                  <Form.Label className="search__spot-label">
                    Search Your Spot
                  </Form.Label>
                  <Form.Control
                    ref={spotName}
                    type="search"
                    placeholder="enter a surf spot"
                  />
                  <Form.Text className="text-muted">
                    Only spots on surfline can be searched
                  </Form.Text>
                </Form.Group>

                <Button
                  onClick={searchSpot}
                  className="search__spot-btn"
                  variant="primary"
                >
                  Search
                </Button>
              </Form>
            </Container>
          </Col>
          <Col></Col>
        </Row>
      ) : (
        ""
      )}
      <Results loading={loading} data={spot} />
    </div>
  );
}

export default SearchSpot;
