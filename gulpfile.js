const browserify = require('browserify'),
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('autoprefixer'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  useref = require('gulp-useref'),
  uglify = require('gulp-uglify'),
  gulpIf = require('gulp-if'),
  cssnano = require('gulp-cssnano'),
  imagemin = require('gulp-imagemin'),
  cache = require('gulp-cache'),
  runSequence = require('run-sequence'),
  del = require('del'),
  browserSync = require('browser-sync').create();

/* Path Configurations */
const entryPoint = 'src/scripts/main.js',
  browserDir = 'src',
  sassWatchPath = 'src/scss/**/*.scss',
  jsWatchPath = 'src/scripts/**/*.js',
  htmlWatchPath = 'src/**/*.html',
  fontWatchPath = 'src/fonts/**/*',
  imageWatchPath = 'src/images/**/*.+(png|jpg|gif|svg)';

/* JS Pre-processing */
gulp.task('js', () => {
  return browserify(entryPoint, {
      debug: true,
      extensions: ['es6']
    })
    .transform("babelify", {
      presets: ["es2015"]
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/'));
});

// Ensure browserSync reloads after Pre-processing is complete
gulp.task('js-watch', ['js'], () => {
    browserSync.reload();
});

/* CSS Pre-Processing */
gulp.task('sass', () => {
  return gulp.src(sassWatchPath)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/css'));
});

// Ensure browserSync reloads after Pre-processing is complete
gulp.task('sass-watch', ['sass'], () => {
    browserSync.reload();
});

/* Concatinate and Minify JS and CSS Files to Dist */
gulp.task('useref', () => {
  return gulp.src(htmlWatchPath)
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

/* Minify Images */
gulp.task('images', () => {
  return gulp.src(imageWatchPath)
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

/* Move fonts to Dist */
gulp.task('fonts', () => {
  return gulp.src(fontWatchPath)
    .pipe(gulp.dest('dist/fonts'))
});

/* Cleanup */
gulp.task('clean:dist', () => {
  return del.sync('dist');
})

/********************WATCH********************/

// Launch Browsersync and watch JS and Sass files
gulp.task('watch', ['js', 'sass'], () => {

  browserSync.init({
    server: {
      baseDir: browserDir
    }
  });

  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  // html doesn't need a watcher because it has no pre-processing
  gulp.watch(jsWatchPath, ['js-watch']);
  gulp.watch(sassWatchPath, ['sass-watch']);
  gulp.watch(htmlWatchPath, () => {
      browserSync.reload();
  });
});

/********************BUILD********************/

gulp.task('build', (callback) => {
  runSequence('clean:dist',
    ['js', 'sass', 'useref', 'images', 'fonts'],
    callback
  )
});
