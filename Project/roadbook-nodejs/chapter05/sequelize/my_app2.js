const 초기화정보 = require('./models/my_index2.js');

const driver = async () => {
    try {
        await 초기화정보.연결설정.sync(); // 실제 연결 생성
        console.log("INIT COMPLEATE");
    } catch (err) {
        console.error("INIT FAILED");
        console.error(err);
    }
}

driver();