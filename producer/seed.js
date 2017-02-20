const baseUrl = 'http://www.linuxprobe.com/news'
const pageSize = 5

const init = count => {
  let seed = []
  let len = (pageSize / count + 1) | 0
  for (let j = 0; j < count; j++) {
    let _seed = []
    for (let i = j * len; i < (j + 1) * len; i++) {
      if (i >= pageSize) {
        break
      }
      _seed.push(baseUrl + '/page/' + i)
    }
    seed.push(_seed)
  }
  return seed
}

module.exports = init
