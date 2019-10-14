const http = require('http')

module.exports = function health() {
  return new Promise((resolve, reject) => {
    try {
      http.createServer(function(_, response) {
        response.write('Healthy!')
        response.end()
      }).listen(15672)
      resolve()
    } catch (e) {
      reject()
    }
  })
}
