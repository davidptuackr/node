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
            const air_item = {
                //'location': result.data.ArpltnInforInqireSvcVo['stationName'],
                location: 'MAPO',
                'time': result.data.response.body.items[0]['dataTime'],
                'pm10': result.data.response.body.items[0]['pm10Value'],
                'pm25': result.data.response.body.items[0]['pm25Value']
            };
            const bad_air = [];
            if (air_item.pm10 <= 30) {
                bad_air.push('GOOD :)');
            } else if (air_item.pm10 > 30 && air_item.pm10 <= 80) {
                bad_air.push('NORMAL :/');
            } else {
                bad_air.push('BAD :(');
            }

            if (air_item.pm25 <= 15) {
                bad_air.push('GOOD :)');
            } else if (air_item.pm25 > 15 && air_item.pm10 <= 35) {
                bad_air.push('NORMAL :/');
            } else {
                bad_air.push('BAD :(');
            }

            res.send(
                `OBSERVED: ${air_item.location} /  TIME: ${air_item.time} <br> PM10 ${bad_air[0]} PM2.5 ${bad_air[1]}`
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