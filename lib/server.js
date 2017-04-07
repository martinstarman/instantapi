const {send} = require("micro")
const response = require("./response")

module.exports = (req, res) => {
  // skip favicon request
  if (req.url === "/favicon.ico")
    return send(res, 200, "")
  // try parse JSON in url
  if (req.method === "GET") {
    res.setHeader("Access-Control-Allow-Origin", "*")
    let json
    try {
      json = JSON.parse(decodeURIComponent(req.url.slice(1)))
    } catch (err) {
      return send(res, 500, "Cannot parse JSON")
    }
    return send(res, 200, response(json))
  }
  // TODO support for other methods
  send(res, 405, "Method Not Allowed")
}
