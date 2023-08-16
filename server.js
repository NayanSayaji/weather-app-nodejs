require('dotenv').config();

const fs = require("fs");
const http = require("http");
const requests = require("requests");

const appid = process.env.APPID;
console.log(appid)

// const homeFile = fs.readFileSync(`${__dirname}/src/home.html`, "utf-8");
const homeFile = fs.readFileSync(`home.html`, "utf-8");

const replaceVal = (tempVal, orginalVal) => {
  let temperature = tempVal.replace("{%tempval%}", orginalVal.main.temp);
  temperature = temperature.replace("{%tempmin%}", orginalVal.main.temp_min);
  temperature = temperature.replace("{%tempmax%}", orginalVal.main.temp_max);
  temperature = temperature.replace("{%location%}", orginalVal.name);
  temperature = temperature.replace("{%country%}", orginalVal.sys.country);
  temperature = temperature.replace("{%tempStatus%}", orginalVal.weather[0].main);

  return temperature;
};

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    requests(
      `http://api.openweathermap.org/data/2.5/weather?q=pune&units=metric&appid=${appid}`
    )
      .on("data", (chunk) => {
        const objData = JSON.parse(chunk);
        const arrData = [objData];

        // console.log(arrData[0].main.temp);

        const realTimeData = arrData.map((val) => replaceVal(homeFile, val)).join(" ");

        res.write(realTimeData);

        // console.log(realTimeData)
      })
      .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);
        res.end();
        // console.log("end");
      });
  }
});

server.listen(8080, "localhost", () => {
  console.log(`server is running on port http://localhost:8080`);
});
