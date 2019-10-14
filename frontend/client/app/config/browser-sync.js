const webpackConfig = require('./webpack.config')
const scriptsBundler = require('../tasks/utils/webpack-bundlers').scripts

const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

module.exports = {
  proxy: 'http://frontend_nginx:80',
  port: 80,
  open: false,
  browser: false,
  ghostMode: false,
  middleware: [
    webpackDevMiddleware(scriptsBundler, {
      publicPath: webpackConfig.output.publicPath,
      stats: { colors: true }
    }),
    webpackHotMiddleware(scriptsBundler)
  ]
}
