const glob = require('glob')
const webpack = require('webpack')

const path = require('path')
const paths = require('../../config/paths')

const options = require('../../config/options')

const srcPath = path.resolve(paths.src.scripts)

const webpackConfig = require('../../config/webpack.config.js')

const entries = {}
const independentEntries = {}
const plugins = []

glob.sync(`${srcPath}/*.js`).forEach((filepath) => {
  const entryId = path.basename(filepath, '.js')
  const entry = []

  if (!options.production) {
    entry.push('webpack/hot/dev-server')
    entry.push('webpack-hot-middleware/client?reload=true')
  }

  // Actual entry MUST be after webpack stuff
  entry.push(filepath)

  entries[entryId] = entry
})

glob.sync(`${srcPath}/independent/**/*.js`).forEach((filepath) => {
  const entryId = path.basename(filepath, '.js')
  independentEntries[entryId] = filepath
})

if (!options.production) {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

const bundlers = {
  scripts: webpack(Object.assign({}, webpackConfig, {entry: entries, plugins})),
}

if (Object.keys(independentEntries).length) {
  const destPath = paths.dist.scripts + '/independent'
  const output = Object.assign({}, webpackConfig.output, {path: path.join(process.cwd(), destPath)})
  bundlers.independent = webpack(Object.assign({}, webpackConfig, {entry: independentEntries, plugins: [], output}))
}

module.exports = bundlers
