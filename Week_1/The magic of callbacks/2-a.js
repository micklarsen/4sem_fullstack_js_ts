//Assume the JavaScript-array did not offer the filter method. Then you could implement it by yourself.

// a) Implement a function: myFilter(array, callback)
// that takes an array as the first argument, and a callback as the second
// and returns a new (filtered) array according to the code provided in the callback
// (that is with the same behaviour as the original filter method).
// Test the method with the same array and callback as in the example with the original filter method.

let myArr = [1, 20, 21, 17, 18, 29, 19, 26, 84, 56];

function myfilter(array, callback) {
  let filterArr = [];
  array.forEach((elem) => {
    if (callback(elem)) {
      filterArr.push(elem);
    }
  });
  return filterArr;
}

let realFilter = myArr.filter((elem) => {
  if (elem >= 21) {
    return elem;
  }
});

console.log("Homemade filter: " + myfilter(myArr, (arg) => arg >= 21));
console.log('"Real" filter:   ' + realFilter);
