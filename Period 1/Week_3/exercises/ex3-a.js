const fetch = require("node-fetch");
const URL = "https://swapi.dev/api/people/";
var now = require("performance-now");

// Use fetch and async/await to complete fetchPerson(..)below. 
// When implemented, each line in printNames() must be executed “sequentially”. 
// Verify this with the debugger.

async function fetchPerson(url) {
    try {
        const data = await fetch(url).then(s1 => s1.json());
        return data;
    }
    catch (err) {
        console.log("Error: " + err);
    }
}

async function printNames() {
    let start = now();
    console.log("SEQ: Before");
    const person1 = await fetchPerson(URL + '1');
    const person2 = await fetchPerson(URL + '2');
    console.log("SEQ: " + person1.name);
    console.log("SEQ: " + person2.name)
    console.log("SEQ: After all");
    let end = now();
    console.log("SEQ: Run Time [ms]: " + (end - start).toFixed(2));
}

async function printNamesParallel() {
    let nameArr = [];
    let start = now();
    console.log("PAR: Before");
    const person1 = fetchPerson(URL + '1');
    const person2 = fetchPerson(URL + '2');
    nameArr.push(person1);
    nameArr.push(person2);
    const allResults = await Promise.all(nameArr);

    console.log("PAR: After all");
    let end = now();
    console.log("PAR: Run Time [ms]: " + (end - start).toFixed(2));
    return allResults.map(elem => elem.name);
}

async function outputParallel() {
    try {
        const data = await printNamesParallel();
        console.log("PAR: " + data);
    } catch (e) {
        console.log("Error: " + e);
    }
}

printNames();
outputParallel();