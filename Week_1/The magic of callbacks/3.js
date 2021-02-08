// Create a new version of the two functions (without the array argument) 
// which you should add to the Array prototype property so they can be called
// on any array as sketched below:
// var names = ["Lars", "Peter", "Jan", "Bo"];
// var newArray = names.myFilter(function(name) {…});

let myArr = [1, 20, 21, 17, 18, 29, 19, 26, 84, 56];

Array.prototype.myfilter = function(callback) {
  let filterArr = [];
  this.forEach((elem) => {
    if (callback(elem)) {
      filterArr.push(elem);
    }
  });
  return filterArr;
}

Array.prototype.myMap = function(callback) {
    let mapArray = [];
    this.forEach((elem) => {
      mapArray.push(callback(elem));
    });
    return mapArray;
  }
  

console.log(myArr.myfilter((num) => (num > 21)));
console.log(myArr.myMap((num) => (num % 2)));