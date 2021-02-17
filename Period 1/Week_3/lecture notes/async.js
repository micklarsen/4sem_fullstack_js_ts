const myPromise = require("./myPromise");

async function getDataSequential() {
    const r1 = await myPromise("Number 1", 2000);
    const r2 = await myPromise("Number 2", 1000);
    const r3 = await myPromise("Number 3", 700);
    const r4 = await myPromise("Number 4", 500);
    return `${r1}, ${r2}, ${r3}, ${r4}`
}

async function outputSequential() {
    try {
        const data = await getDataSequential(); //await is only available inside async functions
        console.log(data);
    } catch (e) {
        console.log("Error: " + e);
    } finally {
        console.log("Done");
    }
}

//Parallel is faster than sequential
async function getDataParallel() {
    const p1 = myPromise("Number 1", 2000);
    const p2 = myPromise("Number 2", 1000);
    const p3 = myPromise("Number 3", 700);
    const p4 = myPromise("Number 4", 500);
    const allResults = await Promise.all([p1, p2, p3, p4]);
    return allResults.join(", ");
}

async function outputParallel() {
    try {
        const data = await getDataParallel();
        console.log(data);
    } catch (e) {
        console.log("Error: " + e);
    } finally {
        console.log("Done");
    }
}

outputSequential();
console.log("\n");
outputParallel();