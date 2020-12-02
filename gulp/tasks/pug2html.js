const gulp = require('gulp')
const plumber = require('gulp-plumber')
const pug = require('gulp-pug')
const pugLinter = require('gulp-pug-linter')
const htmlValidator = require('gulp-w3c-html-validator')
const bemValidator = require('gulp-html-bem-validator')
const config = require('../config')
const Fs = require('fs')

module.exports = function pug2html() {
  return gulp.src('src/pages/*.pug')
    .pipe(plumber())
    .pipe(pugLinter({ reporter: 'default' }))
    .pipe(pug({ 
      pretty: config.pug2html.beautifyHtml,
      locals: JSON.parse(Fs.readFileSync("./src/locales/data/data.json")) || {}
    }))
    .pipe(htmlValidator())
    .pipe(bemValidator())
    .pipe(gulp.dest('build'))
}

