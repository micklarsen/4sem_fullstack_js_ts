const myPromise = (txt, delay) => new Promise(function (resolve, reject) {
    setTimeout(function () {
        const err = false;
        if (err) {
            return reject(new Error("Feeejl"))
        }
        resolve('Hello ' + txt);
    }, delay)
});

module.exports = myPromise;