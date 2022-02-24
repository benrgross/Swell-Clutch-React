import { Row, Col, Container } from "react-bootstrap";
import "./loader.css";

function Loader() {
  return (
    <Container className="loader__cont d-flex justify-content-center">
      <Col></Col>
      <Col md={4} className="d-flex justify-content-center">
        <div className="loader"></div>
      </Col>
      <Col></Col>
    </Container>
  );
}

export default Loader;
