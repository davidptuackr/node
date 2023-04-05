console.log('IN b.js');

const a = require('./exec_03_a');

module.exports = {
    call_in_b: () => {console.log('CALL IN b.js', a);}
}