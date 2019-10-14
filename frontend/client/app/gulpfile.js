const gulp = require('gulp')
const glob = require('globby')
const path = require('path')
const options = require('./config/options')
const { argv = {} } = require('yargs')

Object.entries(options)
  .forEach(([key, value]) => {
    options[key] = argv[key] || value
  })

// You can force some options here
// EG: options.compileHtmlPartials = false

// Register all tasks
glob.sync('./tasks/*.js').forEach(taskFile => {
  const name = path.basename(taskFile, '.js')
  const task = require(taskFile)
  gulp.task(name, task)
})

gulp.task('dev',
  gulp.series(
    'clean',
    gulp.parallel(
      gulp.series(
        options.i18n ? 'convert-po' : 'noop',
        options.server ? 'noop' : 'views'
      ),
      'styles',
      'webpack-independent',
      'optimize-assets',
      'copy-static',
    ),
    gulp.parallel(
      'watch'
    ),
    'health'
  )
)

gulp.task('build',
  gulp.series(
    'clean',
    gulp.parallel(
      'styles',
      'webpack-scripts',
      'webpack-independent',
      options.i18n ? 'convert-po' : 'noop',
      'copy-static',
    ),
    'rev',
    options.server ? 'noop' : 'views'
  )
)
