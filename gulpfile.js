const autoprefixer = require('autoprefixer'),
  browserify = require('browserify'),
  browserSync = require('browser-sync').create(),
  buffer = require('vinyl-buffer'),
  cache = require('gulp-cache'),
  cssnano = require('gulp-cssnano'),
  del = require('del'),
  gulp = require('gulp'),
  gulpIf = require('gulp-if'),
  imagemin = require('gulp-imagemin'),
  postcss = require('gulp-postcss'),
  runSequence = require('run-sequence'),
  sass = require('gulp-sass'),
  source = require('vinyl-source-stream'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  useref = require('gulp-useref');

const config = {
  src: {
    root: 'src',
    css: 'src/css',
    entryPoint: 'src/scripts/main.js',
    htmlWatch: 'src/**/*.html',
    sassWatch: 'src/scss/**/*.scss',
    jsWatch: 'src/scripts/**/*.js',
    fontWatch: 'src/fonts/**/*',
    imageWatch: 'src/images/**/*.+(png|jpg|gif|svg)'
  },
  dist: {
    root: 'dist',
    fonts: 'dist/fonts',
    images: 'dist/images'
    // CSS and JS configuration needed in HTML file for gulp-useref
  }
};

/* JS Pre-processing */
gulp.task('js', () => {
  return browserify(config.src.entryPoint, {
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
    .pipe(gulp.dest(config.dist.root));
});

// Ensure browserSync reloads after Pre-processing is complete
gulp.task('js-watch', ['js'], () => {
    browserSync.reload();
});

/* CSS Pre-Processing */
gulp.task('sass', () => {
  return gulp.src(config.src.sassWatch)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.src.css));
});

// Ensure browserSync reloads after Pre-processing is complete
gulp.task('sass-watch', ['sass'], () => {
    browserSync.reload();
});

/* Concatinate and Minify JS and CSS Files to Dist */
gulp.task('useref', () => {
  return gulp.src(config.src.htmlWatch)
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest(config.dist.root))
});

/* Minify Images */
gulp.task('images', () => {
  return gulp.src(config.src.imageWatch)
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest(config.dist.images))
});

/* Move fonts to Dist */
gulp.task('fonts', () => {
  return gulp.src(config.src.fontWatch)
    .pipe(gulp.dest(config.dist.fonts))
});

/* Cleanup */
gulp.task('clean:dist', () => {
  return del.sync(config.dist.root);
})

/********************WATCH********************/

// Launch Browsersync and watch JS and Sass files
gulp.task('watch', ['js', 'sass'], () => {

  browserSync.init({
    server: {
      baseDir: config.src.root
    }
  });

  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  // html doesn't need a watcher because it has no pre-processing
  gulp.watch(config.src.jsWatch, ['js-watch']);
  gulp.watch(config.src.sassWatch, ['sass-watch']);
  gulp.watch(config.src.htmlWatch, () => {
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
