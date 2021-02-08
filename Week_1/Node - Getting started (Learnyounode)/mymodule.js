const fs = require("fs");
const path = require("path");

module.exports = function (dirPath, extension, callback) {
  fs.readdir(dirPath, (err, fileList) => {
    if (err) {
      return callback(err);
    }
    const filteredList = fileList.filter((file) => {
      return path.extname(file) === "." + extension;
    });
    callback(null, filteredList);
  });
};
