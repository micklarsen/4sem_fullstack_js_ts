//This section calls a singleton
const count1 = require("./closureModule");
const count2 = require("./closureModule");
const count3 = require("./closureModule");

// //This section makes new objects - notice the '()'
// const count4 = require("./closureModule")();
// const count5 = require("./closureModule")();
// const count6 = require("./closureModule")();

count1.inc();
count1.inc();
console.log("Counter 1: " + count1.value());
console.log("Counter 2: " + count2.value());
console.log("Counter 3: " + count3.value());
// console.log("\n");
// console.log(count4.value());
// console.log(count5.value());
// console.log(count6.value());