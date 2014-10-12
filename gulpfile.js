var gulp    = require('gulp'),
    karma   = require('karma').server,
    jshint  = require('gulp-jshint'),
    //stylish = require('jshint-stylish'), // it is not used
    header  = require('gulp-header'),
    uglify  = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    rimraf   = require('gulp-rimraf'),
    rename  = require('gulp-rename'),
    package = require('./package.json');

var paths = {
  output : 'dist/',
  scripts : [
    'src/script.js'
  ],
  test: [
    'test/spec/*spec.js'
  ]
};

var banner = [
  '/*! ',
    '<%= package.name %> ',
    'v<%= package.version %> | ',
    '(c) ' + new Date().getFullYear() + ' <%= package.author %> |',
    ' <%= package.homepage %>',
  ' */',
  '\n'
].join('');

gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('dist/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('lint', function () {
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function () {
  return gulp.src(paths.output, { read: false })
    .pipe(plumber())
    .pipe(rimraf()); // "new" gulp clean (and now it's just del)
});

gulp.task('test', function(done) {
  karma.start({
    configFile: __dirname + '/test/karma.conf.js',
    files: paths.scripts.concat(paths.test),
    singleRun: true
  }, done);
});

gulp.task('default', [
  'lint',
  'clean',
  'scripts',
  'test'
]);
