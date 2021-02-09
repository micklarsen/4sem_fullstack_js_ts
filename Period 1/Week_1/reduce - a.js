//a) Use join to create a single string from all, with names: comma-, space. and  # - separated.

var all = ["Lars", "Peter", "Jan", "Bo"];

console.log("All: " + all);
console.log("Comma: " + all.join(","));
console.log("Space: " + all.join(" "));
console.log("Pound: " + all.join("#"));