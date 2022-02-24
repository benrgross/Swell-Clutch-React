import React from "react";
import moment from "moment";

function ConvertTimeWithDate({ timestamp }) {
  let t = moment.unix(timestamp).format(`M/DD/YY @ h:mm a`);
  t.replace(/@/g, "at");

  return <span>Session: {t.replace(/@/g, "at")}</span>;
}

export default ConvertTimeWithDate;
