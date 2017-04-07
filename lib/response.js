const rNum = /^@num\(/
const rNumVal = /@num\(\s*(\d+)\s*,\s*(\d+)\s*\)/

const parseNum = (str) => {
  let arr = str.match(rNumVal)
  if (arr && arr.length >= 2)
    return Math.floor(parseInt(arr[1]) + (Math.random() * parseInt(arr[2] - parseInt(arr[1]))))
  return "Wrong usage of @num(min, max)"
}

const object = (obj) => {
  let newObj = {}
  for (let key in obj)
    // @num()
    if (obj.hasOwnProperty(key) && typeof obj[key] === "string" && rNum.test(obj[key]))
      newObj[key] = parseNum(obj[key])
    // {}
    else if (obj.hasOwnProperty(key) && obj[key] && typeof obj[key] === "object")
      newObj[key] = object(obj[key])
    // string, number, ...
    else
      newObj[key] = obj[key]
  return newObj
}

module.exports = (json) => {
  return object(json, {})
}
