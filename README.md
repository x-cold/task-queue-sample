### 学习目的

+ 了解和使用生产者/消费者模式

+ 了解任务调度

+ 掌握基本的分布式架构及通讯

+ 掌握Node.js多进程工作机制

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
