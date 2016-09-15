var gulp = require('gulp');
var zip = require('gulp-zip');
var forceDeploy = require('gulp-jsforce-deploy');
var SALESFORCE_CONFIG = require('./salesforce.config.json');

gulp.task('default', function () {
  return gulp.src(['./pkg/**'], { base: "." })
    .pipe(zip('pkg.zip'))
    .pipe(forceDeploy({
      username: SALESFORCE_CONFIG.SF_USERNAME,
      password: SALESFORCE_CONFIG.SF_PASSWORD + SALESFORCE_CONFIG.SF_SECURITYTOKEN,
      loginUrl: SALESFORCE_CONFIG.SF_SERVERURL
    }));
});