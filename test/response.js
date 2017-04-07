const assert = require("assert")
const response = require("../lib/response")

describe("response", () => {

  it("json", () => {
    let json = {
      num: 1,
      str: "a",
      str2: "1a"
    }
    let res = response(json)
    assert.deepEqual(res, json)
  })

  it("json with object", () => {
    let json = {
      num: 1,
      str: "a",
      obj: {
        num: 2,
        str: "b"
      }
    }
    let res = response(json)
    assert.deepEqual(res, json)
  })

  it("json with @num()", () => {
    let res = response({
      num: "@num(0, 5)"
    })
    assert.ok(res.num >= 0 && res.num < 5)
  })

  it("json with deeper @num()", () => {
    let res = response({
      num: "@num(0, 5)",
      obj: {
        num: "@num(10, 20)"
      }
    })
    assert.ok(res.num >= 0 && res.num < 5)
    assert.ok(res.obj.num >= 10 && res.obj.num < 20)
  })

})
