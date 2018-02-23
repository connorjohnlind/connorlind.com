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

window.$ = $;
particlesJS.load('particles-js', './config/particles.json'); // eslint-disable-line no-undef

$(() => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    const viewportHeight = $(window).innerHeight();
    $('#home').css({ height: viewportHeight });
  }

  const navHeight = $('nav').height();
  let homeBottom = $('#main').position().top;
  let pos = $(window).scrollTop();

  const highlightLink = (href) => {
    const $anchor = $(`a[href="${href}"]`);
    $('.active').removeClass('active');
    $($anchor).addClass('active');
  };

  const scrollThenFixNav = (window) => {
    pos = $(window).scrollTop();

    if (pos > homeBottom) {
      $('nav').addClass('fixed');
    } else {
      $('nav').removeClass('fixed');
    }

    if (pos + $(window).height() === $(document).height()) { // page bottom
      highlightLink('#contact');
    } else if (pos > $('#contact-main').position().top - navHeight) {
      highlightLink('#contact');
    } else if (pos > $('#portfolio-main').position().top - navHeight) {
      highlightLink('#portfolio');
    } else if (pos > $('#about-main').position().top - navHeight) {
      highlightLink('#about');
    } else if (pos < homeBottom) {
      highlightLink('#home');
    }
  };

  /* eslint-disable func-names, prefer-arrow-callback */
  $(window).resize(function () {
    homeBottom = $('#main').position().top;
  });

  $(window).scroll(function () {
    scrollThenFixNav(this);
  });
  /* eslint-enable func-names, prefer-arrow-callback */

  scrollThenFixNav(window); // if page is reloaded anywhere beyond Home section, call the menu fixer
});
