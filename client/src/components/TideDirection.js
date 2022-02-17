import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

function TideDirection({ tide }) {
  if (tide) {
    if (tide.current.type === "NORMAL" && tide.next.type === "LOW")
      return <FaArrowDown />;

    if (tide.current.type === "NORMAL" && tide.next.type === "HIGH")
      return <FaArrowUp />;

    if (tide.current.type === "HIGH") return <FaArrowDown />;
    if (tide.current.type === "LOW") return <FaArrowUp />;
  } else return <div></div>;
}

export default TideDirection;
