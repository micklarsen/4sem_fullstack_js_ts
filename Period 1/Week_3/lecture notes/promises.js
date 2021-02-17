const fetch = require("node-fetch");

// fetch("http://api.icndb.com/jokes/random")
//     .then((res) => res.json())
//     .then(data => console.log(data))
//     .catch(err => console.log("Error: ", err))
//     .finally(() => console.log("Finally done"))


// Home made promise

var myPromise = (txt, delay) => new Promise(function (resolve, reject) {
    setTimeout(function () {
        // Simuler fejl
        // const err = true;
        // if(err){
        //     return reject(new Error("Feeeejl"))
        // }
        resolve('Hello' + txt);
    }, delay);
})

const results = [];

myPromise("Nummer 1", 2000)
    .then(msg => {
        results.push(msg);
        // throw new Error("Feeejl") //Simuler fejl med throw
        return myPromise("Nummer 2", 1000)
    })
    .then(msg => {
        results.push(msg)
        return myPromise("Nummer 3", 500)
    })
    .then(r => results.push(r))
    .catch(e => { console.log("In catch " + e) })
    .finally(() => console.log(results.join(", ")))