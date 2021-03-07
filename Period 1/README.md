# Exercises:

For exercises, please check the folders above or use the list here:

- [Week 1](https://github.com/micklarsen/4sem_fullstack_js_ts/tree/main/Period%201/Week_1)
- [Week 2](https://github.com/micklarsen/4sem_fullstack_js_ts/tree/main/Period%201/Week_2)
- [Week 3](https://github.com/micklarsen/4sem_fullstack_js_ts/tree/main/Period%201/Week_3)
- [Week 4](https://github.com/micklarsen/4sem_fullstack_js_ts/tree/main/Period%201/Week_4/exercises)
- [Week 5](https://github.com/micklarsen/4sem_fullstack_js_ts/tree/main/Period%201/Week_5)


# Learning goals: Period 1 (Updated continuously)

<br> 

## Differences between Java and JavaScript + node.

**General differences in language features.**

- Java is a compiled language and JavaScript a scripted language
- Java is both a language and a platform
- JavaScript code runs in a browser environment (Typically, but not with Node!) while Java typically runs in the Java Virtual Machine (JVM).
- In Java, programs cannot run without being part of a class.
- Java has a thread based approach to concurrency while JavaScript has an event based approach.

<br> 

## NodeJS & npm - when does it "Make sense" to use

**Relevant and accessable**  
JavaScript is becoming one of the most sought-after language skills.  
Using Node.js in both the front-end and backend "Simplifies" the stack by unifying the
language and dataformat(JSON) used.  

**Scalability**  
NodeJS is a good choice for web applications as it doesn't depend on traditional servers with limited thread pools (Or waiting for available threads) as it relies on event-based executions on a single thread.
Due to its event-driven, single-threaded event loop and asynchronous non-blocking I/O model, Node.js performs best on intense I/O applications requiring speed and scalability with lots of concurrent connections, like video & audio streaming, real-time apps, live chats, gaming apps, collaboration tools,

**Developer friendly**  
NPM - the node package manager is exactly what the name implies.  
It allows for an easy way to define what packages a project depends on and generally allows for modular solutions. A useful NPM module could, for instance, be "express.js".

<br> 

## The Event Loop in JavaScript

**blocking & non-blocking**  
Blocking refers to operations that *block* further execution until an operation finishes.  
Non-blocking refers to code that doesn't block execution.  

Generally, you can say that, blocking methods execute synchronously while non-blocking methods execute asynchronously.

**The event loop**  
The event loop is what allows Node to perform non-blocking operations despite JavaScript being single-threaded.  

The loop, which runs on the same thread as the JavaScript code, grabs a task from the code (In the stack) and executes it.  
If the task is async or an I/O operation the loop offloads it to a web API (setTimeout here).  

The loop then grabs the next task and executes it.
When one of these _events_ completes (this is an event) it is moved to the task queue and eventually added to the stack to be executed.

Check out ["Loupe"](http://latentflip.com/loupe/) to see this in action

<img src="eventloop.jpeg" width="500px">
  
  <br>
  <br>

**Callback queue and other API's**  
setTimeout() is an obvious example of a Web API provided by the browser that adds to the V8 engine in Chrome and Node.  

Web API calls are added to the Web API container from the call stack. Calls to the web API could be click events, HTTP requests or a timer that finishes - events!

<br> 

## What does it mean if a method in nodes API's ends with xyzSync​?

It means that the method is probably synchronous or asynchronous.  
For instance:

**Synchronous**

```javascript
const fs = require("fs");
const data = fs.readFileSync("/file.md"); // blocks here until file is read
console.log(data);
moreWork(); // will run after console.log
```

**Asynchronous**

```javascript
const fs = require("fs");
fs.readFile("/file.md", (err, data) => {
  if (err) throw err;
  console.log(data);
});
moreWork(); // will run before console.log
```

<br> 

## The JavaScript Engine and JavaScript Runtime Environment

**The engine**  
The engine is responsible for *interpreting* the code and translate it to machine code and then executing the code.  (For Java we would have to compile the code and would be able to recieve compilation errors).

Notable Javascript engines:

- V8 by google for chrome (And Node)
- SpiderMonkey by Mozilla for firefox

**The runtime environment**  
In web development the engine is seldom used directly because the engine works within an _environment_ that provides additional features like the web APIs mentioned above.

Notable JavaScript Runtime Environments

- The browser environment (For instance powered by V8 in Chrome)
- NodeJS powered by V8, but not providing the DOM tree, AJAX, etc. Allows for installing packages to support these.

<br> 

## Babel & WebPack

**Babel**  
Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.  
Babel can be configured using a `.babelrc` file - eg:

```
{
    "presets": ["@babel/preset-env"]
}
```

[`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env) is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s).

**Webpack**  
Webpack is a tool that lets you compile JavaScript modules, also known as module bundler.  

Given a large number of files, it generates a single file (or a few files) that run your app.  
We can configure webpack to define where output is saved, what plugins to use, tools used in dev environments etc.  

Webpack can be configured using a `.webpack.config.js` file - eg:

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
    print: "./src/print.js",
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: "Output Management",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

<br> 

## Variable/function-Hoisting

**Variables**  
Hoisting is JavaScript's default behavior of moving declarations to the top.
Some variable types are hoisted to the top of the scope when the code is executed, but they behave differently.  
`let` and `const` are hoisted to the top but not initialized which will return errors.

**Functions**  
Function hoisting occurs for function declarations - not function expressions. For example:

```javascript
// Outputs: "Definition hoisted!"
definitionHoisted();

// TypeError: undefined is not a function
definitionNotHoisted();

function definitionHoisted() {
  console.log("Definition hoisted!");
}

var definitionNotHoisted = function () {
  console.log("Definition not hoisted!");
};
```

A good rule of thumb is to declare your variables at the top!

<br> 

## this​ in JavaScript and how it differs from what we know from Java/.net.

The definition of `this` in JavaScript from [W3 Schools](https://www.w3schools.com/js/js_this.asp)

```
In a method, this refers to the owner object.
Alone, this refers to the global object.
In a function, this refers to the global object.
In a function, in strict mode, this is undefined.
In an event, this refers to the element that received the event.
```

For objects in JavaScript `this` refers to the owner object - in this case "person":

```javascript
var person = {
  firstName: "John",
  lastName: "Doe",
  id: 5566,
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
};
```

In Java `this` is a reference to the object of the current class within an instance method or constructor.

The main difference between the two is that `this` changes (More) in JavaScript depending on context.

<br> 

## Function Closures and the JavaScript Module Pattern

Function closures are about scope.  
Variables can belong to the _local_ or _global_ scope and global variables can be made private with closure.  
Examples:  
Local Variable

````javascript
function myFunction() {
  var a = 4;
  return a * a;
}
```javascript
var a = 4;
function myFunction() {
  return a * a;
}
````

Making a counter with nested functions:

```javascript
function add() {
  var counter = 0;
  function plus() {
    counter += 1;
  }
  plus();
  return counter;
}
```

Here we need a way to execute `counter = 0` only once. To do this we need to use a **closure**

```javascript
var add = (function () {
  var counter = 0;
  return function () {
    counter += 1;
    return counter;
  };
})();

add();
add();
add();

// the counter is now 3
```

In this example we are using a _self-invoking function_. The first time the function runs, counter is set to 0 and a function expression is returned.  
This way `add` becomes a function with private variables - This is known as a closure.

<br> 

## User-defined Callback Functions (writing functions that take a callback)

A callback is a function that takes in a function as an argument.

```javascript
function myDisplayer(some) {
  document.getElementById("demo").innerHTML = some;
}

function myCalculator(num1, num2, myCallback) {
  let sum = num1 + num2;
  myCallback(sum);
}

myCalculator(5, 5, myDisplayer);
//The DOM element with id "demo" is changed to 10
```

<br> 

## Explain the methods ​map​, ​filter​ ​and ​reduce

Callback functions

**Map**  
Using built in Math library.

```javascript
var numbers = [4, 9, 16, 25];
var x = numbers.map(Math.sqrt);
```

**Map**  
Homemade ES6 version

```javascript
let myArr = [1, 20, 21, 17, 18, 29, 19, 26, 84, 56];

let newArr = myArr.map((num) => {
  return num * 10;
});
```

**Filter**  
Homemade version

```javascript
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
console.log("Homemade filter: " + myfilter(myArr, (arg) => arg >= 21));
```

**Filter**  
ES6 Version

```javascript
let myArr = [1, 20, 21, 17, 18, 29, 19, 26, 84, 56];

let realFilter = myArr.filter((elem) => {
  if (elem >= 21) {
    return elem;
  }
});
let myArr = [1, 20, 21, 17, 18, 29, 19, 26, 84, 56];
console.log('"Real" filter:   ' + realFilter);
```

**Reduce**
Homemade version

```javascript
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
```

**Reduce**  
Mozilla docs

```javascript
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```

<br> 

## Provide examples of user-defined reusable modules implemented in Node.js (learnynode - 6)

This small project requires `mymodule.js` in order to print a list of files with a specific extension in a give folder.

```javascript
// ### make-it-modular.js ###
var dirPath = process.argv[2];
var extension = process.argv[3];
const filteredList = require("./mymodule");

filteredList(dirPath, extension, (err, files) => {
  if (err) {
    return console.log(err);
  }

  files.forEach((file) => {
    console.log(file);
  });
});
```

```javascript
// ### mymodule.js ###
const fs = require("fs");
const path = require("path");

module.exports = function (dirPath, extension, callback) {
  fs.readdir(dirPath, (err, fileList) => {
    if (err) {
      return callback(err);
    }
    const filteredList = fileList.filter((file) => {
      return path.extname(file) === "." + extension;
    });
    callback(null, filteredList);
  });
};
```

<br> 

## Provide examples and explain the es2015 features: ​let, arrow functions, this, rest parameters, destructuring objects and arrays,​ ​maps/sets​ etc.

**Let**  
`let` declares a block scoped variable:

```javascript
let x = 1;

if (x === 1) {
  let x = 2;

  console.log(x);
  // expected output: 2
}

console.log(x);
// expected output: 1
```

**Arrow functions**  
Standard function:

```javascript
function timesTwo(params) {
  return params * 2;
}
```

As an arrow function:

```javascript
let timesTwo = (params) => params * 2; //Parathesis can be omitted if there's only one parameter

//For multiple parameters
let timesTwoPlus = (multiplier, adder) => {
  return multiplier * 2 + adder;
};
```

When using arrow functions with curly braces, a return statement is required.

**Rest parameters**  
The rest parameter syntax allows a function to accept an indefinite number of args as an array:

```javascript
function sum(...theArgs) {
  return theArgs.reduce((previous, current) => {
    return previous + current;
  });
}

console.log(sum(1, 2, 3));
// expected output: 6

console.log(sum(1, 2, 3, 4));
// expected output: 10
```

**Destructuring objects & arrays**  
Destructuring can be used to "Unpack" values from arrays or properties from objects:

```javascript
let a, b, rest;
[a, b] = [10, 20];

console.log(a);
// expected output: 10

console.log(b);
// expected output: 20

[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log(rest);
// expected output: Array [30,40,50]
```

Object and array litteral expression to create "Packages" of data:

```javascript
const foo = ["one", "two", "three"];

const [red, yellow, green] = foo;
console.log(red); // "one"
console.log(yellow); // "two"
console.log(green); // "three"
```

**Maps & sets**  
Similair to the Map object collection in Java - Key value pairs:

```javascript
let contacts = new Map();
contacts.set("Jessie", { phone: "213-555-1234", address: "123 N 1st Ave" });
contacts.has("Jessie"); // true
contacts.get("Hilary"); // undefined
contacts.set("Hilary", { phone: "617-555-4321", address: "321 S 2nd St" });
contacts.get("Jessie"); // {phone: "213-555-1234", address: "123 N 1st Ave"}
contacts.delete("Raymond"); // false
contacts.delete("Jessie"); // true
console.log(contacts.size); // 1
```

<br> 

## Explain and demonstrate, how to implement event-based code, how to emit events and how to listen for such events

Events can be emitted but requires something to listen for them.  
A "Make-believe" DDOS detector was written [during week 2](https://github.com/micklarsen/4sem_fullstack_js_ts/tree/main/Period%201/Week_2) an can be found below:

_Core functionality_

```javascript
const EventEmitter = require("events");

class DOS_Detector extends EventEmitter {
  constructor(timeValue) {
    // Threshold
    super();
    this.urls = new Map();
    this.TIME_BETWEEN_CALLS = timeValue;
  }
  addUrl = (url) => {
    const time = new Date().getTime();
    if (this.urls.has(url)) {
      const deltaTime = time - this.urls.get(url);
      if (deltaTime < this.TIME_BETWEEN_CALLS) {
        // First string is what the eventlistener is listening for - they have to match!
        this.emit("DOS Detected", { url: url, timeBetweenCalls: deltaTime });
      }
    }
    this.urls.set(url, time);
  };
}

// Export the class using nodes CommonJS module system (require/exports)
module.exports.DosDetector = DOS_Detector;
```

_Test module for core functionality - Simulate concurrent requests_

```javascript
const { DosDetector } = require("./dosDetector"); // Import the module
const ddosDetector = new DosDetector(2000); // Call the constructor on the new obj.

ddosDetector.on("DOS Detected", (arg) => {
  //This string is what the listener is listetning for!
  // Eventlistener with callback
  console.log("Plausible DDOS attack detected", arg);
});

ddosDetector.addUrl("url1");
ddosDetector.addUrl("url2");
ddosDetector.addUrl("url3");

//Simulate requests for same URL within short time period
setTimeout(() => {
  ddosDetector.addUrl("url1");
  ddosDetector.addUrl("url3");
}, 1000);

// Output
// Plausible DDOS attack detected { url: 'url1', timeBetweenCalls: 1003 }
// Plausible DDOS attack detected { url: 'url3', timeBetweenCalls: 1003 }
```

<br> 

## Callbacks, Promises and async/await
Why is it smart?

### how to avoid the callback hell (“Pyramid of Doom")
asd

### How to execute asynchronous (promise-based) code in ​serial​ or parallel
asd

### How to implement ​your own​ promise-solutions.
asd

### Example(s) that demonstrate error handling with promises
asd

### JavaScripts ​async/await​
how it relates to promises and reasons to use it compared to the plain promise API.  
Provide examples to demonstrate

#### Why this often is the preferred way of handling promises
asd

#### Error handling with async/await
asd

#### Serial or parallel execution with async/await.
asd

<br>

## Provide an example of ES6 inheritance and reflect over the differences between Inheritance in Java and in ES6.
Inheritance in ES6 is getting quite close to Java (True OOP) and allows for extending and super().  
Simple class with inheritance example:

```javascript
class Vehicle {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }

  getName() {
    return this.name;
  }

  getType() {
    return this.type;
  }
}
class Car extends Vehicle {
  constructor(name) {
    super(name, "car");
  }

  getName() {
    return "It is a car: " + super.getName();
  }
}
let car = new Car("Tesla");
console.log(car.getName()); // It is a car: Tesla
console.log(car.getType()); // car
```

<br> 

## ES6,7,8,ES-next and TypeScript

### Provide examples with es-next, running in a browser, using Babel and Webpack
asd

### Explain the two strategies for improving JavaScript: Babel and ES6 + ES-Next, versus Typescript.
asd

### What does it require to use these technologies: In our backend with Node and in (many different) Browsers
asd

### Provide​ examples​ to demonstrate the benefits of using TypeScript, including, types, interfaces, classes and generics
asd

### Explain how we can get typescript code completion for external imports.
asd

### Explain the ECMAScript Proposal Process for how new features are added to the language (the TC39 Process)
asd


