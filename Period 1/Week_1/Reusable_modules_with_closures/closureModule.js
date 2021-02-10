/**
A closure is an object that combines two things
    - A function
    - The environment in which that function was created.
      The environment consists of local vars that were in-scope
      at the time the closure was created.
*/

var makeCounter = function () {
    var privateCounter = 0;
    function changedBy(val) {
        privateCounter += val;
    }
    return {
        inc: () => { changedBy(1); },
        dec: () => { changedBy(-1); },
        value: () => { return privateCounter; }
    }
};

var counter1 = makeCounter();
var counter2 = makeCounter();
counter1.inc();
counter1.inc();
counter2.inc();
console.log("Counter 1: " + counter1.value());
console.log("Counter 2: " + counter2.value());

module.exports = makeCounter(); //This exports a singleton
//module.exports = makeCounter(); //This exports new objects