import { Row, Col, Container } from "react-bootstrap";
import TideDirection from "./TideDirection";
import RotateArrow from "./RotateArrow";
import ConvertTimeStamp from "./ConvertTimeStamp";
import BuoySwells from "./BuoySwells";

export default function CurrentSwellCont({ spot }) {
  return (
    <Row className="current-swell__cont">
      <Col></Col>
      <Col md={6} sm={12} className="current-swell__report">
        <Container className="current-swell__report-cont rounded shadow-sm">
          <Row>
            <div className="d-flex justify-content-center current-swell__report-header-cont">
              <h4 className="current-swell__report-header">Surf Report</h4>
            </div>
          </Row>
          <Row>
            <div className="d-flex justify-content-center">
              <h6>{spot.conditions.value}</h6>
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
                    {spot.waveHeight.min} - {spot.waveHeight.max}ft{" "}
                    {spot.waveHeight.occasional > 0
                      ? `w/ occ ${spot.waveHeight.occasional}ft`
                      : ""}
                  </div>
                </Row>
                <Row>
                  <div className="current-swell__humanRelation">
                    {spot.waveHeight.humanRelation}{" "}
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
                    {spot.tide.current.height.toFixed(1)} ft{" "}
                    <TideDirection tide={spot.tide} />
                  </div>
                </Row>
                <Row>
                  <div className="current-swell__humanRelation">
                    {spot.tide.next.type === "LOW"
                      ? `Low tide ${spot.tide.next.height.toFixed(1)}ft at `
                      : `High tide ${spot.tide.next.height.toFixed(
                          1
                        )}ft at `}{" "}
                    <ConvertTimeStamp timestamp={spot.tide.next.timestamp} />
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
            <Col>
              <div className="current-swell__report-div">
                <Row>
                  <div className="current-swell__waveHeight-desc">Weather</div>
                </Row>
                <Row>
                  <div className="current-swell__waveHeight">
                    {spot.weather.temperature.toFixed(0)}F
                  </div>
                </Row>
                <Row>
                  <div className="current-swell__humanRelation">
                    {spot.weather.condition}
                  </div>
                </Row>
              </div>
            </Col>

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
      </Col>
      <Col></Col>
    </Row>
  );
}
