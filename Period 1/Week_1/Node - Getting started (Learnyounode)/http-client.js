let http = require("http");
let getURL = process.argv[2];

http.get(getURL, (response) => {
  response.setEncoding("utf-8");
  response.on("data", console.log);
  response.on("error", console.error);
});
