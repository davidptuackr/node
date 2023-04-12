const morgan = require('morgan');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let board_list = [];
let num_of_board = 0;

app.get(
    '/',
    (req, res) => { res.send('THIS IS api.js'); }
);

app.get(
    '/board',
    (req, res) => {
        res.send(board_list);
    }
);

app.post(
    '/board',
    (req, res) => {
        const board = {
            "id": ++num_of_board,
            "user_id": req.body.user_id,
            "date": new Date(),
            "title": req.body.title,
            "content": req.body.content
        };
        board_list.push(board);
        
        res.redirect('/board');
    }
);

app.put(
    '/board/:id',
    (req, res) => {
        const find_item = board_list.find(
            (item) => { return item.id == +req.params.id }
        );

        const idx = board_list.indexOf(find_item);
        board_list.splice(idx, 1);

        const board = {
            "id": +req.params.id,
            "user_id": req.params.user_id,
            "date": new Date(),
            "title": req.body.title,
            "content": req.body.content
        };

        board_list.push(board);

        res.redirect('/board');
    }
    
);

app.delete(
    '/board/:id',
    (req, res) => {
        const find_item = board_list.find(
            (item) => {
                return item.id == +req.params.id;
            }
        );
        const idx = board_list.indexOf(find_item);
        board_list.splice(idx, 1);

        res.redirect('/board');
    }
);

app.listen(app.get('port'), () => {console.log('NOW RUNNING ON PORT ', app.get('port'))})