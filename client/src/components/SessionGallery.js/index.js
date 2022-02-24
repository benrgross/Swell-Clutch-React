import { useState } from "react";
import { Container, Col, Row, Button, Image } from "react-bootstrap";
import SessionCard from "../SessionCard.js";
import { useHistory, useParams } from "react-router-dom";
import { FcUpLeft } from "react-icons/fc";
import ReportCard from "../ReportCard/index.js";
import "./sessionGallery.css";

function SessionGallery({ sessions, name, report }) {
  const [viewImage, setViewImage] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const { id } = useParams();
  const history = useHistory();

  const getReport = async (e) => {
    history.push(`/sessions/${e.target.getAttribute("data-id")}`);
  };

  const openImage = async (e) => {
    await setImageSrc(e.target.getAttribute("data-image-url"));

    await setViewImage(true);
  };

  const goBack = () => {
    if (!/\D/.test(id)) {
      history.push(sessions[0].spotId);
    } else history.push("/");
  };

  return (
    <>
      <Container
        className={
          viewImage ? "session__gallery-cont-blur" : "session__gallery"
        }
      >
        <div className="d-flex justify-content-center">
          <h1 className="session__gallery-header">Sessions At {name}</h1>
        </div>

        <FcUpLeft onClick={goBack} className="back-btn" size={35} />
        {sessions.length === 1 ? (
          <Row>
            <Col md={6} sm={12} className="session__card-col">
              <SessionCard spot={sessions[0]} />
              <Row>
                <Col></Col>
                <Col md={6}>
                  {sessions[0].imageUrl.includes("http") ? (
                    <div className="d-flex justify-content-center view-image__btn-cont">
                      <Button
                        data-image-url={sessions[0].imageUrl}
                        onClick={(e) => openImage(e)}
                        className="view-image__btn"
                      >
                        View Image
                      </Button>{" "}
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
                <Col></Col>
              </Row>
            </Col>
            <Col md={6} sm={12} className="session__card-col">
              <ReportCard report={report} />
            </Col>
          </Row>
        ) : (
          <Row>
            {sessions.map((session) => (
              <Col md={6} sm={12} className="session__card-col">
                <Button
                  onClick={(e) => getReport(e)}
                  data-id={session.id}
                  className="session__report-btn"
                >
                  Compare Report
                </Button>
                <SessionCard spot={session} />
                <>
                  {session.imageUrl.includes("http") ? (
                    <Button
                      onClick={(e) => openImage(e)}
                      data-image-url={session.imageUrl}
                      className="view-image__btn view-image__btn-map"
                    >
                      View Image
                    </Button>
                  ) : (
                    ""
                  )}
                </>
              </Col>
            ))}
          </Row>
        )}
      </Container>
      <Container className="session__image-cont">
        {viewImage ? (
          <Row>
            <Col>
              <Container fluid className="d-flex justify-content-center">
                <span
                  onClick={() => setViewImage(false)}
                  className="image__back-btn"
                >
                  <FcUpLeft size={35} />
                </span>
                <Image
                  className="session__image"
                  src={imageSrc}
                  alt="image hosted by AWS"
                />
              </Container>
            </Col>
          </Row>
        ) : (
          ""
        )}
      </Container>
    </>
  );
}

export default SessionGallery;
