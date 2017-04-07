const assert = require("assert")
const response = require("../lib/response")

describe("response", () => {

  it("simple object", () => {
    let json = {a: 1, b: "a", c: "1"}
    assert.deepEqual(response(json), json)
  })

  it("simple array", () => {
    let arr = [1, "a", "1"]
    assert.deepStrictEqual(response(arr), arr)
  })

  it("object with deeper object", () => {
    let json = {a: 1, b: {c: "a", d: 1}}
    assert.deepEqual(response(json), json)
  })

  it("object with deeper array", () => {
    let json = {a: 1, b: ["a", 1]}
    assert.deepEqual(response(json), json)
  })

  it("array with deeper object", () => {
    let json = [1, "a", {a: 1, b: "a"}]
    assert.deepEqual(response(json), json)
  })

  it("array with deeper array", () => {
    let json = [1, "a", [1, "a"]]
    assert.deepEqual(response(json), json)
  })

  it("simple object with @num()", () => {
    let json = {a: "@num(0,5)"}
    let resp = response(json)
    assert.ok(resp.a >= 0 && resp.a < 5)
  })

  it("simple array with @num()", () => {
    let json = ["@num(0,5)"]
    let resp = response(json)
    assert.ok(resp.length === 1)
    assert.ok(resp[0] >= 0 && resp[0] < 5)
  })

  it("@num() in deeper object", () => {
    let json = {a: 1, b: {c: "@num(0,5)"}}
    let resp = response(json)
    assert.ok(resp.a === 1)
    assert.ok(typeof resp.b === "object")
    assert.ok(resp.b.c >= 0 && resp.b.c < 5)
  })

  it("@num() in deeper array", () => {
    let json = {a: 1, b: ["@num(0,5)"]}
    let resp = response(json)
    assert.ok(resp.a === 1)
    assert.ok(Array.isArray(resp.b))
    assert.ok(resp.b[0] >= 0 && resp.b[0] < 5)
  })

})
