const crypto = require('crypto');

const randomStrings = {
    "title": "6 Secure Randoms",
    "randoms": [
        { "length": 48, "random": "A string with 48 random hex-characters" },
        { "length": 40, "random": "A string with 40 random hex-characters" },
        { "length": 32, "random": "A string with 32 random hex-characters" },
        { "length": 24, "random": "A string with 24 random hex-characters" },
        { "length": 16, "random": "A string with 16 random hex-characters" },
        { "length": 8, "random": "A string with 8 random hex-characters" }
    ]
}

const makeRandom = (size) => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(size, (err, buffer) => {
            const hexVal = buffer.toString("hex");
            if (err) {
                reject(err);
            }
            resolve(hexVal);
        });
    });
}

randomStrings.randoms.forEach(elem => {
    Promise.all([makeRandom(elem.length)])
        .then((message) => {
            elem.random = message[0];
            //console.log(elem)
        })
        .catch((err) => {
            console.error("Error: " + err);
        });
})

function outPutter() {
    console.log(randomStrings);
}
//setTimeout(outPutter, 500);

module.exports = makeRandom;

