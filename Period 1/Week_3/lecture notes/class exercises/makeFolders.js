const fs = require("fs")

for (let i = 1; i < 6; i++) {
    fs.mkdirSync(`Folder${i}`)
    fs.writeFileSync(`Folder${i}/file${i}.js`, "console.log('HI')")
}