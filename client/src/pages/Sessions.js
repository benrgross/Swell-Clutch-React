import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CurrentSwellCont from "../components/CurrentSwellCont";
import axios from "axios";

function Sessions() {
  const { id } = useParams();
  const [sessions, setSessions] = useState();

  useEffect(() => {
    return getSessionsOnLocation();
  }, []); //eslint-disable-line

  const getSessionsOnLocation = async () => {
    try {
      const { data } = await axios.get(`/api/session/spot/${id}`);
      console.log("data", data);
      setSessions(data);
    } catch (err) {
      console.log(err);
    }
  };

  return <div>{}</div>;
}

export default Sessions;
