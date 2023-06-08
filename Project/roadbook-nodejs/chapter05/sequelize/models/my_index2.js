const 모듈정보 = require('sequelize'); // 모듈 내 설정(~dtypes 정보) 사용 + Sequelize 클래스로 DB 연결 설정

const 사용설정 = process.env.NODE_ENV || 'development';
const 설정상세 = require(__dirname + '/../config/config.json')[사용설정];
const 초기화정보 = {};

let 연결설정;

if (설정상세.use_env_variable) {
    연결설정 = new 모듈정보.Sequelize(process.env[설정상세.use_env_variable], 설정상세);
} else {
    연결설정 = new 모듈정보.Sequelize(설정상세.database, 설정상세.username, 설정상세.password, 설정상세);
}

초기화정보.연결설정 = 연결설정;
초기화정보.모듈정보 = 모듈정보;

초기화정보.새_스키마 = require('./my_cust2')(연결설정, 모듈정보); 

module.exports = 초기화정보;