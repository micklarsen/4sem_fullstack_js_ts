//Illustrate that:
//  - Function declarations are completely hoisted
//  - var declarations are also hoisted, but not assignments made with them

// Explain:
//  - What hoisting is
//  - A design rule we could follow when using var, now we know about hoisting

function hoisting() {
  const a = true;
  if (a) {
    var hasBeenInA = true;
    console.log("In A");
  }
  if (hasBeenInA) {
    console.log("In B");
  }
}
hoisting();
/*
Prints:
>In A
>In B
 */

function hoisting2() {
  console.log("Value of myCoolObject: " + myCoolObject);

  if (!myCoolObject) {
    var myCoolObject = { value: "I'm a cool object" }; //Var is always hoisted, but not the reference.
    console.log(myCoolObject.value);
  }
}
hoisting2();
/*
Prints:
>"Value of myCoolObject: undefined"
>I'm a cool object
 */

function hoisting3() {
  f31();
  f32();

  function f31() { //Functions also get hoisted
    console.log("I'm f31");
  }
  var f32 = function () { //Function expressions do not
    console.log("And I'm f32");
  };
}

hoisting3();
/*
Prints:
>"I'm f31"
>TypeError: f32 is not a function
*/