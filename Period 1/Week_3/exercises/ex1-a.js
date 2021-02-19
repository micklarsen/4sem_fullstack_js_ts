const crypto = require('crypto');
let size = 48;

const randomStrings = {
    "title": "6 Secure Randoms",
    "randoms": []
}

//Every callback should have an if!
crypto.randomBytes(size, (err, buffer) => {
    if (err) return console.log(err)
    randomStrings.randoms.push({ length: size, random: buffer.toString("hex") })
    size -= 8;
    crypto.randomBytes(size, (err, buffer) => {
        randomStrings.randoms.push({ length: size, random: buffer.toString("hex") })
        size -= 8;
        crypto.randomBytes(size, (err, buffer) => {
            randomStrings.randoms.push({ length: size, random: buffer.toString("hex") })
            size -= 8;
            crypto.randomBytes(size, (err, buffer) => {
                randomStrings.randoms.push({ length: size, random: buffer.toString("hex") })
                size -= 8;
                crypto.randomBytes(size, (err, buffer) => {
                    randomStrings.randoms.push({ length: size, random: buffer.toString("hex") })
                    size -= 8;
                    crypto.randomBytes(size, (err, buffer) => {
                        randomStrings.randoms.push({ length: size, random: buffer.toString("hex") })
                        console.log(randomStrings)
                    });
                });
            });
        });
    });
});
