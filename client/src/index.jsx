import 'babel-polyfill';
import 'particles.js';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import './assets/fonts/Raleway/Raleway.scss';
import favicon from './assets/favicon.ico'; // eslint-disable-line no-unused-vars
import Contact from './components/Contact';

// ReactDOM.render(<Contact />, document.getElementById('contact-root'));

particlesJS.load('particles-js', './config/particles.json'); // eslint-disable-line no-undef

/** ***NAVIGATION**** */
$(() => {
  const homeBottom = $('nav').position().top;
  const navHeight = $('nav').height();

  const highlightLink = (href) => {
    const $anchor = $(`a[href="${href}"]`);
    $('.active').removeClass('active');
    $($anchor).addClass('active');
  };

  /* eslint-disable func-names */
  $(window).scroll(function () {
    const pos = $(this).scrollTop();

    // Fixing Navigation Bar
    if (pos > homeBottom) {
      $('nav').addClass('fixed');
    } else {
      $('nav').removeClass('fixed');
    }

    // Link Hilighting
    if (pos < homeBottom) { highlightLink('#home'); }
    if (pos > $('#about-main').position().top - navHeight) { highlightLink('#about'); }
    if (pos > $('#portfolio-main').position().top - navHeight) { highlightLink('#portfolio'); }
    if (pos > $('#contact-main').position().top - navHeight) { highlightLink('#contact'); }
  });
  /* eslint-enable func-names */
});
