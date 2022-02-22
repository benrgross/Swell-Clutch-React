import moment from "moment";

function TimeDifference({ timestamp, nextTimestamp }) {
  let nextT = moment(new Date(nextTimestamp)).format("YYYY-MM-DD HH:mm:ss");
  let currentT = moment(new Date(timestamp)).format("YYYY-MM-DD HH:mm:ss");

  let difference = (Date.parse(nextT) - Date.parse(currentT)) / 3600;

  return <span>{difference.toFixed(1)}</span>;
}

export default TimeDifference;
