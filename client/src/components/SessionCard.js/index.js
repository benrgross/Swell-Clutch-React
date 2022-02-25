import { Row, Col, Container, Button } from "react-bootstrap";
import TideDirectionSesh from "../TideDirectionSesh";
import RotateArrow from "../RotateArrow";
import SpotConditions from "../SpotConditions";
import BuoySwells from "../BuoySwells";
import ConvertTimeWithDate from "../ConvertTimeWithDate";
import TimeDifference from "../TimeDifference";
import API from "../../utils /API";
import "../CurrentSwellCont/currentSwell.css";
import "./sessionCard.css";
import "../SessionGallery.js/sessionGallery.css";

function SessionCard({ spot }) {
  const deleteSession = async (e) => {
    const id = e.target.getAttribute("data-id");
    try {
      const { data } = await API.deleteSession(id);

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Container className="session__card-cont rounded shadow-sm">
        <div className="session__delete-cont">
          <Button
            data-id={spot.id}
            onClick={(e) => deleteSession(e)}
            variant="danger"
            className="session__delete-btn"
          >
            X
          </Button>
        </div>
        <Row>
          <div className="d-flex justify-content-center current-swell__report-header-cont">
            <h5 className="current-swell__report-header text-center">
              <ConvertTimeWithDate
                timestamp={spot.timeStamp}
              ></ConvertTimeWithDate>
            </h5>
          </div>
        </Row>
        <Row>
          <div className="d-flex justify-content-center session__card-condition">
            <h6>
              <SpotConditions conditions={spot.conditions.value} />
            </h6>
          </div>
        </Row>
        <Row>
          <Col
            md={4}
            className="current-swell__waveHeight-col current-swell__report-col"
          >
            <div className="current-swell__report-div">
              <Row>
                <div className="current-swell__waveHeight-desc">
                  Wave Height
                </div>
              </Row>
              <Row>
                <div className="current-swell__waveHeight">
                  {spot.surfMin.toFixed(0)} - {spot.surfMax.toFixed(0)}ft{" "}
                  {spot.occasional > 0
                    ? ` occ ${spot.occasional.toFixed(1)}ft`
                    : ""}
                </div>
              </Row>
              <Row>
                <div className="current-swell__humanRelation">
                  {spot.relation}{" "}
                </div>
              </Row>
            </div>
          </Col>
          <Col
            md={4}
            className=" current-swell__report-col current-swell__waveHeight-col"
          >
            <div className="current-swell__report-div">
              <Row>
                <div className="current-swell__waveHeight-desc">Tide</div>
              </Row>
              <Row>
                <div className="current-swell__waveHeight">
                  {spot.tide.height.toFixed(1)} ft{" "}
                  <TideDirectionSesh tide={spot.tide} />
                </div>
              </Row>
              <Row>
                <div className="current-swell__humanRelation">
                  {spot.tide.nextType === "LOW"
                    ? `Low tide ${spot.tide.nextHeight}ft in `
                    : `High tide ${spot.tide.nextHeight}ft in `}{" "}
                  <TimeDifference
                    timestamp={spot.timeStamp}
                    nextTimestamp={spot.tide.nextTime}
                  />
                </div>
              </Row>
            </div>
          </Col>
          <Col
            md={4}
            className="current-swell__report-col current-swell__waveHeight-col"
          >
            <div className="current-swell__report-div">
              <Row>
                <div className="current-swell__waveHeight-desc">Wind</div>
              </Row>
              <Row>
                <div className="current-swell__waveHeight">
                  {spot.wind.speed.toFixed(1)}kts{" "}
                  <RotateArrow deg={spot.wind} />
                </div>
              </Row>
              <Row>
                <div className="current-swell__humanRelation">
                  {spot.wind.directionType}
                </div>
              </Row>
            </div>
          </Col>
          <Col></Col>

          <Col md={12}>
            <div className="buoy__cont">
              <h5 className="buoy__data-head d-flex justify-content-center">
                Buoy Swells
              </h5>
              <span className="buoy__data-break d-flex justify-content-center"></span>
              <BuoySwells
                swells={spot.swells.filter((swell) => swell.height !== 0)}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SessionCard;
