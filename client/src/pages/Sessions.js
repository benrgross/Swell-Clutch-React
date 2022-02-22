import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SessionGallery from "../components/SessionGallery.js";
import axios from "axios";

function Sessions() {
  const { id } = useParams();
  const [sessions, setSessions] = useState([]);
  const [name, setName] = useState("undefined");

  useEffect(() => {
    return getSessionsOnLocation();
  }, []); //eslint-disable-line

  const getSessionsOnLocation = async () => {
    try {
      const { data } = await axios.get(`/api/session/spot/${id}`);
      console.log("data", data);
      await setSessions(data);
      await setName(data[0].name);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="session__page-cont">
      <SessionGallery name={name} sessions={sessions} />
    </div>
  );
}

export default Sessions;
