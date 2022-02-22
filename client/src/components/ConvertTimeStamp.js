import React from "react";
import moment from "moment";

function ConvertTimeStamp({ timestamp }) {
  let t = moment.unix(timestamp).format("h:mm a");

  return <div>{t}</div>;
}

export default ConvertTimeStamp;
