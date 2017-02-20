### 概念须知

参考文章：http://blog.csdn.net/kaiwii/article/details/6758942

### 生产者/消费者 爬虫

+ 启动缓存队列

```bash
> cd cache
> npm install
> npm run koa
```

+ 启动生产者进程

```bash
> npm install
> node ./producer/cluster.js [进程数量]
```

+ 启动消费者进程

```bash
> npm install
> node ./customer/cluster.js [进程数量]
```
