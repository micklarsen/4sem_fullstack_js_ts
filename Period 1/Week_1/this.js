/**
 * ### How this in JavaScript differ from this in Java ###
 * In Java 'this' refers to a class level variable, or the object 'this' is in.
 * In JavaScript 'this' refers to:
 *      - In a method, this refers to the owner object
 *      - Alone, this refers to the global object
 *      - In a function, this refers to the global object
 *      - In an event, this refers to the element that received the event
 *      - Methods like call() and apply() can refer this to any object
 */

/**
 * ### Why we (because we did not explain about this) followed a pattern in 
 * ### our third semester controller and stored a reference to this (var self = this)
 * Because this belonged to the global scope (Probably the window object) or was otherwise undefined.
 * By storing a reference to 'self' we specifically defined how to use 'this' in a specific context 
 * to achieve the behaviour we wanted - Examples below in "function Car()"
 */

/**
 * ### The purpose of the methods call(), apply() and bind()
 * Call and apply can be used to call an object using another object as an argument - "Similair" to an interface in Java
 * Bind is another way of specifically defining what "this" refers to - example below in "function CarNew()"
 */


 /**

 */

// #######################################
// ###  PRE-ES6 WAY OF MAKING OBJECTS  ###
// #######################################
function Car(make, model) {
  this.make = make;
  this.model = model;
  this.showThis = function () {
    console.log(this);
  };
  this.show = function () {
    console.log(`${this.make}, ${this.model}`);
  };
  this.showAsync = function () {
    //const self = this;        //Old way of fixing "undefined"
    //setTimeout(function () {  //Needs the commented lines to function
    setTimeout(() => {          //Arrow function fixes 'this undefined' issues
      console.log(this.make + ", " + this.model);
      //console.log(self.make + ", " + self.model); //Old way of fixing "undefined"
    }, 0);
  };
}

const car1 = new Car("Volvo", "V70");
const car2 = new Car("VW", "Polo");
console.log("#### Old way:");
car1.show();          //Prints as expected
car2.show();          //Prints as expected
//car1.showAsync();   //Prints "undefined, undefined"
//car2.showAsync();   //Prints "undefined, undefined"

// #########################################
// ###   POST-ES6 WAY OF MAKING OBJECTS  ###
// #########################################

class CarNew{
    constructor(make, model){
        this._make = make;
        this._model = model;
        this.show = this.show.bind(this); //A way of defining, that this.show should always refer to show!
    }
    show = function(){
        console.log(`${this._make}, ${this._model}`);
    }
    
    showAsync = function(){
        setTimeout(this.show, 1000);
    }

    get make(){
        return this._make;
    }
    
    set make(make){
        this._make = make;
    }
}

const car3 = new CarNew("Volvo", "V70");
const car4 = new CarNew("VW", "Polo");
console.log("\n#### New way:");
car3.show();
car4.show();
car3.showAsync()
car4.showAsync()

