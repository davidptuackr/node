const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1');

async function run(){
     await client.connect()
 }

run();

client.rPush('mykey', 'ALPHA');
client.rPush('mykey', 'BETA');
client.rPush('mykey', 'GAMMA');
