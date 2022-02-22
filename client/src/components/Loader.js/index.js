import { Row, Col, Container } from "react-bootstrap";
import "./loader.css";

function Loader() {
  return (
    <Container fluid className="loader__cont d-flex justify-content-center">
      <Row>
        <Col></Col>
        <Col md={4}>
          <div className="loader"></div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default Loader;
