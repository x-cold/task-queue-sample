/**
 * 消费者：爬取内容页面
 */

const collector = require('../collector.js')
const request = require('request-promise')

module.exports = () => {
  return fetchTask()
    .then(data => {
      let uri = data.uri
      return collector({
        uri: uri,
        selector: {
          'title': '.title-article',
          'content': '.centent-article@html'
        }
      })
    })
    .then(data => {
      console.info('Success Fetch: %s', data.title || '')
    })
}

const fetchTask = () => {
  return request({
    uri: 'http://localhost:3000/queen/consume',
    method: 'POST',
    json: true
  })
}
