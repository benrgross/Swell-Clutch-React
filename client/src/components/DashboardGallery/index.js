import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import SpotHeader from "../SpotHeader";

function DashboardGallery() {
  const { isAuthenticated, user } = useAuth0();
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(false);
  const [loginMessage, setLoginMessage] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      return getSessions();
    } else return setLoginMessage(true);
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

  const countAndSortData = (data) => {
    var map = new Map();
    data.forEach((spot) => {
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
      {sessions.map((session) => (
        <SpotHeader key={session.id} spot={session} />
      ))}
    </>
  );
}

export default DashboardGallery;
