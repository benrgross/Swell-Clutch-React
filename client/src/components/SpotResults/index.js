import React, { useState } from "react";
import { Col, Row, Alert } from "react-bootstrap";
import CurrentSwell from "../CurrentSwell";
import API from "../../utils /API";
import Loader from "../Loader.js";
import "./spotResults.css";

function SearchSpotResults({ data }) {
  const [swell, setSwell] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getSwell = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const spotId = await e.target.getAttribute("data-spot-id");
      const data = await API.getReport(spotId);

      setSwell(data.data);

      setLoading(false);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };
  return (
    <>
      {error ? (
        <Alert variant="danger">
          Like something went wrong. Try another spot.
        </Alert>
      ) : (
        ""
      )}
      {loading ? (
        <Loader />
      ) : (
        <>
          {swell.length < 1 ? (
            <Row>
              <Col></Col>
              <Col sm={12} md={6} className="spot__results-col">
                {data
                  ? data.map((spot, i) => {
                      return (
                        <p
                          onClick={getSwell}
                          className="spot__result-link shadow-sm rounded"
                          key={i}
                          data-spot-id={spot.spotId}
                          data-api={spot.href}
                        >
                          {spot.name}
                        </p>
                      );
                    })
                  : ""}
              </Col>
              <Col></Col>
            </Row>
          ) : (
            <CurrentSwell data={swell} />
          )}
        </>
      )}{" "}
    </>
  );
}

export default SearchSpotResults;
