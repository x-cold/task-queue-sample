var router = require('koa-router')();
var redis = require('../addons/redis');

router.post('/consume', async function (ctx, next) {
  // let uri = 'http://www.linuxprobe.com/virtualbox5-support-linuxkernel49.html';
  let uri = await redis.consume();
  if (!uri) {
    ctx.body = {
      status: false
    };
    return;
  }
  ctx.body = {
    stauts: true,
    uri: uri
  };
});

router.post('/product', async function (ctx, next) {
  let list = ctx.request.body.list;
  let data = await redis.product(list);
  if (!data) {
    ctx.body = {
      status: false
    };
    return;
  }
  ctx.body = {
    status: true
  };
});

module.exports = router;
