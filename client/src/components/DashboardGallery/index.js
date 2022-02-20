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
      let { data } = await axios.get(`/api/session/${user.email}`);
      console.log(data);
      var map = new Map();

      data.forEach((spot) => {
        if (map.has(spot["id"])) {
          map.get(spot["id"]).count++;
        } else {
          map.set(spot["id"], Object.assign(spot, { count: 1 }));
        }
      });
      data = [...map.values()];
      console.log(data);
      setSessions(data);
      console.log(sessions);
    } catch (err) {
      console.log(err);
    }
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
