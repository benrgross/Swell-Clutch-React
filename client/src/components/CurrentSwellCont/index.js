import { useState } from "react";
import { Row, Col, Container, Alert, Button } from "react-bootstrap";
import TideDirection from "../TideDirection";
import RotateArrow from "../RotateArrow";
import ConvertTimeStamp from "../ConvertTimeStamp";
import BuoySwells from "../BuoySwells";
import Dropzone from "react-dropzone-uploader";
import SpotConditions from "../SpotConditions";
import API from "../../utils /API";
import SaveSwellBtn from "../SaveSwellBtn";
import Loader from "../Loader.js";
import { useAuth0 } from "@auth0/auth0-react";
import "react-dropzone-uploader/dist/styles.css";
import "./currentSwell.css";

export default function CurrentSwellCont({ spot }) {
  const [imageUrl, setImageUrl] = useState("null");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { isAuthenticated } = useAuth0();

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = async (files) => {
    try {
      setLoading(true);
      // define file
      const f = files[0];
      const img = f["file"];

      // get presigned url
      const { data } = await API.getSignedUrl();
      const { Key, uploadURL } = await data;
      console.log(Key);

      //upload image using presigned url
      const result = await API.uploadImage(uploadURL, img);

      //set alert based on returned url
      await alert(result.url);

      await setImageUrl(`https://swell-clutch-react.s3.amazonaws.com/${Key}`);
    } catch (err) {
      alert();
    }
  };

  const alert = (result) => {
    if (result) {
      setLoading(false);
      setSuccess(true);
      setTimeout(function () {
        setSuccess(false);
      }, 4000);
    } else {
      setLoading(false);
      setError(true);
      setTimeout(function () {
        setError(false);
      }, 4000);
    }
  };

  return (
    <>
      <Col></Col>
      <Col md={6} sm={12} className="current-swell__report">
        <Container
          fluid
          className="current-swell__report-cont rounded shadow-sm"
        >
          <Row>
            <div className="d-flex justify-content-center current-swell__report-header-cont">
              <h4 className="current-swell__report-header">Surf Report</h4>
            </div>
          </Row>
          <Row>
            <div className="d-flex justify-content-center">
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
                    {spot.waveHeight.min.toFixed(1)} -{" "}
                    {spot.waveHeight.max.toFixed(1)}ft{" "}
                    {spot.waveHeight.occasional > 0
                      ? `w/ occ ${spot.waveHeight.occasional.toFixed(1)}ft`
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
          <Row>
            <Col></Col>
            <Col md={6}>
              {isAuthenticated ? (
                <div className="upload_cont">
                  {loading ? (
                    <Row>
                      <Loader />
                    </Row>
                  ) : (
                    <Dropzone
                      maxFiles={1}
                      multiple={false}
                      inputContent="Upload An Image To Save"
                      onSubmit={handleSubmit}
                      accept="image/*,audio/*,video/*"
                    />
                  )}

                  <Alert
                    variant={error ? "danger" : "success"}
                    className={
                      success ? "fadeIn image-alert" : "fadeOut  image-alert"
                    }
                  >
                    Image uploaded!
                  </Alert>
                </div>
              ) : (
                ""
              )}
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </Col>
      <Col></Col>
      <Container className="current-swell__button-cont text-center">
        {isAuthenticated ? (
          <SaveSwellBtn spot={spot} imageUrl={imageUrl} />
        ) : (
          <>
            <h4>Log In To Start Saving Swells</h4>
            <br />
          </>
        )}

        <Container className="d-flex justify-content-center">
          <Button className="back-to-search-btn" href="/search">
            Back to Search
          </Button>
        </Container>
      </Container>
    </>
  );
}
