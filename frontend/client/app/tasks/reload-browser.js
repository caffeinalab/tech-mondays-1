const fetch = require('node-fetch')

module.exports = function reloadBrowserSync() {
  return fetch('http://frontend_browser-sync/__browser_sync__?method=reload')
}
