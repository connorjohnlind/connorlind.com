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

// jQuery for scroll-then-fix nav bar
$(() => {
  let homeBottom = $('nav').position().top;
  let navHeight = $('nav').height();

  const highlightLink = (href) => {
    const $anchor = $(`a[href="${href}"]`);
    $('.active').removeClass('active');
    $($anchor).addClass('active');
  };

  /* eslint-disable func-names, prefer-arrow-callback */
  $(window).scroll(function () {
    const pos = $(this).scrollTop();

    if (pos > homeBottom) {
      $('nav').addClass('fixed');
    } else {
      $('nav').removeClass('fixed');
    }

    if (pos < homeBottom) { highlightLink('#home'); }
    if (pos > $('#about-main').position().top - navHeight) { highlightLink('#about'); }
    if (pos > $('#portfolio-main').position().top - navHeight) { highlightLink('#portfolio'); }
    if (pos > $('#contact-main').position().top - navHeight) { highlightLink('#contact'); }
  });

  $(window).resize(function () {
    homeBottom = $('nav').position().top;
    navHeight = $('nav').height();
  });
  /* eslint-enable func-names, prefer-arrow-callback */
});
