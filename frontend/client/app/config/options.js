const options = {
  production: false,
  buildHash: `buildhash:${Date.now()}`,
  compileHtmlPartials: false,
  i18n: false,
  tommy: {
    src: '/src',
    dst: '/dst',
    timeout: null,
    config: {
      'tester.image': {
        enabled: false
      },
      'processor.svg': {
        'enabled': true
      },
      'tester.font': {
        'enabled': false
      },
      'processor.resize': {
        'enabled': false,
        'suffix': '-${i}.${ext}',
        'dimensions': [10, 300],
      },
      'processor.lazyLoadBlurried': {
        'enabled': false
      }
    }
  }
}

// options.i18n = {
//   locales: ['en', 'it'],
//   defaultLocale: 'en',
//   updateFiles: false,
//   syncFiles: false,
// };

if (!!Number(process.env.WITH_SERVER)) {
  options.server = true
}

module.exports = options
