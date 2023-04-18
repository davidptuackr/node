const morgan = require('morgan');
const url = require('url');
const uuidAPIKey = require('uuid-apikey');
const cors = require('cors');
const express = require('express');

const app = express();
app.set('port', process.env.PORT || 8080);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const key = {
    apiKey: 'X6MGRR1-VVK4PMS-QEHBA7Z-V71KQNX',
    uuid: 'bd13aaa5-980e-480f-bc97-82babd2100a0'
}

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

app.get(
    '/board/:apikey/:type', 
    (req, res) => {
        let { type, apikey } = req.params;
        const query_data = url.parse(req.url, true).query;

        if (uuidAPIkey.isAPIKey(apikey) && uuidAPIkey.check(apikey, key.uuid)) {
            if (type === 'search') {
                const keyword = query_data.keyword;
                const result = board_list.filter( (e) => { return e.title.includes(keyword); });
                res.send(result);
            }
            else if (type === 'user') {
                const user_id = query_data.user_id;
                const result = board_list.filter( (e) => { return e.user_id === user_id; });
                res.send(result);
            }
            else {
                res.send('WRONG URL');
            }
        } else {
            res.send('WRONG AIP KEY');
        }
    }
);

app.listen(app.get('port'), () => {console.log('NOW RUNNING ON PORT ', app.get('port'))})