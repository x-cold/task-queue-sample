var Redis = require('ioredis');
var redis = new Redis();
const uuid = require('node-uuid');
const QUEUE_NAME = 'QUEUE_LIST' + uuid.v4();

global.productCount = 0;
global.consumeCount = 0;
global.productFinished = false;
global.productStart = 0;
global.consumeFinished = false;

const max = 100;

exports.product = async (list) => {
    list = list || [];

    if (global.productFinished) {
        return Promise.resolve(false);
    }
    if (global.productCount < 1) {
        global.productStart = Date.now();
    }
    
    let promises = [];
    list.forEach(item => {
        promises.push(redis.pipeline().lpush(QUEUE_NAME, item).exec());
    });

    return Promise.all(promises).then(vals => {
        global.productCount += list.length;
        if (global.productCount >= max) {
            console.info('product finished: %s ms', (Date.now() - global.productStart));
            global.productFinished = true;
        }
    })
};

exports.consume = async function() {
    if (!global.productStart) {
        return Promise.resolve(false);
    }
    if (global.consumeFinished) {
        return Promise.resolve(false);
    }
    let promise = redis.pipeline().rpop(QUEUE_NAME).exec();
    return promise.then(result => {
        global.consumeCount++;
        if (global.consumeCount >= max) {
            console.info('consume finished: %s ms', (Date.now() - global.productStart));
            global.consumeFinished = true;
        }
        return Promise.resolve(result[0][1]);
    });
};
