//c) Create a reducer function that will return the average age of all members.

let members = [
  { name: "Peter", age: 18 },
  { name: "Jan", age: 35 },
  { name: "Janne", age: 25 },
  { name: "Martin", age: 22 },
];

Array.prototype.myReducer = function (callback) {
  let accum = 0;
  this.forEach((elem) => {
    accum = callback(accum, elem.age);
  });
  return accum / this.length;
};

console.log(members.myReducer((accu, curr) => accu + curr));
