import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SessionGallery from "../components/SessionGallery.js";
import Loader from "../components/Loader.js/index.js";
import API from "../utils /API.js";

function Sessions() {
  const { id } = useParams();
  const [sessions, setSessions] = useState([]);
  const [report, setReport] = useState();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSessionsOnLocation();
    return () => {
      setSessions([]);
    };
  }, [id]); //eslint-disable-line

  const getSessionsOnLocation = async () => {
    setLoading(true);
    try {
      const { data } = await API.getSessions(id);
      if (data.length === 1) {
        const response = await API.getReport(data[0].spotId);

        setReport(response.data);
      }
      await setSessions(data);
      await setName(data[0].name);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="session__page-cont">
      {loading ? (
        <Loader />
      ) : (
        <SessionGallery name={name} report={report} sessions={sessions} />
      )}
    </div>
  );
}

export default Sessions;
