const morgan = require('morgan');
const 초기화정보 = require('./models/my_index2');
const express = require('express');
const app = express();

const 고객테이블 = 초기화정보.새_스키마;

app.set('port', process.env.PORT || 8080);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get(
    '/',
    async (req, res, text) => {
        try {
            let 커서 = await 고객테이블.findAll();
            res.send(커서);
        }
        catch (err) {
            console.error(err);
        }
    }
);

app.get(
    '/sign_in',
    (req, res) => {
        res.sendFile(__dirname + '/my_cust.html');
    }
);

app.post(
    '/sign_in',
    async (req, res) => {
        let body = req.body;

        try {
            await 고객테이블.create({
                custid: body.user_id,
                age: body.age
            });
            console.log('customer created');
            res.redirect('/sign_in');
        }
        catch (err) {
            console.log(err);
        }
    }
);

app.listen(app.get('port'), () => {console.log('SERVER IS RUNNING ON PORT ', app.get('port'))})