console.log('IN a.js');

const b = require('./exec_03_b');

module.exports = {
    call_in_a: () => {console.log('CALL IN a.js', b);}
}