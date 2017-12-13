# Connor Lind's Personal Website

[Connorlind.com](http://www.connorlind.com) is a sandbox for my development as a full-stack Javascript engineer. I will implement new technologies here as I learn them.

This website is built with ES6 Javascript, jQuery, and Sass. It is currently hosted as a static website on Amazon S3.

## Points Of Interest

The following are key areas of focus for the development of this application.

### The Gulpfile

The [gulpfile](https://github.com/connorjohnlind/connorlind.com/blob/master/gulpfile.js) utilizes Browserify and the Node Ecosystem to implement, concatenate, and minify all assets into production. The gulpfile manages all of the following technologies:

* [Browserify](https://github.com/browserify/browserify) -
* [Babelify](https://github.com/babel/babelify) -
* [Uglify](https://github.com/terinjokes/gulp-uglify) -
* [Sass](https://github.com/dlmanning/gulp-sass) -
* [Autoprefixer](https://github.com/postcss/autoprefixer) -
* [CSS Nano](https://github.com/ben-eb/cssnano) -
* [Sourcemaps](https://github.com/gulp-sourcemaps/gulp-sourcemaps) -
* [Imagemin](https://github.com/sindresorhus/gulp-imagemin) -

### Other Third-Party Technologies

In an effort to learn full-stack web development, I am keeping third-party libraries to a minimum. However, I have added the following tools into production:

* [jQuery](https://github.com/jquery/jquery) - Implemented via Browserify
* [Particles.js](https://github.com/VincentGarreau/particles.js/) - The canvas background for the site header, implemented via Browserify
* [Material Design Icons](https://github.com/google/material-design-icons) - Google's Icon Library, trimmed to a webfont and Sass file

## Acknowledgements

While gaining a foundation with HTML and CSS was a huge area focus early on in my development, I was not seeking design expertise. The design for this website was heavily inspired by [Matthew Williams](http://findmatthew.com/).
