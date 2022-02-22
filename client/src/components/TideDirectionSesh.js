import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

function TideDirectionSesh({ tide }) {
  if (tide) {
    if (tide.type === "NORMAL" && tide.nextType === "LOW")
      return <FaArrowDown />;

    if (tide.type === "NORMAL" && tide.nextType === "HIGH")
      return <FaArrowUp />;

    if (tide.type === "HIGH") return <FaArrowDown />;
    if (tide.type === "LOW") return <FaArrowUp />;
  } else return <div></div>;
}

export default TideDirectionSesh;
