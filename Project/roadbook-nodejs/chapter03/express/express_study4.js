const http = require('http');

const server = http.createServer(
    (req, res) => {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write('<h1>abc</h1>');
        res.end('<p>EOP</p>');
    }
).listen(8080);

server.on(
    'listening',
    () => { console.log('8080');}
);

server.on(
    'error',
    () => { console.error(error);}
);