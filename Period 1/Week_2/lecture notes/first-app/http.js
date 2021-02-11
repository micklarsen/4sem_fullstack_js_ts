const http = require('http');

const _portNo = 3000

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello you');
        res.end();
    }

    if (req.url === '/api/courses'){
        res.write(JSON.stringify([1, 2, 3]))
        res.end();
    }
});

server.listen(_portNo);
console.log('Listening on port ' + _portNo);