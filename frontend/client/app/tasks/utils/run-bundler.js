const Golc = require('golc')
const L = new Golc('frontend_client | webpack bundler', {withNewline: true})

function runBundler(bundler) {
  return new Promise((res) =>  {
    bundler.run((err, stats) => {
      if (err) {
        L.error(err)
      }

      L.info(stats.toString({colors: true}))

      const statsErrors = stats.toJson({errorDetails: false}).errors

      if (statsErrors && statsErrors.length) {
        L.error(statsErrors[0])
      }

      res()
    })
  })
}

module.exports = runBundler
