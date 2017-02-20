/**
 * 集群
 */
const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length
const crontab = require('./crontab')

const args = process.argv.splice(2)
let count = args[0] | 0 || 1
if (count > numCPUs) {
  console.warn('WARNING: count of workers: %s is too large', count)
  count = numCPUs
}

const seedList = require('./seed')(count)

if (cluster.isMaster) {
  for (let i = 0; i < count; i++) {
    cluster.fork()
  }
  cluster.on('listening', (worker, address) => {
    console.log('listening: worker ' + worker.process.pid + ', Address: ' + address.address + ':' + address.port)
  })
  cluster.on('exit', (worker, code, signal) => {
    console.log('worker ' + worker.process.pid + ' died')
  })
} else {
  let id = cluster.worker.id
  let list = seedList[id - 1]
  crontab.start(list)
}
