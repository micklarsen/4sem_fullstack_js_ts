// d) Create a new file and test the module, like so:
// First, using plain promises
// after that, using async/await

const makeRandom = require("./ex1-b-c");

//Plain promise
makeRandom(32)
    .then(res => {
        console.log(res);
    })

//Async Await
const getThatShit = async () => {
    try {
        console.log(await makeRandom(8));
    } catch (err) {
        console.error("Error: " + err);
    }
}
getThatShit();