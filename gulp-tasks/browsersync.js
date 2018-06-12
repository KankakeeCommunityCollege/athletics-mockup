var gulp = require('gulp');
var fs = require('fs');
var yaml = require('js-yaml');
var browserSync = require('browser-sync');


function loadConfig() {
  var ymlFile = fs.readFileSync('gulpconfig.yml', 'utf8');
  return yaml.load(ymlFile);
}
var config = loadConfig();
module.exports = config;

gulp.task('browser-sync', function() { // BrowserSync ist wunderbar! Changes to HTML, MD, SASS, and JS files get updated on saving of those files
  browserSync.init({
    notify: config.browsersync.notify,
    open: config.browsersync.open,
    port: config.browsersync.port,
    server: {
      baseDir: config.browsersync.server.basedir
    },
    xip: config.browsersync.xip,
    browser: config.browsersync.browser
  });
});
