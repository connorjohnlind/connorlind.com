import 'babel-polyfill';
import 'particles.js';
import $ from 'jquery';

import './index.scss';
import './assets/fonts/Raleway/Raleway.scss';
import './assets/fonts/MaterialDesignIcons/MaterialDesignIcons.scss';
import favicon from './assets/favicon.png';

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', './assets/particles.json', () => {
  console.log('callback - particles-js config loaded');
});

/** ***NAVIGATION**** */

const homeBottom = $('nav').position().top;
const navHeight = $('nav').height();

function highlightLink(href) {
  const $anchor = $(`a[href="${href}"]`);
  $('.active').removeClass('active');
  $($anchor).addClass('active');
}

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
