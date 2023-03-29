const express = require('express');
const app = express();

app.get(
    '/', 
    function (req, res, next) {
        res.send('hello world!');
        next();
    }
);

const logger = function (req, res, next) {
    console.log('LOGGED');
    next();
};

app.use(logger);

app.listen(8080);