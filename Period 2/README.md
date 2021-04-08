# Learning goals: Period 2
Updated continuously

**Gruppe Medlemmer**


- [Alexander Pihl](https://github.com/AlexanderPihl)
- [Jean-Poul Leth-Møller](https://github.com/Jean-Poul)
- [Mick Larsen](https://github.com/micklarsen/)
- [Morten Rasmussen](https://github.com/Amazingh0rse)
- [Per Kringelbach](https://github.com/cph-pk)


# Exercises:

Fullstack startcode [link](https://github.com/micklarsen/FullstackTS_Startcode)  
  
For exercises, please check the folders above or use the list here:

- [Week 1]()


## Node & Express


**Explain Pros & Cons in using Node.js + Express to implement your Backend compared to a strategy using, for example, Java/JAX-RS/Tomcat**  
*Pro's*
- If you know JavaScript you're already set
- The complete stack can be writen in JavaScript 
- It's very easy to get started running `npm install` 
- High performance
- Large community and help available

*Cons*
- Libraries are frequently updated and might break functionality when updated due to changes in behaviour/syntax


<br>

**Explain the difference between Debug outputs and ApplicationLogging. What’s wrong with console.log(..) statements in our backend code?**  
It's not feasible to use `console.log()` in a production environment since developers won't be able to see these console.log's.  
Instead, application logging, using i.e. "Winston" would be a better alternative, as it is set up to write to logfiles available to the developer.  
While developing it would be better to use debugging tools to inspect and troubleshoot the code instead of using `console.log()`.

<br>

**Demonstrate a system using application logging and environment controlled debug statements.**  
asd

<br>

**Explain, using relevant examples, concepts related to testing a REST-API using Node/JavaScript/Typescript + relevant packages**  
To test a REST-API the following packages could be considered:
- **Mocha** as a test framework for running tests
- **Chai** as a library for assertions 
- **Supertest** to test HTTP assertions and requests. Supertest will even start a test server for you!
- **Nock** for HTTP Server mocking to catch outgoing requests and return a defined mock response.

<br>

**Explain a setup for Express/Node/Test/Mongo-DB/GraphQL development with Typescript, and how it handles "secret values",  debug, debug-outputs, application logging and testing.**  
asd

<br>

**Explain, preferably using an example, how you have deployed your node/Express applications, and which of the Express Production best practices you have followed.**  
asd

<br>

**Explain possible steps to deploy many node/Express servers on the same droplet, how to deploy the code and how to ensure servers will continue to operate, even after a droplet restart.**  
asd

<br>

**Explain, your chosen strategy to deploy a Node/Express application including how to solve the following deployment problems:**
asd

<br>

*Ensure that you Node-process restarts after a (potential) exception that closed the application*  
asd

*Ensure that you Node-process restarts after a server (Ubuntu) restart*  
asd

*Ensure that you can run “many” node-applications on a single droplet on the same port (80)*  
asd

<br>

**Explain, using relevant examples, the Express concept; middleware.**  
Middleware in express takes incoming requests, *does something to them* and passes them on to the next middleware in the chain before returning the request. 

```javascript
app.use(function (req, res, next) {
  req.foo = "bar";
  next();
});
```
In this example "bar" is added to `req.foo` and `next()` is called and the request is sent on.

<br>

**Explain, conceptually and preferably also with some code, how middleware can be used to handle problems like logging, authentication, cors and more.**  
Middleware can be used like in the example above.  
Instead of "Foo" the function could handle logging, authentication, cors and much more.  
In this example, we use a logger to log when the facade is initialized  and
```javascript
// Initialize facade using the database set on the application object
router.use(async (req, res, next) => {
    if (!facade) {
        const db = req.app.get("db")
        req.app.get("logger").log("info", `Database used: ${req.app.get("db-type")}`);
        facade = new FriendFacade(db)
    }
    next()
})
```

<br>

**Explain, using relevant examples, your strategy for implementing a REST-API with Node/Express + TypeScript and demonstrate how you have tested the API.**  
asd

<br>

**Explain, using relevant examples, how to test JavaScript/Typescript Backend Code, relevant packages (Mocha, Chai etc.) and how to test asynchronous code.**  
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
**Explain, generally, what is meant by a NoSQL database.**    
asd

<br>

**Explain Pros & Cons in using a NoSQL database like MongoDB as your data store, compared to a traditional Relational SQL Database like MySQL.**    
asd

<br>

**Explain about indexes in MongoDB, how to create them, and demonstrate how you have used them.**    
asd

<br>

**Explain, using your own code examples, how you have used some of MongoDB's "special" indexes like TTL and 2dsphere and perhaps also the Unique Index.**    
asd

<br>

**Demonstrate, using a REST-API designed by you, how to perform all CRUD operations on a MongoDB**  
asd

<br>

**Explain, using a relevant example, a full JavaScript backend including relevant test cases to test the REST-API (not on the production database)**  
asd

<br>

**Demonstrate, using your own code-samples, decisions you have made regarding → normalization vs denormalization**  
asd

<br>

