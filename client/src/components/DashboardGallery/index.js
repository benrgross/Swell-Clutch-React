import { useEffect, useState } from "react";
import API from "../../utils /API";
import { Container, Alert } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import DashboardThumb from "../DashboardThumb";
import "./dashboardGallery.css";

function DashboardGallery() {
  const { isAuthenticated, user } = useAuth0();
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(false); //eslint-disable-line

  useEffect(() => {
    if (isAuthenticated) {
      getSessions();
    }
  }, [isAuthenticated]); //eslint-disable-line

  const getSessions = async () => {
    setError(false);
    try {
      const { email } = await user;
      let { data } = await API.getSessionsOnUser(email);

      const results = await countAndSortData(data);

      setSessions(results);
    } catch (err) {
      setError(true);
      console.log("error", err);
    }
  };

  const countAndSortData = async (data) => {
    // create map object
    var map = new Map();

    // get array of data
    await data.forEach((spot) => {
      if (map.has(spot["id"])) {
        //count the occurrences of spot ids and add to key
        map.get(spot["id"]).count++;
      } else {
        //if new spot id create count key in spot object and set to 1
        map.set(spot["id"], Object.assign(spot, { count: 1 }));
      }
    });
    // return data by spreading map values and sorting by count
    return (data = [...map.values()]).sort((a, b) => b.count - a.count);
  };

  return (
    <>
      {!isAuthenticated ? (
        <Container className="login-message d-flex justify-content-center text-center">
          <h3>Please Login To View And Add Sessions</h3>
        </Container>
      ) : (
        <>
          {error ? (
            <Alert variant="danger">
              Something went wrong, please try again
            </Alert>
          ) : (
            ""
          )}
          {sessions.map((session) => (
            <DashboardThumb
              key={session.id}
              spot={session}
              className="dash__thumb"
            />
          ))}
        </>
      )}
    </>
  );
}

export default DashboardGallery;
