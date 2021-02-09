var dirPath = process.argv[2];
var extension = process.argv[3];
const filteredList = require('./mymodule');

filteredList(dirPath, extension, (err, files) => {
  if (err) {
    return console.log(err);
  }

  files.forEach((file) => {
    console.log(file);
  });
});
