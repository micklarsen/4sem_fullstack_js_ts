var http = require("http");

var url = process.argv[2];

http.get(url, function (response) {
  var result = "";
  response.setEncoding("utf-8");
  response.on("data", (data) => {
    result += data;
  });

  response.on("end", () => {
    console.log(result.length);
    console.log(result);
  });
});
