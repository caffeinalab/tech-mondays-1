const paths = require('../config/paths')
const del = require('del')

module.exports = () => {
  return Promise.all([
    del(`${paths.dist.public}/**/*`, { dot: true, allowEmpty: true }),
    del(`${paths.dist.artifacts}/**/*`, { dot: true, allowEmpty: true })
  ])
}
