const gulp = require('gulp')
const plugins = require('./utils/gulp-plugins')

const paths = require('../config/paths')

const stylesPath = paths.dist.styles
const scriptsPath = paths.dist.scripts

module.exports = () => gulp.src(
  [
    `${stylesPath}/*.*`,
    `!${stylesPath}/critical.css`,
    `${scriptsPath}/*.*`,
    `!${scriptsPath}/independent/*.*`,
    `!${scriptsPath}/critical.js`,
    `!${scriptsPath}/*.chunk.js`
  ], {base: paths.dist.public})
  .pipe(plugins.rev())
  .pipe(plugins.revDeleteOriginal())
  .pipe(gulp.dest(paths.dist.public + '/'))
  .pipe(plugins.rev.manifest())
  .pipe(gulp.dest(paths.dist.artifacts + '/'))

// const rewrite = () => gulp.src(`${paths.dist.root}/**/*.html`)
//   .pipe(plugins.revRewrite({ manifest: gulp.src(`${paths.dist.root}/rev-manifest.json`) }))
//   .pipe(gulp.dest(paths.dist.root + '/'))

// gulp.task('revision', revision)
// gulp.task('rewrite', rewrite)

// module.exports = gulp.series('revision', 'rewrite')
