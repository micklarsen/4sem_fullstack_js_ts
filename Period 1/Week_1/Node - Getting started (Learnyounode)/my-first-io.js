const fs = require('fs')
let fileName = process.argv[2];
let file = fs.readFileSync(fileName, 'utf8');
let noOfNewLines = file.split('\n').length -1;

console.log(noOfNewLines);

//One liner
//fs.readFileSync(process.argv[2], 'utf-8').split('\n').length - 1