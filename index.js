const curDate = document.getElementById("date");
let weathercon = document.getElementById("weathercon");

const tempStatus = "Clouds";

const getCurrentDay = () => {
  const weekday = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  let currentTime = new Date();
  let day = weekday[currentTime.getDay()];

  return day;
};

const getCurrentTime = () => {
  var now = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  var month = months[now.getMonth()];
  var date = now.getDate();

  let hours = now.getHours();
  let mins = now.getMinutes();

  let period = "AM";

  if (hours > 11) {
    period = "PM";
    if (hours > 12) hours -= 12;
  }

  if (mins < 10) {
    mins = "0" + mins;
  }

  return `${month} ${date} | ${hours}:${mins}${period}`;
};

curDate.innerHTML = `${getCurrentDay()} | ${getCurrentTime()}`;

// getCurrentDay();
// getCurrentTime();
