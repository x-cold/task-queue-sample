/**
 * 过滤器，丰富cheerio单行选择器支持的功能
 *
 * @param {Object} $ 根元素
 * @param {String} sel 选择器
 * @param {Object} key 返回的数据字段名
 *
 * @return {String} 返回特定的属性值
 *
 * 支持的特性:
 * 1、属性选择器：
 *    @attr => $(selector).attr(attr)
 *    @text => $(selector).text()
 *    @html => $(selector).html()
 *
 * 2、返回数组:
 *    list[]: '#test li a@href' => 返回list为存放href数组的变量
 *
 */

module.exports = ($, sel, key) => {
  // 结果是否为数组
  let listFlag = key.indexOf('[]') > -1
  // 结果是否为属性值或方法名
  let attrFlag = false

  // 取属性值或方法名: 最后一个@分隔符
  let attrRegx = /@(\w+)/
  let attr = sel.match(attrRegx) && sel.match(attrRegx).pop() || 'text'
  sel = sel.replace(/@\w+/, '')

  if (attr !== 'text' && attr !== 'html') {
    attrFlag = true
  }

  let el = $(sel)
  if (!el) {
    return listFlag ? [] : ''
  }

  // 数组
  if (listFlag) {
    let list = []
    let _el
    for (let i = 0; i < el.length; i++) {
      _el = $(el[i])
      list.push(attrFlag ? _el.attr(attr).trim() : _el[attr]().trim())
    }
    return list
  }

  // 单个字符串
  // 如果超过一个匹配的元素，则取第一个
  el.length > 1 && (el = $(el[0]))
  let res = attrFlag ? el.attr(attr) : el[attr]()
  return res && res.trim() || ''
}
