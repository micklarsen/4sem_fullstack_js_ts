let myArray = process.argv.slice(2);
let sum = myArray.reduce((accu, myArray) => accu + Number(myArray), 0);
console.log(sum);
