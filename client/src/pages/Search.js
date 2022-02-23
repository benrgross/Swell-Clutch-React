import React from "react";
import { Container } from "react-bootstrap";
import SearchSpot from "../components/SearchSpot.js/index.js";

function Search() {
  return (
    <Container fluid id="search__cont">
      <SearchSpot />
    </Container>
  );
}

export default Search;
