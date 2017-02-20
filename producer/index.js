/**
 * 消费者：爬取内容页面
 */

const collector = require('../collector.js')
const request = require('request-promise')

module.exports = (seedList) => {
  seedList = seedList || []
  let promises = []
  seedList.forEach(uri => {
    promises.push(collector({
      uri: uri,
      selector: {
        'title': '.title-article',
        'list[]': '#article-list .post-title a@href'
      }
    }).then(data => {
      console.info('Success Push Task: %s', data.list || '')
      return pushTask({
        list: data.list
      })
    }))
  })
  return Promise.all(promises)
}

const pushTask = (body) => {
  return request({
    uri: 'http://localhost:3000/queen/product',
    method: 'POST',
    body: body,
    json: true
  })
}
