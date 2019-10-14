const paths = require('../config/paths')
const gulp = require('gulp')

module.exports = function copyStatic() {
  return gulp.src(`${paths.src.static}/**/*`)
    .pipe(gulp.dest(`${paths.dist.public}/`))
}
