const gulp = require('gulp')
const plugins = require('./utils/gulp-plugins')
const merge = require('merge-stream')
const Golc = require('golc')
const L = new Golc('frontend_client | views', {withNewline: true})

const fs = require('fs')
const path = require('path')
const glob = require('globby')
const camelCase = require('lodash.camelcase')

const paths = require('../config/paths')
const nunjucks = require('nunjucks')

const fixturesPath = paths.src.fixtures
const localesPath = paths.dist.locales
const manifestPath = paths.dist.manifest
const viewPath = paths.src.views
const distPath = paths.dist.public

const options = require('../config/options')

const translator = {}

const viewPaths = [
  `${viewPath}/{,*/}*.{njk,html}`,
  `!${viewPath}/templates/**`,
  `!${viewPath}/macro/**`,
]

if (!options.compileHtmlPartials) {
  viewPaths.push(`!${viewPath}/partials/**`)
}

function errorNotifier(error) {
  if (!error) return

  let message
  if (error.message && error.message.includes('__')) {
    message = 'Seems like you have no languages, yet you are using translation keys in your templates'
  }

  L.error(error, message)
}

function compileNunjucks(templateData, lang, isDefault) {
  const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(viewPath))

  if (lang) {
    env.addGlobal('__', function(key) {
      translator.setLocale.bind(translator, lang)()
      return translator.__(key)
    })
  }

  return gulp.src(viewPaths)
    .pipe(plugins.if(!options.production, plugins.plumber({errorHandler: errorNotifier})))
    .pipe(plugins.nunjucks.compile(templateData, {
      env: env
    }))
    .pipe(plugins.rename({
      extname: '.html',
    }))
    .pipe(plugins.if(options.production, plugins.htmlmin({
      collapseWhitespace: true,
      removeComments: true
    })))
    .pipe(plugins.if(lang && !isDefault,
      gulp.dest(`${distPath}/${lang}`),
      gulp.dest(distPath))
    )
}

function getTemplateData() {
  const templateData = glob.sync('{,*/}*.json', { cwd: fixturesPath }).reduce((obj, filename) => {
    const id = camelCase(filename.toLowerCase().replace('.json', ''))
    obj[id] = JSON.parse(fs.readFileSync(path.join(fixturesPath, filename), { encoding: 'utf8' }))
    return obj
  }, {})

  templateData.production = options.production
  templateData.revisions = {}

  if (options.production) {
    if (fs.existsSync(manifestPath)) {
      templateData.revisions = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    }

    const criticalJsPath = templateData.revisions['js/critical.js'] || 'js/critical.js'
    const criticalCssPath = templateData.revisions['css/critical.css'] || 'css/critical.css'

    templateData.criticalScript = fs.readFileSync(`${paths.dist.public}/${criticalJsPath}`, 'utf8')
    templateData.criticalCss = fs.readFileSync(`${paths.dist.public}/${criticalCssPath}`, 'utf8')
  }

  return templateData
}


module.exports = function views() {
  const templateData = getTemplateData()

  const hasLanguages = fs.existsSync(localesPath)
  const languages = hasLanguages && fs.readdirSync(localesPath)
  if (!hasLanguages || !languages.length || !options.i18n) return compileNunjucks(templateData)

  const i18n = require('i18n')
  i18n.configure(Object.assign(options.i18n, {
    directory: localesPath,
    register: translator
  }))

  i18n.init()

  const streams = languages
    .map(f => {
      const lang = path.basename(f, '.json')
      return compileNunjucks(templateData, lang)
    })

  streams.push(
    compileNunjucks(templateData, options.i18n.defaultLocale, true)
  )

  return merge.apply(merge, streams)
}

