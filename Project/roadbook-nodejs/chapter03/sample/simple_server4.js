const http = require('http');

http.createServer(
    (req, res) => {
        if (req.url === '/') {
            res.write('HELLO');
            res.end();
        }
    }
).listen(
    8080,
    () => {console.log('8080 포트에서 서버 연결 중 ...')}
);