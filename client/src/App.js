import React, { useRef, useState } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

export default function Home() {
  const spotName = useRef();
  const [spot, setSpot] = useState([]);
  const [viewSearch, setSearch] = useState(true);

  const searchSpot = async (e) => {
    e.preventDefault();
    console.log(spotName.current.value);

    try {
      const { data } = await axios.get(
        `api/cheerio/getspots/${spotName.current.value}`
      );
      console.log(data);
      if (data.length < 1) {
      } else {
        setSpot(data);
        setSearch(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {viewSearch ? (
        <Row>
          <Col></Col>
          <Col md={6} sm={12}>
            <Container className="search__cont shadow-sm ">
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
      ,
      <>
        {spot.length < 1 ? (
          <Row>
            <Col></Col>
            <Col sm={12} md={6} className="spot__results-col">
              {" "}
              {spot ? (
                spot.map((spot, i) => {
                  return (
                    <>
                      <p
                        className="spot__result-link"
                        key={i}
                        data-spotid={spot.spotId}
                        data-api={spot.href}
                      >
                        {spot.name}
                      </p>
                    </>
                  );
                })
              ) : (
                <p>search a spot to get started </p>
              )}
            </Col>
            <Col></Col>
          </Row>
        ) : (
          ""
        )}
      </>
    </div>
  );
}
