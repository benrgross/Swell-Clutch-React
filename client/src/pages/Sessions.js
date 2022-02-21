import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Sessions() {
  const { id } = useParams();

  useEffect(() => {
    getSessionsOnLocation();
  }, []);

  const getSessionsOnLocation = async () => {
    const { data } = await axios.get(`/api/session/spot/${id}`);
    console.log("data", data);
  };

  return <div>Sessions</div>;
}

export default Sessions;
