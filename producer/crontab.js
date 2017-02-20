/**
 * Node Schedule
 */
const schedule = require('node-schedule')
const runner = require('./index')

let rule = '*/10 * * * * *'

exports.start = list => {
  // var jobs = schedule.scheduleJob(rule, () => {
    runner(list)
      .then(finished => {
        if (finished === true) {
          jobs.cancel()
        }
      })
      .catch(err => {
        console.log(err.message || '')
      })
  // })
  // return jobs
}
