const express = require('express');
const app = express();

app.get(
    '/', 
    function (req, res) {
        res.send('hello world!');
    }
);

const logger = function (req, res) {
    console.log('LOGGED');
};

app.use(logger);

app.listen(8080);