/**
 * Node Schedule
 */
const schedule = require('node-schedule')
const runner = require('./index')

let rule = '*/1 * * * * *'

exports.start = function () {
  var jobs = schedule.scheduleJob(rule, () => {
    runner()
      .then(finished => {
        if (finished === true) {
          jobs.cancel()
        }
      })
      .catch(err => {
        console.log(err.message || '')
      })
  })
  return jobs
}
