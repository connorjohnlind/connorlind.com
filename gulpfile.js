// Copyright Connor Lind, 2017
// src folder contains unprocessed Sass, JS, and images
// dist folder contains production-ready HTML, Fonts, and JSON

const autoprefixer = require('autoprefixer'),
  babelify = require('babelify'),
  browserify = require('browserify'),
  browserSync = require('browser-sync').create(),
  buffer = require('vinyl-buffer'),
  cache = require('gulp-cache'),
  cssnano = require('cssnano'),
  del = require('del'),
  gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  postcss = require('gulp-postcss'),
  runSequence = require('run-sequence'),
  sass = require('gulp-sass'),
  source = require('vinyl-source-stream'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  util = require('gulp-util');

const config = {
  src: {
    root: 'src',
    css: 'src/css',
    entryPoint: 'src/js/main.js',
    sassWatch: 'src/scss/**/*.scss',
    jsWatch: 'src/js/**/*.js',
    imageWatch: 'src/images/**/*.+(png|jpg|gif|svg)'
  },
  dist: {
    root: 'dist',
    assets: 'dist/js/assets',
    images: 'dist/images',
    htmlWatch: 'dist/**/*.html',
    js: 'dist/js',
    css: 'dist/css'
  }
};

/* CSS Build */
gulp.task('sass', () => {
  const plugins = [
    autoprefixer(),
    cssnano()
  ];

  return gulp.src(config.src.sassWatch)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dist.css));
});

// Ensure browserSync reloads after tasks are complete
gulp.task('sass-reload', ['sass'], () => {
    browserSync.reload();
});

/* JS Build */
gulp.task('js', () => {
  const b = browserify({
    entries: config.src.entryPoint,
    debug: true,
    transform: [babelify.configure({
      presets: ['env']
    })]
  });

  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      // Add other gulp transformations to the pipeline here.
      .pipe(uglify())
      .on('error', util.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dist.js));
});

// Ensure browserSync reloads after tasks are complete
gulp.task('js-reload', ['js'], () => {
    browserSync.reload();
});


/* Minify Images */
gulp.task('images', () => {
  return gulp.src(config.src.imageWatch)
    .pipe(cache(imagemin({
        interlaced: true
      })))
    .pipe(gulp.dest(config.dist.images))
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
      baseDir: config.dist.root
    }
  });

  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  // html doesn't need a reloader because it has no pre-processing
  gulp.watch(config.src.jsWatch, ['js-reload']);
  gulp.watch(config.src.sassWatch, ['sass-reload']);
  gulp.watch(config.dist.htmlWatch, () => {
      browserSync.reload();
  });
});

/********************BUILD********************/

gulp.task('build', () => {
  runSequence('clean:dist',
    ['js', 'sass', 'images']
  )
});
