import React from "react";
import moment from "moment";

function ConvertTimeWithDate({ timestamp }) {
  let t = moment.unix(timestamp).format(`MM/DD/YY @ h:mm a`);

  return <span>{t}</span>;
}

export default ConvertTimeWithDate;
