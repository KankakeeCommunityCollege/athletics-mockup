var gulp = require('gulp');
var yargs = require('yargs');
var fs = require('fs');
var yaml = require('js-yaml');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var PRODUCTION = !!(yargs.argv.production); // Run things that say 'PRODCUTION' on production builds only ($ gulp --production)

function loadConfig() {
  var ymlFile = fs.readFileSync('gulpconfig.yml', 'utf8');
  return yaml.load(ymlFile);
}
var config = loadConfig();
module.exports = config;



gulp.task('javascriptLazy', function() {
  browserSync.notify(config.javascriptLazy.notification);
  return gulp.src(config.javascriptLazy.src)
    .pipe(sourcemaps.init())
    .pipe(concat(config.javascriptLazy.filename))
    .pipe(gulpif(PRODUCTION, uglify())) // Uglify me captain! (on production builds only)
    .pipe(gulp.dest(config.javascriptLazy.dest.jekyllRoot))
    .pipe(gulp.dest(config.javascriptLazy.dest.buildDir));
});
