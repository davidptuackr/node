const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.set('port', process.env.PORT || 8080);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(cookieParser('secret@1234'));
app.use(session({
    secret: 'secret@1234',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true
    },
    name: 'connect.sid'
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get(
    '/',
    (req, res) => {
        if (req.session.name) {
            const output = `
                <p>HELLO ${req.session.name}</p><br>
            `;
            res.send(output);
        } else {
            const output = 'LOG IN FIRST';
            res.send(output);
        }
    }
);

app.get(
    '/login',
    (req, res) => {
        console.log(req.session);
        req.session.name = 'ROADBOOK';
        res.end('LOGIN SUCCESS');
    }
);

app.get(
    '/logout', 
    (req, res) => {
        res.clearCookie('connect.sid');
        res.end('LOGOUT OK');
    }
);

app.listen(app.get('port'), () => {console.log('NOW RUNNING ON PORT ', app.get('port'));});