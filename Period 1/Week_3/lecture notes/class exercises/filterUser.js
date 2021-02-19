const { filterDirMyPromise, filterDir } = require('./filterdir')


async function tester() {
    try {
        const files = await filterDirMyPromise("Folder1", ".js")
        console.log(files)
    } catch (err) {
        console.log(err)
    }
}
//tester()

async function testerSequential() {
    try {
        const p1 = await filterDirMyPromise("Folder1", ".js");
        const p2 = await filterDirMyPromise("Folder2", ".js");
        const p3 = await filterDirMyPromise("Folder3", ".js");
        const p4 = await filterDirMyPromise("Folder4", ".js");
        const p5 = await filterDirMyPromise("Folder5", ".js");
        console.log("Sequential: " + [p1, p2, p3, p4, p5]);
    } catch (err) {
        console.error(err);
    }
}

async function testerParallel() {
    try {
        const p1 = filterDirMyPromise("Folder1", ".js");
        const p2 = filterDirMyPromise("Folder2", ".js");
        const p3 = filterDirMyPromise("Folder3", ".js");
        const p4 = filterDirMyPromise("Folder4", ".js");
        const p5 = filterDirMyPromise("Folder5", ".js");
        const allResults = await Promise.all([p1, p2, p3, p4, p5]);
        console.log("Parallel: " + allResults);
    } catch (err) {
        console.error(err);
    }
}

// async function outputParallel() {
//     try {
//         const data = await testerParallel();
//         console.log(data);
//     } catch (e) {
//         console.log("Error: " + e);
//     } finally {
//         console.log("Done");
//     }
// }
// //outputParallel();

testerSequential();
testerParallel();


// async function getDataParallel() {
//     const p1 = myPromise("Number 1", 2000);
//     const p2 = myPromise("Number 2", 1000);
//     const p3 = myPromise("Number 3", 700);
//     const p4 = myPromise("Number 4", 500);
//     const allResults = await Promise.all([p1, p2, p3, p4]);
//     return allResults.join(", ");
// }

// async function outputParallel() {
//     try {
//         const data = await getDataParallel();
//         console.log(data);
//     } catch (e) {
//         console.log("Error: " + e);
//     } finally {
//         console.log("Done");
//     }
// }