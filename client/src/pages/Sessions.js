import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SessionGallery from "../components/SessionGallery.js";

import API from "../utils /API.js";

function Sessions() {
  const { id } = useParams();
  const [sessions, setSessions] = useState([]);
  const [report, setReport] = useState();
  const [name, setName] = useState("undefined");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSessionsOnLocation();
    return (set) => {
      setSessions([]);
    };
  }, [id]); //eslint-disable-line

  const getSessionsOnLocation = async () => {
    try {
      const { data } = await API.getSessions(id);
      if (data.length === 1) {
        const response = await API.getReport(data[0].spotId);
        console.log(response.data);
        setReport(response.data);
      }
      await setSessions(data);
      await setName(data[0].name);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="session__page-cont">
      <SessionGallery name={name} report={report} sessions={sessions} />
    </div>
  );
}

export default Sessions;
