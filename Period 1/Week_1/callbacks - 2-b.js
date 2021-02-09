// b) Implement a function: myMap(array, callback)that, provided an array and
// a callback, provides the same functionality as calling the existing map method on an array.
// Test the method with the same array and callback as in the example with the original map method.

let myArr = [1, 20, 21, 17, 18, 29, 19, 26, 84, 56];

function myMap(array, callback) {
  let mapArray = [];
  array.forEach((elem) => {
    mapArray.push(callback(elem));
  });
  return mapArray;
}

const realMap = myArr.map((elem) => elem % 2);

console.log("Homemade map: " + myMap(myArr, (arg) => arg % 2));
console.log('"Real" map:   ' + realMap);
