const morgan = require('morgan');
const request = require('request');
const express = require('express');
const axios = require('axios');
const app = express();

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get(
    '/airkorea', 
    async (req, res) => {
        const service_key = 'pDJ%2FJjMvahnPSBn%2B9vywu27j70ssfxj%2FU8dMdCgfseVwWEO3Ye3pAjzql9hFDk15NRNn2QOH3IUsCDtX0Mpnqw%3D%3D';
        const air_url = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?';

        let params = encodeURI('serviceKey') + '=' + service_key;
        params += '&' + encodeURI('numOfRows') + '=' + encodeURI('1');
        params += '&' + encodeURI('pageNo') + '=' + encodeURI('1');
        params += '&' + encodeURI('dataTerm') + '=' + encodeURI('DAILY');
        params += '&' + encodeURI('ver') + '=' + encodeURI('1.3');
        params += '&' + encodeURI('stationName') + '=' + encodeURI('마포구');
        params += '&' + encodeURI('returnType') + '=' + encodeURI('json');
        
        const url = air_url + params;

        try {
            const result = await axios.get(url);
            const items = {
                'location': 'MAPO', // 응답 결과에 지역 정보는 빠져있다
                'time': result.data.response.body.items[0]['dataTime'],
                'pm10': result.data.response.body.items[0]['pm10Value'],
                'pm25': result.data.response.body.items[0]['pm25Value']
            };
            res.send(
                `
                    LOCATION: ${items.location}<br>
                    TIME: ${items.time}<br>
                    PM10: ${items.pm10}<br>
                    PM2.5: ${items.pm25}
                `
            );
        } catch (error) {
            console.log(error);
        }
    }
);
  
app.listen(
    app.get('port'),
    () => {console.log('SERVER IS RUNNING ON ', app.get('port'));}
);