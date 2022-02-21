import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SessionGallery from "../components/SessionGallery.js";
import axios from "axios";

function Sessions() {
  const { id } = useParams();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    getSessionsOnLocation();
  }, []); //eslint-disable-line

  const getSessionsOnLocation = async () => {
    try {
      const { data } = await axios.get(`/api/session/spot/${id}`);
      console.log("data", data);
      await setSessions(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <SessionGallery sessions={sessions} />
    </div>
  );
}

export default Sessions;
