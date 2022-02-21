import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import DashboardThumb from "../DashboardThumb";

function DashboardGallery() {
  const { isAuthenticated, user } = useAuth0();
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      getSessions();
    }
  }, [isAuthenticated]); //eslint-disable-line

  const getSessions = async () => {
    try {
      let { data } = await axios.get(`/api/session/${user.email}`);

      const results = await countAndSortData(data);

      setSessions(results);
    } catch (err) {
      setError(true);
    }
  };

  const countAndSortData = async (data) => {
    var map = new Map();
    await data.forEach((spot) => {
      if (map.has(spot["id"])) {
        map.get(spot["id"]).count++;
      } else {
        map.set(spot["id"], Object.assign(spot, { count: 1 }));
      }
    });
    return (data = [...map.values()]).sort((a, b) => b.count - a.count);
  };

  return (
    <>
      {!isAuthenticated ? (
        <Container className="login-message">
          <h4>Please Login To View Sessions</h4>
        </Container>
      ) : (
        <>
          {" "}
          {sessions.map((session) => (
            <DashboardThumb
              key={session.id}
              spot={session}
              className="dash__thumb"
            />
          ))}{" "}
        </>
      )}
    </>
  );
}

export default DashboardGallery;
