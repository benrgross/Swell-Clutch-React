import moment from "moment";

function TimeDifference({ timestamp, nextTimestamp }) {
  let nextT = moment(new Date(nextTimestamp)).format("YYYY-MM-DD HH:mm:ss");
  let currentT = moment(new Date(timestamp)).format("YYYY-MM-DD HH:mm:ss");

  let difference = (Date.parse(nextT) - Date.parse(currentT)) * 1000;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;

  let hours = Math.floor((difference / hour) % 24);
  let minutes = Math.floor((difference / minute) % 60);

  const results = hours + "hrs " + minutes + "min";

  return <span>{results}</span>;
}

export default TimeDifference;
