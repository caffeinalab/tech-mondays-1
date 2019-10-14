const independentBundler = require('./utils/webpack-bundlers').independent
const runBundler = require('./utils/run-bundler')
const noop = require('./noop')

function webpackIndependent() {
  if (!independentBundler) return noop()

  return runBundler(independentBundler)
}

module.exports = webpackIndependent
