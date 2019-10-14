const scriptsBundler = require('./utils/webpack-bundlers').scripts
const runBundler = require('./utils/run-bundler')

function webpackWorkers() {
  return runBundler(scriptsBundler)
}

module.exports = webpackWorkers
