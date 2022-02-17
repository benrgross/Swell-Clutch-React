import React from "react";
import { Container } from "react-bootstrap";
import "./header.css";

function Header() {
  return (
    <Container className="brand__cont">
      <h1 className="brand__header">Swell Clutch</h1>
    </Container>
  );
}

export default Header;
