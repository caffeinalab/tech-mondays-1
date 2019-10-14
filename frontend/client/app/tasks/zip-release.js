const gulp = require('gulp')
const paths = require('../config/paths')
const zip = require('gulp-zip')
const pkg = require('../package.json')

module.exports = function releaseZip() {
  return gulp.src(paths.dist.public)
    .pipe(zip(`${pkg.name}-${Date.now()}.zip`))
    .pipe(gulp.dest(paths.dist.releases))
}
