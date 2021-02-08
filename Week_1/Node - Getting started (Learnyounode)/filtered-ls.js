const fs = require("fs");
const path = require("path");

var dirPath = process.argv[2];
var extension = process.argv[3];

fs.readdir(dirPath, (err, fileList) => {
  if (err) {
    return console.log(err);
  }
  const filteredList = fileList.filter((file) => {
    return path.extname(file) === "." + extension;
  });

  filteredList.forEach((file) => {
    console.log(file);
  });
});
