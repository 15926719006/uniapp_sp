class EscapeCode {
  /**
 * XML内容转义
 * @param {any} val 内容
 */
  XMLSerialize(val) {
    if (val && val !== '') {
      val = val.toString()
      return val.replace(/\\/g, '\\\\')
        .replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&apos;')
        .replace(/&/g, '&amp;')
        .replace(/[\r\n]/g, '&lt;br/&gt;').replace(/\s+/g, ' ')
    } else {
      return ''
    }
  }

  /**
 * XML内容转移2(不含空格)
 * @param {any} val
 */
  XMLSerialize2(val) {
    if (val && val !== '') {
      val = val.toString()
      return val.replace(/\\/g, '\\\\')
        .replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&apos;')
        .replace(/&/g, '&amp;')
        .replace(/[\r\n]/g, '&lt;br/&gt;')
    } else {
      return ''
    }
  }

  /**
 * XML反转义
 * @param {any} val
 */
  XMLReverseSequence(val) {
    if (val) {
      val = val.toString()
      return val.replace(/\\\\/g, '\\')
        .replace(/&amp;/g, '&')
        .replace(/&lt;br\/&gt;/g, '\r\n')
        .replace(/&quot;/g, '"').replace(/&apos;/g, "\'")
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/<br\/>/g, '\r\n')
    } else {
      return ''
    }
  }

  /**
 * 清除所有影响XML的字符
 * @param {any} val
 */
  XMLFilter(val) {
    if (val && val !== '') {
      val = val.toString()
      return val.replace(/\\/g, '')
        .replace(/</g, '').replace(/>/g, '')
        .replace(/"/g, '').replace(/'/g, '')
        .replace(/&/g, '').replace(/,/g, '')
        .replace(/‘/g, '').replace(/’/g, '')
        .replace(/[\r\n]/g, '').replace(/\s*/g, '')
    } else {
      return ''
    }
  }

  // 全数组转义
  ArrFilter(arr) {
    arr.forEach(item => {
      if (typeof item === 'string') {
        item = XMLSerialize(item)
      }
    })

    return arr
  }

  // 全对象转义（不包含数组）
  AllObjectFilter(obj) {
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === 'string') {
        obj[key] = obj[key].replace(/，/g, ',')
        obj[key] = escapeCode.XMLSerialize(obj[key])
      }
    }
    return obj
  }

  // 全数组反转义
  ArrFilterReverse(arr) {
    arr.forEach(item => {
      if (typeof item === 'string') {
        item = XMLReverseSequence(item)
      }
    })

    return arr
  }

  // 全对象反转义（不包含数组）
  AllObjectReverse(obj) {
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === 'string') {
        obj[key] = obj[key].replace(/，/g, ',')
        obj[key] = escapeCode.XMLReverseSequence(obj[key])
      }
    }
    return obj
  }

  // 所有返回值转义
  ResponseFilter(data) {
    if (data && typeof data instanceof Array) {
      data.forEach(item => {
        if (item && typeof item instanceof Array) {
          item = escapeCode.ArrFilterReverse(item)
        } else if (item && typeof item === 'object') {
          item = escapeCode.XMLReverseSequence(item)
        }
      })
    } else if (data && typeof data === 'object') {
      data = escapeCode.AllObjectReverse(data)
    }

    return data
  }
}

const escapeCode = new EscapeCode()

export { escapeCode }
