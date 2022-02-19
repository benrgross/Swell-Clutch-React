import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import SpotHeader from "../SpotHeader";

function DashboardGallery() {
  const { isAuthenticated, user } = useAuth0();
  const [sessions, setSessions] = useState([]);
  const [loginMessage, setLoginMessage] = useState(false);
  useEffect(() => {
    if (isAuthenticated) {
      return getSessions();
    } else return setLoginMessage(true);
  }, [isAuthenticated]);

  const getSessions = async () => {
    try {
      console.log(user.email);
      const { data } = await axios.get(`/api/session/${user.email}`);

      const counts = {};
      data.forEach((x) => {
        counts[x] = (counts[x] || 0) + 1;
      });
      console.log(counts);
      await setSessions(data);
      console.log(sessions);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {sessions.map((session) => (
        <SpotHeader key={session.spot.id} spot={session.spot} />
      ))}
    </>
  );
}

export default DashboardGallery;
