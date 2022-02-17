import React from "react";
import { Row } from "react-bootstrap";

function BuoySwells({ swells }) {
  const getCardinalDir = (num) => {
    while (num < 0) num += 360;
    while (num >= 360) num -= 360;
    let val = Math.round((num - 11.25) / 22.5);
    let arr = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return arr[Math.abs(val)];
  };

  const colorMatch = [
    "#0058b0",
    "#c358ed",
    "#ff8309",
    "#67ef9e",
    "#dbdb56",
    "#11ebeb",
    "#e30c33",
    "#df11c6",
  ];

  return (
    <>
      {swells.map((swell, i) => {
        return (
          <div key={swell.direction} className="d-flex justify-content-center">
            <p>
              <span style={{ color: `${colorMatch[i]}` }}>● </span>{" "}
              {swell.height.toFixed(1)}ft at {swell.period}s{" "}
              {getCardinalDir(swell.direction)} {swell.direction.toFixed(2)}º
            </p>
          </div>
        );
      })}
    </>
  );
}

export default BuoySwells;
