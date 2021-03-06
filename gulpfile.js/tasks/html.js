if(!TASK_CONFIG.html) return

const browserSync    = require('browser-sync')
const data           = require('gulp-data')
const gulp           = require('gulp')
const gulpif         = require('gulp-if')
const handleErrors   = require('../lib/handleErrors')
const projectPath    = require('../lib/projectPath')
const htmlmin        = require('gulp-htmlmin')
const nunjucksRender = require('gulp-nunjucks-render')
const fs             = require('fs')
var rename           = require('gulp-rename');
var htmlbeautify = require('gulp-html-beautify');

var htmlBeautyOptions = {
  indent_with_tabs: true,
  preserve_newlines: false,
  space_in_empty_paren: true,
  end_with_newline: true,
  unformatted: []
};

const htmlTask = function() {

  const exclude = '!' + projectPath(PATH_CONFIG.src, PATH_CONFIG.html.src, '**/{' + TASK_CONFIG.html.excludeFolders.join(',') + '}/**')

  const paths = {
    src: [
      projectPath(PATH_CONFIG.src, PATH_CONFIG.html.src, '**/*.{' + TASK_CONFIG.html.extensions + '}'),
      exclude
    ],
    dest: projectPath(PATH_CONFIG.dest, PATH_CONFIG.html.dest),
  }

  const dataFunction = TASK_CONFIG.html.dataFunction || function(file) {
    const dataPath = projectPath(PATH_CONFIG.src, PATH_CONFIG.html.src, TASK_CONFIG.html.dataFile)
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
  }

  const nunjucksRenderPath = [ projectPath(PATH_CONFIG.src, PATH_CONFIG.html.src), projectPath(PATH_CONFIG.src, 'blocks') ]
  TASK_CONFIG.html.nunjucksRender.path = TASK_CONFIG.html.nunjucksRender.path || nunjucksRenderPath

  return gulp.src(paths.src)
    .pipe(data(dataFunction))
    .on('error', handleErrors)
    .pipe(nunjucksRender(TASK_CONFIG.html.nunjucksRender))
    .on('error', handleErrors)
    .pipe(gulpif(global.production && !TASK_CONFIG.html.beautify, htmlmin(TASK_CONFIG.html.htmlmin)))
    .pipe(gulpif(global.production && TASK_CONFIG.html.beautify, htmlbeautify(htmlBeautyOptions)))
    .pipe(rename(function (path) {
      path.basename = path.basename.replace('.nunj', '');
    }))
    // .pipe(gulpif(TASK_CONFIG.html.beautify, htmlbeautify(htmlBeautyOptions)))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

const { alternateTask = () => htmlTask } = TASK_CONFIG.html
const task = alternateTask(gulp, PATH_CONFIG, TASK_CONFIG)
gulp.task('html', task)
module.exports = task
