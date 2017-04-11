const rNum = /^@num\(/
const rNumVal = /@num\(\s*(\d+)\s*,\s*(\d+)\s*\)/
const rStr = /^@str\(/
const rStrVal = /@str\(\s*(\d+)\s*,\s*(\d+)\s*\)/
const rWord = /@word\(/
const rWordVal = /@word\(\s*(\d+)\s*,\s*(\d+)\s*\)/
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

const isObject = (val) => val && typeof val === "object"
const isArray = (val) => Array.isArray(val)
const isString = (val) => typeof val === "string"
const isNumFn = (val) => isString(val) && rNum.test(val)
const isStrFn = (val) => isString(val) && rStr.test(val)
const isWordFn = (val) => isString(val) && rWord.test(val)

const minLengthWord = 3
const maxLengthWord = 8;

const parseNumFn = (str) => {
  let arr = str.match(rNumVal)
  if (arr && arr.length >= 2)
    return Math.floor(parseInt(arr[1]) + (Math.random() * parseInt(arr[2] - parseInt(arr[1]))))
  return "Wrong usage of @num(min, max)"
}

const parseStrFn = (str) => {
  let arr = str.match(rStrVal)
  if (arr && arr.length >= 2) {
    let newStr = ""
    let len = Math.floor(parseInt(arr[1]) + (Math.random() * parseInt(arr[2] - parseInt(arr[1]))))
    for (let i = 0; i < len; i++)
      newStr += chars.charAt(Math.floor(Math.random() * chars.length))
    return newStr
  }
  return "Wrong usage of @str(min, max)"
}

const parseWordFn = (str) => {
  let arr = str.match(rWordVal)
  if (arr && arr.length >= 2) {
    let wordMaxLen = arr[2] || maxLengthWord
    let words = []
    for (let i = 0; i < arr[1]; i++) {
      let word = ""
      for (let j = 0; j < minLengthWord + Math.floor(Math.random() * (wordMaxLen - minLengthWord)); j++)
        word += chars.charAt(Math.floor(Math.random() * chars.length))
      words.push(word)
    }
    return words.join(" ")
  }
  return "Wrong usage of @word(count, maxWordLength = 8)"
}

const repeat = (val, count) => {
  let arr = []
  for (let i = 0; i < count; i++)
    arr.push(val)
  return arr
}

const object = obj => {
  if (obj.hasOwnProperty("@repeat")) {
    let count = obj["@repeat"]
    delete obj["@repeat"]
    return array(repeat(obj, count))
  }
  let newObj = {}
  for (let key in obj)
    if (obj.hasOwnProperty(key))
      if (isNumFn(obj[key]))
        newObj[key] = parseNumFn(obj[key])
      else if (isStrFn(obj[key]))
        newObj[key] = parseStrFn(obj[key])
      else if (isWordFn(obj[key]))
        newObj[key] = parseWordFn(obj[key])
      else if (isObject(obj[key]) && !isArray(obj[key]))
        newObj[key] = object(obj[key])
      else if (isArray(obj[key]))
        newObj[key] = array(obj[key])
      else
        newObj[key] = obj[key]
  return newObj
}

const array = arr => {
  let newArr = []
  arr.forEach((item) => {
    if (isNumFn(item))
      newArr.push(parseNumFn(item))
    else if (isStrFn(item))
      newArr.push(parseStrFn(item))
    else if (isObject(item) && !isArray(item))
      newArr.push(object(item))
    else if (isArray(item))
      newArr.push(array(item))
    else
      newArr.push(item)
  })
  return newArr
}

module.exports = (json) => {
  if (isArray(json))
    return array(json)
  else
    return object(json)
}
