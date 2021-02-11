const http = require('http');
const { DosDetector } = require('./dosDetector'); // Import the module
const ddosDetector = new DosDetector(2000); // Call the constructor on the new obj.
const osInfo = require('./simple-os-file');

const _portNo = 3000

ddosDetector.on('DOS Detected', (arg) => { // Eventlistener with callback
    console.log('Plausible DDOS attack detected', arg);
});

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        ddosDetector.addUrl('/')
        res.write('Hello you');
        res.end();
    }
    if (req.url === '/api/os-info') {
        ddosDetector.addUrl('/api/os-info')
        res.write(JSON.stringify(osInfo));
        res.end();
    }
});
server.listen(_portNo);
console.log('Listening on port ' + _portNo);