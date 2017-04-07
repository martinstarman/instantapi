const rNum = /^@num\(/
const rNumVal = /@num\(\s*(\d+)\s*,\s*(\d+)\s*\)/

const isObject = (val) => val && typeof val === "object"
const isArray = (val) => Array.isArray(val)
const isString = (val) => typeof val === "string"
const isNumFn = (val) => isString(val) && rNum.test(val)

const parseNumFn = (str) => {
  let arr = str.match(rNumVal)
  if (arr && arr.length >= 2)
    return Math.floor(parseInt(arr[1]) + (Math.random() * parseInt(arr[2] - parseInt(arr[1]))))
  return "Wrong usage of @num(min, max)"
}

const object = obj => {
  let newObj = {}
  for (let key in obj)
    if (obj.hasOwnProperty(key))
      if (isNumFn(obj[key]))
        newObj[key] = parseNumFn(obj[key])
      else if (isObject(obj[key]))
        newObj[key] = object(obj[key])
      else if (isArray(obj[key]))
        array(obj[key])
      else
        newObj[key] = obj[key]
  return newObj
}

const array = arr => {
  let newArr = []
  arr.forEach((item) => {
    if (isNumFn(item))
      newArr.push(parseNumFn(item))
    else if (isObject(item))
      newArr.push(object(item))
    else if (isArray(item))
      array(item)
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
