# Learning goals: Period 2

Updated continuously

**Study group**

- [Alexander Pihl](https://github.com/AlexanderPihl)
- [Jean-Poul Leth-Møller](https://github.com/Jean-Poul)
- [Mick Larsen (Me)](https://github.com/micklarsen/)
- [Morten Rasmussen](https://github.com/Amazingh0rse)
- [Per Kringelbach](https://github.com/cph-pk)

# Exercises:

The startcode was introduced during week 1 and was worked on continously during this flow.  

This is why week 2 is missing. 

For exercises, please check the folders above or use the list here:

- [Week 1]()
- [Week 3 (MongoDB)](https://github.com/micklarsen/4sem_fullstack_js_ts/tree/main/Period%202/Week_3/Exercises/mongotypescript1)
- Fullstack startcode [link](https://github.com/micklarsen/FullstackTS_Startcode) 

## Node & Express

### Pros & Cons in using Node.js + Express to implement a Backend compared to using Java/JAX-RS/Tomcat

_Pro's_

- If you know JavaScript you're already set
- The complete stack can be writen in JavaScript
- It's very easy to get started running `npm install` saving a ton of time compared to Java/Jax-RS/Tomcat
- High performance
- Large community and help available

_Cons_

- Libraries are frequently updated and might break functionality when updated due to changes in behaviour/syntax

<br>

### Difference between Debug outputs and ApplicationLogging. What’s wrong with console.log(..) statements in our backend code? 
It's not feasible to use `console.log()` in a production environment since developers won't be able to see these console.log's.  
Instead, application logging, using i.e. "Winston" would be a better alternative, as it is set up to write to logfiles available to the developer.  
While developing it would be better to use debugging tools to inspect and troubleshoot the code instead of using `console.log()`.

<br>

### A system using application logging and environment controlled debug statements.
Application logging can be achieved by writing your own logger or by using a library such as "Winston".  
Logging can be enabled by configuring the logger with a .env file so that logging only will be active when the software is in a production environment.  
One way of of implementing a logger could be like this:

```javascript
import dotenv from "dotenv";
dotenv.config();

import logger, { stream } from "./middleware/winstonLogger";
const morganFormat = process.env.NODE_ENV == "production" ? "combined" : "dev";
app.use(require("morgan")(morganFormat, { stream }));
app.set("logger", logger);
```

In the .env file we can choose which files that should use debug statements like this: `DEBUG=www,app, makeTestFriend, FriendRoutesAuth`

An example of outputting a debug statement:

```javascript
const debug = require("debug")("FriendRoutesAuth");

let facade: FriendFacade;

router.use(express.json());

// Initialize facade using the database set on the application object
router.use(async (req, res, next) => {
  if (!facade) {
    const db = req.app.get("db");
    req.app
      .get("logger")
      .log("info", `Database used: ${req.app.get("db-type")}`);
    debug("Database used: " + req.app.get("db-type"));
    facade = new FriendFacade(db);
  }
  next();
});
```

<br>

### Concepts related to testing a REST-API using Node/JavaScript/Typescript
To test a REST-API the following packages could be considered:

- **Mocha** as a test framework for running tests
- **Chai** as a library for assertions
- **Supertest** to test HTTP assertions and requests. Supertest will even start a test server for you!
- **Nock** for HTTP Server mocking to catch outgoing requests and return a defined mock response.

<br>

### Setup for Express/Node/Test/Mongo-DB/GraphQL development with Typescript and how to handles "secret values", debug, debug-outputs, application logging and testing.
We are using NodeJS & Express as the core-backend.  
Tests will be implemented to cover the backend including the REST-API (Using tools like Nock to mock HTTP responses).

The backend interfaces with MongoDB while Backend tests using a database will use an "In memory" database to prevent long loading times etc.

Typescript is utilized in order to be able to work with types and code completion and have an easy way to secure compatibility for ES6.

Secret values such as Database details is included in an .env file which is gitignored. The .env is also used to define what parts of the code to debug/log and if the code is in production or a dev/testing environment.

<br>

### The Express concept middleware.
Middleware in express takes incoming requests, _does something to them_ and passes them on to the next middleware in the chain before returning the request.

```javascript
app.use(function (req, res, next) {
  req.foo = "bar";
  next();
});
```

In this example "bar" is added to `req.foo` and `next()` is called and the request is sent on.

<br>

### How middleware can be used to handle problems like logging, authentication, cors and more.
Middleware can be used like in the example above.  
Instead of "Foo" the function could handle logging, authentication, cors and much more.  
In this example, we use a logger to log when the facade is initialized and

```javascript
// Initialize facade using the database set on the application object
router.use(async (req, res, next) => {
  if (!facade) {
    const db = req.app.get("db");
    req.app
      .get("logger")
      .log("info", `Database used: ${req.app.get("db-type")}`);
    facade = new FriendFacade(db);
  }
  next();
});
```

<br>

### Strategy for implementing a REST-API with typescript using Node/Express + API testing
To create a REST-API with node we can either choose to provide information we host ourselves or act as a "Proxy" by fetching information elsewhere (Or both).

In the [startcode](https://github.com/micklarsen/FullstackTS_Startcode) we configure the global app object to use a route for friends and handle errors like so:

```javascript
app.use("/api/friends", friendsRoutesAuth);

app.use("/api", (req: any, res: any, next) => {
  res.status(404).json({ errorCode: 404, msg: "not found" });
});

//Errors for friend API handled - other errors are passed on
app.use((err: any, req: Request, res: Response, next: Function) => {
  if (err instanceof ApiError) {
    res
      .status(err.errorCode)
      .json({ errorCode: err.errorCode, msg: err.message });
  } else {
    next(err);
  }
});
```

The route file takes requests and serves responses by using a facade capable of all CRUD operations. It is in the facade we call either MongoDB or could choose to call external web REST-API's.

To test an API we use a combination of mocha, chai, supertest and an in-memory MongoDB.  
An example is provided below with comments:

```javascript

import { expect } from "chai"
import app from "../src/app"

import supertest from "supertest"
const request = supertest(app) //Let supertest act as the request object

import bcryptjs from "bcryptjs"
import * as mongo from "mongodb"
import { InMemoryDbConnector } from "../src/config/dbConnector"
import { ApiError } from "../src/errors/apiError";

let friendCollection: mongo.Collection; //Our in-memory friend collection


describe("### Describe the Friend Endpoints (/api/friends) ###", function () {

    let URL: string; //Good old typescript

    //Run this before everything - setup the database connection
    before(async function () {
        const connection = await InMemoryDbConnector.connect();
        const db = connection.db();
        app.set("db", db)
        app.set("db-type", "TEST-DB")
        friendCollection = db.collection("friends")
    })

    //Run this before each test - make some entries for the database
    beforeEach(async function () {
        const hashedPW = await bcryptjs.hash("secret", 8)
        await friendCollection.deleteMany({})
        await friendCollection.insertMany([
            { firstName: "Peter", lastName: "Pan", email: "pp@b.dk", password: hashedPW, role: "user" },
            { firstName: "Donald", lastName: "Duck", email: "dd@b.dk", password: hashedPW, role: "user" },
            { firstName: "Ad", lastName: "Admin", email: "aa@a.dk", password: hashedPW, role: "admin" },
        ])
    })


    describe("While attempting to get all users", function () {
        it("It should get three users when authenticated", async () => {
            const response = await request
                .get('/api/friends/all') //The get request
                .auth("pp@b.dk", "secret") //Necessary authentication for the get request
            expect(response.status).to.equal(200) //Assertion with chai
            expect(response.body.length).to.equal(3) //Assertion with chai
        })

        it("It should get a 401 when NOT authenticated", async () => {
            const response = await request.get('/api/friends/all')
            expect(response.status).to.be.equal(401);
        })
    })
```

<br>

### How to test JavaScript/Typescript Backend Code? How to test asynchronous code?
Testing is easily done - this code example should speak for itself.  
To test asynchronous code we can do the following:

```javascript
import * as mongo from "mongodb"
import FriendFacade from '../src/facades/friendFacade';
import chai from "chai";

const expect = chai.expect;

//use these two lines for more streamlined tests of promise operations
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

import bcryptjs, { hash } from "bcryptjs"
import { InMemoryDbConnector } from "../src/config/dbConnector"
import { ApiError } from "../src/errors/apiError";

let friendCollection: mongo.Collection;
let facade: FriendFacade;


describe("## VERIFY FRIENDS FACADE ##", () => {

    //Runs once before all tests and initializes a DB connection
    before(async function () {
        const client = await InMemoryDbConnector.connect();
        const db = client.db();
        friendCollection = db.collection("friends");
        facade = new FriendFacade(db);
    })


    //Runs before each test and makes testusers for us
    beforeEach(async () => {
        const hashedPW = await bcryptjs.hash("secret", 4)
        await friendCollection.deleteMany({})
        await friendCollection.insertMany([
            { firstName: "Donald", lastName: "Trump", email: "dt@example.com", password: hashedPW, role: "user" },
            { firstName: "Frodo", lastName: "Baggins", email: "fb@michaeldelving.sh", password: hashedPW, role: "user" }
        ])
    })


    //The test itself - every test need a "Describe" when working with BDD - Behaviour driven development
    describe("Verify the addFriend method", () => {
        it("It should Add the user Jan", async () => { //The case to fulfill
            const newFriend = { firstName: "Jan", lastName: "Olsen", email: "jan@b.dk", password: "secret" }
            const status = await facade.addFriend(newFriend);
            expect(status).to.be.not.null //Assertion like syntax
            const jan = await friendCollection.findOne({ email: "jan@b.dk" })
            expect(jan.firstName).to.be.equal("Jan") //Assertion like syntax
        })

        //Test 2
        it("It should not add a user with a role (validation fails)", async () => {
            const newFriend = { firstName: "Jan", lastName: "Olsen", email: "jan@b.dk", password: "secret", role: "admin" }
            await expect(facade.addFriend(newFriend)).to.be.rejectedWith(ApiError)
        })
    })
```

<br>

## NoSQL and MongoDB

### What is meant by a NoSQL database.
A NoSQL Database is an umbrella term for database systems that doesn't fit the old conventional model for relational databases with tables, schemas etc.  
In a classic database we define each column for datatypes, length etc. This is not necessary in a NoSQL DB such as MongoDB.

<br>

### Pros & Cons in using a NoSQL database like MongoDB as your data store, compared to a traditional Relational SQL Database like MySQL.

_PRO'S_

- Performance is often faster since all the information is within the same database. There's no database normalization.
- Scalability is **very** easy
- Flexibility is easy since the data structure isn't restricted by defined types.

_CON'S_

- You are required to implement data dicipline in your application since the database doesn't care.
- NoSQL databases haven't been around for >30 years which means less documentation and fresh issues

<br>

### Indexes in MongoDB: How to create them, and how to have use them.
Indexes are like milestones meaning that they provide an overview of data in a database.  
In a database with people details an index could be set on ages 10, 20, 30 etc.  
This means, when querying for age, MongoDB would be able to look at indexes first to know where to look instead of checking every record in the database.

You can create indexes to help MongoDB (But MongoDB will create its own indexes as well!)

<br>

### A full JavaScript backend including relevant test cases to test the REST-API (not on the production database)
In the [fullstack startcode!](https://github.com/micklarsen/4sem_fullstack_js_ts)

<br>

### Using a REST-API to perform all CRUD operations on a MongoDB
These operations are demonstrated in the fullstack startcode.  
All requests to the "Friend" API goes through the route first, then the facade.

- Link to [Routes code](https://github.com/micklarsen/FullstackTS_Startcode/blob/main/src/routes/FriendRoutesAuth.ts)
- Link to [Facade code](https://github.com/micklarsen/FullstackTS_Startcode/blob/main/src/facades/friendFacade.ts)

<br>

### MongoDB's "special" indexes TTL, 2dsphere and the Unique Index.
TBD

<br>

### Decisions regarding normalization vs denormalization
TBD

<br>

### Explain, preferably using an example, how you have deployed your node/Express applications, and which of the Express Production best practices you have followed.
TBD

<br>

### Possible steps to deploy many node/Express servers on the same droplet, how to deploy the code and how to ensure servers will continue to operate, even after a droplet restart.
TBD

<br>

### Chosen strategy to deploy a Node/Express application including how to solve the following deployment problems:
**Ensure that you Node-process restarts after a (potential) exception that closed the application**  
TBD

**Ensure that you Node-process restarts after a server (Ubuntu) restart**  
TBD

**Ensure that you can run “many” node-applications on a single droplet on the same port (80)**  
TBD

<br>