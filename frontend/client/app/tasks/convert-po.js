const gulp = require('gulp')
const po2json = require('gulp-po2json')
const paths = require('../config/paths')

const srcPath = `${paths.src.locales}`
const destPath = `${paths.dist.locales}`

module.exports = function convertPo() {
  return gulp.src([`${srcPath}/*.po`])
    .pipe(po2json({
      format: 'mf'
    }))
    .pipe(gulp.dest(`${destPath}`))
}
