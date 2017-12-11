# Connor Lind's Personal Website

[Connorlind.com](https://www.connorlind.com) is a sandbox for my development as a full-stack javascript engineer. I will implement new technologies here as I learn them.

This website is built with ES6 Javascript, jQuery, and SaSS. It is currently hosted as a static website on Amazon S3.

## Points Of Interest

The following are key areas of focus for the development of this application.

### The Gulpfile

Optimizing the [gulpfile](https://github.com/connorjohnlind/connorlind.com/blob/master/gulpfile.js) is one of my key areas of focus for this application. This utilizes Browserify and the Node Ecosystem to implement, concatenate, and minify all modules into production. The Gulpfile manages all of the following technologies:

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

* [Particles.js](https://github.com/VincentGarreau/particles.js/) - The canvas background for the site header, implemented via Browserify
* [Material Design Icons](https://github.com/google/material-design-icons) - Google's Icon Library

### Acknowledgements

While gaining a foundation with HTML and CSS was a huge area focus, I do not claim to have design expertise. The design for this website was heavily inspired by [Matthew Williams](http://findmatthew.com/). However, a look under the hood will show that my code is entirely different from Matthew's.
