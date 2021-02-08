const fs = require('fs')
var fileName = process.argv[2];

fs.readFile(fileName, function(err, contents){
    if(err){
        return console.log(err)
    }
    let noOfLines = contents.toString().split('\n').length - 1;
    console.log(noOfLines);
})