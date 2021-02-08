console.log("### With hoisting ###");
console.log("Before loop");
//i (var) is hoisted and the loop finishes before setTimeout
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(`Value of I: ${i}`);
  }, 1000);
}
console.log("After loop i: " + i);



setTimeout(() => {
  console.log("\n\n### Without hoisting ###");
  console.log("Before loop");
  //j (let) is not hoisted. j is a closure
  for (let j = 0; j < 3; j++) {
    setTimeout(() => {
      console.log(`Value of j: ${j}`);
    }, 1000);
  }
  console.log("After loop j: \"Not defined\"");
}, 3000);
