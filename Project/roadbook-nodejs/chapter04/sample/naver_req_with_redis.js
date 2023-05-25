const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
const morgan = require('morgan');
const axios = require('axios');

/* express app generate */
const express = require('express');
const app = express();

/* redis connect */
const redis = require('redis');

/* 포트 설정 */
app.set('port', process.env.PORT);

/* 공통 미들웨어 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 라우팅 설정 */
app.get(
    '/airkorea',
    async (req, res) => {
        await (async () => {
        /******* 레디스 연결 *******/
            const client = redis.createClient(6379, '127.0.0.1');
            client.on('error', (err) => console.log('Redis Client Error', err));
            await client.connect();

            const cachedItems = await client.lRange('news_items', 0, -1);
        
            if (cachedItems.length) { // data in cache  
                res.send(` 데이터가 캐시에 있습니다. <br>`);
                

            } else { // data not in cache   
                const client_id = 'rrVkTS8i9mPPYTWo5Thj';
                const client_secret = 'UwXeSxi1dO';
                const api_url = 
                    'https://openapi.naver.com/v1/search/news?query=' 
                    + encodeURI('코스피');
        
                const option = {
        
                };

                const options = {
                    url: api_url,
                    qs: option,
                    headers: {
                        'X-Naver-Client-Id': client_id,
                        'X-Naver-Client-Secret': client_secret
                    }
                };
            
            
                try {
                    const result = await axios.get(api_url);
                    request.get(
                        options, 
                        (error, response, body) => {
                            if(!error && response.statusCode == 200) {
                                let newsItem = JSON.parse(body).items;
            
                                const newsJson = {
                                    title: [],
                                    link: [],
                                    description: [],
                                    pubDate: []
                                };
            
                                for (let i = 0; i < newsItem.length; i++) {
                                    newsJson.title.push(newsItem[i].title.replace('/(<([^>]+)>)|&quot;ig', ""));
                                    newsJson.link.push(newsItem[i].link);
                                    newsJson.description.push(newsItem[i].description.replace('/(<([^>]+)>)|&quot;ig', ""));
                                    newsJson.pubDate.push(newsItem[i].pubDate);
                                }
                                const airItems = [airItem.location, airItem.time, badAir[0], badAir[1]];
                                airItems.forEach((val) => {
                                    client.rPush('airItems', val); // redis에 저장
                                });
                                client.expire('airItems', 60 * 60);
                                res.send(`캐시된 데이터가 없습니다. 새로고침을 해주세요.`);
                            } else {
                                res.status(response.statusCode).end();
                                console.log('error = ' + response.statusCode);
                            }
                        }
                    );

                    
                } catch (error) {
                    console.log(error);
                }
            }
        })
    }
);

/* 서버와 포트 연결.. */
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..')
});
