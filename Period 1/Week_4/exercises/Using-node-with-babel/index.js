import "core-js/proposals/promise-any";
import fetch from 'node-fetch';

// A simple promise that resolves after a given time
const timeOut = (t) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Completed in ${t}`)
        }, t)
    })
}
const getJokesParallel = async () => {
    const promisesPara = [];
    for (let i = 0; i < 3; i++) {
        const p = await fetch("http://api.icndb.com/jokes/random").then(r => r.json());
        promisesPara.push(p);
    }
    const all = await Promise.all(promisesPara);
    return all.map(j => j.value.joke);
}

async function testPar() {
    const jokes = await getJokesParallel();
    console.log(jokes);
}
testPar();

const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value));
