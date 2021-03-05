// a) Create an interface to describe a function: myFunc that should 
//    take three string parameters and return a String Array.
interface myFunc {
    (param1: string, param2: string, param3: string): string[];
}

// b) Design a function "implementing" this interface which returns 
//    an array with the three strings
let myFunc: myFunc;
myFunc = function (param1: string, param2: string, param3: string) {
    return [param1, param2, param3];
}
console.log(myFunc("et", "to", "tre"));

// c) Design another implementation that returns 
//    an array, with the three strings uppercased.
let myFuncUppercase: myFunc;
myFuncUppercase = function (param1: string, param2: string, param3: string) {
    return [param1.toUpperCase(), param2.toUpperCase(), param3.toUpperCase()];
}
console.log(myFuncUppercase("et", "to", "tre"));

// d) The function, given below, uses the ES-6 (and TypeScript) feature for 
//    destructuring Arrays into individual variables, to simulate a method 
//    that uses the interface.
// #########################################
// ### I DO NOT UNDERSTAND THIS EXERCISE ###
// #########################################
// let f2 = function logger(f1: myFunc){
//     //Simulate that we get data from somewhere and uses the provided function
//     let [ a, b, c] = ["A", "B", "C"];
//     console.log(f1(a,b,c));
// }
// f2(myFunc);
// // e) Test f2 with the two implementations created in b+c.
