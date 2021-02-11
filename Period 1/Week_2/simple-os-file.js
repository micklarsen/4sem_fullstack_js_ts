const os = require('os');

let clientInfo = {
    platform:os.platform(),
    freeMem : os.freemem(),
    totalMem : os.totalmem(),
    eol : os.EOL,
};

module.exports = clientInfo;