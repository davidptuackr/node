const http = require('http');
const session = {};
const sessKey = new Date();

http.createServer(
    (req, res) => {
        res.writeHead(200, {'Set-cookie': 'session=${sessKey}'});
        res.end('Session-Cookie --> Header');
    }
).listen(8080, () => {console.log('8080')});