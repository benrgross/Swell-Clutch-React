import React from "react";
import moment from "moment";

function ConvertTimeStamp({ timestamp }) {
  let t = moment(new Date(timestamp)).format("h:mm a");

  return <div>{t}</div>;
}

export default ConvertTimeStamp;
